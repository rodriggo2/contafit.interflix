'use client';

import Script from 'next/script';

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000';

  const links = {
    whatsappGeral: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo link da Bio e gostaria de uma consultoria.')}`,
    whatsappPlanejamento: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Quero saber mais sobre Planejamento Tributário.')}`,
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.6s ease-out forwards; }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.5);
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      <div style={{
        backgroundColor: '#020617',
        backgroundImage: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #020617 80%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        
        <div className="animate-fade" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          
          {/* Avatar/Icone de Especialista */}
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)',
            margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ fontSize: '32px' }}>🏋️</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            conta<span style={{ color: '#10b981' }}>FIT</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '48px', fontWeight: '400' }}>
            Inteligência Contábil para o <br />
            <span style={{ color: '#f8fafc', fontWeight: '600' }}>Ecossistema Fitness</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <a href={links.whatsappGeral} target="_blank" rel="noopener noreferrer" 
               className="glass-button" style={{
                 padding: '20px', borderRadius: '16px', textDecoration: 'none', fontWeight: '700', fontSize: '16px',
                 background: '#10b981', color: '#fff', border: 'none'
               }}>
              Consultoria via WhatsApp 💬
            </a>

            <a href={links.whatsappPlanejamento} target="_blank" rel="noopener noreferrer" 
               className="glass-button" style={{
                 padding: '20px', borderRadius: '16px', textDecoration: 'none', fontWeight: '600', fontSize: '16px',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
               }}>
               <span>📊</span> Planejamento Tributário
            </a>

            <a href={links.site} target="_blank" rel="noopener noreferrer" 
               className="glass-button" style={{
                 padding: '20px', borderRadius: '16px', textDecoration: 'none', fontWeight: '600', fontSize: '16px',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
               }}>
               <span>🌐</span> Site Oficial
            </a>

          </div>

          <footer style={{ marginTop: '64px', opacity: 0.6 }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
              <strong>CONTAFIT CONTABILIDADE</strong><br />
              CRC-ES nº ES-005661/O-9
            </p>
            <div style={{ 
              marginTop: '20px', fontSize: '11px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '6px', color: '#10b981' 
            }}>
              <span style={{ fontSize: '14px' }}>🔒</span> Conexão Criptografada • LGPD
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
