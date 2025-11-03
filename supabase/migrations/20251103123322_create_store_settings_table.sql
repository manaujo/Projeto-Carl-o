/*
  # Criar tabela de configurações da loja
  
  1. Nova Tabela
    - `store_settings`
      - `id` (uuid, primary key)
      - `hero_image` (text) - URL da imagem principal
      - `gallery_images` (text array) - Array de URLs das imagens da galeria
      - `product_price` (numeric) - Preço do produto
      - `freight_message` (text) - Mensagem de frete
      - `whatsapp_number` (text) - Número do WhatsApp
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização
      
  2. Segurança
    - Enable RLS na tabela `store_settings`
    - Adicionar política para leitura pública
    - Adicionar política para atualização (sem autenticação por enquanto)
*/

CREATE TABLE IF NOT EXISTS store_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_image text NOT NULL DEFAULT '',
  gallery_images text[] NOT NULL DEFAULT '{}',
  product_price numeric NOT NULL DEFAULT 89.99,
  freight_message text NOT NULL DEFAULT '',
  whatsapp_number text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read store settings"
  ON store_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update store settings"
  ON store_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert store settings"
  ON store_settings
  FOR INSERT
  WITH CHECK (true);

-- Inserir configurações iniciais com as novas fotos
INSERT INTO store_settings (
  hero_image,
  gallery_images,
  product_price,
  freight_message,
  whatsapp_number
) VALUES (
  '/fita_led_aplicativo_app_celular_5_metros_cores_rgb_ajustavel_decoracao_natal_sanca_gesso_sala_quarto_4959_4_18481ad35905cb41c22b3e16646fcb81 copy.webp',
  ARRAY[
    '/fita_led_aplicativo_app_celular_5_metros_cores_rgb_ajustavel_decoracao_natal_sanca_gesso_sala_quarto_4959_4_18481ad35905cb41c22b3e16646fcb81 copy.webp',
    '/71UF+l31ssL._UF894,1000_QL80_ copy.jpg',
    '/fita_de_led_luz_rgb_2m_ip_20_gaya_bivolt_90969242_6ac1_600x600 copy.jpeg',
    '/como-funciona-fita-de-led-cama-com-fita-de-led-azul-1024x683 copy.jpg',
    '/90_fita_cob_rgb_12v_rolo_5m_810led_m_16743_3_31447220d4e10689c4ed7dc3d697fea2.webp'
  ],
  89.99,
  'Taxa de entrega: R$15,00 | Frete grátis para compras acima de R$150!',
  '556299462-6570'
)
ON CONFLICT (id) DO NOTHING;