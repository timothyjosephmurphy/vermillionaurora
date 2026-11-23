#!/usr/bin/env node
// Prepare a story branch, upload new media, and open a pull request.
// Never merges, never force-pushes, never uses --admin.
import {spawnSync} from 'node:child_process';
import {classifyChangeSet} from './ci/classify-changes.mjs';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options});
  if (result.status !== 0 && !options.allowFail) {
    const detail = (result.stderr || result.stdout || '').trim() || `${command} ${args.join(' ')} failed`;
    throw new Error(detail);
  }
  return (result.stdout || '').trim();
}

function changedVsMain() {
  run('git', ['fetch', 'origin', 'main']);
  const names = run('git', ['diff', '--name-only', '--diff-filter=ACMRT', 'origin/main...HEAD']);
  const uncommitted = run('git', ['status', '--porcelain']);
  return {
    files: names ? names.split('\n').filter(Boolean) : [],
    uncommitted,
  };
}

function slugFrom(files) {
  for (const file of files) {
    const match = file.match(/^(?:src\/content\/blog\/posts\/|static\/blog\/)([a-z0-9-]+)(?:\.mjs|\/)/);
    if (match && match[1] !== 'posts' && match[1] !== 'index') return match[1];
  }
  return '';
}

function mediaChanged(files) {
  return files.some((file) =>
    /^(static\/display\/|static\/social\/|scripts\/blog-media-upload\/publish-assets\/)/.test(file)
  );
}

try {
  const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch === 'main' || branch === 'release' || branch === 'HEAD') {
    throw new Error('Check out a story branch first (not main or release). This script does not create commits or merge.');
  }
  const {files, uncommitted} = changedVsMain();
  if (uncommitted) {
    throw new Error('Commit or stash your working tree first. This script does not create commits.\n' + uncommitted);
  }
  if (!files.length) {
    throw new Error('This branch has no commits ahead of origin/main.');
  }
  const classified = classifyChangeSet(files, {});
  if (classified.tier !== 'blog') {
    throw new Error(
      'This branch is not blog-only (tier=' + classified.tier + '). ' +
      'Remove catalog, checkout, workflow, or other non-story files, or open the pull request by hand.\n' +
      files.join('\n')
    );
  }
  const slug = slugFrom(files);
  const title = slug ? `Publish ${slug}` : 'Publish studio story';
  run('git', ['push', '-u', 'origin', 'HEAD']);
  const ref = run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  if (mediaChanged(files)) {
    run('gh', ['workflow', 'run', 'publish-blog.yml', '--ref', ref]);
    console.log('Started publish-blog.yml on ' + ref + '. Watch it with: gh run watch');
  } else {
    console.log('No new display, social, or publish-assets files; skipped publish-blog.yml.');
  }
  const existing = run('gh', ['pr', 'view', '--json', 'url,title', '--jq', '.url'], {allowFail: true});
  if (existing) {
    console.log('Pull request already open: ' + existing);
  } else {
    const body = [
      'Story publish' + (slug ? ` (${slug})` : '') + '.',
      '',
      'This pull request is blog-only. Wait until **gate** is green, then squash-merge.',
      'Do not use `--admin`. This helper never merges.',
    ].join('\n');
    const url = run('gh', ['pr', 'create', '--base', 'main', '--title', title, '--body', body]);
    console.log(url);
  }
  console.log('Wait for gate to turn green, then squash-merge. This script does not merge.');
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}
