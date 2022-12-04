#!/bin/sh

echo "\n ===== $SECRET_PASSPHRASE ===== \n"

gpg --quiet --batch --yes --decrypt --passphrase=$SECRET_PASSPHRASE \
    --output $(pwd)/src/main/resources/key.txt $(pwd)/src/main/resources/key.txt.gpg
