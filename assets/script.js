(function(a,b,c){var d=a[c];if(d)return d;b[c]=d=function(){d.q.push(arguments)};d.q=d.q||[];a[c+"Async"]=true})(window,window.analytics=window.analytics||{},"analytics.js");
// Segment analytics snippet
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,options){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=options};analytics.SNIPPET_VERSION="4.15.3";
analytics.load("YOUR_WRITE_KEY"); // Replace with your Segment Write Key
analytics.page();
}}();

const products = [
  { id: 1, name: "Opal Crystal", price: 50.00, image: "images/mineral1.png", description: "A stunning clear quartz crystal, perfect for collectors." },
  { id: 2, name: "Lava Geode", price: 70.00, image: "images/mineral2.png", description: "A vibrant amethyst geode with deep purple hues." },
  { id: 3, name: "Ocean Quartz", price: 30.00, image: "images/mineral3.png", description: "A soft pink rose quartz, symbolizing love." },
  { id: 4, name: "Thunder Cluster", price: 40.00, image: "images/mineral4.png", description: "A bright citrine cluster, radiating positivity." },
  { id: 5, name: "Moss Stone", price: 90.00, image: "images/mineral5.png", description: "A sleek black obsidian stone, grounding and protective." },

];

function trackProductView(productId) {
  let viewCounts = JSON.parse(localStorage.getItem("viewCounts") || "{}");
  viewCounts[productId] = (viewCounts[productId] || 0) + 1;
  localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  analytics.track("Product Viewed", { productId: productId, viewCount: viewCounts[productId] });
}

function addToFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    analytics.track("Added to Favorites", { productId: productId });
    alert("Added to favorites!");
  } else {
    alert("This product is already in your favorites!");
  }
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  analytics.track("Added to Cart", { productId: productId });
  alert("Added to cart!");
}

function registerUser() {
  const username = document.getElementById("username").value;
  if (username) {
    localStorage.setItem("username", username);
    analytics.identify(username);
    window.location.href = "profile.html";
  } else {
    alert("Please enter a username.");
  }
}

function displayFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  if (!favoritesList) return;
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favoritesList.innerHTML = "";
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p class='text-lg'>No favorites yet.</p>";
    return;
  }
  favorites.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      favoritesList.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
          <a href="product${id}.html" onclick="trackProductView(${id})">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded">
            <h4 class="text-xl font-semibold mt-2">${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
          </a>
          <button onclick="addToCart(${id})" class="mt-2 bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400">Add to Cart</button>
        </div>
      `;
    }
  });
}

function displayCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<p class='text-lg'>Your cart is empty.</p>";
    return;
  }
  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      cartList.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
          <a href="product${id}.html" onclick="trackProductView(${id})">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded">
            <h4 class="text-xl font-semibold mt-2">${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
          </a>
        </div>
      `;
    }
  });
}

function displayOrderSummary() {
  const orderSummary = document.getElementById("order-summary");
  if (!orderSummary) return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  orderSummary.innerHTML = "";
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p class='text-lg'>No items in your order.</p>";
    return;
  }
  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      orderSummary.innerHTML += `
        <div class="bg-white p-4 rounded shadow mb-4">
          <img src="${product.image}" alt="${product.name}" class="w-32 h-32 object-cover rounded inline-block">
          <div class="inline-block ml-4">
            <h4 class="text-xl font-semibold">${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
          </div>
        </div>
      `;
    }
  });
}

function proceedToOrder() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length > 0) {
    window.location.href = "order.html";
  } else {
    alert("Your cart is empty.");
  }
}

function contactSeller() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length > 0) {
    analytics.track("Order Submitted", { cart: cart });
    alert("Please contact the seller to complete your order.");
    localStorage.setItem("cart", "[]");
    window.location.href = "index.html";
  } else {
    alert("No items to order.");
  }
}

function displayMostViewed() {
  const mostViewedSection = document.getElementById("most-viewed");
  if (!mostViewedSection) return;
  let viewCounts = JSON.parse(localStorage.getItem("viewCounts") || "{}");
  // Convert viewCounts to array and sort by view count
  const sortedProducts = Object.keys(viewCounts)
    .map(id => ({ id: parseInt(id), views: viewCounts[id] }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5); // Top 5 most viewed
  mostViewedSection.innerHTML = "";
  if (sortedProducts.length === 0) {
    mostViewedSection.innerHTML = "<p class='text-lg'>No products viewed yet.</p>";
    return;
  }
  sortedProducts.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      mostViewedSection.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
          <a href="product${product.id}.html" onclick="trackProductView(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded">
            <h4 class="text-xl font-semibold mt-2">${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
          </a>
          <button onclick="addToFavorites(${product.id})" class="mt-2 bg-blue-100 px-4 py-2 rounded hover:bg-blue-200">Add to Favorites</button>
          <button onclick="addToCart(${product.id})" class="mt-2 bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400">Add to Cart</button>
        </div>
      `;
    }
  });
}

window.onload = function() {
  // Check for profile page access
  if (window.location.pathname.includes("profile.html")) {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please register to access your profile.");
      window.location.href = "register.html";
      return;
    }
    document.getElementById("username-display").textContent = username;
  }
  // Display favorites
  if (window.location.pathname.includes("favorites.html")) {
    displayFavorites();
  }
  // Display cart
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
  // Display order summary
  if (window.location.pathname.includes("order.html")) {
    displayOrderSummary();
  }
  // Display most viewed products on homepage
  if (window.location.pathname.includes("index.html")) {
    displayMostViewed();
  }
  // Track page view
  analytics.page();
};
