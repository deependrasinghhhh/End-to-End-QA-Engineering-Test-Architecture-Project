-- ==============================================================================
-- DATABASE VALIDATION: UI-TO-DB CONSISTENCY RECONCILIATION
-- ==============================================================================
-- Purpose: Asserts mathematical and transactional consistency between UI and DB
-- ==============================================================================

-- Check 1: Order Total Reconciles Mathematically
-- Formula: OrderTotal = OrderSubtotalInclTax - OrderSubTotalDiscountInclTax + OrderShippingInclTax + OrderTax
SELECT 
    o."Id" AS "OrderId",
    o."OrderTotal",
    (o."OrderSubtotalInclTax" - o."OrderSubTotalDiscountInclTax" + o."OrderShippingInclTax" + o."OrderTax") AS "CalculatedTotal",
    CASE 
        WHEN ROUND(o."OrderTotal"::numeric, 2) = ROUND((o."OrderSubtotalInclTax" - o."OrderSubTotalDiscountInclTax" + o."OrderShippingInclTax" + o."OrderTax")::numeric, 2)
        THEN 'PASS'
        ELSE 'FAIL: Reconciliation Discrepancy'
    END AS "AuditStatus"
FROM "Order" o;

-- Check 2: Sum of Line Items Matches Order Subtotal
SELECT 
    o."Id" AS "OrderId",
    o."OrderSubtotalInclTax",
    SUM(oi."PriceInclTax") AS "SumLineItems",
    CASE 
        WHEN ROUND(o."OrderSubtotalInclTax"::numeric, 2) = ROUND(SUM(oi."PriceInclTax")::numeric, 2)
        THEN 'PASS'
        ELSE 'FAIL: Line Item Sum Discrepancy'
    END AS "AuditStatus"
FROM "Order" o
JOIN "OrderItem" oi ON o."Id" = oi."OrderId"
GROUP BY o."Id", o."OrderSubtotalInclTax";
