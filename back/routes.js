const express = require("express");
require("dotenv").config();
const { default: axios } = require("axios");

const { engnameId, kornameId } = require("./dogName.js");

const router = express.Router();
const MAX_PAGE_NUMBER = 100;
const PER_PAGE = 20;

const fetchApi = (apiKey = "", url) => {
  const instance = axios.create({
    baseURL: url,
    headers: apiKey ? { "x-api-key": `${apiKey}` } : {},
  });

  return instance;
};

const thedogApi = fetchApi(
  process.env.THEDOGAPI_KEY,
  "https://api.thedogapi.com/v1"
);

const pixabayApi = fetchApi("", "https://pixabay.com/api");

router.get("/:dogName", async (req, res) => {
  try {
    const keyword = req.params.dogName;
    const { page } = req.query;

    //한글 영어 숫자 구분
    const ENGReg = /[a-z]/gi;
    const exceptENGReg = /[^a-z]/gi;
    const KORWordReg = /[가-힣]/g;
    const exceptKORWordReg = /[^가-힣]/gi;

    if (KORWordReg.test(keyword)) {
      let newKeyword = keyword.replace(exceptKORWordReg, "");

      const breedList = Object.keys(kornameId)
        .map((el) => {
          if (el.split(" ").join("").indexOf(newKeyword) !== -1) {
            return kornameId[el];
          }
        })
        .filter((element) => element);

      if (breedList.length === 0) throw new Error("데이터가 없습니다.");

      const breedPromises = breedList.map(async (id) => {
        const { data } = await thedogApi.get(`breeds/${id}`);
        return data;
      });

      const responses = await Promise.all(breedPromises);

      const imagePromises = responses.map(async (response) => {
        const { name, bred_for, life_span, temperament } = response;
        const { data } = await pixabayApi(
          `?key=${process.env.PIXABAY_API_KEY}&q=${name}&page=${page}&category=animal&per_page=${PER_PAGE}`
        );
        return { name, bred_for, life_span, temperament, images: data.hits };
      });

      const newData = await Promise.all(imagePromises);

      res.status(200).json(newData);
    } else if (ENGReg.test(keyword)) {
      let newKeyword = keyword.replace(exceptENGReg, "").toLowerCase();

      const breedList = Object.keys(engnameId)
        .map((el) => {
          if (el.toLowerCase().indexOf(newKeyword) !== -1) {
            return engnameId[el];
          }
        })
        .filter((element) => element);

      if (breedList.length === 0) throw new Error("데이터가 없습니다.");

      const breedPromises = breedList.map(async (id) => {
        const { data } = await thedogApi.get(`breeds/${id}`);
        return data;
      });

      const responses = await Promise.all(breedPromises);

      const imagePromises = responses.map(async (response) => {
        const { name, bred_for, life_span, temperament } = response;
        const { data } = await pixabayApi(
          `?key=${process.env.PIXABAY_API_KEY}&q=${name}&page=${page}&category=animal&per_page=${PER_PAGE}`
        );
        return { name, bred_for, life_span, temperament, images: data.hits };
      });

      const newData = await Promise.all(imagePromises);

      res.status(200).json(newData);
    } else {
      throw new Error("데이터가 없습니다.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
