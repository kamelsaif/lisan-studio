#!/bin/zsh
set -eu
studio_base=$(cd -- "$(dirname -- "$0")" && pwd)
studio_dir="$studio_base"
studio_url="http://127.0.0.1:4317"
if /usr/bin/curl --silent --fail "$studio_url/api/config" | /usr/bin/grep -q '"app":"lisan-studio"'; then
  /usr/bin/open "$studio_url"
  exit 0
fi
if command -v node >/dev/null 2>&1; then
  studio_node=$(command -v node)
elif [[ -x /usr/local/bin/node ]]; then
  studio_node=/usr/local/bin/node
else
  print 'Lisan Studio needs Node.js 22 or newer. Install it from nodejs.org and reopen this launcher.'
  read -r '?Press Return to close.'
  exit 1
fi
export PATH="$(dirname -- "$studio_node"):$PATH"
if (( $("$studio_node" -p 'process.versions.node.split(".")[0]') < 22 )); then
  print 'Install Node.js 22 or newer from nodejs.org and reopen this launcher.'
  read -r '?Press Return to close.'
  exit 1
fi
cd "$studio_dir"
if [[ ! -d node_modules ]]; then
  print 'Preparing Lisan Studio for its first launch…'
  npm ci --include=dev --no-fund --no-audit
fi
npm run build
mkdir -p data
chmod 700 data
nohup "$studio_node" server/launch.mjs > data/server.log 2>&1 &
studio_pid=$!
print -r -- "$studio_pid" > data/server.pid
for studio_attempt in {1..90}; do
  if /usr/bin/curl --silent --fail "$studio_url/api/config" | /usr/bin/grep -q '"app":"lisan-studio"'; then
    /usr/bin/open "$studio_url"
    print 'Lisan Studio is open. You can close this Terminal window.'
    exit 0
  fi
  if ! kill -0 "$studio_pid" 2>/dev/null; then
    print 'Lisan Studio could not start. See data/server.log for details.'
    read -r '?Press Return to close.'
    exit 1
  fi
  sleep 1
done
print 'Lisan Studio is still starting. Open http://127.0.0.1:4317 in your browser in a moment.'
