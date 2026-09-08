# Open hardware · 3D print

Checked: 2026-08-29 PT. Stars are a GitHub API snapshot. This is a class seed, not an exhaustive ranking.

Collect: projects where you can buy a board, print a part, or follow a schematic. Collection sources are also in [tools-by-platform.md](/tools-by-platform) under talks / X / non-English sites.

---

## 1. Lists (watch these first; do not search from zero)

| List | star | What it covers |
|---|---:|---|
| [kitspace/awesome-electronics](https://github.com/kitspace/awesome-electronics) | 8,075 | electronics-engineering resources |
| [aolofsson/awesome-opensource-hardware](https://github.com/aolofsson/awesome-opensource-hardware) | 2,412 | open-hardware tools and generators |
| [delftopenhardware/awesome-open-hardware](https://github.com/delftopenhardware/awesome-open-hardware) | 1,038 | things you use when making open hardware |
| [ad-si/awesome-3d-printing](https://github.com/ad-si/awesome-3d-printing) | 1,940 | 3D-print resources |
| [iDoka/awesome-canbus](https://github.com/iDoka/awesome-canbus) | 3,435 | CAN bus (cars / industrial) |

Board drops and crowdfunding: Crowd Supply, the OSHWA certified directory, Hackaday.io. These are not GitHub charts.

---

## 2. Open hardware (the learnable slice)

| Project | star | What to study |
|---|---:|---|
| [greatscottgadgets/hackrf](https://github.com/greatscottgadgets/hackrf) | 8,063 | SDR. RF front end + USB. Not the same class as oscilloscope simulation, but it is an entry to “touch RF yourself” |
| [flipperdevices/flipperzero-firmware](https://github.com/flipperdevices/flipperzero-firmware) | 16,528 | portable multi-protocol toy. Company hardware, firmware open source |
| [raspberrypi/pico-sdk](https://github.com/raspberrypi/pico-sdk) | 4,945 | RP2040. PIO is worth reading on its own |
| [espressif/arduino-esp32](https://github.com/espressif/arduino-esp32) | 17,302 | Wi-Fi MCU. Company SDK. Boards everywhere |
| [FrameworkComputer/framework-system](https://github.com/FrameworkComputer/framework-system) | 115 | modular laptop. The docs are more useful than the stars |
| [openhwgroup/cva6](https://github.com/openhwgroup/cva6) | 3,087 | RISC-V core |
| [lowRISC/ibex](https://github.com/lowRISC/ibex) | 2,030 | small RISC-V core |
| [YosysHQ/yosys](https://github.com/YosysHQ/yosys) | 4,716 | open-source synthesis |
| [verilator/verilator](https://github.com/verilator/verilator) | 3,887 | you already used this in osc-sim |
| [ghdl/ghdl](https://github.com/ghdl/ghdl) | 2,871 | VHDL simulation |
| [KiCad/kicad-source-mirror](https://github.com/KiCad/kicad-source-mirror) | 2,900 | PCB. Official mirror |
| [LibrePCB/LibrePCB](https://github.com/LibrePCB/LibrePCB) | 2,973 | lighter PCB |
| [logisim-evolution/logisim-evolution](https://github.com/logisim-evolution/logisim-evolution) | 7,496 | digital-logic teaching |
| [OLIMEX/RVPC](https://github.com/OLIMEX/RVPC) | — | €1 RISC-V retro kit; CH32V003 bit-bang VGA + Woz-style hex monitor; FOSDEM 2026 soldering workshop |
| [SucréLA](https://gitlab.com/yannsionneau/SucreLA/) | — | open-source USB 3 logic analyzer (ECP5 + CH569); Yosys/nextpnr + PulseView; Saleae counterpart |

Closed-source counterparts: Altium / Vivado / ModelSim. Homework is KiCad + Yosys + Verilator, not cloning Vivado.

---

## 3. 3D print

| Project | star | What to study |
|---|---:|---|
| [openscad/openscad](https://github.com/openscad/openscad) | 10,048 | code modeling |
| [FreeCAD/FreeCAD](https://github.com/FreeCAD/FreeCAD) | 33,136 | parametric CAD |
| [prusa3d/PrusaSlicer](https://github.com/prusa3d/PrusaSlicer) | 9,250 | slicer. Prusa the company, open source |
| [OrcaSlicer/OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer) | 15,522 | slicer forked from the Bambu / Prusa line |
| [VoronDesign/Voron-2](https://github.com/VoronDesign/Voron-2) | 4,514 | open-source printer mechanics |
| [Klipper3d/klipper](https://github.com/Klipper3d/klipper) | 11,850 | host computes the path, MCU emits pulses |
| [OctoPrint/OctoPrint](https://github.com/OctoPrint/OctoPrint) | 9,084 | printer web control |
| [mainsail-crew/mainsail](https://github.com/mainsail-crew/mainsail) | 2,203 | Klipper web UI |
| [winder/Universal-G-Code-Sender](https://github.com/winder/Universal-G-Code-Sender) | 2,250 | CNC, send G-code |
| [cncjs/cncjs](https://github.com/cncjs/cncjs) | 2,640 | web-controlled CNC |

Printables / Thingiverse / MakerWorld are model sites, not repos. When collecting, record the model and the license, not stars.

---

## 4. Weekly harvest records

### 2026-08-31 · source 1 (tech talks / FOSDEM)

- Name: SucréLA
- Platform: OSHW / FPGA lab (Lattice ECP5 + WCH CH569; host side sigrok / PulseView)
- Site or repo: https://gitlab.com/yannsionneau/SucreLA/
- Paid: open source (LGPL v2.1 + CERN-OHL-W v2). Board price not published yet (README: “Not that expensive (To be defined)”)
- Source: FOSDEM 2026 — “SucréLA: open source usb 3.0 logic analyzer based on FPGA” (Yann Sionneau)
- Date: 2026-08-31
- Learnable slice: LiteX/Migen capture pipeline on ECP5, HSPI into CH569 SuperSpeed USB 3, using only Yosys/nextpnr (no vendor FPGA toolchain)

- Name: RVPC (Olimex)
- Platform: OSHW / embedded RISC-V teaching board (CH32V003, VGA + PS/2)
- Site or repo: https://github.com/OLIMEX/RVPC · product page https://www.olimex.com/Products/Retro-Computers/RVPC/open-source-hardware
- Paid: open-source hardware (CERN-OHL-S v2) + GPL-3 software. Official kit listed at EUR 1.00
- Source: FOSDEM 2026 — “RVPC RISC-V retro computer Soldering workshop” (Tsvetan Usunov)
- Date: 2026-08-31
- Learnable slice: hand-written bit-bang VGA on a 48 MHz RV32EC with 2 KB SRAM, plus a Woz-style hex monitor for hand-entered RISC-V machine code
