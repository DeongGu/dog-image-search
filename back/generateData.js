const fs = require("fs");
require("dotenv").config();
const { default: axios } = require("axios");
const axiosRateLimit = require("axios-rate-limit");

const dogName = require("./dogName.js");

const BREEDS_COUNT = 264;
const MAX_PAGE_NUMBER = 100;
const PER_PAGE = 20;

const fetchApi = (apiKey = "", url) => {
  if (apiKey.length !== 0) {
    return axiosRateLimit(
      axios.create({
        baseURL: url,
        "x-api-key": `${apiKey}`,
      }),
      { maxRequests: 30, perMilliseconds: 20000 }
    );
  } else {
    return axiosRateLimit(
      axios.create({
        baseURL: url,
      }),
      { maxRequests: 30, perMilliseconds: 20000 }
    );
  }
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
    const tasks = [];

    for (const breed of breeds) {
      const { id, name, life_span, temperament, origin, bred_for } = breed;
      const images = [];
      for (let i = 1; i <= MAX_PAGE_NUMBER; i++) {
        const result = await pixabayApi.get(
          `?key=${process.env.PIXABAY_API_KEY}&q=${dogName.idEngname[id]}&page=${i}&category=animal&per_page=${PER_PAGE}`
        );
        const { data } = result;

        if (i === Math.floor(data.totalHits / PER_PAGE)) break;

        if (data.hits.length !== 0) {
          images.push(data.hits);
        } else {
          break;
        }
      }
      tasks.push({
        id,
        name,
        life_span,
        temperament,
        origin,
        bred_for,
        images,
      });
    }

    Promise.all(tasks).then((allResponses) => {
      fs.writeFile("data.json", JSON.stringify(allResponses), "utf8", () => {
        console.log(`crwaling success. total data: ${allResponses.length}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

allRequests();
