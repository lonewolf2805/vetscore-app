// Import Firebase (MODERN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0WwdILAafF0k1pLZcY4gv6GPpmAmkrks",
  authDomain: "vetscore-e89f6.firebaseapp.com",
  projectId: "vetscore-e89f6",
  storageBucket: "vetscore-e89f6.firebasestorage.app",
  messagingSenderId: "75901456641",
  appId: "1:75901456641:web:eeda94ae13d7cfddfb8b00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UI container
const grid = document.getElementById("product-grid");

// Load products from Firestore
async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = [];

  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  // Sort by score (highest first)
  products.sort((a, b) => b.score - a.score);

  // Featured product
  const top = products[0];

  document.getElementById("featured-name").innerText = top.name;
  document.getElementById("featured-score").innerText = top.score + " / 10";
  document.getElementById("featured-success").innerText =
    "Success Rate: " + top.success + "%";

  // Load grid
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach((p) => {
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
}

// Run
loadProducts();
