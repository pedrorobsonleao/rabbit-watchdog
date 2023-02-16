#!/bin/bash

function main() {
 [ ! -z "${RABBIT_URL}" ] && \
 [ ! -z "${RABBIT_USER}" ] && \
 [ ! -z "${RABBIT_PWD}" ] && \
 [ ! -z "${SLACK_URL}" ] && \
 [ ! -z "${SLACK_CHANNEL}" ] && {
    yarn --silent start  \
    --rabbit.url      "${RABBIT_URL}" \
    --rabbit.username "${RABBIT_USER}" \
    --rabbit.password "${RABBIT_PWD}" \
    --slack.url       "${SLACK_URL}" \
    --slack.channel   "${SLACK_CHANNEL}"
  } || {
      yarn --silent start ${@};
  }
}

main ${@};
