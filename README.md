# Tourist Guide Web Application

## Overview

This Tourist Guide web application provides real-time weather, air quality, local time, and additional city information for tourists. The application fetches data from various APIs and displays it in a user-friendly interface.

## Features

- Real-time weather information
- Air quality index
- Local time based on geolocation
- City information from Wikipedia

## Prerequisites

- Node.js (v14.x or later)
- Git
- A web browser

## Getting Started

1. Clone the Repository
    ```bash
    git clone https://github.com/suncak3/Tourist-Guide.git
    cd tourist-guide
    ```
2. Install Dependencies
    ```bash
    npm install
    ```
3. Set Up Environment Variables
   Create a `.env` file in the root directory and add your API keys:
    ```plaintext
    OPENWEATHER_API_KEY=your_openweather_api_key
    GEONAMES_USERNAME=your_geonames_username
    AIR_QUALITY_API_KEY=your_airvisual_api_key
    ```

4. Run the Application
    ```bash
    node app.js
    ```

5. Open in Browser
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
