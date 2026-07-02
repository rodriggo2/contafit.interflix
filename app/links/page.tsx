'use client';

import Script from 'next/script';
import Image from 'next/image';
import logoContafit from '../logo-contafit.png'; // importa a imagem diretamente

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000';

  const links = {
    whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo link da Bio e gostaria de uma consultoria.')}`,
    planejamento: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Quero saber mais sobre Planejamento Tributário.')}`,
    site: 'https://contafit.com.br',
  };

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      <style jsx global>{`
        body { background-color: #020617 !important; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #020617 100%)',
      }}>
        <div className="fade-in" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          
          <header style={{ marginBottom: '40px' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '24px', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
              overflow: 'hidden' // garante que a imagem respeite o borderRadius
            }}>
              {/* Substitui o emoji pela imagem da contaFIT */}
              <Image 
                src={logoContafit} 
                alt="Logo contaFIT" 
                width={48} 
                height={48} 
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px', margin: 0 }}>
              conta<span style={{ color: '#10b981' }}>FIT</span>
            </h1>
            <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '15px' }}>
              Contabilidade Estratégica Fitness
            </p>
          </header>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <LinkButton href={links.whatsapp} label="Consultoria VIP WhatsApp 💬" primary />
            <LinkButton href={links.planejamento} label="Planejamento Tributário 📊" />
            <LinkButton href={links.site} label="Nosso Site Oficial 🌐" />
          </nav>

          <footer style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
              CONTAFIT • CRC-ES ES-005661/O-9
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

function LinkButton({ href, label, primary }: { href: string, label: string, primary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'block',
      padding: '18px 24px',
      borderRadius: '16px',
      textDecoration: 'none',
      fontWeight: '700',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      backgroundColor: primary ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
      color: '#fff',
      border: primary ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: primary ? '0 4px 15px rgba(16, 185, 129, 0.3)' : 'none',
    }}>
      {label}
    </a>
  );
}
