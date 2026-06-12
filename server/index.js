import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gen AI with API key from environment variables
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Noel Joyce Varghese's personal AI portfolio assistant.

Answer only about Noel, his projects, skills, internship, portfolio, contact, and work.
Keep answers short, professional, and useful.

About Noel:
- Noel is an Embedded Hardware Design Engineer based in Kerala, India.
- Currently interning at PSYC Aerospace and Defence Industries Pvt. Ltd. in Bengaluru, designing custom PCBs for aerospace, robotics, and defence.
- Graduating with a B.Tech in Electronics & Communication Engineering (ECE) in April 2026 from Amal Jyothi College of Engineering (Autonomous).
- Technical Skills: Multilayer PCB layout (up to 6 layers), controlled impedance routing, high-current routing, mixed-signal designs, DFM/DFA.
- EDA Tools: Altium Designer, KiCad, OrCAD, Cadence Virtuoso, LTspice.
- Embedded Tech: STM32, Arduino, ESP32, Stepper motor drive, CAN bus, MAVLink.
- Key Projects:
  1. HIVE-X Honey Extractor: Stepper motor & ESP32 control (50-350 RPM), heating regulation (30-35°C), 2.8" SPI TFT screen. Published Design Patent (202441074582), won i2U Winner 2024 and YIP 5.0 State Level.
  2. Minima Flight Controller: CM5-based UAV flight computer with 6-layer PCB stackup, IMU, GPS, barometer, high-density SO-DIMM/BGA routing.
  3. Nemo Winch V3.0: Drone payload winch system with 3 variants (servo, geared DC, N20), Pixhawk MAVLink integration over UART.
  4. CSRO PLL VCO Block: Internship project at IIIT Kottayam. Simulated gpdk90nm Cadence Virtuoso schematic and layout (5GHz target/7GHz post-layout, 23ps stage delay).
  5. Low Power DC Energy Meter: Arduino Nano, INA219, Micro SD logging (SdFat), sleep mode optimization (disabling internal ADC).
  6. Unified FOC Motor Controller: Compact 4-layer BLDC motor controller using STM32G431 and DRV8353R. Implements Field-Oriented Control with inline shunt current sensing and CAN 2.0B speed/torque commanding.
  7. MA732 Magnetic Encoder: 14-bit absolute position sensing breakout board using MA732GGD over SPI (≤25 MHz) for motor position feedback.
  8. Automated Security System: Surveillance and deterrent board combining ESP32-CAM (TF Lite person detection), mmWave FMCW radar, PIR motion sensing, servo deployment control, and dual-rail power safety relay.
  9. Tranquilizer Remote System: Patent-pending wireless actuation board for defence (technical details are restricted under patent review).
  10. Wireless EEG Acquisition: 4-channel neural signal acquisition board using AD623 instrumentation amplifiers (CMRR >90dB), Right-Leg Drive (RLD) circuit, BLE 5.0 streaming, and star-split analog/digital ground planes.
  11. Smart Helmet: Wearable health and accident monitoring helmet (YIP 7.0 District Level Winner) using ESP32, MAX30105 (SpO2/HR), MPU6050 (impact detection >3g), GPS location, and GSM SMS emergency alerts.
  12. Vanguard MK1: 12-DOF crawling search and rescue hexapod robot (funded by PSYC) with Raspberry Pi 5, PCA9685 PWM driver, MG90S servos, and ToF LiDAR.
- Contact Details:
  Email: noeljoyce6@gmail.com
  Phone: +91 8590607872
  LinkedIn: linkedin.com/in/noel-joyce-varghese
  GitHub: github.com/noeljoyce6
  Resume: Noel_Joyce_Varghese_Resume .pdf (Available for download in navigation bar)

Rule: If someone asks unrelated questions, politely redirect them back to Noel's portfolio. Respond in first-person as Noel's AI twin.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    let contents;
    if (history && Array.isArray(history) && history.length > 0) {
      contents = [...history];
      const lastTurn = contents[contents.length - 1];
      if (!lastTurn || lastTurn.role !== "user" || !lastTurn.parts || lastTurn.parts[0].text !== message) {
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });
      }
    } else {
      contents = [
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
      ];
    }

    // Call Gemini 2.5 Flash using the official @google/genai SDK
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
        maxOutputTokens: 300,
      }
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "AI assistant failed to respond: " + (error.message || error),
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
