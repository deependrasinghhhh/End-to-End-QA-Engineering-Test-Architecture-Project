-- ==============================================================================
-- TEST DATA SEED SCRIPT: BASELINE PRODUCTS & CATEGORIES
-- ==============================================================================

-- 0. Ensure Product Table Exists
CREATE TABLE IF NOT EXISTS "Product" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(400) NOT NULL,
    "ShortDescription" TEXT,
    "FullDescription" TEXT,
    "Sku" VARCHAR(100),
    "Price" DECIMAL(18, 4) NOT NULL DEFAULT 0.0,
    "OldPrice" DECIMAL(18, 4) NOT NULL DEFAULT 0.0,
    "StockQuantity" INT NOT NULL DEFAULT 100,
    "ManageInventoryMethodId" INT DEFAULT 1,
    "Published" BOOLEAN DEFAULT TRUE,
    "Deleted" BOOLEAN DEFAULT FALSE,
    "CreatedOnUtc" TIMESTAMP DEFAULT NOW(),
    "UpdatedOnUtc" TIMESTAMP DEFAULT NOW()
);

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
