#!/usr/bin/env python3
"""Assemble the guides section of coplanai.com, ready to deploy at /tutorials/.

    python3 tools/build-site.py                              # platform guide from ../coplan-tutorials
    python3 tools/build-site.py --platform /path/to/coplan-tutorials --out dist

Writes (into --out, default dist/, which git ignores):

    tutorials/index.html     the page that lists the guides (tutorial/index.html here); public
    tutorials/img/           its two card pictures, one from each guide; public
    tutorials/assets/        the shared engine (tutorial/assets/ here); public, the list page needs it
    tutorials/general/       the platform guide, from the private damianocerrone/coplan-tutorials repository,
                             re-pointed at ../assets/ and at its new address; behind its own password
    tutorials/studio/        the Studio guide (tutorial/studio/ here), without the capture tools' .json files;
                             behind its own password
    tutorial/index.html      forwards the platform guide's old address to /tutorials/general/, keeping the #step

The platform guide is for invited readers, so it is only ever copied into the build, never into this repository.
The script stops if the two guides' engines differ, if a rewrite of the platform guide's page misses, or if a page
links to a local file that is not in the build.
"""
import argparse
import filecmp
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://coplanai.com'

ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
ap.add_argument('--platform', default=str(ROOT.parent / 'coplan-tutorials'), help='checkout of damianocerrone/coplan-tutorials')
ap.add_argument('--out', default=str(ROOT / 'dist'), help='output folder (emptied first)')
args = ap.parse_args()

src_studio = ROOT / 'tutorial'
src_general = Path(args.platform) / 'tutorial'
out = Path(args.out)
tut = out / 'tutorials'


def fail(msg):
    sys.exit('build-site: ' + msg)


if not (src_general / 'index.html').exists():
    fail(f'no platform guide at {src_general} (pass --platform with a checkout of damianocerrone/coplan-tutorials)')


def same_tree(a, b):
    """True when two folders hold the same files with the same contents."""
    cmp = filecmp.dircmp(a, b)
    if cmp.left_only or cmp.right_only or cmp.funny_files:
        return False
    if filecmp.cmpfiles(a, b, cmp.common_files, shallow=False)[1:] != ([], []):
        return False
    return all(same_tree(Path(a) / d, Path(b) / d) for d in cmp.common_dirs)


if not same_tree(src_studio / 'assets', src_general / 'assets'):
    fail('tutorial/assets/ here and in coplan-tutorials differ; both guides load the same /tutorials/assets/, '
         'so bring them in line first')

if out.exists():
    shutil.rmtree(out)
tut.mkdir(parents=True)

# The shared engine and the page that lists the guides
shutil.copytree(src_studio / 'assets', tut / 'assets')
shutil.copy2(src_studio / 'index.html', tut / 'index.html')

# The list page is public while each guide has its own password, so its card pictures sit in a public folder
(tut / 'img').mkdir()
shutil.copy2(src_general / 'img' / '6-01-gallery.webp', tut / 'img' / 'platform-guide.webp')
shutil.copy2(src_studio / 'studio' / 'img' / '5-01-focus-view.webp', tut / 'img' / 'studio-guide.webp')

# The Studio guide, without the measured-box .json files that only the capture tools read
shutil.copytree(src_studio / 'studio', tut / 'studio', ignore=shutil.ignore_patterns('*.json', '*.debug.png'))

# The platform guide, re-pointed at the shared engine and its new address
shutil.copytree(src_general, tut / 'general', ignore=shutil.ignore_patterns('assets', '*.json', '*.debug.png'))
page = tut / 'general' / 'index.html'
html = page.read_text(encoding='utf-8')
rewrites = [
    (f'{SITE}/tutorial/assets/og-image.jpg', f'{SITE}/tutorials/assets/og-image.jpg'),
    (f'href="{SITE}/tutorial/"', f'href="{SITE}/tutorials/general/"'),
    (f'content="{SITE}/tutorial/"', f'content="{SITE}/tutorials/general/"'),
    ('href="assets/', 'href="../assets/'),
    ('src="assets/', 'src="../assets/'),
    # the footer's CoPlanAI column: add the list of guides and the Studio guide
    ('<span class="sr"> (opens in a new tab)</span></a></li>\n          <li><a href="https://coplanai.com/">coplanai.com</a></li>',
     '<span class="sr"> (opens in a new tab)</span></a></li>\n          <li><a href="../">All guides</a></li>\n'
     '          <li><a href="../studio/">Studio guide</a></li>\n          <li><a href="https://coplanai.com/">coplanai.com</a></li>'),
]
for old, new in rewrites:
    if old not in html:
        fail(f'platform guide page: expected to find {old!r}; has its markup changed?')
    html = html.replace(old, new)
if f'{SITE}/tutorial/' in html:
    fail('platform guide page still points at the old /tutorial/ address')
page.write_text(html, encoding='utf-8')

# The old address forwards to the new one; the script keeps any #step anchor
(out / 'tutorial').mkdir()
(out / 'tutorial' / 'index.html').write_text(
    '<!doctype html><html lang="en"><head><meta charset="utf-8">\n'
    '<title>Platform guide · CoPlanAI</title>\n'
    '<meta name="robots" content="noindex">\n'
    f'<link rel="canonical" href="{SITE}/tutorials/general/">\n'
    '<script>location.replace(\'/tutorials/general/\' + location.hash)</script>\n'
    '<meta http-equiv="refresh" content="0; url=/tutorials/general/">\n'
    '</head><body><p>The platform guide has moved to <a href="/tutorials/general/">coplanai.com/tutorials/general</a>.</p>'
    '</body></html>\n', encoding='utf-8')

# Every local link and script in the built pages must resolve inside the build
missing = []
for f in out.rglob('*.html'):
    text = f.read_text(encoding='utf-8')
    for ref in re.findall(r'(?:href|src)="([^"]+)"', text):
        if re.match(r'^(?:[a-z]+:|//|#|data:)', ref):
            continue
        path = ref.split('#')[0].split('?')[0]
        target = (out / path.lstrip('/')) if path.startswith('/') else (f.parent / path)
        if target.is_dir() or path.endswith('/'):
            target = target / 'index.html'
        if not target.exists():
            missing.append(f'{f.relative_to(out)} -> {ref}')
if missing:
    fail('links to files that are not in the build:\n  ' + '\n  '.join(missing))

files = [p for p in out.rglob('*') if p.is_file()]
size = sum(p.stat().st_size for p in files)
print(f'built {len(files)} files ({size / 1e6:.1f} MB) in {out}')
for d in ['tutorials', 'tutorials/assets', 'tutorials/img', 'tutorials/general', 'tutorials/studio', 'tutorial']:
    n = sum(1 for p in (out / d).rglob('*') if p.is_file())
    print(f'  /{d}/  {n} files')
