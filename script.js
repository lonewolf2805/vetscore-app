const products = [
  { name: "Drug A", score: 8.2, success: 75, level: "success" },
  { name: "Drug B", score: 6.9, success: 60, level: "warning" },
  { name: "Drug C", score: 5.1, success: 42, level: "danger" }
];

const grid = document.getElementById("product-grid");

// Load featured
document.getElementById("featured-name").innerText = products[0].name;
document.getElementById("featured-score").innerText = products[0].score + " / 10";
document.getElementById("featured-success").innerText =
  "Success Rate: " + products[0].success + "%";

// Load products
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${p.name}</h4>
    <div class="score">${p.score}</div>
    <p>Success: ${p.success}%</p>
    <span class="badge ${p.level}">
      ${p.level === "success" ? "Effective" :
        p.level === "warning" ? "Moderate" : "Caution"}
    </span>
  `;

  grid.appendChild(div);
});
