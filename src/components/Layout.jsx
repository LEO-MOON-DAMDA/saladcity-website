export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: isHome ? '0px' : '80px',
          backgroundColor: isHome ? 'transparent' : '#f6fdf8',
          position: 'relative',       // ✅ 카드 hover를 위한 z-index 기준
          overflow: 'visible',        // ✅ hover 카드 상단 짤림 방지
          minHeight: '100vh'          // ✅ 푸터까지 안전하게 공간 확보
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
