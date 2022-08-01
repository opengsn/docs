#!/bin/bash -xe
jq '.[][]' networks/gsn-networks.json > /tmp/tmp1
cat /tmp/tmp1 | jq -s > /tmp/tmp.json
mustache /tmp/tmp.json `dirname $0`/net.tmpl > /tmp/tmp.sh
(cd networks; source /tmp/tmp.sh)

if [ -n "`git diff networks`" ]; then
echo Networks modified
exit 1
else
echo Networks unchanged
fi

