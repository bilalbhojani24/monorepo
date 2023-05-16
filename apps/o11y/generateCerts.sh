#!/bin/bash

ORANGE='\033[1;33m'
GREEN='\033[1;32m'
RED='\033[1;31m'
NC='\033[0m' # No Color

gather_certs() {
  # Install mkcert tool - macOS; you can see the mkcert repo for details
  brew install mkcert

  # Install nss (only needed if you use Firefox)
  brew install nss

  # Setup mkcert on your machine (creates a CA)
  mkcert -install

  # Clear if any exiting certs
  rm -rf certs/*

  # gerneate key and cert file
  mkcert -key-file ./certs/key.pem -cert-file ./certs/cert.pem '*.bsstag.com'
}

gather_certs