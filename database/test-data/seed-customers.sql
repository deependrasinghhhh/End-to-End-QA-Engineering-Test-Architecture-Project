-- ==============================================================================
-- TEST DATA SEED SCRIPT: CUSTOMER ACCOUNTS & ROLES
-- ==============================================================================

-- 0. Ensure Tables Exist
CREATE TABLE IF NOT EXISTS "Customer" (
    "Id" SERIAL PRIMARY KEY,
    "CustomerGuid" VARCHAR(64),
    "Email" VARCHAR(255),
    "Username" VARCHAR(255),
    "Active" BOOLEAN DEFAULT TRUE,
    "Deleted" BOOLEAN DEFAULT FALSE,
    "IsSystemAccount" BOOLEAN DEFAULT FALSE,
    "SystemName" VARCHAR(255),
    "CreatedOnUtc" TIMESTAMP DEFAULT NOW(),
    "LastActivityDateUtc" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Customer_CustomerRole_Mapping" (
    "Customer_Id" INT,
    "CustomerRole_Id" INT,
    PRIMARY KEY ("Customer_Id", "CustomerRole_Id")
);

-- 1. Insert Standard QA Customer Account (Password: TestPassword123!)
INSERT INTO "Customer" (
    "Id", "CustomerGuid", "Email", "Username", "Active", "Deleted", 
    "IsSystemAccount", "SystemName", "CreatedOnUtc", "LastActivityDateUtc"
) VALUES (
    1, 
    'c9f18a22-381a-4c22-9dfa-80bb11234abc', 
    'customer@nopqa.local', 
    'customer@nopqa.local', 
    TRUE, 
    FALSE, 
    FALSE, 
    NULL, 
    NOW(), 
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- 2. Insert QA Administrator Account (Password: AdminPassword123!)
INSERT INTO "Customer" (
    "Id", "CustomerGuid", "Email", "Username", "Active", "Deleted", 
    "IsSystemAccount", "SystemName", "CreatedOnUtc", "LastActivityDateUtc"
) VALUES (
    2, 
    'a1122334-bb55-6677-8899-00aabbccddee', 
    'admin@nopqa.local', 
    'admin@nopqa.local', 
    TRUE, 
    FALSE, 
    TRUE, 
    'Administrators', 
    NOW(), 
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- 3. Map Roles (1 = Registered, 2 = Administrators)
INSERT INTO "Customer_CustomerRole_Mapping" ("Customer_Id", "CustomerRole_Id")
VALUES (1, 1), (2, 1), (2, 2)
ON CONFLICT DO NOTHING;
