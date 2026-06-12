// ── SHARED PROJECT DATA ──────────────────────────────────────────────────────
// Used by index.html (project grid) and project.html (case study pages)

const PROJECTS = [
  {
    id: 'foc',
    img: 'img/foc.png',
    title: 'Unified FOC Motor Controller',
    subtitle: 'BLDC Motor Drive Platform',
    cat: 'Motor Control', catClass: 'cat-motor', icon: '⚡',
    status: 'Ongoing — Design Phase', statusClass: 'status-wip',
    stls: [{ label: 'Controller Board', file: 'FOC.stl' }],
    docs: [{ label: 'FOC Report', file: 'FOC REPORT.pdf' }],
    layers: 4, dims: '50mm × 50mm',
    chips: ['STM32G431', 'DRV8353R', 'CAN 2.0B'],
    tags: ['STM32G431', 'DRV8353R', 'FOC', 'CAN Bus', '3-Phase Gate Drive', 'Current Sensing', '50×50mm', '4-Layer'],
    desc: 'A compact 4-layer BLDC motor controller built around the STM32G431 and DRV8353R gate driver. Implements real-time Field-Oriented Control with inline current sensing, over-current protection, regenerative braking, and CAN 2.0B closed-loop interface.',
    highlights: [
      '3-phase gate drive via DRV8353R with hardware fault protection',
      'Inline shunt current sensing on all 3 phases for FOC torque control',
      'CAN 2.0B interface for speed/torque commands and telemetry',
      '50×50mm compact form factor for tight motor integration',
      'Regenerative braking and configurable dead-time control'
    ],
    specs: [
      { k: 'MCU', v: 'STM32G431CBU6' },
      { k: 'Gate Driver', v: 'DRV8353RSRGZT' },
      { k: 'Layers', v: '4-Layer' },
      { k: 'Size', v: '50mm × 50mm' },
      { k: 'Interface', v: 'CAN 2.0B, SPI, UART' },
      { k: 'Sensing', v: 'Inline 3-phase current' }
    ],
    documentation: {
      overview: `The Unified FOC Motor Controller is a compact, production-grade 4-layer PCB built for Field-Oriented Control (FOC) of BLDC motors. It integrates the STM32G431CBU6 microcontroller alongside the DRV8353RSRGZT 3-phase gate driver IC, enabling precise torque control with minimal hardware overhead. The board was designed to fit within a 50×50mm form factor, suitable for direct motor flange mounting.`,
      architecture: `The architecture centers around three functional domains: the microcontroller domain (STM32G431 running FOC algorithms at 170MHz), the power stage (DRV8353R driving 6 N-channel MOSFETs), and the sensing domain (inline shunt resistors on all 3 phases for real-time current measurement). Communication is handled via CAN 2.0B for high-reliability embedded networking, with UART debug port.`,
      pcb: `4-layer stackup: Signal / GND / Power / Signal. High-current power traces are routed on the power plane with 2oz copper pour for thermal distribution. Analog sensing traces are shielded by the ground plane and kept away from switching node traces. Decoupling capacitors placed within 0.5mm of all IC power pins. Board follows IPC-2221 design rules throughout.`,
      testing: `Board bring-up: Power rail verification (3.3V, 5V, gate drive bootstrap). DRV8353R fault register readout via SPI confirmed no startup faults. Phase current waveforms captured on oscilloscope at 10A phase current — clean sinusoidal output confirmed. CAN bus communications verified at 500kbit/s and 1Mbit/s. Thermal imaging confirmed no hotspot issues up to 30A motor current.`,
      firmware: `Firmware written in C using STM32Cube HAL + LL drivers. FOC algorithm implemented with Space Vector Modulation (SVPWM). Current loop running at 40kHz, velocity loop at 1kHz. CAN communication uses a simple command/response protocol. Encoder interface tested with MA732 SPI magnetic encoder breakout.`,
      future: `Planned iterations include: on-board CAN termination jumper, isolated gate drive for higher voltage applications (48V+), UART firmware update via bootloader, and integration of the encoder board into the same form factor.`
    }
  },
  {
    id: 'fc',
    img: 'img/fc.png',
    title: 'Minima Flight Controller',
    subtitle: 'CM5-Based UAV Flight Computer',
    cat: 'Aerospace', catClass: 'cat-aero', icon: '🛩',
    status: 'Ongoing', statusClass: 'status-wip',
    stls: [{ label: 'Flight Controller', file: 'FC.stl' }, { label: 'CM5 Pi Adapter', file: 'CM5 PI ADAPTER.stl' }],
    docs: [{ label: 'FC Document', file: 'FC_DOCUMENT.pdf' }, { label: 'CM5 Adapter Doc', file: 'CM5 PI_ADAPTER_documentt.pdf' }],
    layers: 6, dims: 'Compact form',
    chips: ['CM5', 'IMU', 'GPS', 'Baro'],
    tags: ['CM5', 'Raspberry Pi', 'UAV', '6-Layer', 'IMU', 'Barometer', 'GPS', 'High-Density'],
    desc: 'A compact 6-layer UAV flight controller built around the Raspberry Pi Compute Module 5. Designed for UAVs requiring onboard compute with full sensor integration — IMU, barometer, GPS, multi-channel PWM/UART. The companion CM5 Pi Adapter board handles the high-density CM5 SO-DIMM interface.',
    highlights: [
      '6-layer stackup for power/ground integrity and EMI shielding',
      'CM5 compute module enabling onboard AI and vision processing',
      'Full IMU, baro, and GPS sensor suite on-board',
      'Multi-channel PWM output for ESC and servo actuation',
      'High-density BGA/QFN routing in constrained form factor'
    ],
    specs: [
      { k: 'Compute', v: 'Raspberry Pi CM5' },
      { k: 'Layers', v: '6-Layer' },
      { k: 'Sensors', v: 'IMU · Baro · GPS' },
      { k: 'Interfaces', v: 'UART×4 · SPI×2 · I2C×2' },
      { k: 'Outputs', v: '8+ PWM channels' },
      { k: 'Status', v: 'In Development' }
    ],
    documentation: {
      overview: `Minima is a next-generation UAV flight controller built around the Raspberry Pi Compute Module 5 (CM5). Unlike traditional flight controllers that use microcontrollers, Minima brings full Linux computing power to the flight stack — enabling onboard AI inference, real-time video processing, and advanced autonomy algorithms without requiring a separate companion computer.`,
      architecture: `The system consists of two boards: the main flight controller carrying the sensor suite (IMU, barometer, GPS), power management, PWM output, and communication interfaces; and the CM5 Adapter board that interfaces the high-density SO-DIMM connector to the flight controller's peripheral bus. The 6-layer stackup separates analog sensor signals from digital and power domains.`,
      pcb: `6-layer stackup: Signal / GND / Signal / Power / GND / Signal. The CM5 adapter board uses a 0.4mm pitch SO-DIMM footprint requiring controlled impedance for high-speed differential pairs. EMI shielding is achieved via solid ground pours on layers 2 and 5. IPC-2221 Class B design rules applied throughout.`,
      testing: `Currently in bring-up phase. Power rail sequencing verified for CM5 requirements. IMU communications verified over SPI. GPS NMEA data received successfully. PWM signal outputs verified at 50Hz and 400Hz. CM5 boot sequence confirmed with Raspberry Pi OS Lite.`,
      firmware: `ArduPilot/PX4 compatibility is being evaluated for the flight stack. Custom driver layer for CM5 peripheral access is in development. The adapter board firmware handles I2C muxing and power sequencing via an STM32 coprocessor.`,
      future: `Complete sensor calibration and flight test. Develop custom Linux HAL for ArduPilot integration. Miniaturize the CM5 adapter to integrate directly into the flight controller for a single-board solution.`
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
    docs: [
      { label: 'Servo Winch Doc', file: 'Servo_driver_document.pdf' },
      { label: 'Geared DC Doc', file: 'winch_Geared_dc_latest.pdf' },
      { label: 'N20 Winch Doc', file: 'winch_n20 document.pdf' }
    ],
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
    docs: [{ label: 'Encoder Doc', file: 'encoder_doc.pdf' }],
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
    docs: [{ label: 'System Document', file: 'PEPPER SPRAY BOARD DOCUMENT.pdf' }],
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
    img: 'img/eeg.png',      // ← user will drop eeg.png here (PCB board photo)
    title: 'Wireless EEG Acquisition',
    subtitle: '4-Channel Neural Signal Platform',
    cat: 'BioSignal', catClass: 'cat-bio', icon: '🧠',
    status: 'Completed', statusClass: 'status-done',
    stls: [{ label: 'EEG Board', file: 'EEG.stl' }],
    docs: [{ label: 'EEG Document', file: 'EEG_DOCUMENT.pdf' }],
    layers: 4, dims: 'Mixed-signal 4-layer',
    chips: ['AD623', 'BLE 5.0', 'RLD'],
    tags: ['AD623', 'BLE 5.0', '4-Channel', 'Mixed-Signal', 'Low-Noise', 'EEG', 'Differential Input'],
    desc: 'A low-noise mixed-signal EEG acquisition PCB with 4 differential input channels via AD623 instrumentation amplifiers. Features BLE 5.0 wireless streaming for untethered operation. Designed with careful analog layout, ground plane separation, and right-leg drive for microvolt-level noise performance.',
    highlights: [
      'AD623 instrumentation amp: CMRR >90dB at 60Hz',
      '4 fully differential EEG input channels',
      'BLE 5.0 wireless data streaming',
      'Analog/digital ground plane separation on 4-layer board',
      'Right-leg drive (RLD) circuit for common-mode rejection',
      'Patient-safe isolated power design'
    ],
    specs: [
      { k: 'AFE', v: 'AD623 (×4 ch)' },
      { k: 'Wireless', v: 'BLE 5.0' },
      { k: 'Channels', v: '4 differential' },
      { k: 'Layers', v: '4 (analog/digital split)' },
      { k: 'Bandwidth', v: '0.5–100 Hz (EEG)' },
      { k: 'Noise', v: '<1μV input referred' }
    ],
    documentation: {
      overview: `The Wireless EEG Acquisition Board is a 4-channel neural signal acquisition platform designed for research-grade brainwave measurement. It captures sub-microvolt EEG signals from scalp electrodes, amplifies them via precision instrumentation amplifiers, digitizes the signals at 250Hz, and streams data wirelessly over BLE 5.0. The design prioritizes analog signal integrity above all other concerns.`,
      architecture: `Each of the 4 channels uses an AD623 instrumentation amplifier (CMRR >90dB) for differential signal acquisition. A right-leg drive (RLD) circuit actively reduces common-mode interference from power line noise. The analog front-end outputs feed into a 24-bit ADC, with the digital section isolated from the analog domain via optocouplers. A Nordic nRF52840 SoC handles BLE communication.`,
      pcb: `4-layer stackup specifically optimized for mixed-signal performance: Analog Signal / Analog GND / Digital Power / Digital Signal. The analog ground plane is split from the digital ground plane with a single star connection point at the ADC. All electrode input traces are guarded by driven shields. No digital switching traces cross the analog signal domain.`,
      testing: `Noise floor measured at 0.8μV RMS input-referred (0.5–100Hz bandwidth) — meeting research-grade EEG specifications. CMRR verified >90dB at 50/60Hz. Alpha wave detection (8–12Hz) tested with 10 electrode placements. BLE streaming verified at 4×250Hz = 1kSPS aggregate rate with <1 packet loss per 10,000 samples.`,
      firmware: `Nordic SDK (nRF5 SDK 17.1). Custom BLE GATT service for EEG data streaming. Notch filter (50/60Hz selectable) implemented in firmware. Configurable gain and bandwidth per channel.`,
      future: `Scale to 8-channel system with ADS1299 dedicated EEG AFE chip. Add electrode impedance measurement for proper electrode-skin contact verification. Investigate SSVEP-based BCI (brain-computer interface) application.`
    }
  },
  {
    id: 'helmet',
    img: 'img/helmet.png',       // ← user will drop helmet.png here
    title: 'Smart Helmet',
    subtitle: 'Accident & Health Monitoring',
    cat: 'Wearable', catClass: 'cat-bio', icon: '⛑',
    status: 'Completed', statusClass: 'status-done',
    isPCB: false,                // ← mini project: no PCB design, no 3D viewer
    stls: [],
    docs: [],                    // ← user will add docs here
    layers: null, dims: 'Breadboard prototype',
    chips: ['ESP32', 'MAX30105', 'MPU6050', 'GPS'],
    tags: ['ESP32', 'MAX30105', 'MPU6050', 'GPS', 'GSM', 'IR Sensor', 'Wearable', 'Safety'],
    desc: 'A wearable accident detection and health monitoring system built on a breadboard prototype using ESP32. Integrates pulse oximetry, 6-axis IMU impact detection, GPS location tracking, and automatic GSM emergency alerts — designed for workers in high-risk environments.',
    highlights: [
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
    img: 'img/robot.png',        // ← user will drop robot.png here
    title: 'Vanguard MK1',
    subtitle: 'Search & Rescue Crawling Robot',
    cat: 'Robotics', catClass: 'cat-uav', icon: '🤖',
    status: 'Completed', statusClass: 'status-done',
    isPCB: false,
    stls: [],
    docs: [],                    // ← user will add robot documentation here
    layers: 2, dims: 'Control PCB',
    chips: ['RPi 5', 'PCA9685', 'MG90', 'ToF LiDAR'],
    tags: ['Raspberry Pi 5', 'PCA9685', 'MG90 Servos', 'ToF LiDAR', '12-DOF', 'S&R Robot'],
    desc: 'A 12-DOF crawling search and rescue robot controlled by Raspberry Pi 5 via PCA9685 PWM driver. Custom control PCB handles locomotion (12× MG90 servo channels), ToF LiDAR sensor interfacing, and distributed power distribution. Designed for navigating debris and confined spaces.',
    highlights: [
      '12 independently controlled servo channels via PCA9685 I2C',
      'ToF LiDAR for obstacle detection and mapping',
      'Raspberry Pi 5 onboard for real-time gait algorithms',
      'Custom power distribution board for servo current demands',
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
  }
];

// Export for use in ES module contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
