// Contenedor de productos y carrito
const productContainer = document.getElementById('productContainer');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');

// Estado del carrito
let cart = [];

// Función para obtener los productos del localStorage
function getProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

// Función para renderizar las tarjetas
function renderCards() {
  const products = getProducts();

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${product.image || 'https://via.placeholder.com/250'}" alt="${product.name}">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">Precio: $${product.price.toFixed(2)}</p>
        <p class="discount">Con descuento: $${product.finalPrice.toFixed(2)} (${product.discount}% OFF)</p>
        <button id="boton-addCart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Añadir al carrito</button>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

// Función para añadir productos al carrito
function addToCart(product) {
  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.find(item => item.code === product.code);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Función para renderizar el carrito
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>El carrito está vacío.</p>';
    subtotalEl.textContent = '0.00';
    discountEl.textContent = '0.00';
    totalEl.textContent = '0.00';
    return;
  }

  cartItems.innerHTML = '';
  let subtotal = 0;
  let discount = 0;

  cart.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('cart-item');

    const productSubtotal = product.price * product.quantity;
    const productDiscount = (product.price - product.finalPrice) * product.quantity;

    subtotal += productSubtotal;
    discount += productDiscount;

    item.innerHTML = `
      <p >${product.name} (<span id="contador-items">${product.quantity}</span> pza)</p>
      <p>$${(product.finalPrice * product.quantity).toFixed(2)}</p>
      <button id="botonEliminar" onclick="removeFromCart('${product.code}')">Eliminar</button>
    `;

    cartItems.appendChild(item);
  });

  const total = subtotal - discount;

  subtotalEl.textContent = subtotal.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(code) {
  cart = cart.filter(product => product.code !== code);
  renderCart();
}

// Renderizar las tarjetas al cargar la página
renderCards();


