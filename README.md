# Ticker Fetcher

A small Node.js script that fetches all paginated tickers from [ord.bonesprotocol.com](https://ord.bonesprotocol.com) and converts each ticker into a standardized format.

## Features

- **Paginated Fetching:** Retrieves tickers from `https://ord.bonesprotocol.com/tickers/<page>?json=true` until there are no more pages.
- **Format Conversion:** Converts each ticker to the following format:
  ```json
  {
    "inscriptionId": "<ticker.id>",
    "name": "<ticker.bone_claimed>",
    "collectionSymbol": "bonesprotocoltickers"
  }
  ```
- **Output:** Prints the complete JSON array of formatted tickers to the console.

## Requirements

- Node.js v18.0.0 or higher (for the built-in `fetch` API).

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd ticker-fetcher
   ```

2. **Install Dependencies**

   This project does not require any external dependencies. However, if desired, you can run:
   
   ```bash
   npm install
   ```
   
   This is mainly to confirm the project structure (your Node.js version is the key requirement).

3. **Run the Script**

   To start fetching tickers, run:
   
   ```bash
   npm start
   ```
   
   Alternatively, run the script directly:
   
   ```bash
   node fetchTickers.js
   ```

## File Overview

- **fetchTickers.js:** The Node.js script that fetches and converts the tickers.
- **package.json:** Contains project metadata and start script configuration.

## License

This project is licensed under the MIT License. 