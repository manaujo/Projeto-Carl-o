import { useState, useEffect } from 'react';
import { Star, Zap, Wrench, Palette, Package, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { supabase, StoreSettings } from '../lib/supabase';

export default function Home() {
  const [cep, setCep] = useState('');
  const [freteCalculado, setFreteCalculado] = useState(false);
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data && !error) {
      setSettings(data);
    }
  };

  const handleCalcularFrete = () => {
    if (cep.length >= 8) {
      setFreteCalculado(true);
    }
  };

  const handleWhatsAppClick = () => {
    const number = settings?.whatsapp_number || '5562946265700';
    window.open(`https://wa.me/${number}?text=Olá!%20Quero%20comprar%20a%20Fita%20de%20LED%20RGB2538%20da%20RGB%20Store.`, '_blank');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const galleryImages = settings?.gallery_images || [
    '/IMG-20251014-WA0001.jpg',
    '/IMG-20251014-WA0002.jpg',
    '/IMG-20251014-WA0003.jpg',
    '/IMG-20251014-WA0005.jpg',
    '/IMG-20251014-WA0006.jpg',
    'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  const productPrice = settings?.product_price || 89.99;
  const freightMessage = settings?.freight_message || 'Taxa de entrega: R$15,00 | Frete grátis para compras acima de R$150!';
  const heroImage = settings?.hero_image || '/IMG-20251014-WA0001.jpg';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">RGB Store</span>
          </div>

          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('inicio')} className="hover:text-cyan-400 transition-colors">Início</button>
            <button onClick={() => scrollToSection('galeria')} className="hover:text-cyan-400 transition-colors">Galeria</button>
            <button onClick={() => scrollToSection('descricao')} className="hover:text-cyan-400 transition-colors">Descrição</button>
            <button onClick={() => scrollToSection('avaliacoes')} className="hover:text-cyan-400 transition-colors">Avaliações</button>
            <button onClick={() => scrollToSection('contato')} className="hover:text-cyan-400 transition-colors">Contato</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-pink-500/10 to-purple-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Fita de LED <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">RGB2538</span>
                </h1>
                <p className="text-2xl text-gray-300">Ilumine seu espaço com estilo!</p>

                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-400 ml-2">(4.9 de 5.0)</span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 line-through text-lg">De R$ 129,90</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
                    R$ {productPrice.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-400">ou 3x de R$ {(productPrice / 3).toFixed(2).replace('.', ',')} sem juros</p>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  Comprar agora pelo WhatsApp
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-cyan-500/30">
                  <img
                    src={heroImage}
                    alt="Fita de LED RGB2538"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Galeria de Ambientes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg border border-cyan-500/30 hover:border-pink-500/50 transition-all">
                <img
                  src={img}
                  alt={`Ambiente ${i + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descrição do Produto */}
      <section id="descricao" className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Por que escolher a RGB2538?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Palette className="w-12 h-12" />,
                title: 'Diversas Cores',
                desc: 'Controle remoto com milhares de combinações de cores RGB',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: <Wrench className="w-12 h-12" />,
                title: 'Instalação Simples',
                desc: 'Sistema adesivo 3M que gruda em qualquer superfície limpa',
                gradient: 'from-pink-500 to-rose-500'
              },
              {
                icon: <Package className="w-12 h-12" />,
                title: 'Setup Perfeito',
                desc: 'Ideal para quartos, salas, escritórios e ambientes gamers',
                gradient: 'from-purple-500 to-violet-500'
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Alta Durabilidade',
                desc: 'Baixo consumo de energia e vida útil de mais de 50 mil horas',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30 hover:border-pink-500/50 transition-all hover:scale-105 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cálculo de Frete */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-cyan-500/30">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-cyan-400" />
              Calcular Frete
            </h3>

            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                maxLength={8}
                className="flex-1 px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleCalcularFrete}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                Calcular
              </button>
            </div>

            {freteCalculado && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                <Package className="w-6 h-6 text-green-400" />
                <p className="text-green-400 font-semibold">{freightMessage}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            O que nossos clientes dizem
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Carlos Silva',
                avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
                comment: 'Produto excelente, iluminação incrível no meu setup! Superou todas as expectativas.'
              },
              {
                name: 'Mariana Costa',
                avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
                comment: 'Entrega rápida e qualidade top 🔥 A instalação foi super fácil, recomendo muito!'
              },
              {
                name: 'João Mendes',
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
                comment: 'Amei! Deu outro visual para meu quarto 💡 As cores são vibrantes e o controle funciona perfeitamente.'
              }
            ].map((review, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30 hover:border-pink-500/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50"
                  />
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforme seu ambiente <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">agora mesmo!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">Aproveite nossa oferta especial e leve tecnologia e estilo para sua casa</p>
          <button
            onClick={handleWhatsAppClick}
            className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-xl hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] inline-flex items-center gap-3"
          >
            <MessageCircle className="w-7 h-7" />
            Comprar pelo WhatsApp
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-black border-t border-cyan-500/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">RGB Store</p>
                <p className="text-sm text-gray-400">Ilumine seu espaço com estilo</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={`https://wa.me/${settings?.whatsapp_number || '55 62 9462-6570'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/carlos.antoniioo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 RGB Store – Ilumine seu espaço com estilo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
