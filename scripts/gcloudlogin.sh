#! /bin/bash

if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash; fi
# Add gcloud to $PATH
source $HOME/google-cloud-sdk/path.bash.inc
gcloud version
# Authentication flow
echo $GCLOUD_KEY | base64 --decode > gcloud.json
gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.json


