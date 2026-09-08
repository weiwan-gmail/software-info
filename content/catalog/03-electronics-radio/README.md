# 3. Electronics / embedded / radio

Detail table: [oshw-and-print.md](../../oshw-and-print.md)

## 3.1 Lists

Open-source lists: awesome-electronics 8,075 · awesome-opensource-hardware 2,412 · awesome-open-hardware 1,038 · awesome-canbus 3,435 · [kyleterry/awesome-radio](https://github.com/kyleterry/awesome-radio) 309.

Board-drop directories (not repos): Crowd Supply, OSHWA, Hackaday.io.

## 3.2 Boards and company hardware

**Open source (firmware / SDK / cores)**

| Repo | star |
|---|---:|
| [greatscottgadgets/hackrf](https://github.com/greatscottgadgets/hackrf) | 8,063 |
| [flipperdevices/flipperzero-firmware](https://github.com/flipperdevices/flipperzero-firmware) | 16,528 |
| [raspberrypi/pico-sdk](https://github.com/raspberrypi/pico-sdk) | 4,945 |
| [espressif/arduino-esp32](https://github.com/espressif/arduino-esp32) | 17,302 |
| [FrameworkComputer/framework-system](https://github.com/FrameworkComputer/framework-system) | 115 |
| [openhwgroup/cva6](https://github.com/openhwgroup/cva6) | 3,087 |
| [lowRISC/ibex](https://github.com/lowRISC/ibex) | 2,030 |

**Paid (hardware you buy; firmware may be open source)**

| Name | Site | Form |
|---|---|---|
| Flipper Zero | [flipperzero.one](https://flipperzero.one/) | hardware buyout; firmware open source |
| HackRF One | [greatscottgadgets.com](https://greatscottgadgets.com/) | hardware buyout; design open source |
| Framework Laptop | [frame.work](https://frame.work/) | laptop buyout; some design/tools open source |
| Raspberry Pi / Pico | [raspberrypi.com](https://www.raspberrypi.com/) | boards are paid; SDK open source |
| ESP32 dev boards (various) | Espressif / third parties | boards are paid; Arduino-ESP32 open source |

## 3.3 EDA / FPGA / simulation

**Open source:** KiCad mirror 2,900 · LibrePCB 2,973 · Yosys 4,716 · Verilator 3,887 · GHDL 2,871 · logisim-evolution 7,496

**Free closed-source**

| Name | Site | Notes |
|---|---|---|
| LTspice | [analog.com LTspice](https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html) | Analog Devices, free circuit simulation |
| EasyEDA | [easyeda.com](https://easyeda.com/) | web EDA, free account; tied to JLCPCB |
| STM32CubeMX | [st.com](https://www.st.com/en/development-tools/stm32cubemx.html) | ST config tool, free closed-source |
| Vivado entry tier | [AMD Vivado](https://www.amd.com/en/products/software/adaptive-socs-and-fpgas/vivado.html) | The site has described a free entry tier and tiered licensing |

**Paid**

| Name | Site | Form | Open-source counterpart |
|---|---|---|---|
| Altium Designer | [altium.com/altium-designer](https://www.altium.com/altium-designer) | subscription (now via Altium Develop / Agile) | KiCad / LibrePCB |
| Vivado upper tiers | same AMD page | tiered licensing | Yosys + open-source PnR; capability is not one-to-one |
| Siemens Questa / ModelSim | [eda.sw.siemens.com](https://eda.sw.siemens.com/) | commercial simulator | Verilator / GHDL |
| Saleae Logic | [saleae.com](https://www.saleae.com/) | hardware + software | PulseView / sigrok (open-source logic analysis; stars not checked in this table); [SucréLA](https://gitlab.com/yannsionneau/SucreLA/) (open USB 3 logic analyzer) |

## 3.4 Keyboard firmware

**Open source:** [qmk/qmk_firmware](https://github.com/qmk/qmk_firmware) 20,665 · [zmkfirmware/zmk](https://github.com/zmkfirmware/zmk) 4,244

**Paid:** finished keyboards, Keychron and similar complete units (hardware buyout). VIA/Vial is the config layer. The finished keyboard itself is closed-source.

## 3.5 SDR software

**Open source:** GNU Radio 6,242 · OpenWebRX 1,313

**Free closed-source**

| Name | Site | Notes |
|---|---|---|
| SDR# (SDRSharp) | [airspy.com/download](https://airspy.com/download/) | The usual free closed-source receiver app on Windows |

**Paid (hardware; software is often free)**

| Name | Site | Form |
|---|---|---|
| Airspy | [airspy.com](https://airspy.com/) | receiver hardware |
| SDRplay | [sdrplay.com](https://www.sdrplay.com/) | receiver hardware |
| Ettus USRP | [ettus.com](https://www.ettus.com/) | SDR platform that can transmit and receive |
| FlexRadio | [flexradio.com](https://www.flexradio.com/) | amateur-radio SDR; software is SmartSDR |

## 3.6 Over-the-air signals / off-grid

**Open source:** dump1090 (FlightAware 1,137 / antirez 2,929) · Meshtastic firmware 8,223

**Paid:** LoRa handhelds / finished Meshtastic units (hardware buyout). ADS-B receive with an RTL-SDR dongle is also hardware you buy.
