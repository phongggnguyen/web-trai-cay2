-- Migration: Enable hard delete for products while preserving order history
-- Solution: Change foreign key constraint to ON DELETE SET NULL
-- This allows deleting products without losing order history because
-- order_items table already stores product snapshot (name, price, image)

-- Step 1: Drop existing foreign key constraint
ALTER TABLE order_items 
DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;

-- Step 2: Recreate constraint with ON DELETE SET NULL
-- When a product is deleted, product_id in order_items becomes NULL
-- but product_name, price, product_image remain intact
ALTER TABLE order_items
ADD CONSTRAINT order_items_product_id_fkey
FOREIGN KEY (product_id)
REFERENCES products(id)
ON DELETE SET NULL;

-- Step 3: Make product_id nullable if it's not already
ALTER TABLE order_items
ALTER COLUMN product_id DROP NOT NULL;

-- Verification query:
-- SELECT conname, confdeltype FROM pg_constraint WHERE conname = 'order_items_product_id_fkey';
-- Expected result: confdeltype = 'n' (SET NULL)
