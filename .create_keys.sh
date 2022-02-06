#!/usr/bin/env bash
# author: Caleb Lemone
key_name="azordev-RS256"
ssh-keygen -t rsa -b 2048 -f "${key_name}.key" -m PEM
openssl rsa -in "${key_name}.key" -modulus -inform pem -pubout -outform PEM -out "${key_name}.key.pub"
