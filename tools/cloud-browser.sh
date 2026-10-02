#!/usr/bin/env bash
# Starts a headless Chromium that keeps its sign-in between runs, so capture.js and sign-in.js can drive it with
# --cdp http://127.0.0.1:9222 from a cloud container (where there is no desktop browser to sign in with).
#
#   tools/cloud-browser.sh            # leave it running (in the background), then:
#   node tools/sign-in.js email you@example.org
#   node tools/sign-in.js code 123456
#   node tools/capture.js shot <name> --cdp http://127.0.0.1:9222 --url https://coplanai.ikonai.app/ ...
#
# The profile (cookies, local storage) lives in tools/.auth/profile, which git ignores. It signs you in: keep it
# private and delete it when the captures are done.
#
# Behind a TLS-inspecting proxy, Chromium reads trust from the NSS store (~/.pki/nssdb), not from the CA bundle
# that curl and Node use. Add the proxy's CA there once with certutil (package libnss3-tools):
#   certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n proxy-ca -i <proxy-ca.pem>
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
PROFILE="${PROFILE:-$HERE/.auth/profile}"
PORT="${PORT:-9222}"
CHROME="${CHROME:-/opt/pw-browsers/chromium}"

mkdir -p "$PROFILE"
args=(
  --headless=new
  --remote-debugging-port="$PORT"
  --user-data-dir="$PROFILE"
  --no-first-run
  --no-default-browser-check
  --window-size=1900,950
  --lang=en-GB
)
[ "$(id -u)" = "0" ] && args+=(--no-sandbox)               # Chromium refuses to run as root with the sandbox on
[ -n "${HTTPS_PROXY:-}" ] && args+=(--proxy-server="$HTTPS_PROXY")

exec "$CHROME" "${args[@]}" about:blank
