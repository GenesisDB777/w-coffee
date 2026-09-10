export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-8 md:px-16 py-6 border-b border-coffee-gold/20 bg-coffee-bg/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="font-cinzel text-3xl font-bold text-coffee-gold tracking-widest drop-shadow-[0_2px_4px_rgba(139,0,0,0.5)]">
          W
        </div>
        <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-light">
          <a href="#collection" className="hover:text-coffee-gold transition-colors">Collection</a>
          <a href="#story" className="hover:text-coffee-gold transition-colors">Our Story</a>
          <a href="#craft" className="hover:text-coffee-gold transition-colors">Craft</a>
          <a href="#contact" className="hover:text-coffee-gold transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24 md:py-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#252220] via-coffee-bg to-coffee-bg">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold tracking-wider mb-6 text-coffee-text">
          PREMIUM <span className="text-coffee-gold">COFFEE</span>
        </h1>
        <p className="text-coffee-muted text-base md:text-lg max-w-xl font-light leading-relaxed mb-10 tracking-wide">
          Impeccably roasted, richly textured, and crafted for those who appreciate the finer notes of exceptional coffee. Est. 2024.
        </p>
        <button className="border border-coffee-gold text-coffee-gold hover:bg-coffee-gold hover:text-coffee-bg px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          Explore Collection
        </button>
      </section>

      {/* Visual Product Showcase Banner */}
      <section className="px-6 md:px-16 py-12 bg-coffee-bg flex justify-center">
        <div className="max-w-5xl w-full border border-coffee-gold/30 p-4 bg-coffee-card shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group overflow-hidden">
          <div className="absolute inset-0 border border-coffee-gold/10 pointer-events-none m-2 z-10"></div>
          
          <div className="flex justify-center items-center h-[400px] md:h-[500px] bg-[#151515]">
            <img 
              src="/cups-banner.png" 
              alt="W Premium Coffee Cup" 
              className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="mt-4 text-center bg-coffee-surface py-3 border border-coffee-gold/20">
            <span className="font-cinzel text-coffee-gold text-sm tracking-[0.3em] uppercase">Artisanal Design &bull; Est. 2024</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="collection" className="py-20 px-8 md:px-16 bg-coffee-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cinzel text-center text-3xl md:text-4xl text-coffee-gold tracking-wider mb-16">
            The Lineup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-coffee-card border border-coffee-gold/15 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coffee-gold">
              <h3 className="font-cinzel text-xl font-semibold mb-2">Signature Dark</h3>
              <div className="text-coffee-gold text-xs tracking-[0.2em] uppercase mb-6">Large / 16oz</div>
              <p className="text-coffee-muted text-sm leading-relaxed">
                Bold, intense roast with deep chocolate undertones and a velvety crema finish.
              </p>
            </div>
            <div className="bg-coffee-card border border-coffee-gold/15 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coffee-gold">
              <h3 className="font-cinzel text-xl font-semibold mb-2">Medium Roast</h3>
              <div className="text-coffee-gold text-xs tracking-[0.2em] uppercase mb-6">Medium / 12oz</div>
              <p className="text-coffee-muted text-sm leading-relaxed">
                Balanced and aromatic, featuring subtle caramel notes and a smooth body.
              </p>
            </div>
            <div className="bg-coffee-card border border-coffee-gold/15 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coffee-gold">
              <h3 className="font-cinzel text-xl font-semibold mb-2">Artisan Espresso</h3>
              <div className="text-coffee-gold text-xs tracking-[0.2em] uppercase mb-6">Compact / 8oz</div>
              <p className="text-coffee-muted text-sm leading-relaxed">
                A concentrated burst of flavor designed for pure, uncompromised intensity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-coffee-gold/20 text-coffee-muted text-xs tracking-widest">
        &copy; 2024–2026 W Premium Coffee. All rights reserved.
      </footer>
    </div>
  );
}