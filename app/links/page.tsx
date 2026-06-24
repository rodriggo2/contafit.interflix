// app/links/page.tsx
'use client';

import Script from 'next/script';

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000'; // Número oficial da contaFIT

  const linkWhatsApp = `https://wa.me/${whatsappNumber}`;
  const linkSite = 'https://contafit.com.br';
  const linkConteudos = 'https://contafit.com.br'; // Ajuste aqui quando tiver página de conteúdos

  return (
    <>
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
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '8px',
              letterSpacing: '-1px',
            }}
          >
            conta
            <span style={{ fontWeight: '900', textTransform: 'uppercase' }}>
              FIT
            </span>
          </div>

          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '32px' }}>
            Contabilidade Digital Especializada no Mercado Fitness 🏋️
          </p>

          {/* Botão WhatsApp */}
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              borderRadius: '9999px',
              marginBottom: '14px',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
            }}
          >
            Falar Conosco no WhatsApp 💬
          </a>

          {/* Botão Site Oficial */}
          <a
            href={linkSite}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              borderRadius: '9999px',
              marginBottom: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            Conheça Nosso Site Oficial 🌐
          </a>

          {/* Botão Conteúdos */}
          <a
            href={linkConteudos}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              borderRadius: '9999px',
              marginBottom: '32px',
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
              marginTop: '20px',
            }}
          >
            <strong>contaFIT - Instituição de Contabilidade</strong>
            <br />
            Registrada no CRC-ES nº ES-005661/O-9
            <br />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: '6px',
                color: '#10b981',
                fontWeight: '600',
              }}
            >
              🔒 Conexão Segura • LGPD
            </span>
            <br />
            Todos os direitos reservados.
          </footer>
        </div>
      </div>
    </>
  );
}
