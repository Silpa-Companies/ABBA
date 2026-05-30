#!/usr/bin/env python3
"""Fetch the client + clinicians payloads and save them as one JSON file.

Usage:
    python3 fetch_profiles.py --client-url <url> --clinicians-url <url> [--out PATH]

Writes a single JSON object to --out (default /tmp/profiles.json):
    {"client": <client_obj>, "clinicians": <clinicians_payload>}

Prints the absolute path of the written file to stdout.
"""
import argparse
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

DEFAULT_OUT = "/tmp/profiles.json"


def fetch_json(url: str) -> Any:
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
    p.add_argument("--client-url", required=True)
    p.add_argument("--clinicians-url", required=True)
    p.add_argument("--out", default=DEFAULT_OUT)
    args = p.parse_args()

    payload = {
        "client": fetch_json(args.client_url),
        "clinicians": fetch_json(args.clinicians_url),
    }
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2))
    print(str(out.resolve()))
    return 0


if __name__ == "__main__":
    sys.exit(main())