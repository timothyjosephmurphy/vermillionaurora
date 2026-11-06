#!/bin/sh
# Copyright (c) 2026 TJ Murphy / Vermillion Aurora Productions
# All rights reserved. No use, copying, modification, or distribution
# without a written license. Contact tj@tjm.art.
# License: neural-dance/LICENSE

# Rebuild neural-dance/neural-dance.wasm from the C++ mural runtime.
# Requires clang with the wasm32 target and lld (wasm-ld). The site ships the
# committed wasm so a normal page build does not need this toolchain.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
out=${1:-"$root/neural-dance/neural-dance.wasm"}
clang++ --target=wasm32-unknown-unknown -std=c++17 -O2 -nostdlib -ffreestanding \
  -fno-exceptions -fno-rtti -fno-threadsafe-statics \
  -Wall -Wextra -Wno-unused-function \
  -Wl,--no-entry \
  -Wl,--export-all \
  -Wl,--no-gc-sections \
  -Wl,--export-memory \
  -Wl,-z,stack-size=16384 \
  -Wl,--initial-memory=131072 \
  -o "$out" \
  "$root/neural-dance/src/neural_dance.cpp"
