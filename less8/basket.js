"use strict";

const bascetCounterEl = document.querySelector('.count');
const bascetTotalValue = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.li.header__basket').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.item_flex').addEventListener('click', event => {
    if (!event.target.closest('.add')) {
        return;
    }
    const itemLink = event.target.closest('.item');
    const id = +itemLink.dataset.id;
    const name = itemLink.dataset.name;
    const price = +itemLink.dataset.price;
    addToCart(id, price, name);
});

function addToCart(id, price, name) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    bascetCounterEl.textContent = getTotalBasketCount();
    bascetTotalValue.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0)
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }

    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
             <span class="productCount">${basket[productId].count}</span> шт.
           </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
         </div>
         </div>
          `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}