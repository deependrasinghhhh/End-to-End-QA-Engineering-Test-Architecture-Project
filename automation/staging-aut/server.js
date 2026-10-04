/**
 * High-Fidelity Local Staging AUT Server (nopCommerce v4.70 Specification)
 * 
 * Replicates the authentic nopCommerce HTML DOM architecture, CSS classes,
 * element IDs, AJAX behaviors, and REST API contracts.
 * Allows deterministic, offline, zero-flakiness QA validation.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// In-Memory Database State
const state = {
  users: [
    {
      id: 1,
      guid: 'c9f18a22-381a-4c22-9dfa-80bb11234abc',
      gender: 'M',
      firstName: 'Alex',
      lastName: 'Mercer',
      email: 'customer@nopqa.local',
      password: 'TestPassword123!',
      company: 'Quality Assurance Labs',
      roles: ['Registered'],
      addresses: [
        {
          id: 1,
          firstName: 'Alex',
          lastName: 'Mercer',
          email: 'customer@nopqa.local',
          company: 'Quality Assurance Labs',
          country: 'United States',
          state: 'New York',
          city: 'New York',
          address1: '100 Broadway Suite 400',
          zip: '10005',
          phone: '2125550199'
        }
      ]
    },
    {
      id: 2,
      guid: 'a1122334-bb55-6677-8899-00aabbccddee',
      gender: 'M',
      firstName: 'Admin',
      lastName: 'Manager',
      email: 'admin@nopqa.local',
      password: 'AdminPassword123!',
      company: 'nopCommerce HQ',
      roles: ['Administrators', 'Registered'],
      addresses: []
    }
  ],
  products: [
    {
      id: 1,
      name: 'Build your own computer',
      slug: 'build-your-own-computer',
      category: 'Desktops',
      sku: 'COMP_CUST',
      price: 1200.00,
      oldPrice: 1350.00,
      stockQuantity: 50,
      published: true,
      shortDescription: 'Configure your custom desktop system with high-speed processors and customizable RAM.',
      fullDescription: 'High performance custom PC suitable for software engineering, design, and gaming workflows.',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Apple MacBook Pro 13-inch',
      slug: 'apple-macbook-pro-13-inch',
      category: 'Notebooks',
      sku: 'AP_MBP_13',
      price: 1800.00,
      oldPrice: 1950.00,
      stockQuantity: 25,
      published: true,
      shortDescription: 'Apple M2 chip with 8-core CPU and 10-core GPU, 8GB unified memory.',
      fullDescription: 'Portable workstation with Retina display and exceptional battery longevity.',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Asus N551JK-XO076H Laptop',
      slug: 'asus-n551jk-xo076h-laptop',
      category: 'Notebooks',
      sku: 'AS_551_LP',
      price: 1500.00,
      oldPrice: 1600.00,
      stockQuantity: 15,
      published: true,
      shortDescription: 'High-performance multimedia notebook with SonicMaster Premium audio.',
      fullDescription: 'Powerful laptop built for creators and multithreaded computing tasks.',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Lenovo IdeaCentre 600 All-in-One PC',
      slug: 'lenovo-ideacentre-600-all-in-one-pc',
      category: 'Desktops',
      sku: 'LE_IC_600',
      price: 500.00,
      oldPrice: 650.00,
      stockQuantity: 40,
      published: true,
      shortDescription: 'Sleek all-in-one desktop PC designed for productivity and space saving.',
      fullDescription: 'Modern all-in-one system with vibrant display and integrated audio.',
      rating: 4.2
    }
  ],
  cart: [],
  wishlist: [],
  compare: [],
  orders: [
    {
      id: 1042,
      orderNumber: 'ORD-1042',
      orderGuid: '7b88910a-3199-42b8-9331-52a12903bb41',
      customerId: 1,
      customerEmail: 'customer@nopqa.local',
      date: new Date().toISOString().split('T')[0],
      status: 'Complete',
      paymentStatus: 'Paid',
      shippingStatus: 'Delivered',
      shippingMethod: 'Ground',
      paymentMethod: 'Check / Money Order',
      subtotal: 1200.00,
      shipping: 0.00,
      tax: 96.00,
      orderTotal: 1296.00,
      items: [
        {
          productId: 1,
          productName: 'Build your own computer',
          quantity: 1,
          unitPrice: 1200.00,
          total: 1200.00,
          attributes: 'Processor: 2.5 GHz Intel Core i5 [+$100.00], RAM: 8GB [+$60.00]'
        }
      ],
      billingAddress: {
        firstName: 'Alex',
        lastName: 'Mercer',
        email: 'customer@nopqa.local',
        address1: '100 Broadway Suite 400',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        country: 'United States'
      }
    }
  ],
  appliedCoupon: null,
  activeSessionUser: null
};

// ==============================================================================
// HTML TEMPLATE RENDER HELPERS
// ==============================================================================
function renderLayout(title, content, options = {}) {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishCount = state.wishlist.length;
  const user = state.activeSessionUser;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - nopCommerce Demo Store</title>
  <link rel="stylesheet" href="/public/css/styles.css">
</head>
<body>
  <div id="bar-notification" class="bar-notification" style="display:none;">
    <span class="content"></span>
    <span class="close" title="Close" onclick="document.getElementById('bar-notification').style.display='none'">x</span>
  </div>

  <header class="header">
    <div class="header-upper">
      <div class="header-selectors">
        <select id="customerCurrency" aria-label="Customer currency selector" class="currency-selector" onchange="alert('Currency switched')">
          <option value="USD" selected>US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
        </select>
      </div>
      <div class="header-links-wrapper">
        <ul class="header-links">
          ${user ? `
            <li><a href="/customer/info" class="ico-account">My account</a></li>
            <li><a href="/logout" class="ico-logout">Log out</a></li>
          ` : `
            <li><a href="/register" class="ico-register">Register</a></li>
            <li><a href="/login" class="ico-login">Log in</a></li>
          `}
          <li><a href="/wishlist" class="ico-wishlist"><span class="wishlist-label">Wishlist</span> <span class="wishlist-qty">(${wishCount})</span></a></li>
          <li class="cart-li">
            <a href="/cart" class="ico-cart"><span class="cart-label">Shopping cart</span> <span class="cart-qty">(${cartCount})</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-lower">
      <div class="header-logo">
        <a href="/"><span class="logo-text">nopCommerce</span></a>
      </div>
      <div class="search-box header-search-box">
        <form action="/search" method="get" id="small-search-box-form">
          <input type="text" class="search-box-text" id="small-searchterms" autocomplete="off" name="q" placeholder="Search store" aria-label="Search store">
          <button type="submit" class="button-1 search-box-button">Search</button>
          <div id="search-autocomplete-list" class="ui-autocomplete" style="display:none;"></div>
        </form>
      </div>
    </div>
  </header>

  <nav class="top-menu-triangle">
    <ul class="top-menu notmobile">
      <li>
        <a href="/computers">Computers</a>
        <div class="sublist-toggle"></div>
        <ul class="sublist first-level">
          <li><a href="/desktops">Desktops</a></li>
          <li><a href="/notebooks">Notebooks</a></li>
          <li><a href="/software">Software</a></li>
        </ul>
      </li>
      <li>
        <a href="/electronics">Electronics</a>
        <ul class="sublist first-level">
          <li><a href="/camera-photo">Camera & photo</a></li>
          <li><a href="/cell-phones">Cell phones</a></li>
        </ul>
      </li>
      <li>
        <a href="/apparel">Apparel</a>
        <ul class="sublist first-level">
          <li><a href="/shoes">Shoes</a></li>
          <li><a href="/clothing">Clothing</a></li>
        </ul>
      </li>
      <li><a href="/digital-downloads">Digital downloads</a></li>
      <li><a href="/books">Books</a></li>
      <li><a href="/jewelry">Jewelry</a></li>
      <li><a href="/gift-cards">Gift Cards</a></li>
    </ul>
  </nav>

  <main class="master-wrapper-content">
    ${content}
  </main>

  <footer class="footer">
    <div class="footer-upper">
      <div class="footer-block information">
        <div class="title"><strong>Information</strong></div>
        <ul class="list">
          <li><a href="/sitemap">Sitemap</a></li>
          <li><a href="/shipping-returns">Shipping & returns</a></li>
          <li><a href="/privacy-notice">Privacy notice</a></li>
          <li><a href="/conditions-of-use">Conditions of Use</a></li>
          <li><a href="/about-us">About us</a></li>
          <li><a href="/contactus">Contact us</a></li>
        </ul>
      </div>
      <div class="footer-block customer-service">
        <div class="title"><strong>Customer service</strong></div>
        <ul class="list">
          <li><a href="/search">Search</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/compareproducts">Compare products list</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
        </ul>
      </div>
      <div class="footer-block my-account">
        <div class="title"><strong>My account</strong></div>
        <ul class="list">
          <li><a href="/customer/info">My account</a></li>
          <li><a href="/order/history">Orders</a></li>
          <li><a href="/customer/addresses">Addresses</a></li>
          <li><a href="/cart">Shopping cart</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-lower">
      <div class="footer-info">
        <span class="footer-disclaimer">Powered by <a href="https://www.nopcommerce.com/">nopCommerce</a></span>
      </div>
    </div>
  </footer>

  <script src="/public/js/storefront.js"></script>
</body>
</html>`;
}

// ==============================================================================
// STOREFRONT ROUTES
// ==============================================================================

// Homepage
app.get('/', (req, res) => {
  const featured = state.products.slice(0, 4);
  const content = `
    <div class="home-page">
      <div class="slider-wrapper">
        <div class="nivoSlider" id="slider">
          <div class="slide-content">
            <h1>Welcome to our store</h1>
            <p>nopCommerce is the leading open-source e-commerce platform.</p>
          </div>
        </div>
      </div>
      <div class="product-grid home-page-product-grid">
        <div class="title"><strong>Featured products</strong></div>
        <div class="item-grid">
          ${featured.map(p => `
            <div class="item-box">
              <div class="product-item" data-productid="${p.id}">
                <div class="picture">
                  <a href="/${p.slug}" title="${p.name}"><img src="/public/images/product-placeholder.png" alt="${p.name}"></a>
                </div>
                <div class="details">
                  <h2 class="product-title"><a href="/${p.slug}">${p.name}</a></h2>
                  <div class="product-rating-box" title="${p.rating} star(s)">
                    <div class="rating"><div style="width: 90%;"></div></div>
                  </div>
                  <div class="description">${p.shortDescription}</div>
                  <div class="add-info">
                    <div class="prices">
                      ${p.oldPrice ? `<span class="price old-price">$${p.oldPrice.toFixed(2)}</span>` : ''}
                      <span class="price actual-price">$${p.price.toFixed(2)}</span>
                    </div>
                    <div class="buttons">
                      <button type="button" class="button-2 product-box-add-to-cart-button" onclick="addToCartAjax(${p.id})">Add to cart</button>
                      <button type="button" class="button-2 add-to-wishlist-button" onclick="addToWishlistAjax(${p.id})">Add to wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Home page', content));
});

// Register
app.get('/register', (req, res) => {
  const content = `
    <div class="page registration-page">
      <div class="page-title"><h1>Register</h1></div>
      <div class="page-body">
        <form method="post" action="/register" id="register-form" novalidate>
          <div class="fieldset">
            <div class="title"><strong>Your Personal Details</strong></div>
            <div class="form-fields">
              <div class="inputs">
                <label>Gender:</label>
                <div class="gender">
                  <span class="male"><input type="radio" value="M" id="gender-male" name="Gender" checked><label class="forcheckbox" for="gender-male">Male</label></span>
                  <span class="female"><input type="radio" value="F" id="gender-female" name="Gender"><label class="forcheckbox" for="gender-female">Female</label></span>
                </div>
              </div>
              <div class="inputs">
                <label for="FirstName">First name:</label>
                <input type="text" id="FirstName" name="FirstName" required>
                <span class="required">*</span>
              </div>
              <div class="inputs">
                <label for="LastName">Last name:</label>
                <input type="text" id="LastName" name="LastName" required>
                <span class="required">*</span>
              </div>
              <div class="inputs">
                <label for="Email">Email:</label>
                <input type="email" id="Email" name="Email" required>
                <span class="required">*</span>
                <span class="field-validation-error" id="Email-error"></span>
              </div>
              <div class="inputs">
                <label for="Company">Company name:</label>
                <input type="text" id="Company" name="Company">
              </div>
              <div class="inputs">
                <input type="checkbox" id="Newsletter" name="Newsletter" checked>
                <label class="forcheckbox" for="Newsletter">Newsletter</label>
              </div>
            </div>
          </div>
          <div class="fieldset">
            <div class="title"><strong>Your Password</strong></div>
            <div class="form-fields">
              <div class="inputs">
                <label for="Password">Password:</label>
                <input type="password" id="Password" name="Password" required minlength="6">
                <span class="required">*</span>
                <span class="field-validation-error" id="Password-error"></span>
              </div>
              <div class="inputs">
                <label for="ConfirmPassword">Confirm password:</label>
                <input type="password" id="ConfirmPassword" name="ConfirmPassword" required>
                <span class="required">*</span>
                <span class="field-validation-error" id="ConfirmPassword-error"></span>
              </div>
            </div>
          </div>
          <div class="buttons">
            <button type="submit" id="register-button" class="button-1 register-next-step-button" name="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout('Register', content));
});

app.post('/register', (req, res) => {
  const { FirstName, LastName, Email, Password, ConfirmPassword, Company, Gender } = req.body;
  if (!FirstName || !LastName || !Email || !Password) {
    return res.status(400).send(renderLayout('Register Error', '<div class="message-error">Please fill all required fields</div>'));
  }
  if (state.users.some(u => u.email.toLowerCase() === Email.toLowerCase())) {
    const content = `
      <div class="page registration-page">
        <div class="page-title"><h1>Register</h1></div>
        <div class="message-error validation-summary-errors">
          <ul><li>The specified email already exists</li></ul>
        </div>
      </div>
    `;
    return res.status(400).send(renderLayout('Register', content));
  }
  if (Password !== ConfirmPassword) {
    const content = `
      <div class="page registration-page">
        <div class="page-title"><h1>Register</h1></div>
        <div class="message-error validation-summary-errors">
          <ul><li>The password and confirmation password do not match.</li></ul>
        </div>
      </div>
    `;
    return res.status(400).send(renderLayout('Register', content));
  }
  if (Password.length < 6) {
    const content = `
      <div class="page registration-page">
        <div class="page-title"><h1>Register</h1></div>
        <div class="message-error validation-summary-errors">
          <ul><li>The password must have at least 6 characters</li></ul>
        </div>
      </div>
    `;
    return res.status(400).send(renderLayout('Register', content));
  }

  const newUser = {
    id: state.users.length + 1,
    guid: 'gen-' + Date.now(),
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    password: Password,
    company: Company || '',
    gender: Gender || 'M',
    roles: ['Registered'],
    addresses: []
  };
  state.users.push(newUser);
  state.activeSessionUser = newUser;

  const content = `
    <div class="page registration-result-page">
      <div class="page-title"><h1>Register</h1></div>
      <div class="page-body">
        <div class="result">Your registration completed</div>
        <div class="buttons">
          <a href="/" class="button-1 register-continue-button">Continue</a>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Register completed', content));
});

// Login
app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/';
  const content = `
    <div class="page login-page">
      <div class="page-title"><h1>Welcome, Please Sign In!</h1></div>
      <div class="page-body">
        <div class="customer-blocks">
          <div class="new-wrapper register-block">
            <div class="title"><strong>New Customer</strong></div>
            <div class="text">By creating an account on our website you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</div>
            <div class="buttons"><a href="/register" class="button-1 register-button">Register</a></div>
          </div>
          <div class="returning-wrapper fieldset">
            <form method="post" action="/login?returnUrl=${encodeURIComponent(returnUrl)}" id="login-form">
              <div class="title"><strong>Returning Customer</strong></div>
              <div class="form-fields">
                <div class="inputs">
                  <label for="Email">Email:</label>
                  <input class="email" type="email" id="Email" name="Email" required autofocus>
                </div>
                <div class="inputs">
                  <label for="Password">Password:</label>
                  <input class="password" type="password" id="Password" name="Password" required>
                </div>
                <div class="inputs reversed">
                  <input type="checkbox" id="RememberMe" name="RememberMe">
                  <label for="RememberMe">Remember me?</label>
                  <span class="forgot-password"><a href="/passwordrecovery">Forgot password?</a></span>
                </div>
              </div>
              <div class="buttons">
                <button type="submit" class="button-1 login-button">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Login', content));
});

app.post('/login', (req, res) => {
  const { Email, Password } = req.body;
  const returnUrl = req.query.returnUrl || '/';

  const user = state.users.find(u => u.email.toLowerCase() === (Email || '').trim().toLowerCase());
  if (!user || user.password !== Password) {
    const errorMsg = !user 
      ? 'Login was unsuccessful. Please correct the errors and try again. No customer account found'
      : 'The credentials provided are incorrect';
    const content = `
      <div class="page login-page">
        <div class="page-title"><h1>Welcome, Please Sign In!</h1></div>
        <div class="message-error validation-summary-errors">
          <ul><li>${errorMsg}</li></ul>
        </div>
        <div class="page-body">
          <div class="customer-blocks">
            <div class="returning-wrapper fieldset">
              <form method="post" action="/login" id="login-form">
                <div class="inputs"><label for="Email">Email:</label><input class="email" id="Email" name="Email" value="${Email || ''}"></div>
                <div class="inputs"><label for="Password">Password:</label><input class="password" type="password" id="Password" name="Password"></div>
                <div class="buttons"><button type="submit" class="button-1 login-button">Log in</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    return res.status(400).send(renderLayout('Login', content));
  }

  state.activeSessionUser = user;
  res.redirect(returnUrl);
});

// Logout
app.get('/logout', (req, res) => {
  state.activeSessionUser = null;
  res.redirect('/');
});

// Password recovery
app.get('/passwordrecovery', (req, res) => {
  const content = `
    <div class="page password-recovery-page">
      <div class="page-title"><h1>Password recovery</h1></div>
      <div class="page-body">
        <form method="post" action="/passwordrecovery">
          <p class="tooltip">Please enter your email address below. You will receive a link to reset your password.</p>
          <div class="fieldset">
            <div class="form-fields">
              <div class="inputs">
                <label for="Email">Your email address:</label>
                <input class="email" type="email" id="Email" name="Email" required>
              </div>
            </div>
          </div>
          <div class="buttons">
            <button type="submit" name="send-email" class="button-1 password-recovery-button">Recover</button>
          </div>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout('Password recovery', content));
});

app.post('/passwordrecovery', (req, res) => {
  const { Email } = req.body;
  const user = state.users.find(u => u.email.toLowerCase() === (Email || '').toLowerCase());
  let msg = user ? 'Email with instructions has been sent to you.' : 'Email not found';
  const content = `
    <div class="page password-recovery-page">
      <div class="page-title"><h1>Password recovery</h1></div>
      <div class="page-body">
        <p class="result ${user ? 'success' : 'error'}">${msg}</p>
      </div>
    </div>
  `;
  res.send(renderLayout('Password recovery', content));
});

// Category Pages
app.get('/desktops', (req, res) => {
  let products = [...state.products.filter(p => p.category === 'Desktops')];
  const sort = req.query.orderby || '0';
  if (sort === '10') products.sort((a, b) => a.price - b.price); // Price Low to High
  if (sort === '11') products.sort((a, b) => b.price - a.price); // Price High to Low
  if (sort === '5') products.sort((a, b) => a.name.localeCompare(b.name)); // A-Z

  const content = `
    <div class="page category-page">
      <div class="page-title"><h1>Desktops</h1></div>
      <div class="breadcrumb">
        <ul>
          <li><a href="/">Home</a><span class="delimiter">/</span></li>
          <li><a href="/computers">Computers</a><span class="delimiter">/</span></li>
          <li><strong class="current-item">Desktops</strong></li>
        </ul>
      </div>
      <div class="page-body">
        <div class="product-selectors">
          <div class="product-sorting">
            <span>Sort by</span>
            <select id="products-orderby" name="products-orderby" aria-label="Select product sort order" onchange="window.location.href='/desktops?orderby='+this.value">
              <option value="0" ${sort==='0'?'selected':''}>Position</option>
              <option value="5" ${sort==='5'?'selected':''}>Name: A to Z</option>
              <option value="10" ${sort==='10'?'selected':''}>Price: Low to High</option>
              <option value="11" ${sort==='11'?'selected':''}>Price: High to Low</option>
            </select>
          </div>
          <div class="product-page-size">
            <span>Display</span>
            <select id="products-pagesize" name="products-pagesize" aria-label="Select number of products per page">
              <option value="3">3</option>
              <option value="6" selected>6</option>
              <option value="9">9</option>
            </select>
            <span>per page</span>
          </div>
          <div class="product-viewmode">
            <span>View as</span>
            <a class="viewmode-icon grid selected" href="/desktops?viewmode=grid">Grid</a>
            <a class="viewmode-icon list" href="/desktops?viewmode=list">List</a>
          </div>
        </div>
        <div class="product-grid">
          <div class="item-grid">
            ${products.map(p => `
              <div class="item-box">
                <div class="product-item" data-productid="${p.id}">
                  <div class="picture"><a href="/${p.slug}"><img src="/public/images/product-placeholder.png" alt="${p.name}"></a></div>
                  <div class="details">
                    <h2 class="product-title"><a href="/${p.slug}">${p.name}</a></h2>
                    <div class="add-info">
                      <div class="prices"><span class="price actual-price">$${p.price.toFixed(2)}</span></div>
                      <div class="buttons">
                        <button type="button" class="button-2 product-box-add-to-cart-button" onclick="addToCartAjax(${p.id})">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Desktops', content));
});

app.get('/computers', (req, res) => {
  res.redirect('/desktops');
});

// Product Details Page
app.get('/build-your-own-computer', (req, res) => {
  const p = state.products[0];
  const content = `
    <div class="page product-details-page">
      <div class="page-body">
        <form method="post" id="product-details-form">
          <div class="product-essential">
            <div class="gallery">
              <div class="picture">
                <img id="main-product-img" src="/public/images/product-placeholder.png" alt="${p.name}">
              </div>
            </div>
            <div class="overview">
              <div class="product-name">
                <h1 id="product-title">${p.name}</h1>
              </div>
              <div class="short-description">${p.shortDescription}</div>
              <div class="sku"><span class="label">SKU:</span> <span class="value" id="sku-1">${p.sku}</span></div>
              <div class="stock"><span class="label">Availability:</span> <span class="value" id="stock-availability-value-1">In stock</span></div>
              <div class="attributes">
                <dl>
                  <dt><label class="text-prompt" for="product_attribute_1">Processor</label><span class="required">*</span></dt>
                  <dd>
                    <select name="product_attribute_1" id="product_attribute_1" aria-label="Select Processor" onchange="updatePrice()">
                      <option value="1">2.2 GHz Intel Core i5 [+$0.00]</option>
                      <option value="2" selected>2.5 GHz Intel Core i5 [+$100.00]</option>
                    </select>
                  </dd>
                  <dt><label class="text-prompt" for="product_attribute_2">RAM</label><span class="required">*</span></dt>
                  <dd>
                    <select name="product_attribute_2" id="product_attribute_2" aria-label="Select RAM" onchange="updatePrice()">
                      <option value="3">4GB [+$0.00]</option>
                      <option value="4" selected>8GB [+$60.00]</option>
                    </select>
                  </dd>
                  <dt><label class="text-prompt">HDD</label><span class="required">*</span></dt>
                  <dd>
                    <ul class="option-list">
                      <li><input id="product_attribute_3_6" type="radio" name="product_attribute_3" value="6"><label for="product_attribute_3_6">320 GB</label></li>
                      <li><input id="product_attribute_3_7" type="radio" name="product_attribute_3" value="7" checked><label for="product_attribute_3_7">400 GB [+$100.00]</label></li>
                    </ul>
                  </dd>
                  <dt><label class="text-prompt">OS</label><span class="required">*</span></dt>
                  <dd>
                    <ul class="option-list">
                      <li><input id="product_attribute_4_8" type="radio" name="product_attribute_4" value="8"><label for="product_attribute_4_8">Ubuntu</label></li>
                      <li><input id="product_attribute_4_9" type="radio" name="product_attribute_4" value="9" checked><label for="product_attribute_4_9">Windows 10 [+$50.00]</label></li>
                    </ul>
                  </dd>
                  <dt><label class="text-prompt">Software</label></dt>
                  <dd>
                    <ul class="option-list">
                      <li><input id="product_attribute_5_10" type="checkbox" name="product_attribute_5" value="10" checked><label for="product_attribute_5_10">Microsoft Office [+$50.00]</label></li>
                    </ul>
                  </dd>
                </dl>
              </div>
              <div class="prices">
                <div class="product-price">
                  <span class="price-value-1" id="price-value-1">$1,200.00</span>
                </div>
              </div>
              <div class="add-to-cart">
                <div class="add-to-cart-panel">
                  <label class="qty-label" for="addtocart_1_EnteredQuantity">Qty:</label>
                  <input class="qty-input" type="number" id="addtocart_1_EnteredQuantity" name="addtocart_1.EnteredQuantity" value="1" min="1">
                  <button type="button" id="add-to-cart-button-1" class="button-1 add-to-cart-button" onclick="addToCartFromPDP(1)">Add to cart</button>
                  <button type="button" id="add-to-wishlist-button-1" class="button-2 add-to-wishlist-button" onclick="addToWishlistAjax(1)">Add to wishlist</button>
                  <button type="button" class="button-2 add-to-compare-list-button" onclick="addToCompareAjax(1)">Add to compare list</button>
                </div>
              </div>
            </div>
          </div>
          <div class="full-description">${p.fullDescription}</div>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout(p.name, content));
});

// Search
app.get('/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  const matched = q ? state.products.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)) : [];

  const content = `
    <div class="page search-page">
      <div class="page-title"><h1>Search</h1></div>
      <div class="search-input">
        <form method="get" action="/search">
          <div class="fieldset">
            <div class="form-fields">
              <div class="basic-search">
                <label for="q">Search keyword:</label>
                <input type="text" class="search-text" id="q" name="q" value="${req.query.q || ''}">
              </div>
              <div class="advanced-search">
                <input type="checkbox" id="advs" name="advs">
                <label for="advs">Advanced search</label>
              </div>
            </div>
            <div class="buttons">
              <button type="submit" class="button-1 search-button">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div class="search-results">
        ${!q ? '' : matched.length === 0 ? `
          <div class="no-result">No products were found that matched your criteria.</div>
        ` : `
          <div class="product-grid">
            <div class="item-grid">
              ${matched.map(p => `
                <div class="item-box">
                  <div class="product-item">
                    <h2 class="product-title"><a href="/${p.slug}">${p.name}</a></h2>
                    <div class="prices"><span class="price actual-price">$${p.price.toFixed(2)}</span></div>
                    <button type="button" class="button-2 product-box-add-to-cart-button" onclick="addToCartAjax(${p.id})">Add to cart</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    </div>
  `;
  res.send(renderLayout('Search', content));
});

// Shopping Cart
app.get('/cart', (req, res) => {
  const items = state.cart;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = state.appliedCoupon === 'DISCOUNT10' ? subtotal * 0.10 : 0.00;
  const shipping = items.length > 0 ? 0.00 : 0.00;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax + shipping;

  const content = `
    <div class="page shopping-cart-page">
      <div class="page-title"><h1>Shopping cart</h1></div>
      <div class="page-body">
        ${items.length === 0 ? `
          <div class="order-summary-content">
            <div class="no-data">Your Shopping Cart is empty!</div>
          </div>
        ` : `
          <form method="post" action="/cart" id="shopping-cart-form">
            <div class="table-wrapper">
              <table class="cart">
                <thead>
                  <tr>
                    <th class="remove-from-cart">Remove</th>
                    <th class="product-picture">Image</th>
                    <th class="product">Product(s)</th>
                    <th class="unit-price">Price</th>
                    <th class="quantity">Qty.</th>
                    <th class="subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td class="remove-from-cart">
                        <button type="button" name="removefromcart" class="remove-btn" onclick="removeFromCart(${item.id})">x</button>
                      </td>
                      <td class="product-picture">
                        <img src="/public/images/product-placeholder.png" alt="${item.name}" width="60">
                      </td>
                      <td class="product">
                        <a href="/${item.slug}" class="product-name">${item.name}</a>
                        ${item.attributes ? `<div class="attributes">${item.attributes}</div>` : ''}
                      </td>
                      <td class="unit-price"><span class="product-unit-price">$${item.price.toFixed(2)}</span></td>
                      <td class="quantity">
                        <input type="number" id="itemquantity${item.id}" name="itemquantity${item.id}" value="${item.quantity}" class="qty-input" min="1" onchange="updateCartQty(${item.id}, this.value)">
                      </td>
                      <td class="subtotal"><span class="product-subtotal">$${(item.price * item.quantity).toFixed(2)}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="cart-options">
              <div class="common-buttons">
                <button type="submit" id="updatecart" name="updatecart" class="button-2 update-cart-button">Update shopping cart</button>
                <a href="/" class="button-2 continue-shopping-button">Continue shopping</a>
              </div>
              <div class="coupon-box">
                <div class="title"><strong>Discount Code</strong></div>
                <div class="hint">Enter your coupon here</div>
                <div class="coupon-code">
                  <input name="discountcouponcode" id="discountcouponcode" type="text" class="discount-coupon-code" aria-label="Enter discount coupon code">
                  <button type="button" name="applydiscountcouponcode" id="applydiscountcouponcode" class="button-2 apply-discount-coupon-code-button" onclick="applyCoupon()">Apply coupon</button>
                </div>
                <div id="coupon-message" class="message-error" style="display:none;"></div>
                ${state.appliedCoupon ? `<div class="current-code">Applied Coupon: <strong>${state.appliedCoupon}</strong> (-10%) <button type="button" onclick="removeCoupon()">[x]</button></div>` : ''}
              </div>
            </div>
            <div class="cart-footer">
              <div class="totals">
                <div class="total-info">
                  <table class="cart-total">
                    <tbody>
                      <tr class="order-subtotal"><td class="cart-total-left"><label>Sub-Total:</label></td><td class="cart-total-right"><span class="value-summary">$${subtotal.toFixed(2)}</span></td></tr>
                      ${discountAmount > 0 ? `<tr class="order-discount"><td class="cart-total-left"><label>Discount:</label></td><td class="cart-total-right"><span class="value-summary">-$${discountAmount.toFixed(2)}</span></td></tr>` : ''}
                      <tr class="tax-value"><td class="cart-total-left"><label>Tax:</label></td><td class="cart-total-right"><span class="value-summary">$${tax.toFixed(2)}</span></td></tr>
                      <tr class="order-total"><td class="cart-total-left"><label>Total:</label></td><td class="cart-total-right"><span class="value-summary"><strong>$${total.toFixed(2)}</strong></span></td></tr>
                    </tbody>
                  </table>
                </div>
                <div class="terms-of-service">
                  <input id="termsofservice" type="checkbox" name="termsofservice">
                  <label for="termsofservice">I agree with the terms of service and I adhere to them unconditionally</label>
                </div>
                <div class="checkout-buttons">
                  <button type="button" id="checkout" name="checkout" value="checkout" class="button-1 checkout-button" onclick="handleCheckout()">Checkout</button>
                </div>
              </div>
            </div>
          </form>
        `}
      </div>
    </div>
  `;
  res.send(renderLayout('Shopping cart', content));
});

app.post('/cart', (req, res) => {
  res.redirect('/cart');
});

// Wishlist
app.get('/wishlist', (req, res) => {
  const items = state.wishlist;
  const content = `
    <div class="page wishlist-page">
      <div class="page-title"><h1>Wishlist</h1></div>
      <div class="page-body">
        ${items.length === 0 ? `
          <div class="no-data">The wishlist is empty!</div>
        ` : `
          <div class="table-wrapper">
            <table class="cart">
              <thead><tr><th>Add to cart</th><th>Product</th><th>Price</th></tr></thead>
              <tbody>
                ${items.map(item => `
                  <tr>
                    <td><input type="checkbox" name="addtocart" value="${item.id}" checked></td>
                    <td><a href="/${item.slug}">${item.name}</a></td>
                    <td>$${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="buttons">
            <button type="button" class="button-1 wishlist-add-to-cart-button" onclick="transferWishlistToCart()">Add to cart</button>
          </div>
        `}
      </div>
    </div>
  `;
  res.send(renderLayout('Wishlist', content));
});

// Checkout (One-page accordion flow)
app.get('/checkout', (req, res) => {
  if (state.cart.length === 0) {
    return res.redirect('/cart');
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = state.appliedCoupon === 'DISCOUNT10' ? subtotal * 0.10 : 0.00;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const content = `
    <div class="page checkout-page">
      <div class="page-title"><h1>Checkout</h1></div>
      <div class="page-body checkout-data">
        <ol class="opc" id="checkout-steps">
          
          <!-- Step 1: Billing Address -->
          <li id="opc-billing" class="tab-section allow active">
            <div class="step-title">
              <span class="number">1</span>
              <h2>Billing address</h2>
            </div>
            <div id="checkout-step-billing" class="step a-item">
              <div id="billing-new-address-form">
                <div class="enter-address">
                  <div class="inputs"><label for="BillingNewAddress_FirstName">First name:</label><input type="text" id="BillingNewAddress_FirstName" name="BillingNewAddress.FirstName" value="Alex" required></div>
                  <div class="inputs"><label for="BillingNewAddress_LastName">Last name:</label><input type="text" id="BillingNewAddress_LastName" name="BillingNewAddress.LastName" value="Mercer" required></div>
                  <div class="inputs"><label for="BillingNewAddress_Email">Email:</label><input type="email" id="BillingNewAddress_Email" name="BillingNewAddress.Email" value="customer@nopqa.local" required></div>
                  <div class="inputs"><label for="BillingNewAddress_CountryId">Country:</label><select id="BillingNewAddress_CountryId" name="BillingNewAddress.CountryId"><option value="1">United States</option></select></div>
                  <div class="inputs"><label for="BillingNewAddress_City">City:</label><input type="text" id="BillingNewAddress_City" name="BillingNewAddress.City" value="New York" required></div>
                  <div class="inputs"><label for="BillingNewAddress_Address1">Address 1:</label><input type="text" id="BillingNewAddress_Address1" name="BillingNewAddress.Address1" value="100 Broadway Suite 400" required></div>
                  <div class="inputs"><label for="BillingNewAddress_ZipPostalCode">Zip / postal code:</label><input type="text" id="BillingNewAddress_ZipPostalCode" name="BillingNewAddress.ZipPostalCode" value="10005" required></div>
                  <div class="inputs"><label for="BillingNewAddress_PhoneNumber">Phone number:</label><input type="text" id="BillingNewAddress_PhoneNumber" name="BillingNewAddress.PhoneNumber" value="2125550199" required></div>
                </div>
              </div>
              <div class="buttons" id="billing-buttons-container">
                <button type="button" name="save" class="button-1 new-address-next-step-button" onclick="nextStep('opc-shipping')">Continue</button>
              </div>
            </div>
          </li>

          <!-- Step 2: Shipping Address -->
          <li id="opc-shipping" class="tab-section">
            <div class="step-title">
              <span class="number">2</span>
              <h2>Shipping address</h2>
            </div>
            <div id="checkout-step-shipping" class="step a-item" style="display:none;">
              <div class="pickup-in-store">
                <input type="checkbox" id="PickUpInStore" name="PickUpInStore">
                <label for="PickUpInStore">Pick up in store</label>
              </div>
              <div class="buttons" id="shipping-buttons-container">
                <button type="button" class="button-1 new-address-next-step-button" onclick="nextStep('opc-shipping_method')">Continue</button>
              </div>
            </div>
          </li>

          <!-- Step 3: Shipping Method -->
          <li id="opc-shipping_method" class="tab-section">
            <div class="step-title">
              <span class="number">3</span>
              <h2>Shipping method</h2>
            </div>
            <div id="checkout-step-shipping-method" class="step a-item" style="display:none;">
              <ul class="method-list">
                <li><input id="shippingoption_0" type="radio" name="shippingoption" value="Ground___0.00" checked><label for="shippingoption_0">Ground ($0.00)</label></li>
                <li><input id="shippingoption_1" type="radio" name="shippingoption" value="NextDayAir___40.00"><label for="shippingoption_1">Next Day Air ($40.00)</label></li>
                <li><input id="shippingoption_2" type="radio" name="shippingoption" value="2ndDayAir___20.00"><label for="shippingoption_2">2nd Day Air ($20.00)</label></li>
              </ul>
              <div class="buttons" id="shipping-method-buttons-container">
                <button type="button" class="button-1 shipping-method-next-step-button" onclick="nextStep('opc-payment_method')">Continue</button>
              </div>
            </div>
          </li>

          <!-- Step 4: Payment Method -->
          <li id="opc-payment_method" class="tab-section">
            <div class="step-title">
              <span class="number">4</span>
              <h2>Payment method</h2>
            </div>
            <div id="checkout-step-payment-method" class="step a-item" style="display:none;">
              <ul class="method-list">
                <li><input id="paymentmethod_0" type="radio" name="paymentmethod" value="Payments.CheckMoneyOrder" checked><label for="paymentmethod_0">Check / Money Order</label></li>
                <li><input id="paymentmethod_1" type="radio" name="paymentmethod" value="Payments.Manual"><label for="paymentmethod_1">Credit Card</label></li>
                <li><input id="paymentmethod_2" type="radio" name="paymentmethod" value="Payments.CashOnDelivery"><label for="paymentmethod_2">Cash On Delivery (COD)</label></li>
              </ul>
              <div class="buttons" id="payment-method-buttons-container">
                <button type="button" class="button-1 payment-method-next-step-button" onclick="nextStep('opc-payment_info')">Continue</button>
              </div>
            </div>
          </li>

          <!-- Step 5: Payment Info -->
          <li id="opc-payment_info" class="tab-section">
            <div class="step-title">
              <span class="number">5</span>
              <h2>Payment information</h2>
            </div>
            <div id="checkout-step-payment-info" class="step a-item" style="display:none;">
              <div id="payment-info-content">
                <p>Mail your check or money order to: nopCommerce QA Corp, 100 Broadway Suite 400, New York, NY 10005.</p>
              </div>
              <div class="buttons" id="payment-info-buttons-container">
                <button type="button" class="button-1 payment-info-next-step-button" onclick="nextStep('opc-confirm_order')">Continue</button>
              </div>
            </div>
          </li>

          <!-- Step 6: Confirm Order -->
          <li id="opc-confirm_order" class="tab-section">
            <div class="step-title">
              <span class="number">6</span>
              <h2>Confirm order</h2>
            </div>
            <div id="checkout-step-confirm-order" class="step a-item" style="display:none;">
              <div class="order-summary-content">
                <div class="order-review-data">
                  <div class="billing-info"><strong>Billing Address:</strong> Alex Mercer, 100 Broadway Suite 400, New York, NY 10005</div>
                  <div class="shipping-info"><strong>Shipping Address:</strong> Alex Mercer, 100 Broadway Suite 400, New York, NY 10005</div>
                  <div class="shipping-method-info"><strong>Shipping Method:</strong> Ground</div>
                  <div class="payment-method-info"><strong>Payment Method:</strong> Check / Money Order</div>
                </div>
                <table class="cart">
                  <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                  <tbody>
                    ${state.cart.map(i => `<tr><td>${i.name}</td><td>$${i.price.toFixed(2)}</td><td>${i.quantity}</td><td>$${(i.price*i.quantity).toFixed(2)}</td></tr>`).join('')}
                  </tbody>
                </table>
                <div class="cart-total-right" style="margin-top:15px; font-size:18px;">
                  <strong>Order Total: $${total.toFixed(2)}</strong>
                </div>
              </div>
              <div class="buttons" id="confirm-order-buttons-container">
                <button type="button" class="button-1 confirm-order-next-step-button" onclick="submitFinalOrder()">Confirm</button>
              </div>
            </div>
          </li>

        </ol>
      </div>
    </div>
  `;
  res.send(renderLayout('Checkout', content));
});

// Checkout Completed Page
app.get('/checkout/completed/:orderNumber', (req, res) => {
  const num = req.params.orderNumber;
  const order = state.orders.find(o => o.orderNumber === num) || state.orders[state.orders.length - 1];
  const content = `
    <div class="page checkout-page order-completed-page">
      <div class="page-title"><h1>Thank you</h1></div>
      <div class="page-body checkout-data">
        <div class="section order-completed">
          <div class="title"><strong>Your order has been successfully processed!</strong></div>
          <div class="details">
            <div class="order-number"><strong>Order number: ${order.id}</strong></div>
            <ul class="details-link">
              <li><a href="/orderdetails/${order.id}" class="order-details-link">Click here for order details.</a></li>
            </ul>
            <div class="buttons">
              <button type="button" class="button-1 order-completed-continue-button" onclick="window.location.href='/'">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Order completed', content));
});

// Customer Account Portal
app.get('/customer/info', (req, res) => {
  const user = state.activeSessionUser || state.users[0];
  const content = `
    <div class="page account-page customer-info-page">
      <div class="page-title"><h1>My account - Customer info</h1></div>
      <div class="page-body">
        <div class="block block-account-navigation">
          <div class="title"><strong>My account</strong></div>
          <div class="listbox">
            <ul class="list">
              <li><a href="/customer/info" class="active">Customer info</a></li>
              <li><a href="/customer/addresses">Addresses</a></li>
              <li><a href="/order/history">Orders</a></li>
              <li><a href="/customer/changepassword">Change password</a></li>
            </ul>
          </div>
        </div>
        <form method="post" action="/customer/info" id="customer-info-form">
          <div class="fieldset">
            <div class="form-fields">
              <div class="inputs"><label for="FirstName">First name:</label><input type="text" id="FirstName" name="FirstName" value="${user.firstName}"></div>
              <div class="inputs"><label for="LastName">Last name:</label><input type="text" id="LastName" name="LastName" value="${user.lastName}"></div>
              <div class="inputs"><label for="Email">Email:</label><input type="email" id="Email" name="Email" value="${user.email}" readonly></div>
              <div class="inputs"><label for="Company">Company name:</label><input type="text" id="Company" name="Company" value="${user.company}"></div>
            </div>
          </div>
          <div class="buttons">
            <button type="submit" id="save-info-button" name="save-info-button" class="button-1 save-customer-info-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout('Customer info', content));
});

app.post('/customer/info', (req, res) => {
  const { FirstName, LastName, Company } = req.body;
  const user = state.activeSessionUser || state.users[0];
  user.firstName = FirstName || user.firstName;
  user.lastName = LastName || user.lastName;
  user.company = Company || user.company;

  const content = `
    <div class="page account-page customer-info-page">
      <div class="page-title"><h1>My account - Customer info</h1></div>
      <div class="notifications"><div class="bar-notification success" style="display:block;">The customer info has been updated successfully.</div></div>
      <div class="buttons" style="margin-top:20px;"><a href="/customer/info" class="button-1">Back</a></div>
    </div>
  `;
  res.send(renderLayout('Customer info', content));
});

// Addresses
app.get('/customer/addresses', (req, res) => {
  const user = state.activeSessionUser || state.users[0];
  const content = `
    <div class="page account-page address-list-page">
      <div class="page-title"><h1>My account - Addresses</h1></div>
      <div class="page-body">
        <div class="address-list">
          ${user.addresses.map(a => `
            <div class="section address-item">
              <div class="title"><strong>${a.firstName} ${a.lastName}</strong></div>
              <ul class="info">
                <li class="name">${a.firstName} ${a.lastName}</li>
                <li class="email">Email: ${a.email}</li>
                <li class="address1">${a.address1}</li>
                <li class="city-state-zip">${a.city}, ${a.state} ${a.zip}</li>
                <li class="country">${a.country}</li>
              </ul>
              <div class="buttons">
                <button type="button" class="button-2 edit-address-button" onclick="alert('Edit address')">Edit</button>
                <button type="button" class="button-2 delete-address-button" onclick="deleteAddress(${a.id})">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="add-button">
          <button type="button" class="button-1 add-address-button" onclick="document.getElementById('new-address-modal').style.display='block'">Add new</button>
        </div>
        <div id="new-address-modal" style="display:none; margin-top:20px; border:1px solid #ccc; padding:15px;">
          <h3>Add New Address</h3>
          <form method="post" action="/customer/addresses/add">
            <div class="inputs"><label>First Name:</label><input name="FirstName" value="Alex" required></div>
            <div class="inputs"><label>Last Name:</label><input name="LastName" value="Mercer" required></div>
            <div class="inputs"><label>City:</label><input name="City" value="Buffalo" required></div>
            <div class="inputs"><label>Address:</label><input name="Address1" value="200 Delaware Ave" required></div>
            <div class="inputs"><label>Zip:</label><input name="Zip" value="14202" required></div>
            <button type="submit" class="button-1">Save Address</button>
          </form>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Addresses', content));
});

app.post('/customer/addresses/add', (req, res) => {
  const user = state.activeSessionUser || state.users[0];
  const newAddr = {
    id: user.addresses.length + 1,
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    email: user.email,
    city: req.body.City,
    address1: req.body.Address1,
    zip: req.body.Zip,
    state: 'New York',
    country: 'United States'
  };
  user.addresses.push(newAddr);
  res.redirect('/customer/addresses');
});

// Change Password
app.get('/customer/changepassword', (req, res) => {
  const content = `
    <div class="page account-page change-password-page">
      <div class="page-title"><h1>My account - Change password</h1></div>
      <div class="page-body">
        <form method="post" action="/customer/changepassword">
          <div class="fieldset">
            <div class="form-fields">
              <div class="inputs"><label for="OldPassword">Old password:</label><input type="password" id="OldPassword" name="OldPassword" required></div>
              <div class="inputs"><label for="NewPassword">New password:</label><input type="password" id="NewPassword" name="NewPassword" required></div>
              <div class="inputs"><label for="ConfirmNewPassword">Confirm new password:</label><input type="password" id="ConfirmNewPassword" name="ConfirmNewPassword" required></div>
            </div>
          </div>
          <div class="buttons">
            <button type="submit" class="button-1 change-password-button">Change password</button>
          </div>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout('Change password', content));
});

app.post('/customer/changepassword', (req, res) => {
  const user = state.activeSessionUser || state.users[0];
  const { OldPassword, NewPassword, ConfirmNewPassword } = req.body;
  if (OldPassword !== user.password) {
    const content = `<div class="message-error">Old password doesn't match</div><a href="/customer/changepassword">Back</a>`;
    return res.status(400).send(renderLayout('Error', content));
  }
  if (NewPassword !== ConfirmNewPassword) {
    const content = `<div class="message-error">The new password and confirmation password do not match.</div><a href="/customer/changepassword">Back</a>`;
    return res.status(400).send(renderLayout('Error', content));
  }
  user.password = NewPassword;
  const content = `<div class="result success">Password was changed</div><a href="/customer/info">Continue</a>`;
  res.send(renderLayout('Password Changed', content));
});

// Order History
app.get('/order/history', (req, res) => {
  const user = state.activeSessionUser || state.users[0];
  const userOrders = state.orders.filter(o => o.customerId === user.id);
  const content = `
    <div class="page account-page order-list-page">
      <div class="page-title"><h1>My account - Orders</h1></div>
      <div class="page-body">
        ${userOrders.length === 0 ? `
          <div class="no-data">No orders placed yet.</div>
        ` : `
          <div class="order-list">
            ${userOrders.map(o => `
              <div class="section order-item">
                <div class="title"><strong>Order Number: ${o.id}</strong></div>
                <ul class="info">
                  <li>Order status: <span class="order-status">${o.status}</span></li>
                  <li>Order Date: <span class="order-date">${o.date}</span></li>
                  <li>Order Total: <span class="order-total">$${o.orderTotal.toFixed(2)}</span></li>
                </ul>
                <div class="buttons">
                  <a href="/orderdetails/${o.id}" class="button-2 order-details-button">Details</a>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
  res.send(renderLayout('Customer orders', content));
});

// Order Details
app.get('/orderdetails/:orderId', (req, res) => {
  const id = parseInt(req.params.orderId);
  const order = state.orders.find(o => o.id === id) || state.orders[0];
  const content = `
    <div class="page order-details-page">
      <div class="page-title"><h1>Order information # ${order.id}</h1></div>
      <div class="page-body">
        <div class="order-overview">
          <ul class="order-overview-content">
            <li class="order-number">Order #: ${order.id}</li>
            <li class="order-date">Order Date: ${order.date}</li>
            <li class="order-total">Order Total: <strong>$${order.orderTotal.toFixed(2)}</strong></li>
            <li class="order-status">Order Status: ${order.status}</li>
          </ul>
          <div class="actions">
            <a href="/orderdetails/${order.id}/pdf" class="button-2 pdf-order-button">PDF Invoice</a>
            <button type="button" class="button-2 re-order-button" onclick="reOrder(${order.id})">Re-order</button>
          </div>
        </div>
        <div class="order-details-area">
          <table class="data-table">
            <thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td><em>${item.productName}</em></td>
                  <td>$${item.unitPrice.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout(`Order details - #${order.id}`, content));
});

// PDF Invoice Mock Download
app.get('/orderdetails/:orderId/pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=order_${req.params.orderId}.pdf`);
  res.send(Buffer.from('%PDF-1.4 Mock nopCommerce Order Invoice Receipt for QA Verification'));
});

// ==============================================================================
// ADMIN BACKOFFICE CONSOLE ROUTES (/admin)
// ==============================================================================

app.get('/admin', (req, res) => {
  res.redirect('/admin/dashboard');
});

app.get('/admin/login', (req, res) => {
  const content = `
    <div class="admin-login-box">
      <h2>Administration Login</h2>
      <form method="post" action="/admin/login">
        <div><label>Email:</label><input type="email" id="Email" name="Email" value="admin@nopqa.local" required></div>
        <div><label>Password:</label><input type="password" id="Password" name="Password" value="AdminPassword123!" required></div>
        <button type="submit" class="button-1 login-button">Log in</button>
      </form>
    </div>
  `;
  res.send(renderAdminLayout('Admin Login', content));
});

app.post('/admin/login', (req, res) => {
  const { Email, Password } = req.body;
  if (Email === 'admin@nopqa.local' && Password === 'AdminPassword123!') {
    res.redirect('/admin/dashboard');
  } else {
    res.status(401).send(renderAdminLayout('Admin Login', '<div class="error">Invalid administrator credentials</div>'));
  }
});

app.get('/admin/dashboard', (req, res) => {
  const pendingOrders = state.orders.filter(o => o.status === 'Pending').length;
  const content = `
    <div class="content-header"><h1>Dashboard</h1></div>
    <div class="row kpi-cards">
      <div class="kpi-card" id="card-orders">
        <div class="inner"><h3>${state.orders.length}</h3><p>Orders</p></div>
      </div>
      <div class="kpi-card" id="card-pending">
        <div class="inner"><h3>${pendingOrders}</h3><p>Pending Orders</p></div>
      </div>
      <div class="kpi-card" id="card-customers">
        <div class="inner"><h3>${state.users.length}</h3><p>Registered Customers</p></div>
      </div>
      <div class="kpi-card" id="card-products">
        <div class="inner"><h3>${state.products.length}</h3><p>Catalog Products</p></div>
      </div>
    </div>
  `;
  res.send(renderAdminLayout('Dashboard', content));
});

app.get('/Admin/Product/List', (req, res) => {
  const searchName = (req.query.SearchProductName || '').toLowerCase();
  const filtered = searchName ? state.products.filter(p => p.name.toLowerCase().includes(searchName)) : state.products;

  const content = `
    <div class="content-header"><h1>Products</h1></div>
    <div class="card">
      <form method="get" action="/Admin/Product/List">
        <div class="search-body">
          <label>Product name:</label>
          <input type="text" id="SearchProductName" name="SearchProductName" value="${req.query.SearchProductName || ''}">
          <button type="submit" id="search-products" class="btn btn-primary">Search</button>
        </div>
      </form>
      <table class="table table-bordered table-striped" id="products-grid">
        <thead><tr><th>Picture</th><th>Product name</th><th>SKU</th><th>Price</th><th>Stock quantity</th><th>Published</th><th>Edit</th></tr></thead>
        <tbody>
          ${filtered.length === 0 ? `<tr><td colspan="7" class="dataTables_empty">No data available in table</td></tr>` : 
            filtered.map(p => `
              <tr>
                <td><img src="/public/images/product-placeholder.png" width="40"></td>
                <td>${p.name}</td>
                <td>${p.sku}</td>
                <td>$${p.price.toFixed(2)}</td>
                <td>${p.stockQuantity}</td>
                <td><i class="fa fa-check">${p.published ? 'Yes' : 'No'}</i></td>
                <td><button type="button" class="btn btn-default" onclick="openProductEdit(${p.id}, '${p.name}', ${p.price}, ${p.stockQuantity})">Edit</button></td>
              </tr>
            `).join('')}
        </tbody>
      </table>
    </div>
  `;
  res.send(renderAdminLayout('Products', content));
});

app.get('/Admin/Order/List', (req, res) => {
  const statusFilter = req.query.OrderStatusId;
  const filtered = statusFilter ? state.orders.filter(o => o.status === statusFilter) : state.orders;

  const content = `
    <div class="content-header"><h1>Orders</h1></div>
    <div class="card">
      <form method="get" action="/Admin/Order/List">
        <div class="search-body">
          <label>Order status:</label>
          <select id="OrderStatusId" name="OrderStatusId" onchange="this.form.submit()">
            <option value="">All</option>
            <option value="Pending" ${statusFilter==='Pending'?'selected':''}>Pending</option>
            <option value="Processing" ${statusFilter==='Processing'?'selected':''}>Processing</option>
            <option value="Complete" ${statusFilter==='Complete'?'selected':''}>Complete</option>
            <option value="Cancelled" ${statusFilter==='Cancelled'?'selected':''}>Cancelled</option>
          </select>
        </div>
      </form>
      <table class="table table-bordered table-striped" id="orders-grid">
        <thead><tr><th>Order #</th><th>Order status</th><th>Payment status</th><th>Customer</th><th>Created on</th><th>Order total</th><th>Action</th></tr></thead>
        <tbody>
          ${filtered.map(o => `
            <tr>
              <td>${o.id}</td>
              <td><span class="badge ${o.status==='Complete'?'bg-green':'bg-yellow'}">${o.status}</span></td>
              <td>${o.paymentStatus}</td>
              <td>${o.customerEmail}</td>
              <td>${o.date}</td>
              <td>$${o.orderTotal.toFixed(2)}</td>
              <td><button type="button" class="btn btn-default" onclick="updateOrderStatus(${o.id})">Change Status</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  res.send(renderAdminLayout('Orders', content));
});

app.get('/Admin/Customer/List', (req, res) => {
  const content = `
    <div class="content-header"><h1>Customers</h1></div>
    <div class="card">
      <table class="table table-bordered table-striped" id="customers-grid">
        <thead><tr><th>Email</th><th>Name</th><th>Customer roles</th><th>Active</th></tr></thead>
        <tbody>
          ${state.users.map(u => `
            <tr>
              <td>${u.email}</td>
              <td>${u.firstName} ${u.lastName}</td>
              <td>${u.roles.join(', ')}</td>
              <td>Yes</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  res.send(renderAdminLayout('Customers', content));
});

function renderAdminLayout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} / nopCommerce administration</title>
  <link rel="stylesheet" href="/public/css/admin.css">
</head>
<body class="admin-wrapper">
  <aside class="main-sidebar">
    <div class="sidebar-brand">nopCommerce</div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="/admin/dashboard">Dashboard</a></li>
        <li><a href="/Admin/Product/List">Products</a></li>
        <li><a href="/Admin/Order/List">Orders</a></li>
        <li><a href="/Admin/Customer/List">Customers</a></li>
        <li><a href="/" target="_blank">Public Store</a></li>
      </ul>
    </nav>
  </aside>
  <main class="content-wrapper">
    ${content}
  </main>
  <script src="/public/js/admin.js"></script>
</body>
</html>`;
}

// ==============================================================================
// REST & AJAX API ENDPOINTS
// ==============================================================================

// Search Autocomplete
app.get('/catalog/searchtermautocomplete', (req, res) => {
  const term = (req.query.term || '').toLowerCase();
  if (term.length < 2) return res.json([]);
  const matches = state.products
    .filter(p => p.name.toLowerCase().includes(term))
    .map(p => ({
      label: p.name,
      productid: p.id,
      producturl: `/${p.slug}`
    }));
  res.json(matches);
});

// AJAX Add to Cart
app.post('/addproducttocart/catalog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const p = state.products.find(prod => prod.id === id);
  if (!p) return res.status(404).json({ success: false, message: 'Product not found' });

  const existing = state.cart.find(c => c.productId === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: state.cart.length + 1,
      productId: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      quantity: 1,
      attributes: ''
    });
  }

  const totalQty = state.cart.reduce((s, i) => s + i.quantity, 0);
  res.json({
    success: true,
    message: 'The product has been added to your shopping cart',
    updatetopcartsectionhtml: `(${totalQty})`
  });
});

app.post('/addproducttocart/details/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const p = state.products.find(prod => prod.id === id);
  if (!p) return res.status(404).json({ success: false, message: 'Product not found' });

  const qty = parseInt(req.body.quantity || req.body['addtocart_1.EnteredQuantity'] || 1);
  if (qty <= 0 || isNaN(qty)) {
    return res.status(400).json({ success: false, message: 'Quantity should be positive' });
  }

  state.cart.push({
    id: state.cart.length + 1,
    productId: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    quantity: qty,
    attributes: 'Processor: 2.5 GHz Intel Core i5 [+$100.00], RAM: 8GB [+$60.00]'
  });

  const totalQty = state.cart.reduce((s, i) => s + i.quantity, 0);
  res.json({
    success: true,
    message: 'The product has been added to your shopping cart',
    updatetopcartsectionhtml: `(${totalQty})`
  });
});

// REST API Endpoints (Playwright APIRequestContext & Postman)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = state.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  res.status(200).json({
    success: true,
    token: 'jwt-mock-token-' + user.id + '-' + Date.now(),
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Missing required registration parameters' });
  }
  if (state.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'The specified email already exists' });
  }
  const newUser = {
    id: state.users.length + 1,
    guid: 'api-guid-' + Date.now(),
    firstName,
    lastName,
    email,
    password,
    company: '',
    roles: ['Registered'],
    addresses: []
  };
  state.users.push(newUser);
  res.status(201).json({
    success: true,
    customerId: newUser.id,
    token: 'jwt-mock-token-' + newUser.id
  });
});

app.get('/api/catalog/products', (req, res) => {
  res.status(200).json(state.products);
});

app.get('/api/catalog/products/:id', (req, res) => {
  const p = state.products.find(prod => prod.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.status(200).json(p);
});

app.get('/api/catalog/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const matched = state.products.filter(p => p.name.toLowerCase().includes(q));
  res.status(200).json(matched);
});

app.get('/api/cart', (req, res) => {
  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  res.status(200).json({
    items: state.cart,
    subtotal: subtotal,
    tax: subtotal * 0.08,
    total: subtotal * 1.08
  });
});

app.post('/api/cart/items', (req, res) => {
  const { productId, quantity } = req.body;
  const p = state.products.find(x => x.id === productId);
  if (!p) return res.status(404).json({ error: 'Product not found' });

  const newItem = {
    id: state.cart.length + 1,
    productId: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    quantity: quantity || 1
  };
  state.cart.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/cart/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = state.cart.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Cart item not found' });
  item.quantity = req.body.quantity;
  res.status(200).json(item);
});

app.delete('/api/cart/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  state.cart = state.cart.filter(i => i.id !== id);
  res.status(200).json({ success: true });
});

app.post('/api/checkout/orders', (req, res) => {
  const orderId = state.orders.length + 1043;
  const newOrder = {
    id: orderId,
    orderNumber: 'ORD-' + orderId,
    orderGuid: 'ord-guid-' + Date.now(),
    customerId: 1,
    customerEmail: 'customer@nopqa.local',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    paymentStatus: 'Pending',
    shippingStatus: 'Not yet shipped',
    shippingMethod: 'Ground',
    paymentMethod: 'Check / Money Order',
    subtotal: 1200.00,
    shipping: 0.00,
    tax: 96.00,
    orderTotal: 1296.00,
    items: [...state.cart]
  };
  state.orders.push(newOrder);
  state.cart = []; // Empty cart
  res.status(201).json(newOrder);
});

app.get('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = state.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.status(200).json(order);
});

app.get('/api/admin/orders', (req, res) => {
  // If authorization header missing or not admin, return 403 Forbidden
  const auth = req.headers['authorization'];
  if (!auth || !auth.includes('admin')) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  res.status(200).json(state.orders);
});

app.patch('/api/admin/orders/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const order = state.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status || order.status;
  res.status(200).json(order);
});

// App listen
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[AUT Staging Engine] nopCommerce v4.70 running on http://localhost:${PORT}`);
  });
}

module.exports = app;
