-- ==============================================================================
-- TEST DATA SEED SCRIPT: CUSTOMER ACCOUNTS & ROLES
-- ==============================================================================

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
