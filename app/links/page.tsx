// app/links/page.tsx
'use client';

import Script from 'next/script';

// Configurações e Links
const CONFIG = {
  pixelId: '1703806960639320',
  whatsappNumber: '5527935008000',
  whatsappMessage: encodeURIComponent('Olá! Vim pelo link da Bio e gostaria de uma consultoria contábil.'),
  links: {
    site: 'https://contafit.com.br',
    conteudos: 'https://contafit.com.br/conteudos', // Exemplo de path
  }
};

export default function LinksPage() {
  
  // Função para rastrear cliques no Meta Pixel
  const trackClick = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName);
    }
  };

  return (
    <>
      {/* Meta Pixel - Carregamento Otimizado */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${CONFIG.pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      <main
        style={{
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          
          {/* Logo / Header */}
          <header style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '12px' }}>
              conta<span style={{ color: '#10b981' }}>FIT</span>
            </div>
            <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.5' }}>
              Contabilidade Digital Especializada no <br />
              <strong>Mercado Fitness 🏋️</strong>
            </p>
          </header>

          {/* Grid de Botões */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <LinkButton 
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`}
              label="Falar Conosco no WhatsApp 💬"
              bgColor="#25D366"
              textColor="#fff"
              onClick={() => trackClick('ClickWhatsApp')}
            />

            <LinkButton 
              href={CONFIG.links.site}
              label="Conheça Nosso Site Oficial 🌐"
              bgColor="#ffffff"
              textColor="#0f172a"
              onClick={() => trackClick('ClickSite')}
            />

            <LinkButton 
              href={CONFIG.links.conteudos}
              label="Conteúdos e Planejamento 📊"
              bgColor="#ffffff"
              textColor="#0f172a"
              onClick={() => trackClick('ClickConteudos')}
            />

          </div>

          <footer
            style={{
              fontSize: '12px',
              color: '#64748b',
              lineHeight: '1.8',
              marginTop: '50px',
              paddingTop: '20px',
              borderTop: '1px solid #1e293b'
            }}
          >
            <strong>contaFIT - Inteligência Contábil</strong>
            <br />
            CRC-ES nº ES-005661/O-9
            <br />
            <div style={{ marginTop: '12px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <span style={{ fontSize: '14px' }}>🔒</span> Conexão Segura • LGPD
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

/**
 * Componente de Botão Otimizado
 */
function LinkButton({ href, label, bgColor, textColor, onClick }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: '18px 20px',
        backgroundColor: bgColor,
        color: textColor,
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '15px',
        borderRadius: '12px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
    >
      {label}
    </a>
  );
}
