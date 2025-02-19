const productForm = document.getElementById('productForm');
const productTable = document.querySelector('#productTable tbody');
const sortByNameBtn = document.getElementById('sortByName');
const sortByPriceBtn = document.getElementById('sortByPrice');

async function loadProductsFromJSON() {
  if (!localStorage.getItem('./products')) {
    try {
      const response = await fetch('./productos.json'); // Carga el archivo JSON
      const products = await response.json();

      // Agregar el precio final calculado
      const productsWithFinalPrice = products.map(product => ({
        ...product,
        finalPrice: product.price - (product.price * (product.discount || 0)) / 100
      }));

      // Guardar en localStorage
      saveProducts(productsWithFinalPrice);
    } catch (error) {
      console.error("Error al cargar productos desde JSON:", error);
    }
  }
}

// Cargar productos del JSON antes de renderizar la tabla
loadProductsFromJSON().then(renderTable);

// Función para obtener productos del localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    console.log("Productos LocalStorage",products);
    return products
      ? JSON.parse(products).map(product => ({
          ...product,
          finalPrice: product.finalPrice || product.price - (product.price * (product.discount || 0)) / 100
        }))
      : [];
  }

// Función para guardar productos en localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Función para renderizar la tabla
function renderTable(products = getProducts()) {
  productTable.innerHTML = '';

  products.forEach((product, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><img src="${product.image || ''}" alt="Imagen" style="max-width: 50px; max-height: 50px; border-radius: 4px;"></td>
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.description}</td>
      <td>
        $${product.price.toFixed(2)} 
        (${product.discount}% → $${product.finalPrice.toFixed(2)})
      </td>
      <td>
        <button class="edit" onclick="editProduct(${index})">Editar</button>
        <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
      </td>
    `;

    productTable.appendChild(row);
  });
}

// Función para agregar un producto
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Recoger valores del formulario
  const name = document.getElementById('productName').value.trim();
  const code = document.getElementById('productCode').value.trim();
  const description = document.getElementById('productDescription').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const discount = parseInt(document.getElementById('productDiscount').value) || 0;
  const image = document.getElementById('productImage').value.trim();

  // Validaciones básicas
  if (!name || !code || !description || isNaN(price) || price < 0 || discount < 0 || discount > 100) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  const finalPrice = price - (price * discount) / 100;

  // Crear nuevo producto
  const products = getProducts();
  products.push({ name, code, description, price, discount, finalPrice, image });
  saveProducts(products);

  // Limpiar formulario y actualizar tabla
  productForm.reset();
  renderTable();
});

// Función para editar un producto
function editProduct(index) {
  const products = getProducts();
  const product = products[index];

  // Cargar datos en el formulario
  document.getElementById('productName').value = product.name;
  document.getElementById('productCode').value = product.code;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productDiscount').value = product.discount;
  document.getElementById('productImage').value = product.image;

  // Eliminar producto actual para actualizarlo al guardar
  deleteProduct(index);
}

// Función para eliminar un producto
function deleteProduct(index) {
  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
  renderTable();
}

// Función para ordenar productos por nombre
sortByNameBtn.addEventListener('click', () => {
  const products = getProducts();
  products.sort((a, b) => a.name.localeCompare(b.name));
  saveProducts(products);
  renderTable();
});

// Función para ordenar productos por precio
sortByPriceBtn.addEventListener('click', () => {
  const products = getProducts();
  products.sort((a, b) => a.price - b.price);
  saveProducts(products);
  renderTable();
});


// Renderizar tabla al cargar la página
renderTable();