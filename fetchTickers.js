const fs = require('fs');

// This script fetches all paginated tickers from https://ord.bonesprotocol.com/tickers/<page>?json=true
// and converts each ticker to the format:
// {
//   "inscriptionId": <ticker.id>,
//   "name": <ticker.bone_claimed>,
//   "collectionSymbol": "bonesprotocoltickers"
// }

(async function main() {
  try {
    let page = 0;
    let allTickers = [];
    let keepFetching = true;

    while (keepFetching) {
      const url = `https://ord.bonesprotocol.com/tickers/${page}?json=true`;
      console.log(`Fetching: ${url}`);
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      const data = await res.json();

      // "entries" is an array of arrays where the first element is the ticker object.
      // We filter out any entry that might not contain a valid object.
      for (const entry of data.entries) {
        if (entry && entry[0]) {
          const ticker = entry[0];
          const formattedTicker = {
            inscriptionId: ticker.id,             // using ticker.id for inscriptionId
            name: ticker.bone_claimed,            // using ticker.bone_claimed for the name
            attributes: {                        // new attributes field for traits
              "Launched": ticker.bone_deployed ? "Yes" : "No"
            }
          };
          allTickers.push(formattedTicker);
        }
      }

      // Continue fetching if "more" exists and there is a valid next page.
      if (data.more && data.next !== null) {
        page = data.next;
      } else {
        keepFetching = false;
      }
    }

    // Save the final JSON array of tickers to a file named tickers_<timestamp>.json
    const outputFilename = `tickers_${Date.now()}.json`;
    fs.writeFileSync(outputFilename, JSON.stringify(allTickers, null, 2));
    console.log(`Tickers saved to ${outputFilename}`);

  } catch (error) {
    console.error("Error fetching tickers: ", error);
  }
})(); 