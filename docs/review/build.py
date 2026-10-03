#!/usr/bin/env python3
"""Build the review page, docs/review/index.html, from the report, docs/studio-feedback.md.

docs/review/page.html is the page's template; its script renders the summary, quick wins, bigger changes and the issue
index from data that this script parses out of the report and puts into the template's __DATA__ placeholder. The
Markdown report stays the single source. Run it after every edit of the report or the template:
    python3 docs/review/build.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'docs' / 'studio-feedback.md'
TEMPLATE = ROOT / 'docs' / 'review' / 'page.html'
PAGE = ROOT / 'docs' / 'review' / 'index.html'

md = SRC.read_text(encoding='utf-8')


def section(title):
    """Text of the '## title' section, up to the next '## ' heading."""
    m = re.search(r'^## ' + re.escape(title) + r'\s*$(.*?)(?=^## |\Z)', md, re.S | re.M)
    return m.group(1).strip() if m else ''


def inline(s):
    """Markdown inline -> small safe HTML (bold, code, links), whitespace folded."""
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', s)
    return s


def rich(s):
    """Like inline(), but a run of indented '- ' sub-bullets becomes a list after the lead text."""
    parts = re.split(r'\n\s{2,}- ', '\n' + s.strip('\n'))
    lead, subs = parts[0].strip(), [x for x in parts[1:] if x.strip()]
    if not subs:
        return inline(s)
    return (inline(lead) + ' ' if lead else '') + '<ul>' + ''.join('<li>' + inline(x) + '</li>' for x in subs) + '</ul>'


def bullets(block):
    """Top-level '- **Label:** text' bullets (continuation lines folded in) -> {label: text}."""
    out, cur = {}, None
    for line in block.splitlines():
        m = re.match(r'^- \*\*(.+?):\*\*\s*(.*)$', line)
        if m:
            cur = m.group(1).strip()
            out[cur] = m.group(2)
        elif cur and (line.startswith('  ') or not line.strip()):
            out[cur] += '\n' + line
        else:
            cur = None
    return out


def table(block):
    rows = [l for l in block.splitlines() if l.startswith('|')]
    if len(rows) < 3:
        return []
    head = [c.strip() for c in rows[0].strip('|').split('|')]
    return [dict(zip(head, [c.strip() for c in r.strip('|').split('|')])) for r in rows[2:]]


# Summary paragraph(s) before the table, and the summary table itself
summary_block = section('Summary')
summary_text = summary_block.split('\n|', 1)[0].strip()
summary_rows = table(summary_block)

# Areas: '## Area' headings that hold '### XX-n · title (Severity)' items
items = []
area_intro = {}
for m in re.finditer(r'^## (?!Summary|Quick wins|Bigger changes|How this|Appendix)(.+?)\s*$(.*?)(?=^## |\Z)', md, re.S | re.M):
    area, body = m.group(1).strip(), m.group(2)
    intro = body.split('\n### ', 1)[0].strip()
    if intro:
        area_intro[area] = inline(intro)
    for im in re.finditer(r'^### ([A-Z]{2}-\d+) · (.+?) \((High|Medium|Low)\)\s*$(.*?)(?=^### |\Z)', body, re.S | re.M):
        iid, title, sev, rest = im.group(1), im.group(2), im.group(3), im.group(4)
        b = bullets(rest)
        evidence = re.findall(r'`([^`]+\.(?:png|webp|txt|json|js|html))`', b.get('Evidence', ''))
        items.append({
            'id': iid, 'area': area, 'severity': sev.lower(), 'title': inline(title),
            'where': rich(b.get('Where', '')), 'what': rich(b.get('What happens', '')),
            'why': rich(b.get('Why it matters', '')), 'evidence': evidence,
            'suggestion': rich(b.get('Suggestion', '')), 'effort': re.sub(r'[^SML].*', '', b.get('Effort', '').strip()) or '',
        })

# Quick wins table
qw_block = section('Quick wins')
quick = [{'fix': inline(r.get('Fix', '')), 'item': r.get('Item', ''), 'removes': inline(r.get('What it removes', ''))} for r in table(qw_block)]
quick_intro = inline(qw_block.split('\n|', 1)[0])

# Bigger changes: '### A · title' with Problem / Proposal (may have sub-bullets) / On screen / Covers / Effort
big_block = section('Bigger changes')
big_intro = inline(big_block.split('\n### ', 1)[0])
bigger = []
for bm in re.finditer(r'^### ([A-F]) · (.+?)\s*$(.*?)(?=^### |\Z)', big_block, re.S | re.M):
    letter, title, rest = bm.group(1), bm.group(2), bm.group(3)
    b = bullets(rest)
    prop = b.get('Proposal', '')
    subs = re.findall(r'^\s{2}- (.+?)(?=^\s{2}- |\Z)', prop, re.S | re.M)
    lead = prop.split('\n  - ', 1)[0]
    bigger.append({
        'letter': letter, 'title': inline(title), 'problem': inline(b.get('Problem', '')),
        'proposal': inline(lead), 'points': [inline(s) for s in subs], 'on_screen': inline(b.get('On screen', '')),
        'covers': inline(b.get('Covers', '')), 'effort': inline(b.get('Effort', '')),
    })

how = bullets(section('How this was gathered'))
counts = {}
for it in items:
    counts.setdefault(it['area'], {'high': 0, 'medium': 0, 'low': 0})[it['severity']] += 1

data = {
    'summary': inline(summary_text), 'counts': counts, 'areas': list(counts.keys()), 'area_intro': area_intro,
    'items': items, 'quick': quick, 'quick_intro': quick_intro, 'bigger': bigger, 'bigger_intro': big_intro,
    'how': {k: inline(v) for k, v in how.items()},
}
template = TEMPLATE.read_text(encoding='utf-8')
assert template.count('__DATA__') == 1, 'page.html must hold exactly one __DATA__ placeholder'
PAGE.write_text(template.replace('__DATA__', json.dumps(data, ensure_ascii=False).replace('</', '<\\/')), encoding='utf-8')
print(f"{len(items)} items, {len(quick)} quick wins, {len(bigger)} bigger changes, areas: {counts}")
ids = {i['id'] for i in items}
missing = [r['ID'] for r in summary_rows if r.get('ID') not in ids]
if missing:
    print('summary rows without a detailed item:', missing)
# The page pins screenshots to some issue ids; warn when the report no longer has one of them
pinned = re.findall(r"'([A-Z]{2}-\d+)':\s*\{", template)
gone = [i for i in pinned if i not in ids]
if gone:
    print('page.html pins screenshots to ids the report no longer has:', gone)
for img in sorted(set(re.findall(r"img/[a-z0-9-]+\.webp", template))):
    if not (ROOT / 'docs' / 'review' / img).exists():
        print('page.html refers to a missing image:', img)
