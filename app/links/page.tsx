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
          -webkit-font-smoothing: antialiased;
        } 
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease-out forwards; }
        
        /* Ajuste para o botão não parecer pequeno no toque */
        .btn-touch {
          touch-action: manipulation;
          user-select: none;
        }
      `}</style>

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 24px', // Aumentei o padding lateral para dar respiro
        backgroundColor: '#0000ad',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        
        <div className="fade-in" style={{ maxWidth: '450px', width: '100%', textAlign: 'center' }}>
          
          {/* LOGOTIPO contaFIT - MAIOR E MAIS IMPACTANTE */}
          <header style={{ marginBottom: '50px' }}>
            <div style={{ 
              color: 'white', 
              fontSize: '42px', // Aumentado
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              letterSpacing: '-1.5px'
            }}>
              <span style={{ 
                border: '4px solid white', 
                borderRadius: '12px', 
                padding: '2px 12px', 
                marginRight: '12px', 
                fontSize: '32px',
                fontWeight: '900'
              }}>F</span>
              conta<span style={{ fontWeight: '900' }}>FIT</span>
            </div>
            <p style={{ 
              color: '#72f3e8', 
              fontWeight: '700', 
              fontSize: '16px', // Aumentado
              letterSpacing: '1.5px', 
              textTransform: 'uppercase',
              marginTop: '15px'
            }}>
              Contabilidade Digital Fitness
            </p>
          </header>

          {/* GRID DE BOTÕES - MAIORES PARA CELULAR */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
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
                 textDecoration: 'underline', 
                 fontSize: '16px', 
                 marginTop: '20px', 
                 opacity: 0.9,
                 fontWeight: '500'
               }}>
              Acesse nosso site oficial
            </a>
          </nav>

          <footer style={{ 
            marginTop: '80px', 
            borderTop: '1px solid rgba(255,255,255,0.15)', 
            paddingTop: '30px',
            paddingBottom: '40px' 
          }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
              <strong>CONTAFIT INTELIGÊNCIA CONTÁBIL</strong><br />
              Do CNPJ à gestão, tudo flui. <br />
              <span style={{ opacity: 0.5 }}>CRC-ES ES-005661/O-9</span>
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
      boxShadow: '0 6px 20px rgba(114, 243, 232, 0.25)',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#0000ad',
      boxShadow: '0 6px 20px rgba(255, 255, 255, 0.1)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.4)',
    }
  };

  const currentStyle = styles[variant];

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-touch"
       style={{
         display: 'block',
         padding: '22px 24px', // Aumentado para preencher mais o celular
         borderRadius: '16px', // Bordas mais modernas
         textDecoration: 'none',
         fontWeight: '800',
         fontSize: '18px', // Fonte maior para leitura fácil no celular
         transition: 'all 0.2s ease',
         textAlign: 'center',
         ...currentStyle
       }}>
      {label}
    </a>
  );
}
