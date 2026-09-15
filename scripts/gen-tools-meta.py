"""Genera tools-meta.json con versión y fecha de último commit por repo.

Se ejecuta localmente (desarrollo) o como paso del GitHub Action en cada deploy.
Lee los repos clonados en ../repos/ (o arrastra los paths desde args).
"""
import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


def run(cmd: str) -> str:
    return subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL).strip()


def version_from_package(repo_dir: Path) -> str | None:
    pkg = repo_dir / "package.json"
    if pkg.exists():
        data = json.loads(pkg.read_text(encoding="utf-8"))
        v = data.get("version")
        if v:
            return str(v)
    return None


def version_from_tag(repo_dir: Path) -> str | None:
    try:
        tag = run(f"cd {repo_dir} && git describe --tags --abbrev=0 2>/dev/null")
        return tag.lstrip("v") if tag else None
    except Exception:
        return None


def last_commit_ts(repo_dir: Path) -> int | None:
    try:
        iso = run(f"cd {repo_dir} && git log -1 --format='%cI' 2>/dev/null")
        if iso:
            dt = datetime.fromisoformat(iso)
            return int(dt.replace(tzinfo=timezone.utc).timestamp())
    except Exception:
        pass
    return None


def label_from_ts(ts: int | None) -> str | None:
    if ts is None:
        return None
    dt = datetime.fromtimestamp(ts, tz=timezone.utc)
    return f"{dt.day} {dt.strftime('%b')} {dt.year}"


def build_meta(repos: dict[str, str], out_path: Path) -> dict:
    meta = {}
    for slug, repo_name in repos.items():
        repo_dir = Path(__file__).resolve().parent.parent / "repos" / repo_name
        version = version_from_package(repo_dir) or version_from_tag(repo_dir)
        ts = last_commit_ts(repo_dir)
        meta[slug] = {
            "slug": slug,
            "repoName": repo_name,
            "version": version,
            "lastUpdated": ts,
            "updatedLabel": label_from_ts(ts),
            "changelogUrl": f"https://github.com/sebasaurio/{repo_name}/blob/main/CHANGELOG.md",
            "readmeUrl": f"https://github.com/sebasaurio/{repo_name}/blob/main/README.md",
        }
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(f"Wrote {out_path} ({len(meta)} tools)")
    return meta


REPOS = {
    "sqx-results-plugins": "SQXPlugins",
    "block-settings": "BlockSettings",
    "metatrader-analysis": "MetatraderAnalysis",
    "sqx-organizer": "VirtualSQX",
    "sqxtools": "SQXTools",
    "trade-to-telegram": "TradeToTelegram",
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "public" / "tools-meta.json",
    )
    parser.add_argument("--repos", type=Path, default=None, help="override repos root dir")
    args = parser.parse_args()

    if args.repos:
        base = args.repos
        mapping = {slug: base / name for slug, name in REPOS.items()}
    else:
        mapping = REPOS  # usar nombres relativos a ../repos/

    if args.repos:
        meta = build_meta(mapping, args.out)
    else:
        global REPOS
        meta = build_meta(REPOS, args.out)


if __name__ == "__main__":
    main()
