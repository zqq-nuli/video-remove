var axios = require("axios").default;

const options = {
  method: "GET",
  url: "https://studio.ixigua.com/api/content/short_list",
  params: {
    params: "xxx",
  },
  headers: {
    cookie: "xxx",
  },
};
var isst = true;
let list = [];
async function start() {
  axios
    .request(options)
    .then(function (response) {
      if (response.data.data.Contents.length <= 0) {
        console.log("全部删除完毕");
        return;
      }
      response.data.data.Contents.forEach(async (el) => {
        list.push({
          id: el.ArticleAttr.ItemId,
        });
      });
      removes();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function removes() {
  if (list.length <= 0) {
    console.log("一轮删除完毕");
    start();
    return;
  }
  const options2 = {
    method: "POST",
    url: "https://studio.ixigua.com/api/content/delete_article",
    headers: {
      "content-type": "application/json",
      cookie: "xxx",
    },
    data: { ItemId: list[0].id },
  };
  axios
    .request(options2)
    .then(function (response) {
      console.log(response.data);
      list.pop();
      removes();
    })
    .catch(function (error) {
      console.error("error");
    });
}
start();
