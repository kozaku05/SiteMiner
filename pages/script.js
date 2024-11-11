const target = window.location.href;
let getImg = document.getElementById("getImg");
let button = document.querySelector("button");

function submit() {
  button.style.display = "none";
  getImg.innerHTML = "";
  let url = document.getElementById("url").value;
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  if (url) {
    fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: [url],
    })
      .then((response) => {
        if (response.ok) {
          console.log("response: ok");
          return response.json();
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      })
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let img = document.createElement("img");
          const originUrl = new URL(url).origin;
          console.log(originUrl + data[i]);
          img.src = originUrl + "/" + data[i];
          getImg.appendChild(img);
          button.style.display = "block";
        }
        if (data.length === 0) {
          let message = document.createElement("h2");
          message.innerHTML = "画像が見つかりませんでした。";
          getImg.appendChild(message);
          button.style.display = "block";
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        button.style.display = "block";
      });
  }
}
document.getElementById("url").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submit();
  }
});
