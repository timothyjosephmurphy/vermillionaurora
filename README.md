# Neural Dance

Proprietary software of TJ Murphy / Vermillion Aurora Productions. See [neural-dance/LICENSE](neural-dance/LICENSE).

This repository is the source for the Cloudflare Worker `vermillion-neural-dance`. Upload steps, bindings, and routes are in [UPLOAD.md](UPLOAD.md).

`npm run build` writes static pages and assets to `dist/assets`. The beat clock and `NeuralDanceRings.bloomStroke` are included. Person-in-frame detection, debug tap markers, and silhouette dancing are not in this commit; those module branches had not landed.
