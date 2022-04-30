#!/bin/bash

function main() {
 [ ! -z "${RABBIT_URL}" ] && \
 [ ! -z "${RABBIT_USER}" ] && \
 [ ! -z "${RABBIT_PWD}" ] && \
 [ ! -z "${SLACK_URL}" ] && \
 [ ! -z "${SLACK_CHANNEL}" ] && {
    yarn --silent start  \
    --url           "${RABBIT_URL}" \
    --user          "${RABBIT_USER}" \
    --pass          "${RABBIT_PWD}" \
    --slack_url     "${SLACK_URL}" \
    --slack_channel "${SLACK_CHANNEL}"
  } || {
      yarn --silent start ${@};
  }
}

main ${@};
