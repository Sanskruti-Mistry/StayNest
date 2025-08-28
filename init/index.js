// const mongoose = require('mongoose');
// const initData = require('./data.js');
// const Listing = require('../models/listing.js');

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(() => {
//         console.log("connected to DB")
//     })
//     .catch((err) => {
//         console.log(err);
//     });
    
// async function main() {
//     await mongoose.connect(MONGO_URL);
// };

// const initDB = async ()=>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) =>({...obj, owner: "6868ca5fc8b8a8cfea444d9f"}));
//     await Listing.insertMany(initData.data);
//     console.log("database initialised");
// };

// initDB();

// init/index.js

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const axios = require('axios');
require('dotenv').config();

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log('MongoDB Atlas connected!');
}

const getCoordinates = async (location) => {
  try {
    const geoData = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
      {
        params: {
          access_token: process.env.MAP_TOKEN,
        },
      }
    );
    const coords = geoData.data.features[0]?.geometry?.coordinates;
    if (!coords) {
      console.log(`No coordinates found for: ${location}`);
      return null;
    }
    return { type: 'Point', coordinates: coords };
  } catch (err) {
    console.log('Geocoding error for', location, err.message);
    return null;
  }
};

const initDB = async () => {
  await Listing.deleteMany({});
  for (let obj of initData.data) {
    const geometry = await getCoordinates(obj.location);
    if (!geometry) {
      console.log(` Skipping "${obj.title}" due to missing coordinates`);
      continue;
    }

    const newListing = new Listing({
      ...obj,
      owner: '686df54a3f1d856c036328e3', // ✅ exact owner ID from Atlas
      geometry,
    });

    await newListing.save();
    console.log(`Saved: ${obj.title}`);
  }
  console.log('All listings saved with correct owner!');
};

main().then(() => initDB().then(() => mongoose.connection.close()));
