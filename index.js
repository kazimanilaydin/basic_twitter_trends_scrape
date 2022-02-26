const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const URL = "https://trends24.in/turkey/";

const dataExtractor = (htmlData) => {
  let dataList = [];
  const dom = new JSDOM(htmlData);
  let trendListArr = dom.window.document.querySelectorAll(
    "#trend-list > .trend-card"
  );

  trendListArr.forEach((trendCard) => {
    let trendListItems = [];
    let title = trendCard.querySelector(".trend-card__time").textContent;
    let trendByTime = trendCard.querySelectorAll("ol.trend-card__list > li");

    trendByTime.forEach((trendListItem) =>
      trendListItems.push(trendListItem.textContent)
    );

    dataList.push({ title, trendListItems });
  });

  return dataList;
};

axios
  .get(URL)
  .then(function (response) {
    let extractedData = dataExtractor(response.data);
    console.log(extractedData);
  })
  .catch(function (error) {
    console.log(error);
  });
