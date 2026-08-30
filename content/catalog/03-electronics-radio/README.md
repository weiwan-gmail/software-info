# 3. 电子、嵌入式、无线电

细表：[oshw-and-print.md](../../oshw-and-print.md)

## 3.1 清单

开源清单：awesome-electronics 8,075 · awesome-opensource-hardware 2,412 · awesome-open-hardware 1,038 · awesome-canbus 3,435 · [kyleterry/awesome-radio](https://github.com/kyleterry/awesome-radio) 309。

发板目录（不是仓库）：Crowd Supply、OSHWA、Hackaday.io。

## 3.2 板子与公司硬件

**开源（固件 / SDK / 核）**

| 仓库 | star |
|---|---:|
| [greatscottgadgets/hackrf](https://github.com/greatscottgadgets/hackrf) | 8,063 |
| [flipperdevices/flipperzero-firmware](https://github.com/flipperdevices/flipperzero-firmware) | 16,528 |
| [raspberrypi/pico-sdk](https://github.com/raspberrypi/pico-sdk) | 4,945 |
| [espressif/arduino-esp32](https://github.com/espressif/arduino-esp32) | 17,302 |
| [FrameworkComputer/framework-system](https://github.com/FrameworkComputer/framework-system) | 115 |
| [openhwgroup/cva6](https://github.com/openhwgroup/cva6) | 3,087 |
| [lowRISC/ibex](https://github.com/lowRISC/ibex) | 2,030 |

**收费（硬件要买；固件可能开源）**

| 名字 | 官网 | 形态 |
|---|---|---|
| Flipper Zero | [flipperzero.one](https://flipperzero.one/) | 硬件买断；固件开源 |
| HackRF One | [greatscottgadgets.com](https://greatscottgadgets.com/) | 硬件买断；设计开源 |
| Framework Laptop | [frame.work](https://frame.work/) | 笔记本买断；部分设计/工具开源 |
| Raspberry Pi / Pico | [raspberrypi.com](https://www.raspberrypi.com/) | 板子要买；SDK 开源 |
| 各家 ESP32 开发板 | Espressif / 第三方 | 板子要买；Arduino-ESP32 开源 |

## 3.3 EDA / FPGA / 仿真

**开源：** KiCad 镜像 2,900 · LibrePCB 2,973 · Yosys 4,716 · Verilator 3,887 · GHDL 2,871 · logisim-evolution 7,496

**免费闭源**

| 名字 | 官网 | 说明 |
|---|---|---|
| LTspice | [analog.com LTspice](https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html) | Analog Devices，免费电路仿真 |
| EasyEDA | [easyeda.com](https://easyeda.com/) | 网页 EDA，免费账号；和立创板厂绑在一起 |
| STM32CubeMX | [st.com](https://www.st.com/en/development-tools/stm32cubemx.html) | ST 配置工具，免费闭源 |
| Vivado 入门档 | [AMD Vivado](https://www.amd.com/en/products/software/adaptive-socs-and-fpgas/vivado.html) | 站点写过有免费入门档和分层许可 |

**收费**

| 名字 | 官网 | 形态 | 开源对标 |
|---|---|---|---|
| Altium Designer | [altium.com/altium-designer](https://www.altium.com/altium-designer) | 订阅（现走 Altium Develop / Agile） | KiCad / LibrePCB |
| Vivado 高档 | 同上 AMD 页 | 分层许可 | Yosys + 开源 PnR，能力不是一对一 |
| Siemens Questa / ModelSim | [eda.sw.siemens.com](https://eda.sw.siemens.com/) | 商业仿真器 | Verilator / GHDL |
| Saleae Logic | [saleae.com](https://www.saleae.com/) | 硬件 + 软件 | PulseView / sigrok（开源逻辑分析，未在本表核 star） |

## 3.4 键盘固件

**开源：** [qmk/qmk_firmware](https://github.com/qmk/qmk_firmware) 20,665 · [zmkfirmware/zmk](https://github.com/zmkfirmware/zmk) 4,244

**收费：** 各成品配列、Keychron 等整机（硬件买断）。VIA/Vial 是配置层，成品键盘本身闭源。

## 3.5 SDR 软件

**开源：** GNU Radio 6,242 · OpenWebRX 1,313

**免费闭源**

| 名字 | 官网 | 说明 |
|---|---|---|
| SDR#（SDRSharp） | [airspy.com/download](https://airspy.com/download/) | Windows 上最常见的免费闭源接收机软件 |

**收费（硬件，软件常免费）**

| 名字 | 官网 | 形态 |
|---|---|---|
| Airspy | [airspy.com](https://airspy.com/) | 接收机硬件 |
| SDRplay | [sdrplay.com](https://www.sdrplay.com/) | 接收机硬件 |
| Ettus USRP | [ettus.com](https://www.ettus.com/) | 可发可收的 SDR 平台 |
| FlexRadio | [flexradio.com](https://www.flexradio.com/) | 业余电台 SDR，软件 SmartSDR |

## 3.6 空中信号 / 离网

**开源：** dump1090（FlightAware 1,137 / antirez 2,929）· Meshtastic firmware 8,223

**收费：** 各家 LoRa 手台 / Meshtastic 成品（硬件买断）。ADS-B 接收用 RTL-SDR 棒也是硬件要买。
