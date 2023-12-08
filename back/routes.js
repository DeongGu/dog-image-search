const express = require("express");
const { default: axios } = require("axios");
const {
  idEngname,
  idKorname,
  engnameId,
  kornameId,
  engNameKorName,
  kornameEngname,
} = require("./dogName.js");
const DATA = require("./data.json");

const router = express.Router();

router.get("/:dogName", async (req, res) => {
  const keyword = req.params.dogName;
  const { page } = req.query;

  //한글 영어 숫자 구분
  const ENGReg = /[a-z]/gi;
  const exceptENGReg = /[^a-z]/gi;
  const KORWordReg = /[가-힣]/g;
  const exceptKORWordReg = /[^가-힣]/gi;

  if (KORWordReg.test(keyword)) {
    let newKeyword = keyword.replace(exceptKORWordReg, "");
    const dogList = Object.keys(kornameId)
      .map((el) => {
        if (el.indexOf(newKeyword) !== -1) {
          return el;
        }
      })
      .filter((element) => element);

    const newData = dogList.map((id) => DATA[id - 1]);
    res.status(200).json(newData);
  } else if (ENGReg.test(keyword)) {
    let newKeyword = keyword.replace(exceptENGReg, "").toLowerCase();
    const dogList = Object.keys(engnameId)
      .map((el) => {
        if (el.indexOf(newKeyword) !== -1) {
          return el;
        }
      })
      .filter((element) => element);

    const newData = dogList.map((id) => DATA[id - 1]);
    res.status(200).json(newData);
  } else {
    res.status(500).json({ message: "데이터가 없습니다." });
  }
});

module.exports = router;
