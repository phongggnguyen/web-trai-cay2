-- ============================================================================
-- Migration: Add background_image column to categories table
-- Created: 16/01/2026
-- Description: Thêm trường background_image để lưu URL ảnh nền cho danh mục
-- ============================================================================

-- Add background_image column to categories table
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS background_image TEXT;

-- Add comment
COMMENT ON COLUMN public.categories.background_image IS 'URL ảnh nền cho danh mục (hiển thị header, banner...)';
