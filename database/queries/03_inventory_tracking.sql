-- ==============================================================================
-- 03. INVENTORY TRACKING & STOCK DEDUCTION QUERIES
-- ==============================================================================
-- Purpose: Verify inventory decreases by exact order quantity upon order placement
-- ==============================================================================

-- 3.1 Check Current Stock and Minimum Cart Quantities
SELECT 
    p."Id",
    p."Name",
    p."Sku",
    p."Price",
    p."StockQuantity",
    p."MinStockQuantity",
    p."OrderMinimumQuantity",
    p."OrderMaximumQuantity",
    p."ManageInventoryMethodId", -- 1 = TrackInventory
    p."Published"
FROM "Product" p
WHERE p."Id" IN (1, 2, 3, 4);

-- 3.2 Audit Stock Quantity Consistency Against Order Items Placed Today
WITH OrderedQty AS (
    SELECT 
        oi."ProductId",
        SUM(oi."Quantity") AS "TotalSoldToday"
    FROM "OrderItem" oi
    JOIN "Order" o ON oi."OrderId" = o."Id"
    WHERE o."CreatedOnUtc" >= CURRENT_DATE
    GROUP BY oi."ProductId"
)
SELECT 
    p."Id" AS "ProductId",
    p."Name",
    p."StockQuantity" AS "CurrentStock",
    COALESCE(oq."TotalSoldToday", 0) AS "TotalSoldToday"
FROM "Product" p
LEFT JOIN OrderedQty oq ON p."Id" = oq."ProductId"
WHERE p."Id" IN (1, 2);
