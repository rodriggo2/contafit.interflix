// app/links/page.tsx
'use client';

import Script from 'next/script';

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000';
  const whatsappMessage = encodeURIComponent('Olá! Vim pelo link da Bio e gostaria de uma consultoria contábil.');
  
  const links = {
    whatsapp: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
    site: 'https://contafit.com.br',
    conteudos: 'https://contafit.com.br',
  };

  return (
    <>
      {/* Configuração do Meta Pixel - Injetado de forma segura */}
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

      {/* Estilos CSS Inline para evitar erros de TypeScript com Hover */}
      <style jsx global>{`
        .link-button {
          display: block;
          width: 100%;
          padding: 16px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          border-radius: 9999px;
          margin-bottom: 14px;
          transition: all 0.2s ease;
          text-align: center;
        }
        .link-button:hover {
          transform: translateY(-2px);
          filter: brightness(0.95);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
              conta<span style={{ color: '#10b981', fontWeight: '900' }}>FIT</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              Contabilidade Digital Especializada no Mercado Fitness 🏋️
            </p>
          </div>

          {/* Botão WhatsApp */}
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
            }}
          >
            Falar Conosco no WhatsApp 💬
          </a>

          {/* Botão Site Oficial */}
          <a
            href={links.site}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            Conheça Nosso Site Oficial 🌐
          </a>

          {/* Botão Conteúdos */}
          <a
            href={links.conteudos}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            Conteúdos e Planejamento Tributário 📊
          </a>

          <footer
            style={{
              fontSize: '11px',
              color: '#64748b',
              lineHeight: '1.6',
              marginTop: '40px',
              borderTop: '1px solid #1e293b',
              paddingTop: '20px'
            }}
          >
            <strong>contaFIT - Inteligência Contábil</strong>
            <br />
            Registrada no CRC-ES nº ES-005661/O-9
            <br />
            <span style={{ color: '#10b981', fontWeight: '600', marginTop: '8px', display: 'block' }}>
              🔒 Conexão Segura &bull; LGPD
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
