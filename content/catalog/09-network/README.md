# 9. Network & self-hosting

Checked: 2026-10-02 PT (overlay comparison + mitmproxy addendum). Older entries’ stars may still be the 2026-08-29 snapshot. Company-toy detail is in [awesome-and-orgs.md](../../awesome-and-orgs.md) section 4. Do not invent prices.

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
