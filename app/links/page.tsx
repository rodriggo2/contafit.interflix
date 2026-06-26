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
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(114, 243, 232, 0.6); }
          70% { box-shadow: 0 0 0 20px rgba(114, 243, 232, 0); }
          100% { box-shadow: 0 0 0 0 rgba(114, 243, 232, 0); }
        }
        .btn-primary-animate {
          animation: pulseGlow 2.5s infinite;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-entry { animation: slideUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>

      <main style={{
        minHeight: '100dvh', // Preenche 100% da tela do iPhone/Smartphone
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly', // Espalha o conteúdo verticalmente
        padding: '20px 0',
        backgroundColor: '#0000ad',
        backgroundImage: 'radial-gradient(circle at 50% 30%, #0000ff 0%, #0000ad 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box'
      }}>
        
        {/* SECTION: LOGO (MAIOR) */}
        <header className="animate-entry" style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ 
            color: 'white', 
            fontSize: 'min(14vw, 56px)', // Escala conforme a largura da tela
            fontWeight: '900', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            letterSpacing: '-2px'
          }}>
            <span style={{ 
              border: 'min(1.2vw, 5px) solid white', 
              borderRadius: '15px', 
              padding: '2px 16px', 
              marginRight: '15px',
              fontSize: '0.8em'
            }}>F</span>
            conta<span style={{ fontWeight: '900' }}>FIT</span>
          </div>
          <p style={{ 
            color: '#72f3e8', 
            fontWeight: '700', 
            fontSize: '16px', 
            letterSpacing: '4px', 
            textTransform: 'uppercase',
            marginTop: '15px',
            opacity: 0.9
          }}>
            Inteligência Contábil
          </p>
        </header>

        {/* SECTION: BOTOES (OCUPANDO 92% DA LARGURA) */}
        <nav className="animate-entry" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          width: '92%', 
          maxWidth: '550px' 
        }}>
          
          <LinkButton 
            href={links.abrirEmpresa} 
            label="ABRA SUA EMPRESA GRÁTIS 🚀" 
            variant="primary" 
            animate
          />

          <LinkButton 
            href={links.trocarContador} 
            label="QUERO TROCAR DE CONTADOR 🔄" 
            variant="secondary" 
          />

          <LinkButton 
            href={links.falarEspecialista} 
            label="FALAR COM UM ESPECIALISTA 💬" 
            variant="outline" 
          />
        </nav>

        {/* SECTION: FOOTER / SITE */}
        <footer className="animate-entry" style={{ width: '100%', textAlign: 'center' }}>
          <a href={links.site} target="_blank" rel="noopener noreferrer" 
             style={{ 
               color: 'white', 
               textDecoration: 'none', 
               fontSize: '18px', 
               fontWeight: 'bold',
               padding: '10px 20px',
               borderBottom: '2px solid #72f3e8'
             }}>
            www.contafit.com.br
          </a>
          <div style={{ 
            marginTop: '40px', 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.5)',
            lineHeight: '1.6'
          }}>
            <strong>CONTAFIT CONTABILIDADE DIGITAL</strong><br />
            ES-005661/O-9 • LGPD Compliant
          </div>
        </footer>
      </main>
    </>
  );
}

function LinkButton({ href, label, variant, animate }: { href: string, label: string, variant: 'primary' | 'secondary' | 'outline', animate?: boolean }) {
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
      border: '2px solid rgba(255, 255, 255, 0.5)',
    }
  };

  const currentStyle = styles[variant];

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className={animate ? 'btn-primary-animate' : ''}
       style={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         height: '82px', // Altura GIGANTE para smartphones modernos
         borderRadius: '20px', // Bordas mais arredondadas (estilo iOS)
         textDecoration: 'none',
         fontWeight: '900',
         fontSize: '20px', // Fonte maior
         transition: 'all 0.3s ease',
         textAlign: 'center',
         boxSizing: 'border-box',
         letterSpacing: '0.5px',
         ...currentStyle
       }}>
      {label}
    </a>
  );
}
