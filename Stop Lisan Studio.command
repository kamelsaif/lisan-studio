#!/bin/zsh
set -eu
studio_base=$(cd -- "$(dirname -- "$0")" && pwd)
studio_dir="$studio_base"
studio_status=$(/usr/bin/curl --silent --fail http://127.0.0.1:4317/api/config || true)
if [[ "$studio_status" != *'"app":"lisan-studio"'* ]]; then
  print 'Lisan Studio is already stopped.'
  exit 0
fi
if [[ "$studio_status" != *'"activeJobs":0'* ]]; then
  print 'A video is still processing. Wait for it to finish before stopping Lisan Studio.'
  read -r '?Press Return to close.'
  exit 1
fi
if [[ -f "$studio_dir/data/server.pid" ]]; then
  studio_pid=$(cat "$studio_dir/data/server.pid")
  if [[ "$studio_pid" == <-> ]] && /bin/ps -p "$studio_pid" -o command= | /usr/bin/grep -Fq 'server/launch.mjs'; then
    kill -TERM "$studio_pid"
    print 'Lisan Studio stopped. Your saved videos are still on this Mac.'
    exit 0
  fi
fi
print 'The app was launched outside its Mac launcher. Close its original server session to stop it.'
read -r '?Press Return to close.'
