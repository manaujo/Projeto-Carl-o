import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Upload, Trash2, Plus, RefreshCw, Zap } from 'lucide-react';
import { supabase, StoreSettings } from '../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState('');
  const [freightMessage, setFreightMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/adm');
    } else {
      loadSettings();
    }
  }, [navigate]);

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data && !error) {
      setSettings(data);
      setHeroImage(data.hero_image);
      setGalleryImages(data.gallery_images || []);
      setProductPrice(data.product_price.toString());
      setFreightMessage(data.freight_message);
      setWhatsappNumber(data.whatsapp_number);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setLoading(true);
    setSaveSuccess(false);

    const { error } = await supabase
      .from('store_settings')
      .update({
        hero_image: heroImage,
        gallery_images: galleryImages,
        product_price: parseFloat(productPrice),
        freight_message: freightMessage,
        whatsapp_number: whatsappNumber,
        updated_at: new Date().toISOString()
      })
      .eq('id', settings.id);

    setLoading(false);

    if (!error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setGalleryImages([...galleryImages, newGalleryImage.trim()]);
      setNewGalleryImage('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (settings) {
      setHeroImage(settings.hero_image);
      setGalleryImages(settings.gallery_images || []);
      setProductPrice(settings.product_price.toString());
      setFreightMessage(settings.freight_message);
      setWhatsappNumber(settings.whatsapp_number);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/adm');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                Painel Administrativo
              </h1>
              <p className="text-sm text-gray-400">RGB Store</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
            >
              Ver Loja
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg font-bold hover:from-red-600 hover:to-rose-600 transition-all flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Image Section */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-cyan-400">📸 Imagem Principal</h3>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="Cole a URL da imagem principal"
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {heroImage && (
                <img
                  src={heroImage}
                  alt="Preview"
                  className="w-full max-w-2xl h-64 object-cover rounded-lg border border-cyan-500/30"
                />
              )}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-pink-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-pink-400" />
              <h3 className="text-xl font-bold text-pink-400">📸 Galeria de Imagens</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  placeholder="Cole a URL da nova imagem"
                  className="flex-1 px-4 py-3 bg-black/50 border border-pink-500/30 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGalleryImage()}
                />
                <button
                  onClick={handleAddGalleryImage}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-bold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {galleryImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-pink-500/30"
                    />
                    <button
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Price Section */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💰</span>
              <h3 className="text-xl font-bold text-green-400">Preço do Produto</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-400">R$</span>
              <input
                type="number"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="89.99"
                className="flex-1 max-w-xs px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-2xl font-bold"
              />
            </div>
          </section>

          {/* Freight Section */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🚚</span>
              <h3 className="text-xl font-bold text-blue-400">Mensagem de Frete</h3>
            </div>
            <input
              type="text"
              value={freightMessage}
              onChange={(e) => setFreightMessage(e.target.value)}
              placeholder="Ex: Taxa de entrega: R$15,00 | Frete grátis para compras acima de R$150!"
              className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </section>

          {/* WhatsApp Section */}
          <section className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💬</span>
              <h3 className="text-xl font-bold text-purple-400">Número do WhatsApp</h3>
            </div>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="5562946265570 (código do país + DDD + número)"
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <p className="text-sm text-gray-400 mt-2">Exemplo: 5562946265570 (Brasil + GO + número)</p>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg font-bold hover:from-gray-700 hover:to-gray-800 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Resetar Alterações
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save className="w-5 h-5" />
              {loading ? 'Salvando...' : saveSuccess ? '✓ Salvo com Sucesso!' : 'Salvar Alterações'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
