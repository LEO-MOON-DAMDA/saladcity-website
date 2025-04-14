import CustomPrintableMenu from "./CustomPrintableMenu";

export default function SaladcityHome() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8', paddingTop: '50px' }}>
      {/* 네비게이션 바 */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffffee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        zIndex: 1000,
        backdropFilter: 'blur(6px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        height: '60px',
        boxSizing: 'border-box',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '18px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          flex: 1,
          minWidth: 0
        }}>
          {[
            { text: "OUR MENU", href: "/menu" },
            { text: "OUR MISSION", href: "/mission" },
            { text: "THE MARKET", href: "/market" },
            { text: "OUTPOST", href: "/outpost" },
            { text: "CATERING", href: "/catering" },
            { text: "LOCATIONS", href: "/locations" }
          ].map((link, index) => (
            <a key={index} href={link.href} style={{
              textDecoration: 'none',
              color: '#333',
              paddingBottom: '2px',
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s ease, border-bottom 0.2s ease',
              whiteSpace: 'nowrap'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3C8050';
                e.currentTarget.style.borderBottom = '2px solid #3C8050';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.borderBottom = '2px solid transparent';
              }}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <a href="/order" style={{
          backgroundColor: '#3C8050',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          ORDER
        </a>
      </header>

      {/* 상단 Hero 영상 섹션 */}
      <div style={{
        position: 'relative',
        height: '800px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <video
          src="/videos/joyful-healthy-eating.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            filter: 'brightness(0.7) blur(1.5px)'
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" style={{ height: '200px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '40px', margin: '0' }}>건강하고 맛있는 샐러드</h1>
          <p style={{ fontSize: '18px', marginTop: '8px' }}>자연에서 온 재료로 매일 새롭게, 신선하게</p>
          <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Fresh ingredients, made daily with care.</p>
        </div>
      </div>

      {/* 기타 섹션은 이전 App.jsx에서 복사해서 이어 붙이면 됨 */}
      <CustomPrintableMenu />
    </div>
  );
}
