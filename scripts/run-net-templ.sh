#!/bin/bash -xe
jq '.[][]' networks/gsn-networks.json | jq -s . > ./tmp.json
mustache ./tmp.json `dirname $0`/net.tmpl > ./tmp.sh
(cd networks; source ../tmp.sh)

if [ -n "`git diff networks`" ]; then
echo Networks modified
exit 1
else
echo Networks unchanged
fi

