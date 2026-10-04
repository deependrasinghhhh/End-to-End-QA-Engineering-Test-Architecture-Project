-- ==============================================================================
-- TEST DATA TEARDOWN & CLEANUP SCRIPT
-- ==============================================================================
-- CAUTION: RUN ONLY IN QA / STAGING ENVIRONMENTS
-- ==============================================================================

-- 1. Remove synthetic customer accounts created during automated test runs
DELETE FROM "CustomerPassword"
WHERE "CustomerId" IN (
    SELECT "Id" FROM "Customer" WHERE "Email" LIKE '%@nopqa.local' AND "Id" NOT IN (1, 2)
);

DELETE FROM "Customer_CustomerRole_Mapping"
WHERE "Customer_Id" IN (
    SELECT "Id" FROM "Customer" WHERE "Email" LIKE '%@nopqa.local' AND "Id" NOT IN (1, 2)
);

DELETE FROM "Customer"
WHERE "Email" LIKE '%@nopqa.local' 
  AND "Id" NOT IN (1, 2);

-- 2. Clear transient test shopping cart items older than 24 hours
DELETE FROM "ShoppingCartItem"
WHERE "CreatedOnUtc" < NOW() - INTERVAL '24 hours';
