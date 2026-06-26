// app/links/page.tsx
'use client';

import Script from 'next/script';
import Image from 'next/image';

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
          background-color: #0000ad !important; /* Azul oficial contaFIT */
          margin: 0;
          padding: 0;
        } 
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        backgroundColor: '#0000ad', // Cor sólida conforme print
        fontFamily: 'sans-serif'
      }}>
        
        <div className="fade-in" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          
          {/* LOGOTIPO contaFIT */}
          <header style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '15px' }}>
              {/* 
                  DICA: Certifique-se de ter o logo branco em /public/logo-contafit.png 
                  ou use a versão em texto estilizada abaixo se não tiver o arquivo agora
              */}
              <div style={{ color: 'white', fontSize: '38px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ border: '3px solid white', borderRadius: '8px', padding: '0 8px', marginRight: '10px', fontSize: '30px' }}>F</span>
                conta<span style={{ fontWeight: '900' }}>FIT</span>
              </div>
            </div>
            <p style={{ color: '#72f3e8', fontWeight: '600', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Contabilidade 100% Digital
            </p>
          </header>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* BOTÃO CIANO - ABRIR EMPRESA (Destaque Principal) */}
            <LinkButton 
              href={links.abrirEmpresa} 
              label="Abra sua empresa grátis 🚀" 
              variant="primary" 
            />

            {/* BOTÃO BRANCO - TROCAR DE CONTADOR */}
            <LinkButton 
              href={links.trocarContador} 
              label="Quero trocar de contador 🔄" 
              variant="secondary" 
            />

            {/* BOTÃO GHOST - FALAR COM ESPECIALISTA */}
            <LinkButton 
              href={links.falarEspecialista} 
              label="Falar com um Especialista 💬" 
              variant="outline" 
            />

            {/* SITE OFICIAL */}
            <a href={links.site} target="_blank" rel="noopener noreferrer" 
               style={{ color: 'white', textDecoration: 'underline', fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
              Acesse nosso site oficial
            </a>
          </nav>

          <footer style={{ marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
              <strong>contaFIT - Inteligência Contábil</strong><br />
              Do CNPJ à gestão, tudo flui. <br />
              CRC-ES ES-005661/O-9
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

// Sub-componente de botão para manter o código limpo
function LinkButton({ href, label, variant }: { href: string, label: string, variant: 'primary' | 'secondary' | 'outline' }) {
  const styles: any = {
    primary: {
      backgroundColor: '#72f3e8', // Ciano do site
      color: '#0000ad',
      boxShadow: '0 4px 15px rgba(114, 243, 232, 0.3)',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#0000ad',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }
  };

  const currentStyle = styles[variant];

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
       onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
       style={{
         display: 'block',
         padding: '20px 24px',
         borderRadius: '12px',
         textDecoration: 'none',
         fontWeight: '800',
         fontSize: '16px',
         transition: 'all 0.2s ease',
         textAlign: 'center',
         ...currentStyle
       }}>
      {label}
    </a>
  );
}
