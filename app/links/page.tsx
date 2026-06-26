// app/links/page.tsx
'use client';

import Script from 'next/script';

export default function LinksPage() {
  const pixelId = '1703806960639320';
  const whatsappNumber = '5527935008000';

  const links = {
    abrirEmpresa: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vi o link na Bio e quero abrir minha empresa gratuitamente com a contaFIT.')}`,
    trocarContador: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Já tenho empresa e gostaria de trocar de contador para a contaFIT.')}`,
    falarEspecialista: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com um especialista da contaFIT.')}`,
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
        body { 
          background-color: #0000ad !important; 
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          -webkit-tap-highlight-color: transparent;
        } 
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(114, 243, 232, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(114, 243, 232, 0); }
          100% { box-shadow: 0 0 0 0 rgba(114, 243, 232, 0); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-1 { animation: slideIn 0.4s ease forwards; }
        .stagger-2 { animation: slideIn 0.6s ease forwards; }
        .stagger-3 { animation: slideIn 0.8s ease forwards; }
      `}</style>

      <main style={{
        minHeight: '100dvh', // Dynamic Viewport Height para celular
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribui o conteúdo na tela cheia
        padding: '40px 12px', // Margens laterais mínimas para o botão ficar largo
        backgroundColor: '#0000ad',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box'
      }}>
        
        {/* TOP SECTION: LOGO */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <header style={{ marginBottom: '40px' }}>
            <div style={{ 
              color: 'white', 
              fontSize: '48px', 
              fontWeight: '900', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              letterSpacing: '-2px'
            }}>
              <span style={{ 
                border: '4px solid white', 
                borderRadius: '12px', 
                padding: '2px 14px', 
                marginRight: '12px', 
                fontSize: '36px'
              }}>F</span>
              conta<span style={{ fontWeight: '900' }}>FIT</span>
            </div>
            <p style={{ 
              color: '#72f3e8', 
              fontWeight: '700', 
              fontSize: '14px', 
              letterSpacing: '3px', 
              textTransform: 'uppercase',
              marginTop: '12px'
            }}>
              Contabilidade Estratégica
            </p>
          </header>

          {/* MIDDLE SECTION: BUTTONS (LARGURA MÁXIMA) */}
          <nav style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            width: '100%',
            maxWidth: '500px', // Limite para tablets/desktop
            margin: '0 auto'
          }}>
            
            <div className="stagger-1">
              <LinkButton 
                href={links.abrirEmpresa} 
                label="ABRA SUA EMPRESA GRÁTIS 🚀" 
                variant="primary" 
                pulse
              />
            </div>

            <div className="stagger-2">
              <LinkButton 
                href={links.trocarContador} 
                label="QUERO TROCAR DE CONTADOR 🔄" 
                variant="secondary" 
              />
            </div>

            <div className="stagger-3">
              <LinkButton 
                href={links.falarEspecialista} 
                label="FALAR COM UM ESPECIALISTA 💬" 
                variant="outline" 
              />
            </div>
          </nav>
        </div>

        {/* BOTTOM SECTION: FOOTER */}
        <footer style={{ 
          width: '100%', 
          textAlign: 'center', 
          padding: '20px 0',
          marginTop: '40px'
        }}>
          <a href={links.site} target="_blank" rel="noopener noreferrer" 
             style={{ color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: '600', opacity: 0.8 }}>
            www.contafit.com.br
          </a>
          <div style={{ 
            marginTop: '25px', 
            fontSize: '12px', 
            color: 'rgba(255,255,255,0.5)',
            lineHeight: '1.5'
          }}>
            <strong>CONTAFIT INTELIGÊNCIA CONTÁBIL</strong><br />
            CRC-ES ES-005661/O-9
          </div>
        </footer>
      </main>
    </>
  );
}

function LinkButton({ href, label, variant, pulse }: { href: string, label: string, variant: 'primary' | 'secondary' | 'outline', pulse?: boolean }) {
  const styles: any = {
    primary: {
      backgroundColor: '#72f3e8',
      color: '#0000ad',
      border: 'none',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#0000ad',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.4)',
    }
  };

  const currentStyle = styles[variant];

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className={pulse ? 'animate-pulse' : ''}
       style={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         height: '74px', // Altura premium para fácil toque no celular
         borderRadius: '18px',
         textDecoration: 'none',
         fontWeight: '900',
         fontSize: '17px',
         transition: 'all 0.2s ease',
         textAlign: 'center',
         boxSizing: 'border-box',
         letterSpacing: '0.5px',
         ...currentStyle
       }}>
      {label}
    </a>
  );
}
