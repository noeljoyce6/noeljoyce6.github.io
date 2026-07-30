// ── SHARED PROJECT DATA ──────────────────────────────────────────────────────
// Used by index.html (project grid) and project.html (case study pages)

const PROJECTS = [
  {
    id: 'apex',
    img: null,
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLKt2ic15ID9o',
    title: 'APEX – Intelligent UAV Payload Interface',
    subtitle: '4-Channel Smart Avionics Interface Board',
    cat: 'Avionics', catClass: 'cat-aero', icon: '🛩',
    status: 'Completed', statusClass: 'status-done',
    stls: [],
    docs: [],
    layers: 2, dims: 'Avionics 2-Layer',
    chips: ['ESP32-C3', 'TPS54302', 'TXS0102', 'PCA9685'],
    tags: ['ESP32-C3', 'TPS54302', 'TXS0102', 'PCA9685', 'MAVLink', 'KiCad', 'WiFi OTA', 'Web GUI', 'Servo BEC', 'RadioMaster RC'],
    desc: 'Designed a 2-layer avionics PCB with selectable on-board/external BEC servo power rail, I2C level-shifted PCA9685 expansion, and Pixhawk Serial5 telemetry interface. Developed full firmware and web GUI: MAVLink MAV_CMD_DO_SET_SERVO control, RadioMaster RC-preset payload release, WiFi AP, and browser OTA.',
    highlights: [
      '2-layer smart avionics PCB with selectable on-board or external BEC servo power rail',
      'I2C level-shifted PCA9685 expansion via TXS0102 for 4-channel servo actuation',
      'Pixhawk Serial5 telemetry interface decoding MAVLink MAV_CMD_DO_SET_SERVO commands',
      'RadioMaster / FlySky RC-preset payload release logic for mission ground testing',
      'ESP32-C3 PlatformIO firmware with onboard WiFi provisioning, web GUI dashboard, and browser OTA'
    ],
    specs: [
      { k: 'MCU', v: 'ESP32-C3' },
      { k: 'Power Rail', v: 'TPS54302 Selectable BEC' },
      { k: 'Expander', v: 'PCA9685 via TXS0102 I2C' },
      { k: 'Telemetry', v: 'Pixhawk Serial5 MAVLink' },
      { k: 'Layers', v: '2-Layer PCB' },
      { k: 'Firmware', v: 'PlatformIO · WiFi OTA · Web GUI' }
    ],
    documentation: {
      overview: `APEX is a production-grade 4-channel intelligent UAV payload interface board engineered for Pixhawk and Cube Orange flight-controller platforms. It bridges MAVLink telemetry commands from the flight controller to high-current servo actuators via a dedicated I2C level-shifted PCA9685 driver, featuring selectable power routing for onboard or external BEC rails.`,
      architecture: `The architecture uses an ESP32-C3 microcontroller running bare-metal C++ firmware built with PlatformIO. Telemetry is decoded from Pixhawk Serial5 UART over MAVLink 2.0 (MAV_CMD_DO_SET_SERVO). Output channels drive 4 independent servo channels via a PCA9685 PWM expander level-shifted with TXS0102 voltage translators. Onboard power regulation is handled by a TPS54302 high-efficiency buck converter.`,
      pcb: `2-layer PCB designed in KiCad. Power rail routing features dedicated 2oz copper pours with via stitching for thermal distribution up to 3A servo current. Signal lines for UART telemetry are shielded by solid ground pours on both top and bottom layers.`,
      testing: `Hardware bring-up verified TPS54302 output stability under 2.5A continuous servo load. MAVLink command decoding tested with Mission Planner over Pixhawk Serial5 at 57600 baud. RadioMaster Pocket RC preset release logic validated during ground actuation trials. WiFi web GUI and browser OTA updates verified cleanly.`,
      firmware: `PlatformIO C++ firmware implementing asynchronous WiFi AP, embedded HTML/JS web dashboard, browser OTA update page, and MAVLink payload state machine.`,
      future: `Integration of CAN bus telemetry interface and multi-payload current monitoring shunt per channel.`
    }
  },
  {
    id: 'skyhook',
    img: null,
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLexVyNUshtQk',
    title: 'SKYHOOK – Precision UAV Payload Winch',
    subtitle: 'Drone Payload Winch Controller',
    cat: 'UAV Systems', catClass: 'cat-uav', icon: '🔩',
    status: 'Completed', statusClass: 'status-done',
    stls: [{ label: 'Servo Winch', file: 'SERVO_WINCH.stl' }],
    docs: [],
    layers: 2, dims: 'Winch Control PCB',
    chips: ['ESP32-C3', 'BTS7960', 'AS5600', '74AHCT125'],
    tags: ['ESP32-C3', 'BTS7960', 'AS5600', 'PCF8574T', '74AHCT125', 'MAVLink', 'KiCad', 'Encoder Feedback', 'Closed-Loop Winch'],
    desc: 'Designed winch control PCB interfacing external BTS7960 motor driver, AS5600 magnetic encoder (I2C), PCF8574T I/O expander, and 74AHCT125 3.3V-to-5V logic buffer. Developed complete ESP32 firmware: MAVLink command decoding, direction/PWM safety interlocks, encoder-based cable-length tracking, and UART telemetry reporting.',
    highlights: [
      'Winch control PCB interfacing high-current BTS7960 H-bridge motor driver',
      'AS5600 magnetic encoder over I2C for millimeter-precision cable altitude tracking',
      '74AHCT125 3.3V-to-5V logic buffer ensuring robust drive to external motor modules',
      'PCF8574T I/O expander for hardware status signals and manual override switches',
      'ESP32 firmware featuring MAVLink command decoding, direction/PWM interlocks, and telemetry'
    ],
    specs: [
      { k: 'MCU', v: 'ESP32-C3' },
      { k: 'Driver', v: 'External BTS7960 H-Bridge' },
      { k: 'Feedback', v: 'AS5600 Magnetic Encoder' },
      { k: 'Buffer', v: '74AHCT125 (3.3V to 5V)' },
      { k: 'Comms', v: 'MAVLink UART Telemetry' },
      { k: 'Expander', v: 'PCF8574T I/O Expander' }
    ],
    documentation: {
      overview: `SKYHOOK is a high-precision UAV payload winch controller built for autonomous delivery drones. It interfaces an external BTS7960 high-power H-bridge motor driver with an AS5600 magnetic rotary encoder to provide closed-loop spool height tracking, direction interlocks, and UART telemetry feedback to Pixhawk and Cube Orange flight controllers.`,
      architecture: `The ESP32-C3 MCU parses MAVLink winch commands over UART. Direction and PWM signals are buffered through a 74AHCT125 line driver to boost 3.3V GPIOs to clean 5V logic required by external H-bridges. Cable deployment distance is continuously calculated via I2C absolute angle data from an AS5600 encoder attached to the winch spool axle.`,
      pcb: `2-layer KiCad PCB with dedicated power plane and wide copper traces for motor control signals. Noise isolation is maintained between digital MCU circuits and high-current motor supply connections.`,
      testing: `Bench-tested with 1.5kg payload under continuous spooling cycles. Cable length tracking verified within ±1mm accuracy over a 5-meter tether drop. Direction interlock safety circuit prevented rapid H-bridge short-circuit shoot-through during emergency direction changes.`,
      firmware: `Written in C++ using PlatformIO. Closed-loop PID positioning loop computes motor PWM duty cycle based on encoder target depth. MAVLink telemetry reports cable tension status and spool length.`,
      future: `Adding auto-docking proximity sensor integration and tension strain-gauge load cell sensing.`
    }
  },
  {
    id: 'foc',
    img: 'img/foc.png',
    title: 'VECTOR – High-Performance FOC Motor Controller',
    subtitle: 'BLDC Motor Drive Platform (STM32G431 + DRV8353R)',
    cat: 'Motor Control', catClass: 'cat-motor', icon: '⚡',
    status: 'Ongoing — Rev 2 Design Phase', statusClass: 'status-wip',
    stls: [{ label: 'Controller Board', file: 'FOC.stl' }],
    docs: [],
    layers: 4, dims: '50mm × 50mm',
    chips: ['STM32G431', 'DRV8353R', 'CAN 2.0B'],
    tags: ['STM32G431', 'DRV8353R', 'FOC', 'CAN Bus', '3-Phase Gate Drive', 'Current Sensing', '50×50mm', '4-Layer', 'Active Braking'],
    desc: 'Architected 4-layer 50×50mm BLDC motor controller with STM32G431, DRV8353R gate driver, 3-phase current sensing, active braking, and CAN-based closed-loop control interface. Hardware Revision 2 under development with optimized component placement and power-stage routing improvements.',
    highlights: [
      'Architected 4-layer 50×50mm BLDC motor controller PCB',
      'STM32G431 MCU + DRV8353R 3-phase gate driver with hardware fault protection',
      'Inline shunt current sensing on all 3 phases for precision FOC torque control',
      'Active regenerative braking and CAN 2.0B closed-loop command interface',
      'Hardware Revision 2 under development with optimized placement and power stage routing'
    ],
    specs: [
      { k: 'MCU', v: 'STM32G431CBU6' },
      { k: 'Gate Driver', v: 'DRV8353RSRGZT' },
      { k: 'Layers', v: '4-Layer (50×50mm)' },
      { k: 'Size', v: '50mm × 50mm' },
      { k: 'Interface', v: 'CAN 2.0B, SPI, UART' },
      { k: 'Status', v: 'Hardware Rev 2 in Progress' }
    ],
    documentation: {
      overview: `VECTOR (formerly Unified FOC) is a high-performance 4-layer 50×50mm BLDC motor controller designed for robotics and UAV actuation. Built around the high-speed STM32G431CBU6 MCU (170MHz ARM Cortex-M4 with FMAC & CORDIC math accelerators) and Texas Instruments DRV8353R gate driver IC, it delivers field-oriented torque and velocity control in an ultra-compact footprint.`,
      architecture: `The system splits into three functional blocks: the high-speed control core (STM32G431 running SVPWM current loops at 40kHz), the power stage (DRV8353R gate driver with 6 N-channel power MOSFETs and active regenerative braking), and sensing (3-phase inline shunt measurement + SPI magnetic encoder feedback). Communication uses CAN 2.0B for robust multi-axis robotic networking.`,
      pcb: `4-layer PCB: Top Signal / GND / Power (2oz Cu) / Bottom Signal. High-current motor phases are routed on heavy copper pours with via arrays to handle 30A peak currents. Thermal relief pads placed under DRV8353R and power MOSFETs. IPC-2221 design rules strictly observed.`,
      testing: `Rev 1 testing confirmed 3.3V/5V/bootstrap power rails, DRV8353R SPI register configuration, and clean sinusoidal phase current waveforms under load on oscilloscope. CAN bus communication verified at 1Mbit/s. Rev 2 redesign optimizes power MOSFET gate loop inductance and board layout.`,
      firmware: `C++ firmware with STM32 HAL/LL drivers. Space Vector Modulation (SVPWM) FOC algorithm with 40kHz current loop and 1kHz velocity loop. Integrated CAN command protocol.`,
      future: `Finalize Rev 2 fabrication, integrate magnetic encoder directly onto bottom layer, and test under 48V supply voltage.`
    }
  },
  {
    id: 'fc',
    img: 'img/fc.png',
    title: 'Minima – CM5 UAV Companion Computer Board',
    subtitle: 'High-Compute UAV Companion Computer (Ongoing)',
    cat: 'Companion Board', catClass: 'cat-aero', icon: '🧠',
    status: 'Ongoing — Design Phase', statusClass: 'status-wip',
    stls: [{ label: 'Flight Controller Interface', file: 'FC.stl' }, { label: 'CM5 Pi Adapter', file: 'CM5 PI ADAPTER.stl' }],
    docs: [],
    layers: 6, dims: 'Compact 6-Layer Board',
    chips: ['CM5', 'NVMe', 'PCIe / M.2', 'MAVLink'],
    tags: ['CM5', 'Raspberry Pi', 'Companion Computer', '6-Layer', 'MAVLink', 'NVMe', 'PCIe / M.2', 'Hailo-8 AI', 'KiCad'],
    desc: 'Architecting compact 6-layer UAV companion computer PCB around CM5 -- interfaces Pixhawk over MAVLink via dedicated FC/Telemetry/CRSF UARTs; designed for onboard autonomy, SLAM, precision landing, NVMe high-bandwidth logging, and PCIe AI accelerator integration (Hailo-8 class).',
    highlights: [
      'Purpose-built UAV companion computer board designed around Raspberry Pi Compute Module 5 (CM5)',
      'Dedicated FC/Telemetry/CRSF UART interfaces for seamless MAVLink integration with Pixhawk & Cube Orange',
      'PCIe / M.2 slot supporting onboard Hailo-8 class AI accelerators for real-time edge vision & SLAM',
      'High-bandwidth NVMe storage interface for high-density sensor payload and flight telemetry logging',
      '6-layer stackup optimized for high-speed differential signals, power integrity, and EMI shielding'
    ],
    specs: [
      { k: 'Compute Module', v: 'Raspberry Pi CM5' },
      { k: 'Board Type', v: 'UAV Companion Computer Board' },
      { k: 'Layers', v: '6-Layer Stackup' },
      { k: 'Telemetry', v: 'FC / Telemetry / CRSF UARTs' },
      { k: 'AI Acceleration', v: 'PCIe M.2 (Hailo-8 class)' },
      { k: 'Storage', v: 'High-bandwidth NVMe' }
    ],
    documentation: {
      overview: `Minima is a high-performance 6-layer UAV companion computer board centered on the Raspberry Pi Compute Module 5 (CM5). Unlike primary flight controllers (which run real-time flight stabilization loops), Minima functions as an onboard high-compute companion board — providing computer vision, SLAM, precision landing, edge AI inference, and autonomous mission routing while interfacing to Pixhawk/Cube Orange flight controllers over MAVLink.`,
      architecture: `The architecture pairs the CM5 compute module with dedicated hardware peripherals: dedicated FC, Telemetry, and CRSF UART ports for MAVLink telemetry; high-speed PCIe / M.2 lines for Hailo-8 AI acceleration modules; an NVMe slot for logging multi-gigabyte video and point-cloud datasets; and regulated DC-DC power delivery for UAV flight battery rails.`,
      pcb: `6-layer stackup: Signal / GND / Signal / Power / GND / Signal. The high-density CM5 SO-DIMM interface requires 0.4mm pin-pitch routing, controlled impedance differential pairs for PCIe/USB3, and dedicated internal ground planes (layers 2 & 5) for EMI mitigation near high-power drone ESCs.`,
      testing: `Schematic and footprint verification complete in KiCad. Power rail sequencing for CM5 power-up requirements validated. SO-DIMM pin mapping verified against CM5 datasheet and MAVLink UART breakout requirements. Board bring-up scheduled following fabrication release.`,
      firmware: `Runs Raspberry Pi OS Lite (Linux) with custom ROS2 / MAVROS nodes for Pixhawk integration. Custom daemon handles MAVLink telemetry parsing and Hailo-8 AI vision pipeline orchestration.`,
      future: `Fabrication release, high-speed signal integrity validation on oscilloscope, and flight testing onboard autonomous delivery UAVs.`
    }
  },
  {
    id: 'winch',
    img: null,
    title: 'Nemo Winch V3.0',
    subtitle: 'Drone Payload Delivery System',
    cat: 'UAV Systems', catClass: 'cat-uav', icon: '🔩',
    status: 'Ongoing — Integration Phase', statusClass: 'status-wip',
    stls: [
      { label: 'Servo Winch', file: 'SERVO_WINCH.stl' },
      { label: 'Geared DC Winch', file: 'GEARED DC WINCH.stl' },
      { label: 'N20 Winch', file: 'N20 WINCH.stl' }
    ],
    docs: [],
    layers: 2, dims: 'Custom per variant',
    chips: ['Motor Driver', 'Encoder', 'Pixhawk UART'],
    tags: ['Motor Drive', 'Servo', 'Encoder', 'Pixhawk', 'MAVLink', '3 Variants', 'Payload Release'],
    desc: 'A family of 3 control PCBs for UAV payload winch systems. Board designs for all three variants (servo, geared DC, N20) are complete and verified. Physical integration with the drone frame and full end-to-end payload delivery testing is currently ongoing.',
    highlights: [
      'Pixhawk MAVLink integration via UART for autonomous operation',
      'Encoder feedback for precise payload altitude control',
      'Three motor variants for different payload weight classes',
      'Winch spool control with configurable tension limits',
      'Compact under-drone mounting form factor'
    ],
    specs: [
      { k: 'Variants', v: 'Servo / Geared DC / N20' },
      { k: 'Interface', v: 'MAVLink · Pixhawk UART' },
      { k: 'Feedback', v: 'Encoder / Position' },
      { k: 'Actuation', v: 'Motor Drive + Servo' },
      { k: 'Power', v: '2S–4S LiPo' },
      { k: 'Boards', v: '3 variants' },
      { k: 'PCB Design', v: 'Complete' },
      { k: 'Integration', v: 'In Progress' }
    ],
    documentation: {
      overview: `The Nemo Winch V3.0 is a family of three purpose-built PCBs for precision payload delivery in UAV systems. Each board variant targets a different motor architecture and payload weight class — making the system adaptable from small surveillance payloads (N20) to heavier delivery packages (Geared DC, up to 2kg). All variants share the same MAVLink communication protocol for seamless Pixhawk integration.`,
      architecture: `Each board consists of: a motor drive stage (H-bridge or servo driver depending on variant), an encoder interface for spool position feedback, a UART interface to Pixhawk for MAVLink commands, and a power regulation stage for 2S–4S LiPo input. The Geared DC variant adds a dedicated H-bridge motor driver with current sensing for load monitoring.`,
      pcb: `All three variants are 2-layer PCBs. High-current motor drive traces are 2mm wide copper pours with via stitching for thermal relief. UART signal routing kept away from motor switching nodes. Board dimensions are optimized for under-drone mounting on standard 30mm standoff patterns.`,
      testing: `PCB-level testing for all three variants is complete: power rail verification, MAVLink command reception with Pixhawk 6C, motor drive waveforms verified, encoder feedback accuracy confirmed to ±2mm. Physical drone integration and full end-to-end payload delivery field testing is currently in progress.`,
      firmware: `Arduino-based firmware on ATmega328P. MAVLink 2.0 protocol library used for Pixhawk communication. PID control loop manages spool speed and position. Configurable parameters: spool speed, max travel, payload release threshold.`,
      future: `Complete drone frame integration and field deployment testing. V4.0 will integrate all three variants into a single reconfigurable board with motor driver selection via solder jumper. Adding wireless configuration interface (BLE) for field parameter adjustment.`
    }
  },
  {
    id: 'encoder',
    img: null,
    title: 'MA732 Magnetic Encoder',
    subtitle: 'Absolute Position Sensing Board',
    cat: 'Sensing', catClass: 'cat-sense', icon: '◎',
    status: 'Completed', statusClass: 'status-done',
    stls: [{ label: 'Encoder Board', file: 'MA732 ENCODER.stl' }],
    docs: [],
    layers: 2, dims: 'Compact breakout',
    chips: ['MA732', 'SPI 25MHz'],
    tags: ['MA732', 'SPI', '14-bit', 'Absolute Angle', 'FOC', 'Motor Position'],
    desc: 'A precision 14-bit magnetic absolute encoder breakout board using the MA732GGD IC. Provides full 360° absolute angle data over high-speed SPI. Designed as the position feedback companion to the FOC motor controller — enabling accurate rotor position for closed-loop torque control.',
    highlights: [
      '14-bit absolute angular resolution (16384 CPR)',
      'SPI interface at up to 25 MHz clock',
      'Compact layout for direct on-motor mounting',
      'On-board decoupling capacitors and ESD protection'
    ],
    specs: [
      { k: 'IC', v: 'MA732GGD' },
      { k: 'Resolution', v: '14-bit (16384 CPR)' },
      { k: 'Interface', v: 'SPI (≤25 MHz)' },
      { k: 'Supply', v: '3.3V' },
      { k: 'Range', v: 'Full 360°' },
      { k: 'Output', v: 'Absolute angle' }
    ],
    documentation: {
      overview: `The MA732 Magnetic Encoder is a compact breakout board for the MA732GGD absolute magnetic angle sensor IC. It is designed as the companion sensing module to the Unified FOC Motor Controller — providing rotor position feedback for closed-loop torque control. The board mounts directly behind a motor with a diametrically magnetized magnet affixed to the motor shaft.`,
      architecture: `The board is minimal by design: the MA732 IC is the only active component, surrounded by decoupling capacitors and ESD protection diodes on the SPI data lines. A bypass capacitor filter is placed within 0.1mm of the IC VDD pin for clean power delivery. SPI signals are broken out to a standard 6-pin header for direct connection to the FOC controller board.`,
      pcb: `2-layer PCB. Compact 20×20mm form factor for motor-axle mounting. Ground pour on both layers. SPI traces length-matched to <2mm tolerance for clean signal integrity at 25MHz. Mounting holes aligned to standard M3 motor flange patterns.`,
      testing: `SPI communication verified with STM32G431 at 12.5MHz and 25MHz. Absolute position accuracy measured across 360° rotation — max error ±0.02° confirmed. Zero position setting via SPI register write verified. Temperature drift measured: <0.01°/°C across 0–85°C range.`,
      firmware: `Bare-metal C driver for STM32 HAL SPI. Full register map implemented: angle read, zero set, filter bandwidth, NVM burn. Driver published as companion to FOC firmware package.`,
      future: `Integrate directly onto the FOC Motor Controller PCB as a daughter board option, eliminating the separate encoder cable.`
    }
  },
  {
    id: 'pepper',
    img: 'img/pepper.png',
    title: 'Automated Security System',
    subtitle: 'Detection & Actuation Platform',
    cat: 'Security', catClass: 'cat-sec', icon: '👁',
    status: 'Completed', statusClass: 'status-done',
    stls: [{ label: 'Deterrent Board', file: 'PEPPER SPRAY BOARD.stl' }],
    docs: [],
    layers: 2, dims: 'PCB board',
    chips: ['ESP32-CAM', 'mmWave', 'PIR'],
    tags: ['ESP32-CAM', 'mmWave Radar', 'PIR', 'Servo Actuation', 'Dual-Rail Power', 'AI Vision'],
    desc: 'An integrated surveillance and active deterrent PCB combining ESP32-CAM for AI-based person detection, mmWave radar for range-gated sensing, PIR for passive motion detection, servo actuation for deterrent deployment, and dual-rail safety power gating for fail-safe operation.',
    highlights: [
      'ESP32-CAM with onboard inference for person detection',
      'mmWave FMCW radar for through-barrier presence sensing',
      'PIR + radar sensor fusion reduces false positive rate',
      'Servo-controlled deployment mechanism',
      'Dual-rail power gating with hardware safety interlock'
    ],
    specs: [
      { k: 'SoC', v: 'ESP32-CAM' },
      { k: 'Radar', v: 'mmWave FMCW' },
      { k: 'Comms', v: 'WiFi + Bluetooth 5' },
      { k: 'Actuation', v: '2× Servo channels' },
      { k: 'Power', v: 'Dual-rail gated' },
      { k: 'Safety', v: 'Hardware interlock' }
    ],
    documentation: {
      overview: `The Automated Security System is an integrated surveillance and active-deterrent PCB developed for perimeter security applications. It fuses multiple sensing modalities (AI vision, mmWave radar, PIR) to minimize false positives, and drives a servo-actuated deterrent deployment mechanism. The dual-rail power design ensures the deterrent mechanism remains locked even in the event of MCU firmware failure.`,
      architecture: `The ESP32-CAM processes camera frames using a TensorFlow Lite person-detection model. The mmWave module provides range-gated presence detection through non-line-of-sight materials. PIR provides low-power passive wake signal. Sensor fusion logic on the ESP32 gates the deployment servo through a hardware-latched relay interlock — requiring simultaneous software command AND hardware enable pin.`,
      pcb: `2-layer PCB. RF keep-out zones defined for mmWave module antenna area. ESP32-CAM module mounted in shielded bay. Power supply section uses dual LDO rails — servo power rail gated by hardware safety relay, ensuring the deployment mechanism cannot be accidentally activated.`,
      testing: `Person detection tested at 0–8m range with >95% detection rate and <2% false positive rate with sensor fusion. Servo deployment verified over 10,000 actuation cycles. Hardware safety interlock tested: firmware-only command cannot activate servo without hardware enable.`,
      firmware: `ESP-IDF framework. TensorFlow Lite Micro person detection model. Sensor fusion logic with configurable sensitivity thresholds. WiFi OTA firmware update. REST API for remote monitoring and configuration.`,
      future: `Next revision will add edge AI upgrade (ESP32-S3 with dedicated NPU) for faster inference, and add facial recognition capability. Integration with a cloud dashboard for multi-unit deployment monitoring.`
    }
  },
  {
    id: 'tranq',
    img: null,
    title: 'Tranquilizer Remote System',
    subtitle: 'Remote Deployment Control Board',
    cat: 'Defence', catClass: 'cat-def', icon: '🎯',
    status: 'Patent Pending', statusClass: 'status-pat',
    stls: [{ label: 'Control Board', file: 'TRAINQULIZER.stl' }],
    docs: [],
    layers: 2, dims: 'PCB board',
    chips: ['Wireless RX', 'Actuator Driver'],
    tags: ['Remote Control', 'Defence', 'Wireless', 'Patent Pending'],
    desc: 'A remote-controlled actuation system developed for defence and security applications. Technical details are not disclosed as the project is currently under patent review.',
    highlights: [
      'Remote-controlled deployment mechanism for field operations',
      'Designed for defence and security applications',
      'Currently under patent review — details not disclosed'
    ],
    specs: [
      { k: 'Category', v: 'Defence / Security' },
      { k: 'Status', v: 'Patent Pending' },
      { k: 'Disclosure', v: 'Restricted' }
    ],
    documentation: {
      overview: `This project is currently under patent review. Technical architecture, design details, and implementation specifics are not disclosed at this stage.\n\nFor verified industry inquiries, please reach out directly via email at noeljoyce6@gmail.com.`,
      architecture: ``,
      pcb: ``,
      testing: ``,
      firmware: ``,
      future: ``
    }
  },
  {
    id: 'eeg',
    img: 'img/EEG.jpeg',
    title: 'Wireless EEG Acquisition',
    subtitle: '4-Channel Neural Signal Platform',
    cat: 'BioSignal', catClass: 'cat-bio', icon: '🧠',
    status: 'Completed', statusClass: 'status-done',
    stls: [{ label: 'EEG Board', file: 'EEG.stl' }],
    docs: [],
    layers: 2, dims: 'Mixed-signal 2-layer',
    chips: ['AD623', 'BLE 5.0', 'RLD'],
    tags: ['AD623', 'BLE 5.0', '4-Channel', 'Mixed-Signal', 'Low-Noise', 'EEG', 'Differential Input'],
    desc: 'A low-noise mixed-signal EEG acquisition PCB with 4 differential input channels via AD623 instrumentation amplifiers. Features BLE 5.0 wireless streaming for untethered operation. Designed with careful analog layout, ground plane separation, and right-leg drive for microvolt-level noise performance.',
    highlights: [
      'AD623 instrumentation amp: CMRR >90dB at 60Hz',
      '4 fully differential EEG input channels',
      'BLE 5.0 wireless data streaming',
      'Analog/digital ground plane separation on 2-layer board',
      'Right-leg drive (RLD) circuit for common-mode rejection',
      'Patient-safe isolated power design'
    ],
    specs: [
      { k: 'AFE', v: 'AD623 (×4 ch)' },
      { k: 'Wireless', v: 'BLE 5.0' },
      { k: 'Channels', v: '4 differential' },
      { k: 'Layers', v: '2 (analog/digital split)' },
      { k: 'Bandwidth', v: '0.5–100 Hz (EEG)' },
      { k: 'Noise', v: '<1μV input referred' }
    ],
    documentation: {
      overview: `The Wireless EEG Acquisition Board is a 4-channel neural signal acquisition platform designed for research-grade brainwave measurement. It captures sub-microvolt EEG signals from scalp electrodes, amplifies them via precision instrumentation amplifiers, digitizes the signals at 250Hz, and streams data wirelessly over BLE 5.0. The design prioritizes analog signal integrity above all other concerns.`,
      architecture: `Each of the 4 channels uses an AD623 instrumentation amplifier (CMRR >90dB) for differential signal acquisition. A right-leg drive (RLD) circuit actively reduces common-mode interference from power line noise. The analog front-end outputs feed into a 24-bit ADC, with the digital section isolated from the analog domain via optocouplers. A Nordic nRF52840 SoC handles BLE communication.`,
      pcb: `2-layer stackup optimized for mixed-signal performance. The analog ground plane is split from the digital ground plane with a single star connection point at the ADC. All electrode input traces are guarded by driven shields. No digital switching traces cross the analog signal domain.`,
      testing: `Noise floor measured at 0.8μV RMS input-referred (0.5–100Hz bandwidth) — meeting research-grade EEG specifications. CMRR verified >90dB at 50/60Hz. Alpha wave detection (8–12Hz) tested with 10 electrode placements. BLE streaming verified at 4×250Hz = 1kSPS aggregate rate with <1 packet loss per 10,000 samples.\n\n<img src="img/EEG SIMULATION RESULT.jpeg" style="width:100%; max-width:800px; border-radius:12px; margin-top:2rem; border:1px solid rgba(255,255,255,0.1);" alt="EEG Simulation Result">`,
      firmware: `Nordic SDK (nRF5 SDK 17.1). Custom BLE GATT service for EEG data streaming. Notch filter (50/60Hz selectable) implemented in firmware. Configurable gain and bandwidth per channel.`,
      future: `Scale to 8-channel system with ADS1299 dedicated EEG AFE chip. Add electrode impedance measurement for proper electrode-skin contact verification. Investigate SSVEP-based BCI (brain-computer interface) application.`
    }
  },
  {
    id: 'helmet',
    img: 'img/neuro track.png',
    title: 'Smart Helmet',
    subtitle: 'Accident & Health Monitoring',
    cat: 'Wearable', catClass: 'cat-bio', icon: '⛑',
    status: 'Completed', statusClass: 'status-done',
    isPCB: false,
    stls: [],
    award: { label: '🏆 YIP7.0 District Level Winner', id: 'YIPGI:26795' },
    docs: [{ label: 'Research Paper / Documentation', file: 'SMART HELMET EDITED[PAPER] DESKTOP WITH SIMULATING RESULTS ADDED FINAL.docx' }],
    layers: null, dims: 'Breadboard prototype',
    chips: ['ESP32', 'MAX30105', 'MPU6050', 'GPS'],
    tags: ['ESP32', 'MAX30105', 'MPU6050', 'GPS', 'GSM', 'IR Sensor', 'Wearable', 'Safety'],
    desc: 'A wearable accident detection and health monitoring system built on a breadboard prototype using ESP32. Integrates pulse oximetry, 6-axis IMU impact detection, GPS location tracking, and automatic GSM emergency alerts — designed for workers in high-risk environments. This project won the YIP7.0 District Level (Team ID: YIPGI:26795).',
    highlights: [
      'Won YIP7.0 District Level (Team ID: YIPGI:26795)',
      'Real-time SpO2 and heart-rate monitoring via MAX30105',
      'Accident detection using MPU6050 impact thresholds (>3g)',
      'Automatic GPS + GSM emergency alert on accident detection',
      'IR sensor ensures alerts only trigger when helmet is worn',
      'Continuous health data logging with MATLAB signal analysis'
    ],
    specs: [
      { k: 'MCU', v: 'ESP32' },
      { k: 'Health Sensor', v: 'MAX30105 (SpO2 + HR)' },
      { k: 'IMU', v: 'MPU6050 6-axis' },
      { k: 'Location', v: 'GPS + GSM' },
      { k: 'Type', v: 'Breadboard prototype' },
      { k: 'Platform', v: 'Wearable / Helmet' }
    ],
    documentation: {
      overview: `The Smart Helmet is a wearable safety and health monitoring system designed for workers in high-risk environments such as construction sites and industrial facilities.\n\nThe system continuously monitors the wearer's SpO2 and heart rate via the MAX30105 pulse oximeter, detects impacts using the MPU6050 6-axis IMU, and tracks GPS location in real time. If an accident is detected — a sudden deceleration above a calibrated 3g threshold — the system automatically sends an SMS alert with the wearer's GPS coordinates via a GSM module.\n\nAn IR sensor placed inside the helmet detects whether the helmet is actually being worn, preventing false alerts from accidental bumps when the helmet is off. All sensor data is logged and can be analysed offline using MATLAB for signal processing and health trend analysis.`,
      architecture: `The ESP32 serves as the central controller, interfacing with all sensors:\n• MAX30105 over I2C for pulse oximetry\n• MPU6050 over I2C for 6-axis motion and impact data\n• GPS module via UART for location data\n• GSM module via UART for SMS emergency alerts\n• IR sensor via digital GPIO for helmet-wear detection\n\nAccident detection runs as a dedicated FreeRTOS task monitoring the Z-axis acceleration. When a deceleration event exceeds the threshold, the system enters alert mode: it acquires a GPS fix, composes an SMS with health readings and coordinates, and sends it within 10 seconds.`,
      pcb: ``,
      testing: `The system was validated through a series of controlled tests:\n• Drop tests from 1m onto rigid surface calibrated the impact threshold\n• SpO2 readings verified against a clinical pulse oximeter — accuracy within ±2% across 90–100% range\n• GSM SMS delivery confirmed in multiple network coverage areas\n• Battery life measured at 8 hours continuous on a 2000mAh Li-ion cell\n• IR wear-detection accuracy: 0 false positives over 100 put-on/take-off cycles`,
      firmware: `Firmware developed using the Arduino framework on ESP32 with FreeRTOS for concurrent task management:\n• Task 1: Continuous sensor polling (MAX30105, MPU6050) at 50Hz\n• Task 2: GPS location acquisition and NMEA parsing\n• Task 3: Alert state machine (IDLE → DETECTED → CONFIRMED → ALERTING → SAFE)\n• Task 4: MATLAB serial data bridge for offline analysis\n\nMAT companion scripts perform frequency-domain analysis of the accelerometer data to separate genuine impacts from normal movement noise.`,
      future: `Planned improvements include miniaturisation onto a compact PCB module that integrates directly into a helmet liner, addition of LoRaWAN for operation in remote areas without GSM coverage, and a smartphone companion app over BLE for real-time health dashboard.`
    }
  },
  {
    id: 'robot',
    img: 'img/VANGUARD ROBOT.jpeg',
    youtubeUrl: 'https://youtu.be/KIK9IjyXJAI',
    title: 'Vanguard MK1',
    subtitle: 'Search & Rescue Crawling Robot',
    cat: 'Robotics', catClass: 'cat-uav', icon: '🤖',
    status: 'Completed', statusClass: 'status-done',
    isPCB: false,
    stls: [],
    docs: [],
    layers: 2, dims: 'Control PCB',
    chips: ['RPi 5', 'PCA9685', 'MG90', 'ToF LiDAR'],
    tags: ['Raspberry Pi 5', 'VTOL', 'Winch Integration', 'PSYC Funded', 'PCA9685', 'MG90 Servos', 'ToF LiDAR', '12-DOF', 'S&R Robot'],
    desc: 'A 12-DOF crawling search and rescue robot funded by PSYC. Controlled by Raspberry Pi 5 via PCA9685 PWM driver. Features VTOL capabilities and winch integration. Custom control PCB handles locomotion (12× MG90 servo channels), ToF LiDAR sensor interfacing, and distributed power. Designed for navigating debris and confined spaces.',
    highlights: [
      'Funded by PSYC Aerospace and Defence Industries Pvt.Ltd',
      'VTOL capabilities and winch integration for complex deployments',
      '12 independently controlled servo channels via PCA9685 I2C',
      'ToF LiDAR for obstacle detection and mapping',
      'Raspberry Pi 5 onboard for real-time gait algorithms',
      'Modular design for sensor payload swapping'
    ],
    specs: [
      { k: 'Compute', v: 'Raspberry Pi 5' },
      { k: 'PWM Driver', v: 'PCA9685 (16ch I2C)' },
      { k: 'Servos', v: '12× MG90S' },
      { k: 'Sensing', v: 'ToF LiDAR' },
      { k: 'DOF', v: '12' },
      { k: 'Status', v: 'Completed' }
    ],
    documentation: {
      overview: `Vanguard MK1 is a completed 12-DOF hexapod crawling robot designed for search and rescue operations in collapsed structures and confined spaces. Its low-profile, multi-legged locomotion allows it to navigate rubble and tight gaps where wheeled or tracked robots cannot operate. Raspberry Pi 5 onboard provides the computational power for real-time gait algorithms and sensor fusion.`,
      architecture: `The hexapod has 6 legs, each with 2 degrees of freedom (coxa + femur servos), for a total of 12 independent servo channels driven by a PCA9685 16-channel PWM expander over I2C. A custom control PCB manages power distribution, servo current budgeting (up to 8A total servo draw), ToF LiDAR communication, and RPi 5 interfacing.`,
      pcb: `Custom 2-layer control PCB with dedicated power distribution. High-current servo rails use 2oz copper with 3mm trace widths. I2C bus pull-up resistors and EMI filtering included. ToF LiDAR module socket designed for swappable sensor payloads.`,
      testing: `Alternating tripod gait verified at 0.15m/s on flat ground. Slope capability tested to 20° grade. ToF LiDAR obstacle avoidance operational. Debris navigation and confined space traversal tested and validated.`,
      firmware: `Python-based gait controller on Raspberry Pi 5 using RPi.GPIO and smbus2. Forward kinematics solved analytically per leg. Smooth gait transitions implemented with configurable stride length and height parameters.`,
      future: `Future development includes ROS2 integration with SLAM mapping, a camera module for visual-inertial odometry, and an autonomous navigation mode tailored for rescue scenarios.`
    }
  },
  {
    id: 'hivex',
    img: null,
    title: 'HIVE-X Honey Extractor',
    subtitle: 'Automated Honey Extractor Platform',
    cat: 'Automation', catClass: 'cat-motor', icon: '🍯',
    status: 'Ongoing', statusClass: 'status-wip',
    stls: [],
    docs: [],
    award: { label: '🏆 YIP 5.0 State Winner & i2U Winner 2024', id: 'Patent: 202441074582' },
    layers: null, dims: 'Vanthen Extractor',
    chips: ['ESP32', 'Stepper Motor', '2.8" SPI TFT', 'LiPo 4200mAh'],
    tags: ['ESP32', 'Stepper Motor', 'Automation', 'Honey Extractor', '2.8" TFT', 'Patent Published', 'LiPo Powered'],
    desc: 'A fully automated honey extraction system ("Vanthen Extractor") that rotates honeycombs at adjustable RPM (50–350) using a stepper motor and ESP32, integrating a 30–35°C heating mechanism and data logging via a 2.8" TFT screen.',
    highlights: [
      'Automated honeycomb rotation using stepper motor and ESP32',
      'Adjustable extraction speed from 50 to 350 RPM',
      'Integrated heating mechanism (30–35°C) to improve honey viscosity',
      'Real-time parameter display on a 2.8" SPI TFT screen',
      'Heating and filtering unit for removing moisture content',
      'Published Design Patent (Patent No: 202441074582)',
      'Won i2U Winner 2024, IGNITE 2024, and YIP 5.0 State Level'
    ],
    specs: [
      { k: 'Controller', v: 'ESP32' },
      { k: 'Actuation', v: 'Stepper Motor (50–350 RPM)' },
      { k: 'Heating', v: '30–35°C regulated' },
      { k: 'Display', v: '2.8" SPI TFT' },
      { k: 'Power Source', v: 'LiPo 4200mAh (B6 IMAX charger)' },
      { k: 'Patent Status', v: 'Design Patent Published (202441074582)' }
    ],
    documentation: {
      overview: `The HIVE-X (known commercially as "Vanthen Extractor") is an automated honey extraction system designed to address the inefficiencies and manual labor of traditional honey harvesting. Developed under Amal Jyothi College of Engineering, the project specifically targets small-scale beekeepers and agricultural cooperatives by offering a controlled, automated rotation and heating extraction process that preserves honey quality while maximizing yield.`,
      architecture: `The control system is built around an ESP32 microcontroller, which regulates a stepper motor drive stage to achieve smooth acceleration curves between 50 and 350 RPM, preventing honeycomb breakage. A closed-loop heating element keeps the chamber at a stable 30–35°C, reducing honey viscosity without degrading enzymes. System status, speed, temperature, and extraction progress are displayed on a 2.8" SPI TFT screen. The system is powered by a high-capacity 4200mAh LiPo battery pack.`,
      pcb: ``,
      testing: `The system underwent trials with small-scale farmers. RPM ramping profiles were verified to ensure honeycombs remained intact during start/stop phases. The heating element closed-loop control maintained 32°C ± 1°C under ambient loads. Battery performance was validated for up to 6 hours of continuous field operation on a single charge. The honey extracted showed lower moisture levels and higher clarity than manual methods.`,
      firmware: `Firmware written in C++ using ESP-IDF. A PID control loop handles the stepper motor speed acceleration ramps and timing profile. A second hysteresis control loop monitors a thermistor and gates a MOSFET power stage for the heating element. Display updates are optimized using DMA over SPI for smooth UI rendering.`,
      future: `Future work involves deploying the Vanthen Extractor in larger cooperatives, integrating a wireless mesh node for hive telemetry, and adding cloud-based yield prediction analytics based on density data.`
    }
  },
  {
    id: 'csro',
    img: null,
    title: 'CSRO PLL VCO Block',
    subtitle: '3-Stage Current Starved Ring Oscillator',
    cat: 'Analog IC', catClass: 'cat-sense', icon: '📳',
    status: 'Completed', statusClass: 'status-done',
    stls: [],
    docs: [],
    layers: null, dims: '90nm gpdk Virtuoso',
    chips: ['Cadence Virtuoso', 'gpdk90nm', 'Ring Osc'],
    tags: ['Cadence Virtuoso', 'gpdk90nm', 'CSRO', 'VCO', 'PLL', 'Analog Layout', 'Post-Layout Sim'],
    desc: 'A 3-stage Current Starved Ring Oscillator (CSRO) designed and simulated in gpdk90nm Cadence Virtuoso for PLL VCO applications, achieving 7GHz measured frequency and ~23ps stage delay.',
    highlights: [
      'Designed 3-stage CSRO in gpdk90nm technology node',
      'Targeted 5GHz oscillation frequency with a measured output of 7GHz',
      'Achieved stage propagation delay of approximately 23ps',
      'Completed full custom analog flow: schematic sizing, layout, and parasitic extraction',
      'Performed Transient, DC, PSS, and PNOISE simulations for phase noise validation',
      'Implemented multi-finger layout techniques for area optimization and DRC/LVS compliance'
    ],
    specs: [
      { k: 'Software', v: 'Cadence Virtuoso' },
      { k: 'Technology Node', v: 'gpdk 90nm' },
      { k: 'Topology', v: '3-Stage Current Starved Ring' },
      { k: 'Target Freq', v: '5 GHz' },
      { k: 'Measured Freq', v: '7 GHz (post-layout)' },
      { k: 'Stage Delay', v: '~23 ps' }
    ],
    documentation: {
      overview: `This project covers the full custom analog design, layout, and post-layout verification of a 3-Stage Current Starved Ring Oscillator (CSRO) during an internship at IIIT Kottayam. The CSRO functions as the core Voltage Controlled Oscillator (VCO) building block for Phase-Locked Loops (PLLs), where tuning voltage regulates the current starved bias transistors to adjust oscillation frequency.`,
      architecture: `The oscillator topology uses three inverter stages where the charging and discharging current is restricted by current sources controlled by a bias network. Transistor sizing was calculated to balance frequency range, power consumption, and phase noise. Symbols and cells were created hierarchically, and bias mismatch issues were simulated and resolved during transient sweeps.`,
      pcb: `gpdk90nm custom layout with multi-finger transistor fingers to minimize gate resistance and junction capacitance. Area optimization and matching layouts were drawn to ensure DRC and LVS compliance. PEX (Parasitic Extraction) was run to capture parasitic resistance and capacitance for back-annotation.`,
      testing: `Simulation results: DRC and LVS checks passed with zero errors. Extracted simulations (PEX) validated the design against parasitic loading. Phase noise was evaluated using Periodic Steady State (PSS) and Periodic Noise (PNOISE) analyses. Stage delay was measured at ~23ps, leading to a post-layout oscillation frequency of 7GHz. Current consumption was optimized for low-power operation.`,
      firmware: ``,
      future: `Currently extending the project to integrate the VCO into a complete Phase-Locked Loop (PLL) synthesizer block. Sizing of inverter stages can be dynamically scaled for specific frequency bands.`
    }
  },
  {
    id: 'energymeter',
    img: null,
    title: 'Low Power DC Energy Meter',
    subtitle: 'INA219 Power Logger & Meter',
    cat: 'Sensing', catClass: 'cat-sense', icon: '🔌',
    status: 'Completed', statusClass: 'status-done',
    stls: [],
    docs: [{ label: 'Project Report', file: 'Low Power DC Energy Meter.28 .pdf' }],
    layers: null, dims: 'Breadboard & Soldered PCB',
    chips: ['ATmega328P', 'INA219', 'OLED SSD1306', 'SdFat'],
    tags: ['Arduino Nano', 'INA219', 'OLED I2C', 'Micro SD Card', 'Low-Power', 'Interrupt Driven', 'SdFat'],
    desc: 'An interrupt-driven 5V DC energy meter and data logger built on Arduino Nano and INA219. Features real-time OLED monitoring and microSD data logging, optimizing power consumption by disabling ADC and utilizing sleep modes.',
    highlights: [
      'Precise current, voltage, and power logging using INA219 IC',
      '10Hz interrupt-driven data acquisition using Timer1 CTC mode',
      'Low-power optimization: disables on-chip ADC to conserve power',
      'Local data logging in CSV format to Micro SD card using SdFat library',
      'Real-time metric visualization (V, mA, mW, mWh) on an OLED display',
      'Developed as a B.Tech Logic Circuit Design course project'
    ],
    specs: [
      { k: 'Controller', v: 'Arduino Nano (ATmega328P)' },
      { k: 'Sensor IC', v: 'INA219 Power Monitor' },
      { k: 'Storage', v: 'Micro SD Module (SPI, SdFat)' },
      { k: 'Display', v: '4-Pin I2C OLED (SSD1306)' },
      { k: 'Power Source', v: '9V Battery + 7805 Regulator' },
      { k: 'Sampling Rate', v: '10 Hz (Timer1 Interrupt)' }
    ],
    documentation: {
      overview: `The Low Power DC Energy Meter is a B.Tech course project designed for the ECT 203 Logic Circuit Design course at Amal Jyothi College of Engineering. The objective was to design a highly accurate, portable 5V DC power monitor and data logger that records load consumption metrics (voltage, current, power, and accumulated energy) to an SD card while maintaining a low-power design footprint.`,
      architecture: `The system pairs an Arduino Nano with an INA219 current/voltage monitor IC connected in-line with the load. Data logging is performed over SPI to a Micro SD Card reader, while real-time metrics are rendered on an SSD1306 OLED display over I2C. Power efficiency is achieved by using a Timer1 interrupt to trigger measurements at 10Hz, allowing the MCU to save clock cycles, and explicitly disabling the unused on-chip ADC peripheral.`,
      pcb: `Prototype developed on breadboard and subsequently soldered onto a prototyping matrix board. The layout maintains separate routing paths for the power supply (9V battery regulated by 7805 to 5V) and sensor buses. De-noising capacitors are placed at the inputs and outputs of the 7805 regulator.`,
      testing: `Validated using a 3V warm-white LED chip load. The INA219 logged current and bus voltages accurately. CSV logging to "MEAS.csv" on the SD card was verified with time-stamped entries. Current consumption of the meter itself was analyzed, confirming power savings from disabling the internal ADC.`,
      firmware: `Written in Arduino C++ utilizing the Adafruit_INA219, SSD1306AsciiAvrI2c, and SdFat libraries. Low-level AVR registers are modified: Timer1 is configured in CTC (Clear Timer on Compare Match) mode to fire at 10Hz, setting a volatile trigger flag. ADC circuitry is turned off via ADCSRA = 0. SPI buffer syncing is queued every 10 measurement cycles to minimize SD card write overhead.`,
      future: `Future enhancements include designing a dedicated custom PCB layout, integrating an onboard LiPo charging circuit, and adding BLE communication for remote telemetry viewing on a mobile app.`
    }
  }
];

// Export for use in ES module contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
