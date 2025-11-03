import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StoreSettings {
  id: string;
  hero_image: string;
  gallery_images: string[];
  product_price: number;
  freight_message: string;
  whatsapp_number: string;
  created_at: string;
  updated_at: string;
}
