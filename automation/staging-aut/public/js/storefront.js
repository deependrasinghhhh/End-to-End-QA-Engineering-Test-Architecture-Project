// Storefront Client JavaScript

function showNotification(message, isError = false) {
  const bar = document.getElementById('bar-notification');
  if (!bar) return;
  bar.className = 'bar-notification ' + (isError ? 'error' : 'success');
  bar.querySelector('.content').innerText = message;
  bar.style.display = 'block';
  setTimeout(() => {
    bar.style.display = 'none';
  }, 4000);
}

// Add to Cart from catalog card
async function addToCartAjax(productId) {
  try {
    const res = await fetch('/addproducttocart/catalog/' + productId, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      showNotification(data.message);
      const cartQty = document.querySelector('.cart-qty');
      if (cartQty && data.updatetopcartsectionhtml) {
        cartQty.innerText = data.updatetopcartsectionhtml;
      }
    } else {
      showNotification(data.message, true);
    }
  } catch (err) {
    showNotification('Error adding to cart', true);
  }
}

// Add to Cart from PDP
async function addToCartFromPDP(productId) {
  const qtyInput = document.getElementById('addtocart_' + productId + '_EnteredQuantity');
  const qty = qtyInput ? qtyInput.value : 1;
  if (parseInt(qty) <= 0 || isNaN(parseInt(qty))) {
    alert('Quantity should be positive');
    return;
  }

  try {
    const res = await fetch('/addproducttocart/details/' + productId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parseInt(qty) })
    });
    const data = await res.json();
    if (data.success) {
      showNotification(data.message);
      const cartQty = document.querySelector('.cart-qty');
      if (cartQty && data.updatetopcartsectionhtml) {
        cartQty.innerText = data.updatetopcartsectionhtml;
      }
    } else {
      showNotification(data.message, true);
    }
  } catch (err) {
    showNotification('Error adding to cart', true);
  }
}

// Add to Wishlist
function addToWishlistAjax(productId) {
  showNotification('The product has been added to your wishlist');
  const wishQty = document.querySelector('.wishlist-qty');
  if (wishQty) {
    const current = parseInt(wishQty.innerText.replace(/\D/g, '')) || 0;
    wishQty.innerText = `(${current + 1})`;
  }
}

// Add to Compare
function addToCompareAjax(productId) {
  showNotification('The product has been added to your comparison list');
}

// Auto-suggest search
const searchInput = document.getElementById('small-searchterms');
const autoList = document.getElementById('search-autocomplete-list');
if (searchInput && autoList) {
  searchInput.addEventListener('input', async (e) => {
    const val = e.target.value.trim();
    if (val.length < 2) {
      autoList.style.display = 'none';
      autoList.innerHTML = '';
      return;
    }
    try {
      const res = await fetch('/catalog/searchtermautocomplete?term=' + encodeURIComponent(val));
      const items = await res.json();
      if (items.length > 0) {
        autoList.innerHTML = items.map(i => `<div class="item" onclick="window.location.href='${i.producturl}'">${i.label}</div>`).join('');
        autoList.style.display = 'block';
      } else {
        autoList.style.display = 'none';
      }
    } catch (e) {
      autoList.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autoList.contains(e.target)) {
      autoList.style.display = 'none';
    }
  });
}

// Shopping Cart Actions
async function removeFromCart(itemId) {
  await fetch('/api/cart/items/' + itemId, { method: 'DELETE' });
  window.location.reload();
}

async function updateCartQty(itemId, newQty) {
  const qty = parseInt(newQty);
  if (qty <= 0) {
    removeFromCart(itemId);
    return;
  }
  await fetch('/api/cart/items/' + itemId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: qty })
  });
}

function applyCoupon() {
  const code = (document.getElementById('discountcouponcode').value || '').trim();
  const msgEl = document.getElementById('coupon-message');
  if (code.toUpperCase() === 'DISCOUNT10') {
    window.location.href = '/cart?coupon=applied';
  } else {
    msgEl.innerText = 'The coupon code was not found or is invalid';
    msgEl.style.display = 'block';
  }
}

function removeCoupon() {
  window.location.href = '/cart?coupon=removed';
}

function handleCheckout() {
  const terms = document.getElementById('termsofservice');
  if (terms && !terms.checked) {
    alert('Please accept the terms of service before checkout');
    return;
  }
  window.location.href = '/checkout';
}

// Checkout Accordion Step Switcher
function nextStep(stepId) {
  const steps = ['opc-billing', 'opc-shipping', 'opc-shipping_method', 'opc-payment_method', 'opc-payment_info', 'opc-confirm_order'];
  steps.forEach(s => {
    const el = document.getElementById(s);
    if (!el) return;
    const body = el.querySelector('.step');
    if (s === stepId) {
      el.classList.add('active');
      if (body) body.style.display = 'block';
    } else {
      el.classList.remove('active');
      if (body) body.style.display = 'none';
    }
  });
}

async function submitFinalOrder() {
  const res = await fetch('/api/checkout/orders', { method: 'POST' });
  const data = await res.json();
  window.location.href = '/checkout/completed/' + data.orderNumber;
}

// Re-order
async function reOrder(orderId) {
  await fetch('/api/cart/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 1, quantity: 1 })
  });
  window.location.href = '/cart';
}
