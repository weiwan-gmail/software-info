# 6. Audio / image / text

Separate from kissfft “analysis”: this side is synthesis, notation, developing, typesetting.

## 6.1 Live synthesis

**Open source:** SuperCollider 6,707 · Pure Data 2,072 · VCV Rack 4,406

**Paid:** [Max](https://cycling74.com/) (Cycling '74, subscription/license). Commercial Eurorack modules are hardware buyout.

## 6.2 Notation

**Open source:** MuseScore 15,036 · LilyPond (GitHub mirror 669; the authority is on Savannah)

**Free closed-source / paid**

| Name | Site | Form | Open-source counterpart |
|---|---|---|---|
| MuseScore.com | [musescore.com](https://musescore.com/) | score library, free + subscription; not the same product as the open-source editor | MuseScore editor |
| Dorico | [steinberg.net/dorico](https://www.steinberg.net/dorico/) | Steinberg, tiered licensing | MuseScore / LilyPond |
| Sibelius | [avid.com/sibelius](https://www.avid.com/sibelius) | subscription | Same |

## 6.3 Multitrack / DAW

**Open source:** Ardour 5,239

**Free closed-source**

| Name | Site | Form |
|---|---|---|
| GarageBand | Apple | Bundled on Mac / iOS, closed-source |
| DaVinci Resolve (edit, also audio) | [blackmagicdesign.com](https://www.blackmagicdesign.com/products/davinciresolve) | free closed-source + Studio paid |

**Paid**

| Name | Site | Form | Open-source counterpart |
|---|---|---|---|
| REAPER | [reaper.fm](https://www.reaper.fm/) | buyout, trial available | Ardour |
| Ableton Live | [ableton.com](https://www.ableton.com/) | buyout / tiers | live-oriented; counterpart is incomplete |
| Logic Pro | [apple.com/logic-pro](https://www.apple.com/logic-pro/) | buyout | Ardour |
| Pro Tools | [avid.com/pro-tools](https://www.avid.com/pro-tools) | subscription | Ardour |

TonalEnergy on phones is a paid tuner/metronome, closed-source DSP.

**Free closed-source players / converters (OKA Apps, harvest 2026-10-11):** [VidHub](https://okaapps.com/product/1659622164) · [OmniPlayer](https://okaapps.com/product/1470926410) · [OmniConverter](https://okaapps.com/product/1536071582) · Video Converter X2 / Fig Player (listed on [okaapps.com](https://okaapps.com/); no independent product page) · [Omi Screen Recorder](https://okaapps.com/product/1592987853) · xHub (App Store “More by” only). Pricing not verified. Do not invent prices. Detail: [tools-by-platform.md](../../tools-by-platform.md) §8.1.

## 6.4 Photography RAW

**Open source:** darktable 13,000

**Free closed-source / paid**

| Name | Site | Form | Open-source counterpart |
|---|---|---|---|
| Lightroom | [adobe.com](https://www.adobe.com/products/photoshop-lightroom.html) | subscription | darktable |
| Capture One | [captureone.com](https://www.captureone.com/) | subscription / buyout | darktable |
| Photoshop | [adobe.com/photoshop](https://www.adobe.com/products/photoshop.html) | subscription | the canvas is not a RAW pipeline; web counterpart is Photopea |

## 6.5 Typesetting

**Open source:** Typst 55,726. TeX distributions are a separate count.

**Free closed-source / paid**

| Name | Site | Form |
|---|---|---|
| Microsoft Word | Microsoft 365 | free web tier + subscription |
| Adobe InDesign | [adobe.com/indesign](https://www.adobe.com/products/indesign.html) | subscription |
| Google Docs | docs.google.com | free closed-source |

## 6.6 Fonts

**Open source:** FontForge 7,917

**Paid:** [Glyphs](https://glyphsapp.com/) buyout · [FontLab](https://www.fontlab.com/) buyout/license

## 6.7 Image / text → 3D

Harvest 2026-10-12. Input is one image or text; output is a usable 3D asset (mesh / Gaussian splat / explorable scene). Stars as of 2026-10-12 GitHub API. Do not invent prices. Detail: [tools-by-platform.md](../../tools-by-platform.md) §8.1.

**Open source**

| Repo | star (2026-10-12) | License | Notes |
|---|---:|---|---|
| [neilsonnn/image-blaster](https://github.com/neilsonnn/image-blaster) | 11,174 | MIT | Claude Code skills: World Labs Marble → Gaussian splat (`.spz`); Hunyuan3D on FAL → object meshes (`.glb`/`.obj`); ElevenLabs → `.mp3`. Needs World Labs and FAL API keys (paid cloud). Repo claims “under 5 minutes.” Not an Android/Qt library — study the agent-skill orchestration |
| [Tencent-Hunyuan/HunyuanWorld-1.0](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0) | 2,944 | custom (Other) | Text or image → explorable immersive 3D world. Python, local GPU. Closest local stand-in for Marble |
| [Tencent-Hunyuan/Hunyuan3D-2.1](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) | 4,164 | NOASSERTION | Image → high-fidelity 3D assets with PBR. Python, local GPU. The object-model family image-blaster calls remotely |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | 8,139 | NOASSERTION | Desktop app: local AI from an image or prompt → 3D model. TypeScript desktop GUI; a Qt-shaped reference |
| [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | 17,962 | Apache-2.0 | Rebuild objects from a reference image as pure-code procedural Three.js. Output is code, not a mesh |
| [xxlong0/Wonder3D](https://github.com/xxlong0/Wonder3D) | 5,444 | MIT | Single image → 3D (cross-domain diffusion). Python, GPU. Permissive research-grade; can integrate offline |
| [ashawkey/stable-dreamfusion](https://github.com/ashawkey/stable-dreamfusion) | 8,870 | Apache-2.0 | Text/image → 3D with mesh export (NeRF + diffusion). Older classic; good for the method, slow |

**Free closed-source**

| Name | Site | Form |
|---|---|---|
| Tencent Hunyuan 3D (online) | [3d.hunyuan.tencent.com/sceneTo3D](https://3d.hunyuan.tencent.com/sceneTo3D) | HunyuanWorld official web: image/text → 3D scene. Price not verified (the page did not state one) |

**Paid**

| Name | Site | Form | Open-source counterpart |
|---|---|---|---|
| World Labs Marble | [marble.worldlabs.ai](https://marble.worldlabs.ai/) · API [platform.worldlabs.ai](https://platform.worldlabs.ai/) | image → explorable 3D world (Gaussian splat). Price not verified | HunyuanWorld-1.0 (local) |
| Meshy | [meshy.ai/pricing](https://www.meshy.ai/pricing) | text/image → 3D + AI textures; API and Blender/Unity plugins. Free: 100 credits/month (output CC BY 4.0). Pro: 1,000 credits/month (no dollar amount on the page) | Hunyuan3D-2.1 / Wonder3D |
| fal.ai | [fal.ai](https://fal.ai/) | hosted inference (Hunyuan3D, ElevenLabs, and others). Usage-based; specific prices not verified | self-host the same model families |

## 6.8 AI music generation

Harvest 2026-10-19. Stars as of 2026-10-19 GitHub API. Code license and weight license can differ — they are listed separately. Do not invent prices.

**Open source (code)**

| Repo | star (2026-10-19) | License | Notes |
|---|---:|---|---|
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) · [map-yue2.github.io](https://map-yue2.github.io/) | 12,147 | code Apache-2.0. YuE2 weights CC BY-NC 4.0 + extra “creator license” (individuals / creators / musicians may use generated works commercially for free; company commercial use needs a grant). YuE v1 weights Apache-2.0. `main` is YuE2; original on branch `YuE-v1` | Full-song (vocal + accompaniment) model. YuE2 writes editable ABC (melody + chords) then renders; zero-shot cover (SheetSage2 for audio → score) and agent edits. Does **not** do image / PDF OMR. Official: Linux + 24 GB VRAM BF16 NVIDIA GPU. ComfyUI has native nodes |

**Weights (not OSI / NC + exceptions):** YuE2 weights as in the row above. Not a separate paid SKU; company commercial use needs a grant (no amount stated).

**Paid:** none added. Do not invent prices.

**Adjacent open source** (YuE analysis neighbors; all as of 2026-10-19)

| Repo | star | License | Notes |
|---|---:|---|---|
| [Audiveris/audiveris](https://github.com/Audiveris/audiveris) | 2,902 | AGPL-3.0 | OMR |
| [BreezeWhite/oemer](https://github.com/BreezeWhite/oemer) | 811 | MIT | OMR |
| [liebharc/homr](https://github.com/liebharc/homr) | 436 | AGPL-3.0 | OMR |
| [spotify/basic-pitch](https://github.com/spotify/basic-pitch) | 5,933 | Apache-2.0 | audio → MIDI |
| [magenta/mt3](https://github.com/magenta/mt3) | 1,767 | Apache-2.0 | multi-track transcription |
| [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | 10,392 | MIT | stem split |
| [NoizAI/YuE2-Turbo](https://github.com/NoizAI/YuE2-Turbo) | 98 | Apache-2.0 | YuE2 concurrent inference |
| [Blizaine/Maestro](https://github.com/Blizaine/Maestro) | 770 | NOASSERTION | local AI AV studio |
| [Mozer/YuE-extend](https://github.com/Mozer/YuE-extend) | 71 | Apache-2.0 | YuE v1 continuation |

## 6.9 AI image generation (local weights)

Harvest 2026-10-19. Stars as of 2026-10-19 GitHub API. Inference code vs weights are split when they differ. Do not invent prices.

**Open source**

| Repo | star (2026-10-19) | License | Notes |
|---|---:|---|---|
| [black-forest-labs/flux2](https://github.com/black-forest-labs/flux2) · HF [FLUX.2-klein-4B](https://huggingface.co/black-forest-labs/FLUX.2-klein-4B) | 2,789 (flux2 repo) | code Apache-2.0; **4B weights Apache-2.0** | Previous-gen small FLUX for local gen/edit on consumer GPUs. 9B weights are not this column (see below) |
| [Tongyi-MAI/Z-Image](https://github.com/Tongyi-MAI/Z-Image) · HF [Z-Image-Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) | 12,099 | Apache-2.0 (repo and Turbo weights) | Tongyi-MAI text-to-image; Turbo is a few-step distilled build for fast local output |
| [QwenLM/Qwen-Image](https://github.com/QwenLM/Qwen-Image) | 8,409 | Apache-2.0 | Qwen image foundation; strength is complex text rendering and precise edits |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) (was comfyanonymous/ComfyUI) | 138,649 | GPL-3.0 | Node-graph diffusion GUI / API / backend; de facto local-inference host. FLUX 3 Klein and YuE2 have official nodes or workflows |
| [city96/ComfyUI-GGUF](https://github.com/city96/ComfyUI-GGUF) | 4,177 | Apache-2.0 | GGUF quantized loaders for native ComfyUI models — large models on low VRAM |

**Free closed-source / conditional weights (not OSI)**

| Name | Site | Form |
|---|---|---|
| FLUX 3 Image Klein | [black-forest-labs/flux-3-image-klein](https://github.com/black-forest-labs/flux-3-image-klein) 101 star · [model page](https://bfl.ai/models/flux-3-image-klein) · [HF weights](https://huggingface.co/black-forest-labs/flux-3-image-klein) (gated; accept terms) | Inference code Apache-2.0; weights FLUX Kommunity License v1.0 (not OSI). Non-commercial free. Qualifying User with annual revenue &lt; USD 5 million (affiliates included) may commercially use **generated results**; others need a BFL commercial grant (amount not stated). 5.6B open-weight image model: T2I, edit from up to 10 reference images, bounding-box layout, one checkpoint. Must be used with the prompt upsampler (Apache-2.0). BFL says the INT8 build runs via ComfyUI / Diffusers on an 8 GB GeForce RTX (FP8 / INT8 / NVFP4 with NVIDIA) |
| FLUX.2 [klein] 9B | HF [FLUX.2-klein-9B](https://huggingface.co/black-forest-labs/FLUX.2-klein-9B) | 9B weights: FLUX Non-Commercial License. Same flux2 repo as the 4B Apache-2.0 row |

**Paid:** BFL commercial grant for users outside the Kommunity Qualifying User terms. Amount not stated. Do not invent prices.
