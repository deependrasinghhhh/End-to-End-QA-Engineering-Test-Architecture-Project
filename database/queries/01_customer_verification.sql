-- ==============================================================================
-- 01. CUSTOMER VERIFICATION & IDENTITY AUDIT QUERIES
-- ==============================================================================
-- Purpose: Verify customer registration, role assignment, and password security
-- Target Database: PostgreSQL 15 (nopCommerce Relational Schema)
-- ==============================================================================

-- 1.1 Verify newly registered customer record by email
SELECT 
    c."Id",
    c."CustomerGuid",
    c."Email",
    c."Username",
    c."Active",
    c."Deleted",
    c."CreatedOnUtc",
    c."LastLoginDateUtc"
FROM "Customer" c
WHERE LOWER(c."Email") = LOWER('customer@nopqa.local')
  AND c."Deleted" = FALSE;

-- 1.2 Verify Customer Role mapping (Must have 'Registered' role)
SELECT 
    c."Id" AS "CustomerId",
    c."Email",
    cr."Id" AS "RoleId",
    cr."Name" AS "RoleName",
    cr."SystemName"
FROM "Customer" c
JOIN "Customer_CustomerRole_Mapping" ccrm ON c."Id" = ccrm."Customer_Id"
JOIN "CustomerRole" cr ON ccrm."CustomerRole_Id" = cr."Id"
WHERE c."Email" = 'customer@nopqa.local';

-- 1.3 Verify Password Salt and Hash (Ensure NOT plain text)
SELECT 
    cp."Id",
    cp."CustomerId",
    cp."PasswordFormatId", -- 1 = Hashed (PBKDF2/SHA-512)
    cp."PasswordSalt",
    LENGTH(cp."Password") AS "HashLength",
    cp."CreatedOnUtc"
FROM "CustomerPassword" cp
JOIN "Customer" c ON cp."CustomerId" = c."Id"
WHERE c."Email" = 'customer@nopqa.local'
ORDER BY cp."CreatedOnUtc" DESC
LIMIT 1;

-- 1.4 Verify Customer Addresses Association
SELECT 
    c."Email",
    a."Id" AS "AddressId",
    a."FirstName",
    a."LastName",
    a."Address1",
    a."City",
    a."ZipPostalCode",
    a."PhoneNumber"
FROM "Customer" c
JOIN "CustomerAddresses" ca ON c."Id" = ca."Customer_Id"
JOIN "Address" a ON ca."Address_Id" = a."Id"
WHERE c."Email" = 'customer@nopqa.local';
