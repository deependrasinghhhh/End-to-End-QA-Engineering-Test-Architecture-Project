-- ==============================================================================
-- 02. ORDER & ORDER ITEMS TRANSACTION AUDIT QUERIES
-- ==============================================================================
-- Purpose: Verify completed order totals, line items, and addresses against UI
-- ==============================================================================

-- 2.1 Audit Order Header Record
SELECT 
    o."Id" AS "OrderId",
    o."CustomOrderNumber",
    o."OrderGuid",
    o."CustomerId",
    o."OrderStatusId",       -- 10 = Pending, 20 = Processing, 30 = Complete, 40 = Cancelled
    o."PaymentStatusId",     -- 10 = Pending, 30 = Paid
    o."ShippingStatusId",    -- 20 = NotYetShipped, 30 = Shipped, 40 = Delivered
    o."OrderSubtotalInclTax",
    o."OrderShippingInclTax",
    o."OrderTax",
    o."OrderTotal",
    o."PaymentMethodSystemName",
    o."ShippingMethod",
    o."CreatedOnUtc"
FROM "Order" o
WHERE o."Id" = 1042 OR o."CustomOrderNumber" = 'ORD-1042';

-- 2.2 Audit Line Items for Order
SELECT 
    oi."Id" AS "OrderItemId",
    oi."OrderId",
    oi."ProductId",
    p."Name" AS "ProductName",
    p."Sku",
    oi."Quantity",
    oi."UnitPriceInclTax",
    oi."PriceInclTax",
    oi."AttributeDescription"
FROM "OrderItem" oi
JOIN "Product" p ON oi."ProductId" = p."Id"
WHERE oi."OrderId" = 1042;

-- 2.3 Verify Order Billing and Shipping Addresses
SELECT 
    o."Id" AS "OrderId",
    ba."FirstName" || ' ' || ba."LastName" AS "BillingName",
    ba."Address1" AS "BillingAddress",
    ba."City" AS "BillingCity",
    sa."FirstName" || ' ' || sa."LastName" AS "ShippingName",
    sa."Address1" AS "ShippingAddress",
    sa."City" AS "ShippingCity"
FROM "Order" o
LEFT JOIN "Address" ba ON o."BillingAddressId" = ba."Id"
LEFT JOIN "Address" sa ON o."ShippingAddressId" = sa."Id"
WHERE o."Id" = 1042;
