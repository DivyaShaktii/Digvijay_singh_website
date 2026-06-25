const libraryId = '686824';
const apiKey = 'd09723e2-f5c3-4019-94714a2f688c-f120-4a68';
const url = `https://video.bunnycdn.com/library/${libraryId}/videos`;

async function testBunny() {
  console.log("Testing Bunny.net connection...");
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'AccessKey': apiKey,
        'accept': 'application/json'
      }
    });
    if (res.ok) {
      console.log("✅ SUCCESS: Connected to Bunny.net Stream Library!");
      const data = await res.json();
      console.log(`Found ${data.totalItems || 0} videos currently in the library.`);
    } else {
      const errorText = await res.text();
      console.error(`❌ ERROR: Failed to connect. Status: ${res.status}`);
      console.error("Details:", errorText);
    }
  } catch (error) {
    console.error("❌ ERROR: Connection failed.", error.message);
  }
}

testBunny();
