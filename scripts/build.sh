#!/usr/bin/env bash

lerna run build \
  --scope @zerocmf/lowcode-utils \
  --scope @zerocmf/lowcode-react-renderer \
  --scope @zerocmf/lowcode-renderer-core \
  --stream