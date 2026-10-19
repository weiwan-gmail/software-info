# 9. Network & self-hosting

Checked: 2026-10-02 PT (overlay comparison + mitmproxy addendum). Numa DNS addendum 2026-10-17 PT. Harvest 2026-10-19: hardware KVM, VMs/containers, SMS/webhook. Older entries’ stars may still be the 2026-08-29 snapshot. Company-toy detail is in [awesome-and-orgs.md](../../awesome-and-orgs.md) section 4. Do not invent prices.

Also see the phone-side utility taxonomy: [mobile-utility-tools.md](../../mobile-utility-tools.md) (remote desktop, Wi‑Fi, FTP, VPN, HTTP, iperf, GPS, and adjacent). Stack notes for settings/binding: [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md).

## 9.1 Overlay networks / tunnels

**Open source**

| Repo / site | star (approx.) | One-liner |
|---|---:|---|
| [WireGuard](https://www.wireguard.com/) · [wireguard-tools](https://github.com/WireGuard/wireguard-tools) | 722 (tools mirror) | VPN **protocol**/tunnel; no built-in discovery or hole punching; standard interop |
| [tailscale/tailscale](https://github.com/tailscale/tailscale) | 37,100 | Global L3 mesh on WireGuard; Magicsock + DERP |
| [juanfont/headscale](https://github.com/juanfont/headscale) | 44,299 | Tailscale **self-hosted control plane** |
| [zerotier/ZeroTierOne](https://github.com/zerotier/ZeroTierOne) | 17,151 | Global virtual network (leans L2); roots relay |
| [yhan-sun/p2wlan](https://github.com/yhan-sun/p2wlan) | 1,589 | Self-hostable VirtualLAN; UDP hole punching + Relay; **not** official WG interop; Preview |
| [tailscale/tailcat](https://github.com/tailscale/tailcat) | 3,572 | |
| [tailscale/golink](https://github.com/tailscale/golink) | 1,931 | |
| [tailscale/ts-plug](https://github.com/tailscale/ts-plug) | 56 | |
| [cloudflare/cloudflared](https://github.com/cloudflare/cloudflared) | 15,428 | |
| [caddyserver/caddy](https://github.com/caddyserver/caddy) | 75,328 | |
| [fosrl/pangolin](https://github.com/fosrl/pangolin) · [pangolin.net](https://pangolin.net/) | — | Self-hosted identity-aware reverse proxy + userspace WireGuard (Newt). Community Edition AGPL-3.0. Harvest 2026-09-14 |
| [MoonProxyHQ/moonproxy-desktop](https://github.com/MoonProxyHQ/moonproxy-desktop) · [moonproxy.app](https://moonproxy.app/) | — | Tauri v2 + frpc sidecar. MIT. Harvest 2026-09-28 |

### How to pick among the four overlays (2026-10-02)

| | WireGuard | Tailscale | ZeroTier | P2WLAN |
|--|-----------|-----------|-----------|--------|
| Nature | Protocol/tunnel | Mesh product on WG | L2 virtual Ethernet | L3 VirtualLAN + rooms |
| Discovery / signaling | None (manual config) | Coordination server / Headscale | Root / Planet | Self-hosted Control |
| NAT hole punching | **Does not** | STUN-class + **DERP** (highest maturity) | Own traversal + roots | UDP hole punching + Relay; no public success rate |
| When direct fails | You must arrange it yourself | Almost always connects (may be slow) | Generally connects | Relies on self-hosted Relay |
| Crypto interop | Standard WG | Standard WG data plane | Own protocol | WireGuard-like Noise; **does not** claim WG compatibility |

**Hole-punching rough rank (qualitative; no public cross-comparison percentages):** Tailscale ≫ ZeroTier ≈ P2WLAN (same class of Direct+relay, weaker maturity) ≫ WireGuard (no hole punching at the protocol layer).

**Free closed-source tiers (client / personal)**

| Name | Site | Form |
|---|---|---|
| Tailscale personal tier | [tailscale.com](https://tailscale.com/) | personal free closed-source control plane + open-source client |
| Cloudflare Tunnel free tier | [cloudflare.com](https://www.cloudflare.com/) | free quota; cloudflared is open source |
| ZeroTier free tier | [zerotier.com](https://www.zerotier.com/) | free device count + paid |
| ngrok free tier | [ngrok.com](https://ngrok.com/) | free tunnels + paid |

**Paid:** team / enterprise tiers from the four above. Caddy itself is open source. The commercial side is hosting and consulting, not a license you must buy to use it. P2WLAN self-hosted Control/Relay is self-ops cost; do not invent a price.

## 9.2 Remote desktop

**Open source:** RustDesk (you also have weiwan-gmail/rustdesk; use that repo’s stars) · [GlassHaven/Haven](https://github.com/GlassHaven/Haven) (AGPL-3.0; Android SSH/VNC/RDP/SPICE thin client; harvest 2026-10-12)

**Free closed-source / paid:** TeamViewer personal free + commercial license · AnyDesk the same · Chrome Remote Desktop free closed-source.

**Free closed-source (OKA Apps mirroring, macOS):** [Oka Mirror for Samsung TV](https://okaapps.com/product/1499584783) · [Chromecast](https://okaapps.com/product/1512564265) · [Roku](https://okaapps.com/product/1519399703) · [any device (browser)](https://okaapps.com/product/1523794932). Site calls them free; IAP not verified. No Android/Windows. Harvest 2026-10-11 in [tools-by-platform.md](../../tools-by-platform.md) §8.1.

**Hardware remote KVM (harvest 2026-10-19)**

**Open source (daemon):** [gl-inet/glkvm](https://github.com/gl-inet/glkvm) 239 star (as of 2026-10-19), GPL-3.0 (PiKVM-derived KVMD).

**Paid (hardware buyout; vendor says no subscription — no dollar amount recorded):** GL.iNet Comet KVM series — [Comet (GL-RM1)](https://www.gl-inet.com/en-us/products/gl-rm1) · [Comet PoE (GL-RM1PE)](https://www.gl-inet.com/en-us/products/gl-rm1pe) · [Comet Pro (GL-RM10)](https://www.gl-inet.com/en-us/products/gl-rm10). HDMI capture + USB keyboard/mouse; browser / app control, including BIOS. Vendor claims 4K@30, H.264, LAN latency 30–60 ms; Tailscale and a self-hosted relay. RM1 is wired; RM1PE adds PoE and 32 GB eMMC; **Comet Pro is GL-RM10** (Wi‑Fi 6 + touchscreen), not RM1PE. “Comet KVM” means this series. Hardware is closed-source.

## 9.3 Self-hosting

List: awesome-selfhosted 316,022, queue not mined yet. Open-source self-hosting already seen: Immich 112,940 · Stirling-PDF 90,918 · Syncthing 88,114 · [docling-project/docling](https://github.com/docling-project/docling) (MIT; document understanding → Markdown/JSON) · [C4illin/ConvertX](https://github.com/C4illin/ConvertX) (AGPL-3.0; self-hosted multi-format conversion gateway). Harvest 2026-09-14.

**Open source + optional subscription:** [home-assistant/core](https://github.com/home-assistant/core) 90,178. Cloud and subscriptions go through [Nabu Casa](https://www.nabucasa.com/). That is paid. The core stays open source.

See also for overlay self-hosting: Headscale (Tailscale control plane), P2WLAN Control+Relay.

## 9.4 HTTP(S) debug / intercepting proxy

**Open source**

| Repo / site | star (approx.) | One-liner |
|---|---:|---|
| [mitmproxy](https://www.mitmproxy.org/) · [mitmproxy/mitmproxy](https://github.com/mitmproxy/mitmproxy) | 45,226 | Interactive TLS-intercepting HTTP proxy (HTTP/1·2·3, WebSocket); CLI / mitmweb / script API; MIT |
| [morluto/rea](https://github.com/morluto/rea) · [rea.tools](https://rea.tools/) · npm `rea-agents` | — | MCP + CLI so coding agents reverse a local program with no source and attach evidence. MIT. Node 22.19+ / 24.11+ / 26+; `npx rea-agents setup`. Analysis stays on-device. Authorized research only. Harvest 2026-10-12 |

**Free closed-source / paid:** Commercial packet-capture and API-debug tools belong on another table; this section is the open-source main entry. Do not invent prices.

## 9.5 DNS resolvers

Harvest 2026-10-17 (America/Los_Angeles). Labels: **Fact** = README / source / measured; **Inference** = from docs and code, not measured; **Idea** = not implemented. Combination configs keep **tested on Linux box** / **untested on Windows**. Detail also in [tools-by-platform.md](../../tools-by-platform.md) §8.1. Do not invent prices.

**Open source**

| Repo / site | star / status (2026-10-17) | One-liner |
|---|---|---|
| [razvandimescu/numa](https://github.com/razvandimescu/numa) · [numa.rs](https://numa.rs) · [crates.io/crates/numa](https://crates.io/crates/numa) | ~1,597 star; crates.io 0.24.1; MIT | Portable single-binary Rust DNS resolver (hand-written parser; no off-the-shelf DNS crate). Laptop-first: ad-blocking, cache, `.numa` local services with reverse proxy + locally issued HTTPS, expiring hostname overrides, recursive + DNSSEC, DoH/DoT upstreams, DoT/DoH server, ODoH (RFC 9230), dashboard + REST |
| [coredns/coredns](https://github.com/coredns/coredns) · [coredns.io](https://coredns.io) | — | Pluginized authoritative/forward DNS; Kubernetes default DNS; company split-DNS and service discovery |
| Unbound (NLnet Labs) | — | [nlnetlabs.nl/projects/unbound/about](https://nlnetlabs.nl/projects/unbound/about/) — long-running recursive resolver + DNSSEC validation; company recursive layer |
| [TechnitiumSoftware/DnsServer](https://github.com/TechnitiumSoftware/DnsServer) · [technitium.com/dns](https://technitium.com/dns/) | — | Authoritative + recursive; fuller web admin; DoH/DoT; can run on Windows (feature detail is whatever the site currently states) |
| [AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome) | — | Network-wide ad-blocking; client groups and a full web UI; home / small office |
| dnsmasq | — | [thekelleys.org.uk/dnsmasq/doc.html](https://thekelleys.org.uk/dnsmasq/doc.html) — light DNS forward/cache + DHCP; common on routers and small nets |

**Free closed-source / paid:** none added in this harvest. Do not invent prices. Numa’s README comparison table marks its own community maturity as “New.” **Fact:** no public enterprise production deployment was found.

Numa’s distinctive slice is developer-laptop experience (`.numa`, HTTPS, overrides, ODoH), not enterprise DNS infrastructure. For a company resolver, prefer CoreDNS / Unbound / Technitium; Numa can sit as a personal extra layer.

### Numa — status and shape (**Fact**, 2026-10-17)

Source snapshot commit `767ad44` (2026-10-17). Latest release v0.24.1 (published 2026-10-03). crates.io downloads: 1,233 total, 266 in ~90 days. GitHub ~1,597 star, 120 fork, 28 open issue/PR; repo created 2020-12, crate first published 2026-03. Maintainer is essentially one person: razvandimescu 690 commits; dependabot 38; everyone else single digits. README says “~8MB”; measured linux-x86_64 unpacked 10,528,720 bytes (~10 MB), tar.gz 4.8 MB, Windows zip 5.3 MB. Releases: linux x86_64 / aarch64 / armv6, macOS x86_64 / aarch64, windows x86_64; Docker `ghcr.io/razvandimescu/numa` (amd64/arm64); Homebrew tap; AUR/pacman; Nix. README: parser is fuzzed (every PR plus a weekly long run), CI runs cargo audit, install/reinstall/uninstall tests on macOS/Linux. Author: the packet parser is a hand-written learning project; later recursion, DNSSEC, and the dashboard were finished with AI help.

Does **not** do: DHCP, clustering, multi-instance config sync.

### Combining with Clash Verge Rev (mihomo)

Refs: [mihomo DNS](https://wiki.metacubex.one/en/config/dns/), [TUN](https://wiki.metacubex.one/en/config/inbound/tun/), [DNS server types](https://wiki.metacubex.one/en/config/dns/type/), [Clash Verge Rev extend](https://www.clashverge.dev/guide/extend.html), [LAN-domain FAQ](https://www.clashverge.dev/faq/other.html).

#### Facts on each side

**Numa (Fact, source/docs)**

- Listen address is `[server] bind_addr` (string or list, e.g. `"127.0.0.1:5353"`). Windows default `127.0.0.2:53`; non-Windows default `0.0.0.0:53`. **There is no separate `port` key.** `[upstream] port` is the default when an upstream address omits a port, not the listen port.
- Forward with `[upstream] mode = "forward"` and `address`, which may include a port (`"127.0.0.1:1053"`).
- With no `address`, it probes system DNS every 30 s. **On Windows the probe parses `ipconfig /all` lines containing `DNS Servers` or `DNS-Server`** (`system_dns.rs::discover_windows`). **Inference:** Chinese Windows prints “DNS 服务器”, which will not match, so it falls back to Quad9 DoH (`https://9.9.9.9/dns-query`). **On Windows, write `address` explicitly.**
- Numa’s own HTTPS (blocklist download, DoH/ODoH hostname lookup) uses a built-in bootstrap resolver that by default hits 9.9.9.9 and 1.1.1.1 on port 53 unless `upstream.fallback` has IP literals.
- Auto-detect skips `127.0.0.1`, `127.0.0.53`, `0.0.0.0`, `::1` as self/stub, **but does not skip `198.18.x.x`**. Measured system upstream on the test box was `198.18.0.53`.
- Cache default `min_ttl = 60`: an upstream TTL=1 fake-ip is cached 60 s (measured).
- `rebind_protect` is off by default; built-in private ranges **do not include 198.18.0.0/15**, so turning it on still will not strip fake-ip.

**mihomo (Fact, official docs)**

- `dns.listen` is mihomo’s DNS listen address; `enhanced-mode` is `fake-ip` or `redir-host` (default `redir-host`).
- `nameserver-policy` beats `nameserver`/`fallback`; keys support `+.` wildcards and geosite/rule-set; servers may be `udp://`, `tcp://`, `tls://`, `https://`, or `IP:port`.
- Domains in `fake-ip-filter` get a real answer, not a fake-ip.
- Setting `fallback` enables `fallback-filter` (geoip CN) by default.
- TUN `dns-hijack: [any:53, tcp://any:53]` steers matching DNS into mihomo’s DNS module. **On Windows/macOS it cannot auto-hijack DNS aimed at the local network.** On Windows, `strict-route` adds firewall rules against multi-NIC DNS leak.
- Clash Verge Rev: with “DNS override” on, filled `dns` fields on that page replace the matching subscription fields. From v2.5.5, `dns.*` written in the extend config (including `nameserver-policy`) **replaces the whole field**, no per-key merge. `dns-hijack` / `strict-route` saved in the TUN dialog are owned by the app; the same keys in extend config are dropped.

#### Findings (measured + inference)

1. **Fact (measured):** with mihomo in front in fake-ip mode, Numa ad-block and override do **not** change what the client sees as the DNS answer. mihomo returns 198.18.x.x for names not in `fake-ip-filter` and never asks Numa (measured `adnxs.com` → 198.18.0.6). A later **DIRECT** connect is re-resolved via nameserver (Numa); 0.0.0.0 then fails the connect, so it is still blocked (measured mihomo log: `dial tcp 0.0.0.0:80: connection refused`). **Inference:** traffic via a **proxy node** hands the name to the far side; Numa cannot block it.
2. **Fact (measured):** `.numa` and company domains must be in **both** `fake-ip-filter` and `nameserver-policy`. Then `frontend.numa` through mihomo returns 127.0.0.1, and hitting `frontend.numa:8080` via mihomo’s HTTP proxy returns 200.
3. **Fact (measured):** with Numa in front and mihomo as upstream, ad-block and local records all work (`adnxs.com` → 0.0.0.0; zones and `.numa` fine); other names get mihomo fake-ip. Cost: Numa caches TTL=1 fake-ip for 60 s. **Inference:** after a mihomo restart the fake-ip map may change; stale Numa cache can connect the wrong target briefly. Mitigation: `redir-host` on mihomo in this mode, or `DELETE /cache` on Numa after mihomo restarts.
4. **Fact (measured on the test-box network hijack; Windows is inference):** TUN dns-hijack silently intercepts Numa’s outbound UDP/TCP 53 upstreams. Numa was set to 1.1.1.1; mihomo answered with fake-ip. **Inference:** on Windows Numa listens on loopback 127.0.0.2, so queries *to* it are not TUN-hijacked (docs: local-network DNS is not auto-hijacked), but Numa’s *own* port-53 queries follow TUN and get hijacked. DoH upstreams use 443, miss dns-hijack, and follow mihomo split rules (DIRECT or proxy).
5. Port clash: on Windows Numa default is `127.0.0.2:53`; 127.0.0.1:53 is Dnscache. mihomo `dns.listen` is commonly `0.0.0.0:1053` or `127.0.0.1:1053`. **Inference:** they do not clash on Windows defaults unless mihomo listens on `0.0.0.0:53`; if it must use 53, move Numa to `127.0.0.2:5353` or similar.
6. Put ad-blocking in **one** place. Either Numa’s Hagezi (Numa in front, or mihomo on redir-host) or mihomo REJECT / rule-set — not both halves.

#### Three layering plans (Windows-oriented)

**Plan A: mihomo in front** (Clash Verge Rev TUN owns system DNS); Numa only for `.numa` and company names. For users who primarily need the proxy. System DNS via TUN hijack. Numa: `numa install --no-system-dns` (service only). **Fact:** `numa help` says `--no-system-dns` installs the service and does not touch system DNS. **Inference:** on Windows it also should not add an NRPT rule; **untested on Windows**. Put ad-block in mihomo (rule-set REJECT); Numa `[blocking] enabled = false`.

```yaml
# Clash Verge Rev: global extend config (or matching fields on the “DNS override” page) — untested on Windows
# Note v2.5.5+: dns.nameserver-policy / fake-ip-filter written here replace the whole subscription field
dns:
  enable: true
  listen: 127.0.0.1:1053          # do not take 53; TUN hijack does not need the listen port
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - '+.numa'
    - '+.corp.example.com'         # your company suffix
    - '+.lan'
  nameserver-policy:
    '+.numa': 127.0.0.2:53         # Numa default listen on Windows
    '+.corp.example.com': 127.0.0.2:53
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
rules:
  - DOMAIN-SUFFIX,numa,DIRECT
  - DOMAIN-SUFFIX,corp.example.com,DIRECT
  # ……subscription rules
```

```toml
# %PROGRAMDATA%\numa\numa.toml (on Windows config_dir = data_dir) — untested on Windows
[server]
bind_addr = "127.0.0.2:53"

[upstream]
mode = "forward"
address = "223.5.5.5"   # explicit, so a Chinese ipconfig parse miss does not fall back to Quad9 DoH

[[forwarding]]
suffix = ["corp.example.com"]
upstream = "10.0.0.53"  # company DNS; reachable only on VPN

[blocking]
enabled = false         # ad-block left to mihomo
```

- **Inference:** Numa queries to 10.0.0.53: if that prefix is in TUN `route-exclude-address` or on the VPN NIC, they are not hijacked; otherwise dns-hijack `any:53` may loop them back to mihomo. Exclude the intranet DNS prefix from TUN, or use `tls://` / `https://` in `[[forwarding]]` when the company DNS supports it.
- Tip: `tcp://127.0.0.2:53` in `nameserver-policy` can avoid UDP issues. Optional; not verified as necessary.

**Plan B: Numa in front** (system DNS → Numa); mihomo as Numa’s upstream. For ad-block and local-dev first, proxy second. Numa does ad-block, `.numa`, overrides, company split-DNS; everything else goes to mihomo `dns.listen`. Clearest with Clash Verge Rev in **system-proxy mode** (no TUN). With TUN, queries to 127.0.0.2 on Windows are not hijacked (see above), but Numa’s outbound port-53 queries are, so they still reach mihomo — just not via `dns.listen`. mihomo `nameserver` **must not** point back at Numa (loop).

```toml
# numa.toml — Linux version tested on Linux box (ports 5355/1054); untested on Windows
[server]
bind_addr = "127.0.0.2:53"      # Windows; Linux/macOS can use "127.0.0.1:53"

[upstream]
mode = "forward"
address = "127.0.0.1:1053"      # mihomo dns.listen
fallback = ["223.5.5.5"]        # if mihomo is down; also a bootstrap IP literal (see bootstrap_resolver.rs)

[cache]
min_ttl = 60                    # if mihomo uses fake-ip, consider lowering; whether 1 works is untested

[[forwarding]]
suffix = ["corp.example.com"]
upstream = "10.0.0.53"
```

```yaml
# mihomo (Clash Verge Rev extend config) — Linux equivalent tested on Linux box; untested on Windows
dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: redir-host     # recommended: Numa caches real IPs, no second-level fake-ip cache
  # enhanced-mode: fake-ip      # also works (measured), but Numa min_ttl raises TTL=1 to 60
  nameserver:
    - https://dns.alidns.com/dns-query   # must be public/DoH, not Numa
  # if you set fallback, fallback-filter enables geoip CN by default
```

**Inference:** in redir-host, a proxied connect that matches rules by IP may lose the domain, so turn on mihomo sniffer. Outside this measurement.

**Plan C: Numa as a local tool only, not in the DNS path.** Use `.numa` HTTPS proxy and overrides: the browser hits `https://frontend.numa`; mihomo asks Numa via Plan A `nameserver-policy`, gets 127.0.0.1, DIRECTs that traffic. Least invasive.

#### DNS-leak notes

- **Fact:** in `auto`, or forward with no address and a failed probe, Numa sends to Quad9 DoH; bootstrap defaults to 9.9.9.9 and 1.1.1.1 port 53; blocklist is fetched from raw.githubusercontent.com (README also gives a jsDelivr mirror).
- **Inference:** with TUN, those port-53 flows are hijacked by mihomo; DoH and blocklist download follow mihomo rules. Without TUN they leave the physical NIC. Whether Numa’s HTTP client honors the Windows system proxy is **not verified**.
- **Fact:** Windows mihomo TUN `strict-route` adds firewall rules against multi-NIC DNS leak. **Inference:** that may also affect Numa’s outbound port-53 or loopback queries; needs measurement.
- **Fact:** Clash Verge Rev docs: turning on “DNS override” covers dns fields from the subscription and from extend config; watch this when customizing `nameserver-policy`.

#### Platform notes

- **Windows (the user’s main platform):** prefer Plan A or Plan C. Numa on 127.0.0.2:53 + NRPT, mihomo on 1053, naturally staggered. Always set `[upstream] address` explicitly. The Windows configs above are all **untested on Windows**.
- **macOS/Linux:** non-Windows Numa defaults to `0.0.0.0:53`. If mihomo also wants 53 (e.g. a Linux gateway), change one side, e.g. Numa `bind_addr = "127.0.0.1:5353"`.

#### Measured (tested on Linux box, mihomo v1.19.32 + Numa v0.24.1)

- **Test A:** mihomo `dns.listen 127.0.0.1:1053`, fake-ip, `fake-ip-filter` includes `+.numa` and `+.corp.example`, `nameserver-policy` and `nameserver` both point at Numa (127.0.0.1:5354). Result: `frontend.numa` → 127.0.0.1 ✅; `example.com`, `adnxs.com`, `api.example.com` (overridden in Numa) all → 198.18.0.x (Numa block/override bypassed by fake-ip); HTTP proxy DIRECT to `adnxs.com`: mihomo resolves via Numa to 0.0.0.0, connect fails ✅; `frontend.numa:8080` returns 200 ✅.
- **Test B:** Numa (127.0.0.1:5355) upstream = mihomo (127.0.0.1:1054, fake-ip, nameserver 223.5.5.5). Result: `adnxs.com` → 0.0.0.0 ✅, `git.corp.example` (zones) → 10.20.30.40 ✅, `numa.numa` → 127.0.0.1 ✅, `example.com` → 198.18.0.4 (first TTL 1, second TTL 59: cached by Numa).
- Not measured: a real proxy node (PROXY outbound), TUN mode, Windows, the Clash Verge Rev GUI itself.

Linux box Numa-only checks (Release v0.24.1, sha256 checked, user `box`, no root, 2026-10-17 19:49–19:52 PDT): unprivileged ports work (`bind_addr = "127.0.0.1:5354"`). The box’s outbound UDP 53 is hijacked to 198.18.x.x fake-ip (Clash TUN dns-hijack-like), so upstream answers were 198.18.0.x. `dig @127.0.0.1 -p 5354 example.com` NOERROR, second hit cache 0 ms; `frontend.numa` / `numa.numa` → 127.0.0.1 (LOCAL); `[[zones]] test.local` → 127.0.0.1; Hagezi Pro loaded 201,729 names, `adnxs.com` / `ib.adnxs.com` → 0.0.0.0 (`doubleclick.net` / `googleadservices.com` are **not** in Hagezi Pro); `POST /overrides` worked; forwarding to a dead port SERVFAIL; TCP query OK; HTTP/HTTPS `.numa` proxy 200; DoH 200 `application/dns-message`; `/query-log` `/stats` `/diagnose` JSON OK.

**Not tested:** Windows (service install, NRPT, 127.0.0.2), `numa install`, recursive + DNSSEC, ODoH, DoT listen, LAN/mDNS, phone profiles.

### Modding ideas (fork / patch)

~55 modules under `src/`; `lib.rs` `pub mod` exports all of them.

| # | Idea | Status | Hook |
|---|---|---|---|
| 1 | **Import Clash/mihomo rule-sets** (`+.domain`, `.domain`, `DOMAIN-SUFFIX,x`, classical yaml, geosite, `.mrs`) | **Idea** (not supported) | **Fact (measured):** `blocklist.rs::parse_blocklist_counted` only hosts, bare names, `*.`, `\|\|…^`; `+.x`, `.x`, `DOMAIN-SUFFIX,x` are stored as-is and do not match (6 test lines, 3 hit). Add prefix normalize + yaml payload parse; geosite.dat (protobuf) and `.mrs` need extra decoders. Optionally let `[[forwarding]] suffix` take a rule-set file for split-DNS |
| 2 | **Richer per-client policy** (MAC, device name, UI-editable, time of day) | **Partial:** CIDR block/allow/`filter_aaaa`, config-file only | `client_policy.rs` reuses `BlocklistStore`; copy `domain_list.rs` (config + runtime persist) for API/UI. Per-client upstream needs a branch on `ctx.rs` resolve |
| 3 | **Company-name split-DNS** | **Already supported** (`[[forwarding]]` by suffix, multi-upstream SRTT failover, DoT/DoH upstreams); macOS/Linux also auto-build from search domain / supplemental resolver | Strengthen: Windows auto-import NRPT or VPN-NIC DNS suffixes (`discover_windows` currently takes the first DNS server only, `forwarding_rules` empty); locale-proof ipconfig (PowerShell `Get-DnsClientServerAddress`) to fix Chinese Windows |
| 4 | **Android port** (pair with Wi‑Fi / VPN / HTTP utility apps) | **Idea**. Today: `mobile_api.rs` (comment: read-only for iOS/Android companion apps) and `setup_phone.rs` — the phone points DNS at a **computer** running Numa, **not Numa on Android**; no JNI/FFI | Path: VpnService routes one virtual DNS IP into TUN (`addRoute(dnsIp,32)` + `addDnsServer(dnsIp)`), app reads UDP/53 from the TUN fd, calls Numa’s resolve core (`ctx.rs`, `packet.rs`/`wire.rs`), writes the reply. Strip `system_dns`, `windows_service`, proxy and TLS install; protect upstream sockets with `VpnService.protect()` or they hairpin. Alternate: if linux-aarch64 is static, maybe Termux — **not verified** |
| 5 | **Embed as a library** (`lib.rs`) | **Partial:** lib+bin crate, all modules pub, **no stable embed API**; entry is `serve::run(ConfigLoad)` and takes over tokio + listen sockets | Extract `Resolver::new(config) -> resolve(packet) -> bytes`; split listen (UDP/TCP/DoT/DoH) from resolve; then `uniffi` or JNI for row 4 |
| 6 | **DNS diagnose UI** | **Partial:** `/diagnose/{domain}` (measured: override→blocklist→zone→cache→upstream), `/blocking/check`, `/stats`, `health.rs`, SRTT | Add: query several upstreams and diff answers (poison/hijack, e.g. fake-ip 198.18/15 vs real), DNSSEC chain view, “is DNS TUN-hijacked” (Numa already sees system upstream 198.18.0.53). Fits a network-utility app |
| 7 | **Query-log export / traffic audit** | **Partial:** `/query-log` JSON, in-memory 1000 (`QueryLog::new(1000)` in `serve.rs`), seq for incremental poll; persist via [numa-metrics](https://github.com/razvandimescu/numa-metrics) | Make the 1000 configurable; JSONL/CSV on disk or syslog/OTLP; aggregate by client IP and name. Privacy: retention and redaction for a company |
| 8 | **Talk to mihomo** | **Idea** | Dashboard “which mihomo rule hits this name” (external-controller); or detect 198.18/15 fake-ip and skip `min_ttl` bump (`cache.rs` clamp) — the Plan B cache issue in the findings |

Suggested order (personal judgment): 1 (rule-set import, small change, clear win) > fake-ip TTL fix in 8 (small patch) > Windows locale fix in 3 (small patch, also an upstream PR candidate) > 6 diagnose UI > 5 library API, then 4 Android.

**Laptop:** worth installing, especially `.numa` HTTPS and overrides; split ad-block vs proxy clearly between Numa and mihomo. **Company DNS:** not as the main resolver (one maintainer, no cluster, no public enterprise case). **Modding:** modules are small and all pub; rule-set compat and Windows probe are low-hanging. Android is a large job and needs the library split first.

## 9.6 VMs / containers / sandboxes

Harvest 2026-10-19. Stars as of 2026-10-19 GitHub API. Do not invent prices.

**Open source**

| Repo / site | star (2026-10-19) | License | One-liner |
|---|---:|---|---|
| [microsoft/WSL](https://github.com/microsoft/WSL) | 34,129 | MIT | Windows Subsystem for Linux: a light Hyper-V VM running a real Linux kernel and distro on Windows |
| [firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker) | 37,471 | Apache-2.0 | AWS-open-sourced KVM microVM monitor (Rust) for serverless / sandboxes: fast boot, small attack surface |
| [podman-container-tools/podman](https://github.com/podman-container-tools/podman) (containers/podman redirects here) | 33,071 | Apache-2.0 | Daemonless OCI container / pod manager; rootless; CLI largely Docker-compatible |
| [kata-containers/kata-containers](https://github.com/kata-containers/kata-containers) | 8,963 | Apache-2.0 | A light VM around each container / pod; still a container-runtime interface; isolation closer to a VM |
| [canonical/multipass](https://github.com/canonical/multipass) | 9,277 | GPL-3.0 | Canonical one-command Ubuntu VMs (Windows / macOS / Linux) |
| [cloud-hypervisor/cloud-hypervisor](https://github.com/cloud-hypervisor/cloud-hypervisor) | 6,391 | Apache-2.0 / BSD-3-Clause (per-file SPDX; repo `LICENSES/` also has CC-BY-4.0) | Cloud-workload Rust VMM: CPU / memory / device hotplug; Windows and Linux guests; Kata can use it as a backend |
| [lxc/incus](https://github.com/lxc/incus) | 6,430 | Apache-2.0 | LXD community fork: unified system-container + VM manager |
| [lxc/lxc](https://github.com/lxc/lxc) | 5,275 | LGPL-2.1 / GPL-2.0 (both license files in the repo; per-file) | Linux system-container userspace (namespaces / cgroups tools and library). Incus sits on it |

**Free closed-source / paid:** none added in this harvest. Do not invent prices.

## 9.7 SMS / webhook infrastructure

Harvest 2026-10-19. Do not invent prices.

**Open source:** none as a CPaaS product in this harvest. Cloudflare Workers runtime is open source as [cloudflare/workerd](https://github.com/cloudflare/workerd) (also [cloudflare/workers-sdk](https://github.com/cloudflare/workers-sdk); org table in [awesome-and-orgs.md](../../awesome-and-orgs.md)).

**Free closed-source / paid**

| Name | Site | Form |
|---|---|---|
| Telnyx | [telnyx.com](https://telnyx.com/) | Closed-source CPaaS: numbers, SMS / MMS, voice. Inbound SMS is delivered as a webhook to your endpoint (Wei’s path is Cloudflare Workers). Usage-based; prices not verified — not recorded |
| Cloudflare Workers (pairing) | [workers.cloudflare.com](https://workers.cloudflare.com/) | Platform closed-source; runtime [workerd](https://github.com/cloudflare/workerd) open source. Free quota + paid plans. Pairing line for Telnyx webhooks; not a new Workers catalog page |
