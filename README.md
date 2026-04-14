## **TrendPulse — Async & Objects Layer**

A collection of javascript functions and the post data is represented by objects , each post is a rich object (nested author, engagement, ISO timestamp). The functions will simulate loading posts asynchronously with Promises, validate and extract text with regex, use safe operators (`?.`, `??`), and format dates with timers.

  

##  **🛠️ Key Feature**

 1. Async/Await : Fetches multiple posts sequentially from a simulated database.
 2. Regex Post Analysis: Extracts hashtags, mentions, and validates author emails using complex patterns.
 3. ISO Date Formatting: Custom utility to transform timestamps into clean YYYY-MM-DD strings.
 4.Event Loop Testing: Includes a built-in simulation to demonstrate the priority of Microtasks (Promises) over Macrotasks (setTimeout).
 5. Refresh Demo: A controlled interval-based update system.

  

## Core Functions

 - **runTrendPulsePhase2()**

it loops throug post's ids , fetches data , checks valid emails and counts them and collects formatted timestamps

 - **analyzePostText(post)**

returns an object with the post ID , Email valid/notValid , array of Hashtags and an array of mentions.

 -**formatIsoDateOnly(iso)**

Converts ISO strings to YYYY-MM-DD using padStart for consistent two-digit padding.

  

## 🚀 How to Run

 1. Ensure you have Node.js installed.
 
 2. Execute the script:

    node your_filename.js

## 🧠 Event Loop Prediction

The project contains an execution order test.

Predicted Order: 1, 4, 3, 2

1 & 4: Synchronous (Call Stack)

3: Promise (Microtask Queue - High Priority)

2: Timeout (Task Queue - Low Priority)

## 📄 License

MIT
