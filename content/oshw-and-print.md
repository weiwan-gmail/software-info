# 开源硬件 · 3D 打印

核对：2026-08-29 PT。star 是 GitHub API 快照。这是分类种子，不是穷尽榜。

收：能买板、能打件、能跟原理图走的项目。收集来源另见 [tools-by-platform.md](/tools-by-platform) 的 talks / X / 外语站。

---

## 1. 清单（先盯这些，而不是从零搜）

| 清单 | star | 管什么 |
|---|---:|---|
| [kitspace/awesome-electronics](https://github.com/kitspace/awesome-electronics) | 8,075 | 电子工程资源 |
| [aolofsson/awesome-opensource-hardware](https://github.com/aolofsson/awesome-opensource-hardware) | 2,412 | 开源硬件工具和生成器 |
| [delftopenhardware/awesome-open-hardware](https://github.com/delftopenhardware/awesome-open-hardware) | 1,038 | 做开源硬件时用的东西 |
| [ad-si/awesome-3d-printing](https://github.com/ad-si/awesome-3d-printing) | 1,940 | 3D 打印资源 |
| [iDoka/awesome-canbus](https://github.com/iDoka/awesome-canbus) | 3,435 | CAN 总线（车 / 工控） |

发板和众筹：Crowd Supply、OSHWA 认证目录、Hackaday.io。这些不是 GitHub 榜。

---

## 2. 开源硬件（能学的一块）

| 项目 | star | 学什么 |
|---|---:|---|
| [greatscottgadgets/hackrf](https://github.com/greatscottgadgets/hackrf) | 8,063 | SDR。射频前端 + USB。和示波器仿真不是一类，但是「自己碰射频」的入口 |
| [flipperdevices/flipperzero-firmware](https://github.com/flipperdevices/flipperzero-firmware) | 16,528 | 便携多协议玩具。公司硬件，固件开源 |
| [raspberrypi/pico-sdk](https://github.com/raspberrypi/pico-sdk) | 4,945 | RP2040。PIO 值得单独读 |
| [espressif/arduino-esp32](https://github.com/espressif/arduino-esp32) | 17,302 | Wi-Fi 单片机。公司 SDK，板子遍地 |
| [FrameworkComputer/framework-system](https://github.com/FrameworkComputer/framework-system) | 115 | 可换模块笔记本。文档比 star 有用 |
| [openhwgroup/cva6](https://github.com/openhwgroup/cva6) | 3,087 | RISC-V 核 |
| [lowRISC/ibex](https://github.com/lowRISC/ibex) | 2,030 | 小 RISC-V 核 |
| [YosysHQ/yosys](https://github.com/YosysHQ/yosys) | 4,716 | 开源综合 |
| [verilator/verilator](https://github.com/verilator/verilator) | 3,887 | 你已经在 osc-sim 里用过 |
| [ghdl/ghdl](https://github.com/ghdl/ghdl) | 2,871 | VHDL 仿真 |
| [KiCad/kicad-source-mirror](https://github.com/KiCad/kicad-source-mirror) | 2,900 | PCB。官方镜像 |
| [LibrePCB/LibrePCB](https://github.com/LibrePCB/LibrePCB) | 2,973 | 更轻的 PCB |
| [logisim-evolution/logisim-evolution](https://github.com/logisim-evolution/logisim-evolution) | 7,496 | 数字逻辑教学 |

对标闭源：Altium / Vivado / ModelSim。作业是 KiCad + Yosys + Verilator，不是复刻 Vivado。

---

## 3. 3D 打印

| 项目 | star | 学什么 |
|---|---:|---|
| [openscad/openscad](https://github.com/openscad/openscad) | 10,048 | 代码建模 |
| [FreeCAD/FreeCAD](https://github.com/FreeCAD/FreeCAD) | 33,136 | 参数化 CAD |
| [prusa3d/PrusaSlicer](https://github.com/prusa3d/PrusaSlicer) | 9,250 | 切片。Prusa 公司，开源 |
| [OrcaSlicer/OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer) | 15,522 | 从 Bambu / Prusa 那条线叉出来的切片 |
| [VoronDesign/Voron-2](https://github.com/VoronDesign/Voron-2) | 4,514 | 开源打印机机械 |
| [Klipper3d/klipper](https://github.com/Klipper3d/klipper) | 11,850 | 主机算路径、MCU 出脉冲 |
| [OctoPrint/OctoPrint](https://github.com/OctoPrint/OctoPrint) | 9,084 | 打印机 Web 控制 |
| [mainsail-crew/mainsail](https://github.com/mainsail-crew/mainsail) | 2,203 | Klipper 的 Web UI |
| [winder/Universal-G-Code-Sender](https://github.com/winder/Universal-G-Code-Sender) | 2,250 | CNC 送 G 代码 |
| [cncjs/cncjs](https://github.com/cncjs/cncjs) | 2,640 | 网页控 CNC |

Printables / Thingiverse / MakerWorld 是模型站，不是仓库。收集时记模型和许可证，不记 star。
