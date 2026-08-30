# Divination / occult texts · I Ching · tarot · fortune software

Checked: 2026-08-29 PT. This collects **software and texts**. It does not claim that readings are accurate. Canonical texts, charting programs, and card-meaning APIs are facts. “Whether it is accurate” is not.

LLM fortune wrappers are many, and some have high stars. What you can clone is the **hexagram / draw / chart** layer, not a model talking over it.

---

## 1. Texts and scholarship (before fortune sites)

| Name | URL | Notes |
|---|---|---|
| Chinese Text Project · Book of Changes | [ctext.org/book-of-changes](https://ctext.org/book-of-changes/zh) | Canonical text, commentaries, Legge English. The source text when you write a program |

---

## 2. Open-source programs (charting / hexagrams / card meanings)

| Project | star | What it does |
|---|---:|---|
| [china-testing/bazi](https://github.com/china-testing/bazi) | 1,490 | Python Four Pillars charting |
| [kentang2017/ichingshifa](https://github.com/kentang2017/ichingshifa) | 283 | Yijing milfoil methods, Great Expansion, sixty-four hexagrams, Jing Fang |
| [chengjun/iching](https://github.com/chengjun/iching) | 128 | yarrow-stalk hexagrams in Python |
| [Brianfit/I-Ching](https://github.com/Brianfit/I-Ching) | 57 | yarrow-stalk method programmed |
| [zzkt/i-ching](https://github.com/zzkt/i-ching) | 65 | Book of Changes program |
| [ekelen/tarot-api](https://github.com/ekelen/tarot-api) | 403 | Rider-Waite-Smith meanings REST API |
| [uxiaohan/Tarot-Web](https://github.com/uxiaohan/Tarot-Web) | 111 | web tarot |

Plum Blossom numerology and Four Pillars also have a pile of “skills for an LLM” repos (for example meihua-yishu, bazi-skill). Treat them as prompt packs, not charting engines.

[dreamhunter2333/chatgpt-tarot-divination](https://github.com/dreamhunter2333/chatgpt-tarot-divination) (899 star) is an AI fortune bundle. The product shape is fine to look at. Homework is still local draws / charting.

---

## 3. Online / apps (ones with a public product page)

| Name | URL | Notes |
|---|---|---|
| Labyrinthos | [app.labyrinthos.co](https://app.labyrinthos.co/) · [iOS](https://apps.apple.com/us/app/id1155180220) · [Play](https://play.google.com/store/apps/details?id=com.labyrinthos.app) | tarot study + online draws. They have claimed 2.25 million users. That is a vendor number |
| Various commercial Four Pillars sites | do not list download sites | Check the domain and terms first. Many are ad pages |

Chinese “online fortune” sites are countless and usually bad. Prefer ones **with an algorithm write-up or open-source charting**. Skip another “type a birthday, get chicken soup” page.

---

## 4. Learnable slice (has nothing to do with accuracy)

- I Ching: encoding the sixty-four hexagrams, changing lines, Great Expansion / three coins; text data (ctext)
- Four Pillars: calendar, true solar time, stems and branches, ten gods (china-testing/bazi)
- Tarot: 78-card structure, spread coordinates, meaning JSON (tarot-api)
- Product: a journal, a spread editor, a reproducible seed (audited randomness, not a model inventing the draw)

Collection sources: X / Appinn will surface apps. To find “still unknown,” look at digitization projects for old texts, Japanese I Ching sites, and independent Western tarot authors. Do not only watch AI fortune wrappers.
