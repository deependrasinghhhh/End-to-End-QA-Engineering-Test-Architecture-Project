-- ==============================================================================
-- DATABASE INTEGRITY & ORPHAN RECORD CHECKS
-- ==============================================================================
-- Purpose: Detect database corruption, missing foreign keys, or orphan records
-- ==============================================================================

-- 1. Check for Orphaned OrderItems (Must be 0)
SELECT COUNT(*) AS "OrphanOrderItems"
FROM "OrderItem" oi
LEFT JOIN "Order" o ON oi."OrderId" = o."Id"
WHERE o."Id" IS NULL;

-- 2. Check for Orders with Missing Customers (Must be 0)
SELECT COUNT(*) AS "OrphanOrders"
FROM "Order" o
LEFT JOIN "Customer" c ON o."CustomerId" = c."Id"
WHERE c."Id" IS NULL;

-- 3. Check for ShoppingCartItems referencing Deleted or Non-Existent Products
SELECT COUNT(*) AS "InvalidCartItems"
FROM "ShoppingCartItem" sci
LEFT JOIN "Product" p ON sci."ProductId" = p."Id"
WHERE p."Id" IS NULL OR p."Deleted" = TRUE;

-- 4. Check for Customers with Duplicate Active Emails
SELECT "Email", COUNT(*) AS "DuplicateCount"
FROM "Customer"
WHERE "Deleted" = FALSE AND "Email" IS NOT NULL
GROUP BY "Email"
HAVING COUNT(*) > 1;
