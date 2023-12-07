const fs = require("fs");
require("dotenv").config();
const { default: axios } = require("axios");
const axiosRateLimit = require("axios-rate-limit");

const dogName = require("./dogName.js");

const BREEDS_COUNT = 264;
const MAX_PAGE_NUMBER = 100;
const PER_PAGE = 20;

if (fs.existsSync("data.json")) {
  console.log("DATA.json exists. Exiting...");
  return;
}

const fetchApi = (apiKey = "", url) => {
  const instance = axiosRateLimit(
    axios.create({
      baseURL: url,
      headers: apiKey ? { "x-api-key": `${apiKey}` } : {},
    }),
    { maxRequests: 30, perMilliseconds: 20000 }
  );

  return instance;
};

const thedogApi = fetchApi(
  process.env.THEDOGAPI_KEY,
  "https://api.thedogapi.com/v1"
);

const pixabayApi = fetchApi("", "https://pixabay.com/api");

const getBreeds = async () => {
  const breedPromises = [];

  try {
    for (let i = 1; i <= BREEDS_COUNT; i++) {
      breedPromises.push(thedogApi.get(`breeds/${i}`));
    }

    const responses = await Promise.all(breedPromises);

    return responses.map((res) => {
      const { id, name, life_span, temperament, origin, bred_for } = res.data;
      return {
        id,
        name,
        life_span,
        temperament,
        origin,
        bred_for,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const allRequests = async () => {
  try {
    const breeds = await getBreeds();
    const tasks = breeds.map(async (breed) => {
      const { id, name, life_span, temperament, origin, bred_for } = breed;
      let images = [];
      for (let i = 1; i <= MAX_PAGE_NUMBER; i++) {
        const result = await pixabayApi.get(
          `?key=${process.env.PIXABAY_API_KEY}&q=${dogName.idEngname[id]}&page=${i}&category=animal&per_page=${PER_PAGE}`
        );
        const { data } = result;

        if (i === Math.floor(data.totalHits / PER_PAGE)) break;

        if (data.hits.length !== 0) {
          images = data.hits;
        } else {
          break;
        }
      }
      return {
        id,
        name,
        life_span,
        temperament,
        origin,
        bred_for,
        images,
      };
    });

    const allResponses = await Promise.all(tasks);
    await fs.promises.writeFile(
      "data.json",
      JSON.stringify(allResponses),
      "utf8",
      () => {
        console.log(`crwaling success. total data: ${allResponses.length}`);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

allRequests();
