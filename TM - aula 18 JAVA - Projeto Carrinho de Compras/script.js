// const cart = [];
// const API_KEY = 'https://fakestoreapi.com/docs'; 

// document.addEventListener('DOMContentLoaded', () => {
//     fetchProducts();
// });

// async function fetchProducts() {
//     try {
//         const response = await fetch('https://fakestoreapi.com/products');
//         const products = await response.json();
//         displayProducts(products);
//     } catch (error) {
//         console.error('Erro ao buscar produtos:', error);
//     }
// }

// function displayProducts(products) {
//     const productsContainer = document.getElementById('products');
//     productsContainer.innerHTML = ''; // Limpa o container antes de adicionar os novos produtos
    
//     products.forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('product');
//         productElement.innerHTML = `
//             <h3>${product.title}</h3>
//             <p>Preço: R$${product.price.toFixed(2)}</p>
//             <button onclick="addToCart(${product.id}, '${product.title}', ${product.price.toFixed(2)})">Adicionar ao Carrinho</button>
//         `;
//         productsContainer.appendChild(productElement);
//     });
// }

// function addToCart(id, name, price) {
//     // Verifica se o produto já está no carrinho
//     const existingProductIndex = cart.findIndex(item => item.id === id);

//     if (existingProductIndex >= 0) {
//         // Se já estiver no carrinho, aumenta a quantidade
//         cart[existingProductIndex].quantity += 1;
//     } else {
//         // Se não estiver, adiciona ao carrinho
//         cart.push({ id, name, price, quantity: 1 });
//     }

//     updateCartUI();
// }

// function updateCartUI() {
//     const cartItemsElement = document.getElementById('cart-items');
//     const cartTotalElement = document.getElementById('cart-total');

//     cartItemsElement.innerHTML = '';
//     let total = 0;

//     cart.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         total += itemTotal;

//         const listItem = document.createElement('li');
//         listItem.textContent = `${item.name} - R$${item.price.toFixed(2)} x ${item.quantity} = R$${itemTotal.toFixed(2)}`;
//         cartItemsElement.appendChild(listItem);
//     });

//     cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
// }

// async function checkout() {
//     if (cart.length === 0) {
//         alert('O carrinho está vazio!');
//         return;
//     }

//     const orderNumber = generateOrderNumber(); // Função para gerar um número de pedido único
//     const trackingData = {
//         tracking: {
//             order_id: orderNumber,
//             tracking_number: 'TRK123456789',
//             carrier: 'SampleCarrier',
//             status: 'delivered'
//         }
//     };

//     try {
//         const response = await fetch('https://api.aftership.com/v4/trackings', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'aftership-api-key': API_KEY
//             },
//             body: JSON.stringify(trackingData)
//         });

//         if (response.ok) {
//             alert('Compra finalizada com sucesso e notificação enviada!');
//             cart.length = 0; // Limpa o carrinho
//             updateCartUI();
//         } else {
//             alert('Erro ao enviar a notificação.');
//         }
//     } catch (error) {
//         console.error('Erro ao finalizar a compra:', error);
//     }
// }

// // Função para gerar um número de pedido único
// function generateOrderNumber() {
//     return Math.floor(Math.random() * 1000000).toString();
// }


const cart = [];
const API_KEY = 'https://fakestoreapi.com/docs'; // Substitua pela sua chave API AfterShip

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Limpa o container antes de adicionar os novos produtos
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <h3>${product.title}</h3>
                <p>Preço: R$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price.toFixed(2)})">Adicionar ao Carrinho</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(id, name, price) {
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - R$${item.price.toFixed(2)} x ${item.quantity} = R$${itemTotal.toFixed(2)}`;
        cartItemsElement.appendChild(listItem);
    });

    cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
}

async function checkout() {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    const orderNumber = generateOrderNumber();
    const trackingData = {
        tracking: {
            order_id: orderNumber,
            tracking_number: 'TRK123456789',
            carrier: 'SampleCarrier',
            status: 'delivered'
        }
    };

    try {
        const response = await fetch('https://api.aftership.com/v4/trackings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'aftership-api-key': API_KEY
            },
            body: JSON.stringify(trackingData)
        });

        if (response.ok) {
            alert('Compra finalizada com sucesso e notificação enviada!');
            cart.length = 0; // Limpa o carrinho
            updateCartUI();
        } else {
            alert('Erro ao enviar a notificação.');
        }
    } catch (error) {
        console.error('Erro ao finalizar a compra:', error);
    }
}

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000).toString();
}

