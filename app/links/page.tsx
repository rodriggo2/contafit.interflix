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
        } 
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 16px', // Reduzi de 24px para 16px para os botões ganharem largura
        backgroundColor: '#0000ad',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        
        <div className="fade-in" style={{ 
          width: '100%', 
          maxWidth: '540px', // Aumentado para preencher melhor telas maiores
          textAlign: 'center' 
        }}>
          
          {/* HEADER / LOGOTIPO */}
          <header style={{ marginBottom: '45px', marginTop: '20px' }}>
            <div style={{ 
              color: 'white', 
              fontSize: '44px', 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              letterSpacing: '-1.5px'
            }}>
              <span style={{ 
                border: '4px solid white', 
                borderRadius: '12px', 
                padding: '2px 14px', 
                marginRight: '12px', 
                fontSize: '34px',
                fontWeight: '900'
              }}>F</span>
              conta<span style={{ fontWeight: '900' }}>FIT</span>
            </div>
            <p style={{ 
              color: '#72f3e8', 
              fontWeight: '700', 
              fontSize: '15px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              marginTop: '15px',
              opacity: 0.9
            }}>
              Contabilidade Estratégica Fitness
            </p>
          </header>

          {/* BOTÕES LARGOS */}
          <nav style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            width: '100%' 
          }}>
            
            <LinkButton 
              href={links.abrirEmpresa} 
              label="Abra sua empresa grátis 🚀" 
              variant="primary" 
            />

            <LinkButton 
              href={links.trocarContador} 
              label="Quero trocar de contador 🔄" 
              variant="secondary" 
            />

            <LinkButton 
              href={links.falarEspecialista} 
              label="Falar com um Especialista 💬" 
              variant="outline" 
            />

            <a href={links.site} target="_blank" rel="noopener noreferrer" 
               style={{ 
                 color: 'white', 
                 textDecoration: 'none', 
                 fontSize: '16px', 
                 marginTop: '25px', 
                 fontWeight: '600',
                 borderBottom: '1px solid rgba(255,255,255,0.3)',
                 display: 'inline-block',
                 paddingBottom: '2px'
               }}>
              Visitar site oficial
            </a>
          </nav>

          <footer style={{ 
            marginTop: '70px', 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: '30px',
            paddingBottom: '30px'
          }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
              <strong>CONTAFIT INTELIGÊNCIA CONTÁBIL</strong><br />
              Do CNPJ à gestão, tudo flui. <br />
              <span style={{ fontSize: '11px' }}>CRC-ES ES-005661/O-9</span>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

function LinkButton({ href, label, variant }: { href: string, label: string, variant: 'primary' | 'secondary' | 'outline' }) {
  const styles: any = {
    primary: {
      backgroundColor: '#72f3e8',
      color: '#0000ad',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#0000ad',
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
       style={{
         display: 'block',
         width: '100%', // Garante que o botão use 100% do container
         boxSizing: 'border-box',
         padding: '22px 20px',
         borderRadius: '14px',
         textDecoration: 'none',
         fontWeight: '800',
         fontSize: '18px',
         transition: 'transform 0.2s ease',
         textAlign: 'center',
         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
         ...currentStyle
       }}>
      {label}
    </a>
  );
}
