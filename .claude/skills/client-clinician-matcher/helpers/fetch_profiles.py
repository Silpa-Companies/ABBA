#!/usr/bin/env python3
"""Fetch a client profile and the full clinician list from the local API.

Usage:
    python3 fetch_profiles.py <client_uuid> [--base-url URL] [--out DIR]

Writes client.json and clinicians.json into the output directory (default: cwd)
and prints both payloads so the model can inspect actual field names.
"""
import argparse
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_BASE = "http://localhost:3000"


def fetch_json(url: str) -> object:
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        raise SystemExit(f"HTTP {e.code} fetching {url}: {e.reason}")
    except urllib.error.URLError as e:
        raise SystemExit(f"Network error fetching {url}: {e.reason}")
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise SystemExit(f"Invalid JSON from {url}: {e}\nFirst 400 chars: {raw[:400]}")


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("client_uuid")
    p.add_argument("--base-url", default=DEFAULT_BASE)
    p.add_argument("--out", default=".", help="directory to write client.json and clinicians.json")
    args = p.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    client_url = f"{args.base_url.rstrip('/')}/api/clients/{args.client_uuid}/"
    clinicians_url = f"{args.base_url.rstrip('/')}/api/clinicians/"

    print(f"Fetching client: {client_url}", file=sys.stderr)
    client = fetch_json(client_url)
    print(f"Fetching clinicians: {clinicians_url}", file=sys.stderr)
    clinicians = fetch_json(clinicians_url)

    (out / "client.json").write_text(json.dumps(client, indent=2))
    (out / "clinicians.json").write_text(json.dumps(clinicians, indent=2))

    print(json.dumps({"client": client, "clinicians": clinicians}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
