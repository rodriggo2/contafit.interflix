// app/links/page.tsx
'use client';

import Script from 'next/script';

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000';

  const links = {
    whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo link da Bio e gostaria de uma consultoria.')}`,
    planejamento: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Quero saber mais sobre Planejamento Tributário.')}`,
    site: 'https://contafit.com.br',
  };

  return (
    <main style={{
      backgroundColor: '#020617',
      backgroundImage: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #020617 80%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      color: '#f8fafc',
      fontFamily: 'sans-serif'
    }}>
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

      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ 
          width: '70px', height: '70px', borderRadius: '50%', background: '#10b981',
          margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
        }}>
          <span style={{ fontSize: '30px' }}>🏋️</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
          conta<span style={{ color: '#10b981' }}>FIT</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '40px' }}>
          Contabilidade Especializada no Mercado Fitness
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <LinkCard href={links.whatsapp} label="Consultoria WhatsApp 💬" bg="#10b981" color="#fff" />
          <LinkCard href={links.planejamento} label="Planejamento Tributário 📊" bg="rgba(255,255,255,0.05)" color="#fff" border="1px solid rgba(255,255,255,0.1)" />
          <LinkCard href={links.site} label="Nosso Site Oficial 🌐" bg="rgba(255,255,255,0.05)" color="#fff" border="1px solid rgba(255,255,255,0.1)" />
        </div>

        <footer style={{ marginTop: '50px', fontSize: '11px', color: '#64748b' }}>
          <strong>CONTAFIT CONTABILIDADE</strong><br />
          CRC-ES nº ES-005661/O-9
        </footer>
      </div>
    </main>
  );
}

function LinkCard({ href, label, bg, color, border }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'block', padding: '18px', borderRadius: '12px', textDecoration: 'none',
      fontWeight: '600', fontSize: '15px', transition: '0.2s',
      backgroundColor: bg, color: color, border: border || 'none',
      textAlign: 'center'
    }}>
      {label}
    </a>
  );
}
