const express = require("express");
const { engnameId, kornameId } = require("./dogName.js");
const DATA = require("./data.json");

const router = express.Router();

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

      const dogList = Object.keys(kornameId)
        .map((el) => {
          if (el.split(" ").join("").indexOf(newKeyword) !== -1) {
            return kornameId[el];
          }
        })
        .filter((element) => element);

      if (dogList.length === 0) throw new Error("데이터가 없습니다.");

      const newData = dogList.map((id) => DATA[id - 1]);
      res.status(200).json(newData);
    } else if (ENGReg.test(keyword)) {
      let newKeyword = keyword.replace(exceptENGReg, "").toLowerCase();

      const dogList = Object.keys(engnameId)
        .map((el) => {
          if (el.toLowerCase().indexOf(newKeyword) !== -1) {
            return engnameId[el];
          }
        })
        .filter((element) => element);

      if (dogList.length === 0) throw new Error("데이터가 없습니다.");

      const newData = dogList.map((id) => DATA[id - 1]);
      res.status(200).json(newData);
    } else {
      throw new Error("데이터가 없습니다.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
