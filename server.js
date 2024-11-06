const http = require("http");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url.endsWith("/")) req.url += "index.html";
    fs.readFile(`pages/${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  }
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      async function get() {
        let img = [];
        try {
          const response = await axios.get(body);
          let $ = cheerio.load(response.data);
          $("img").each((index, element) => {
            let src = $(element).attr("src");
            if (src) {
              if (src.startsWith("http")) {
                img.push(src);
              } else {
                img.push(body + src);
              }
            }
          });
          return img;
        } catch (err) {
          console.log(err);
          return img;
        }
      }
      async function plus() {
        let getData = await get();
        if (getData.length === 0) {
          console.log("データがありませんでした");
          res.end(JSON.stringify(getData));
        } else {
          console.log("画像URL", getData);
          res.end(JSON.stringify(getData));
        }
      }
      plus();
    });
  }
});

server.listen(port, () => {
  console.log("Server runnning at port:" + port);
});
