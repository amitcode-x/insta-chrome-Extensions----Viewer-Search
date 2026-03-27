// Instagram Story Viewer Smart Search

function createSearchUI() {
  if (document.getElementById("instaViewerSearch")) return;

  const box = document.createElement("div");
  box.id = "instaViewerSearch";

  box.style.position = "fixed";
  box.style.top = "120px";
  box.style.right = "20px";
  box.style.zIndex = "999999";
  box.style.background = "#0f0f0f";
  box.style.padding = "12px";
  box.style.borderRadius = "12px";
  box.style.width = "280px";
  box.style.color = "white";
  box.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  box.style.fontFamily = "Arial";

  box.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px">
      🔎 Viewer Search
    </div>

    <input 
      id="viewerSearchInput"
      placeholder="Search username..."
      style="
        width:100%;
        padding:10px;
        border-radius:8px;
        border:1px solid #333;
        background:#1a1a1a;
        color:white;
        outline:none;
      "
    />

    <div id="matchCount"
      style="font-size:12px;color:#aaa;margin-top:6px">
      Matches: 0
    </div>

    <div id="results"
      style="
        margin-top:8px;
        max-height:260px;
        overflow:auto;
      ">
    </div>
  `;

  document.body.appendChild(box);

  document
    .getElementById("viewerSearchInput")
    .addEventListener("input", searchUsers);
}

function searchUsers() {
  const value = document
    .getElementById("viewerSearchInput")
    .value
    .toLowerCase();

  const resultBox = document.getElementById("results");
  resultBox.innerHTML = "";

  let count = 0;

  if (!value) {
    document.getElementById("matchCount").innerText = "Matches: 0";
    return;
  }

  const users = document.querySelectorAll("a[href*='/']");

  users.forEach(user => {
    const username = user.innerText;

    if (!username) return;

    if (username.toLowerCase().includes(value)) {

      count++;

      const parent = user.closest("div");

      // highlight in list
      parent.style.background = "#ffe066";
      parent.style.borderRadius = "8px";

      // get profile image
      const img = parent.querySelector("img");
      const dp = img ? img.src : "";

      // result item
      const item = document.createElement("div");

      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.gap = "8px";
      item.style.padding = "6px";
      item.style.marginBottom = "6px";
      item.style.background = "#1a1a1a";
      item.style.borderRadius = "8px";
      item.style.cursor = "pointer";

      item.innerHTML = `
        <img src="${dp}" 
          style="
          width:32px;
          height:32px;
          border-radius:50%;
        ">


        <div style="font-size:13px">
          ${username}
        </div>
      `;

      item.onclick = () => {
        parent.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      };

      resultBox.appendChild(item);
    }
  });

  document.getElementById("matchCount").innerText =
    "Matches: " + count;
}    

setInterval(createSearchUI, 2500);