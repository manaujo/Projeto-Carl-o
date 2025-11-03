/*
  # Create RGB Store Settings Table

  1. New Tables
    - `store_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `hero_image` (text) - URL of the main hero section image
      - `gallery_images` (jsonb) - Array of gallery image URLs
      - `product_price` (numeric) - Current product price
      - `freight_message` (text) - Custom freight information message
      - `whatsapp_number` (text) - WhatsApp contact number with country code
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `store_settings` table
    - Add policy for public read access (anyone can view the store settings)
    - Add policy for authenticated update (only authenticated users can edit)

  3. Initial Data
    - Insert default settings for the RGB Store
*/

CREATE TABLE IF NOT EXISTS store_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_image text DEFAULT 'https://images.pexels.com/photos/5696261/pexels-photo-5696261.jpeg?auto=compress&cs=tinysrgb&w=800',
  gallery_images jsonb DEFAULT '["https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"]'::jsonb,
  product_price numeric(10,2) DEFAULT 49.90,
  freight_message text DEFAULT 'Frete grátis para compras acima de R$150!',
  whatsapp_number text DEFAULT '5599999999999',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view store settings"
  ON store_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update store settings"
  ON store_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings (only if table is empty)
INSERT INTO store_settings (id)
SELECT gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM store_settings);
