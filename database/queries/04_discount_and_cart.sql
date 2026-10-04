-- ==============================================================================
-- 04. DISCOUNT, COUPONS, AND ACTIVE SHOPPING CART SESSION QUERIES
-- ==============================================================================
-- Purpose: Audit active shopping cart items and promotional discount rules
-- ==============================================================================

-- 4.1 Audit Active Shopping Cart Items (ShoppingCartTypeId: 1 = Cart, 2 = Wishlist)
SELECT 
    sci."Id",
    sci."CustomerId",
    c."Email",
    sci."ShoppingCartTypeId",
    sci."ProductId",
    p."Name" AS "ProductName",
    sci."Quantity",
    sci."CreatedOnUtc",
    sci."UpdatedOnUtc"
FROM "ShoppingCartItem" sci
JOIN "Customer" c ON sci."CustomerId" = c."Id"
JOIN "Product" p ON sci."ProductId" = p."Id"
ORDER BY sci."CreatedOnUtc" DESC;

-- 4.2 Verify Shopping Cart Cleanup (Must be 0 items for customer after completed order)
SELECT COUNT(*) AS "RemainingCartItems"
FROM "ShoppingCartItem"
WHERE "CustomerId" = 1 
  AND "ShoppingCartTypeId" = 1;

-- 4.3 Verify Discount Coupon Code Definition & Usage
SELECT 
    d."Id",
    d."Name",
    d."DiscountTypeId",
    d."UsePercentage",
    d."DiscountPercentage",
    d."DiscountAmount",
    d."CouponCode",
    d."IsActive",
    d."StartDateUtc",
    d."EndDateUtc"
FROM "Discount" d
WHERE d."CouponCode" = 'DISCOUNT10';

-- 4.4 Audit Discount Usage History
SELECT 
    duh."Id",
    duh."DiscountId",
    d."CouponCode",
    duh."OrderId",
    duh."CreatedOnUtc"
FROM "DiscountUsageHistory" duh
JOIN "Discount" d ON duh."DiscountId" = d."Id"
ORDER BY duh."CreatedOnUtc" DESC;
