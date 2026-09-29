#!/bin/sh
set -eu
config=/custom_files/valhalla.json
if [ ! -s "$config" ]; then
  valhalla_build_config > "$config"
fi
# Refuse silent softening of exclude_* options. Preserve other owner config.
jq '.service_limits.allow_hard_exclusions = true' "$config" > "$config.tmp"
mv "$config.tmp" "$config"
exec /valhalla/scripts/docker-entrypoint.sh "$@"
