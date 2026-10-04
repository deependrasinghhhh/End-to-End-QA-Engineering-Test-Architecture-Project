-- ==============================================================================
-- TEST DATA SEED SCRIPT: BASELINE PRODUCTS & CATEGORIES
-- ==============================================================================

INSERT INTO "Product" (
    "Id", "Name", "ShortDescription", "FullDescription", "Sku", "Price", 
    "OldPrice", "StockQuantity", "ManageInventoryMethodId", "Published", "Deleted", "CreatedOnUtc", "UpdatedOnUtc"
) VALUES 
(
    1, 
    'Build your own computer', 
    'Configure your custom desktop system with high-speed processors.', 
    'High performance custom PC suitable for software engineering.', 
    'COMP_CUST', 
    1200.00, 
    1350.00, 
    50, 
    1, 
    TRUE, 
    FALSE, 
    NOW(), 
    NOW()
),
(
    2, 
    'Apple MacBook Pro 13-inch', 
    'Apple M2 chip with 8-core CPU and 10-core GPU.', 
    'Portable workstation with Retina display and exceptional battery.', 
    'AP_MBP_13', 
    1800.00, 
    1950.00, 
    25, 
    1, 
    TRUE, 
    FALSE, 
    NOW(), 
    NOW()
) ON CONFLICT ("Id") DO UPDATE SET "StockQuantity" = EXCLUDED."StockQuantity";
