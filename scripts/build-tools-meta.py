"""Generador de tools-meta.json para Vercel build.

Lee los repos locales y extrae versión + última fecha de commit.

Al ejecutarse en GitHub Actions, los repos se clonan en ./repos/ (relativo al
checkout de ToolsManager). Para desarrollo local, se puede pasar --repos-dir
con un path absoluto diferente.

Versión:
  - package.json → "version" (si existe)  [para JS projects]
  - git tag → describe --tags --abbrev=0  [para repos sin package.json]

Última fecha: git log -1 --format='%cI' → timestamp UTC + label legible.

Output: public/tools-meta.json
"""
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
DEFAULT_REPOS_DIR = HERE.parent / "repos"

OUT = HERE.parent / "public" / "tools-meta.json"

# slug → nombre de carpeta del repo
SLUGS = {
    "sqx-results-plugins": "SQXPlugins",
    "block-settings": "BlockSettings",
    "metatrader-analysis": "MetatraderAnalysis",
    "sqx-organizer": "VirtualSQX",
    "sqxtools": "SQXTools",
    "trade-to-telegram": "TradeToTelegram",
}


def sh(cmd: str) -> str:
    try:
        return subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL).strip()
    except Exception:
        return ""


def version_from_repo(repo_dir: Path) -> str | None:
    # 1) package.json
    pkg = repo_dir / "package.json"
    if pkg.exists():
        try:
            data = json.loads(pkg.read_text(encoding="utf-8"))
            v = data.get("version")
            if v:
                return str(v)
        except Exception:
            pass
    # 2) git tag
    tag = sh(f"cd {repo_dir} && git describe --tags --abbrev=0 2>/dev/null")
    if tag:
        return tag.lstrip("v")
    return None


def last_commit(repo_dir: Path) -> dict:
    try:
        iso = sh(f"cd {repo_dir} && git log -1 --format='%cI' 2>/dev/null")
        if iso:
            dt = datetime.fromisoformat(iso)
            ts = int(dt.replace(tzinfo=timezone.utc).timestamp())
            label = f"{dt.day} {dt.strftime('%b')} {dt.year}"
            return {"ts": ts, "label": label}
    except Exception:
        pass
    return {"ts": None, "label": None}


def build(repos_dir: Path) -> dict:
    meta = {}
    for slug, repo_name in SLUGS.items():
        repo_dir = repos_dir / repo_name
        if not repo_dir.is_dir():
            print(f"[WARN] repositorio no encontrado: {repo_dir}", file=sys.stderr)
            continue
        version = version_from_repo(repo_dir)
        updated = last_commit(repo_dir)
        meta[slug] = {
            "slug": slug,
            "version": version,
            "lastUpdated": updated["ts"],
            "updatedLabel": updated["label"],
            "changelogUrl": f"https://github.com/sebasaurio/{repo_name}/blob/main/CHANGELOG.md",
            "readmeUrl": f"https://github.com/sebasaurio/{repo_name}/blob/main/README.md",
            "repoName": repo_name,
        }
    return meta


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--repos-dir",
        type=Path,
        default=DEFAULT_REPOS_DIR,
        help="directorio donde están los clones de los repos (default: repos/ relativo al script)",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=OUT,
        help="ruta del output (default: public/tools-meta.json)",
    )
    args = parser.parse_args()

    meta = build(args.repos_dir)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    print(f"Wrote {args.out} — {len(meta)} tools")
    for slug, entry in meta.items():
        ver = entry["version"] or "?"
        label = entry["updatedLabel"] or "?"
        print(f"  {slug}: v{ver} · {label}")


if __name__ == "__main__":
    main()
