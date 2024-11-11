const http = require("http");
const fs = require("fs");
const miner = require("./miner");
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
    req.on("end", async () => {
      let result = await miner(body);
      console.log(body);
      console.log(result);
      res.end(JSON.stringify(result));
    });
  }
});

server.listen(port, () => {
  console.log("Server runnning at port:" + port);
});
