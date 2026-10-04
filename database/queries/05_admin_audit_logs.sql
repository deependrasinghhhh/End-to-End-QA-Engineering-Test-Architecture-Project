-- ==============================================================================
-- 05. ADMINISTRATIVE ACTIONS & SYSTEM ACTIVITY AUDIT LOGS
-- ==============================================================================
-- Purpose: Verify admin user actions, order status changes, and system activity
-- ==============================================================================

-- 5.1 Audit Administrative Activity Log
SELECT 
    al."Id",
    alt."Name" AS "ActivityType",
    al."Comment",
    al."CreatedOnUtc",
    c."Email" AS "AdminUser"
FROM "ActivityLog" al
JOIN "ActivityLogType" alt ON al."ActivityLogTypeId" = alt."Id"
JOIN "Customer" c ON al."CustomerId" = c."Id"
ORDER BY al."CreatedOnUtc" DESC
LIMIT 20;

-- 5.2 Audit Order Status History / Order Notes
SELECT 
    onote."Id",
    onote."OrderId",
    onote."Note",
    onote."DisplayToCustomer",
    onote."CreatedOnUtc"
FROM "OrderNote" onote
WHERE onote."OrderId" = 1042
ORDER BY onote."CreatedOnUtc" DESC;

-- 5.3 Audit System Error Logs
SELECT 
    l."Id",
    l."LogLevelId", -- 10 = Debug, 20 = Information, 30 = Warning, 40 = Error, 50 = Fatal
    l."ShortMessage",
    l."IpAddress",
    l."PageUrl",
    l."CreatedOnUtc"
FROM "Log" l
WHERE l."LogLevelId" >= 40
ORDER BY l."CreatedOnUtc" DESC
LIMIT 10;
