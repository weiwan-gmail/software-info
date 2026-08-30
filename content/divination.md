# 术数 · 易经 · 塔罗 · 算命

核对：2026-08-29 PT。这里收的是**软件和文本**，不是在证明算命灵。经典文本、排盘程序、抽牌 API 算事实；「准不准」不算。

LLM 套壳占卜很多，星也可能高。能复刻的是**起卦 / 抽牌 / 排盘**那一层，不是模型嘴替。

---

## 1. 文本和学术（先于算命站）

| 名字 | 地址 | 说明 |
|---|---|---|
| 中国哲学书电子化计划 · 周易 | [ctext.org/book-of-changes](https://ctext.org/book-of-changes/zh) | 经文、注疏、理雅各英译。做程序时的底本 |

---

## 2. 开源程序（排盘 / 起卦 / 牌义）

| 项目 | star | 做什么 |
|---|---:|---|
| [china-testing/bazi](https://github.com/china-testing/bazi) | 1,490 | Python 八字排盘 |
| [kentang2017/ichingshifa](https://github.com/kentang2017/ichingshifa) | 283 | 周易筮法、大衍、六十四卦、京房 |
| [chengjun/iching](https://github.com/chengjun/iching) | 128 | 蓍草卦 Python |
| [Brianfit/I-Ching](https://github.com/Brianfit/I-Ching) | 57 | 蓍草法程序化 |
| [zzkt/i-ching](https://github.com/zzkt/i-ching) | 65 | Book of Changes 程序 |
| [ekelen/tarot-api](https://github.com/ekelen/tarot-api) | 403 | Rider-Waite-Smith 牌义 REST API |
| [uxiaohan/Tarot-Web](https://github.com/uxiaohan/Tarot-Web) | 111 | 网页塔罗 |

梅花易数、八字另有一批「给 LLM 用的 skill」仓库（例如 meihua-yishu、bazi-skill）。当提示词包看，不当排盘引擎。

[dreamhunter2333/chatgpt-tarot-divination](https://github.com/dreamhunter2333/chatgpt-tarot-divination)（899 star）是 AI 算命合集。产品形态可以看，作业仍是本地抽牌/排盘。

---

## 3. 在线 / App（有公开产品页的）

| 名字 | 地址 | 备注 |
|---|---|---|
| Labyrinthos | [app.labyrinthos.co](https://app.labyrinthos.co/) · [iOS](https://apps.apple.com/us/app/id1155180220) · [Play](https://play.google.com/store/apps/details?id=com.labyrinthos.app) | 塔罗学习 + 在线抽牌。自己写过 225 万用户，那是商家数字 |
| 各类商业八字站 | 不列下载站 | 先核域名和条款。很多是广告页 |

中文「在线算命」站极多、质量差。优先收：**有算法说明或开源排盘**的，而不是又一个输入生日出鸡汤的页。

---

## 4. 可学的一块（和灵不灵无关）

- 易经：六十四卦编码、变爻、大衍 / 三钱；经文数据（ctext）
- 八字：历法、真太阳时、干支、十神（china-testing/bazi）
- 塔罗：78 张结构、牌阵坐标、牌义 JSON（tarot-api）
- 产品：日记、牌阵编辑、种子可复现（审计过的随机，而不是模型编造抽牌结果）

收集来源：X / 小众软件会刷到 App；要挖「还不知道的」看古籍数字化项目、日本易学站、欧美独立塔罗作者站，不要只盯 AI 算命。
