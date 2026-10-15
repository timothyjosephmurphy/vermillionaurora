#!/usr/bin/env bash
# Roll production back to the previous Worker version(s). Usage: scripts/rollback.sh [checkout|both|site]
set -euo pipefail
gh workflow run rollback.yml -R timothyjosephmurphy/vermillionaurora -f target="${1:-checkout}"
echo "Rollback started: gh run list -R timothyjosephmurphy/vermillionaurora --workflow rollback.yml -L 1"
