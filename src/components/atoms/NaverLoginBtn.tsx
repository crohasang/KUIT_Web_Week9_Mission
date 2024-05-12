import { useFadeIn } from '../../hooks/useFadeIn';
import NaverLoginBtnImage from '../../assets/icons/naverLoginBtn.png';

const NaverLoginBtn = () => {
  const opacity = useFadeIn(0, 1, 1000);

  const handleLoginClick = () => {
    // state 랜덤 생성
    const state = Math.random().toString(36).substring(7);

    const clientId = encodeURIComponent(
      import.meta.env.VITE_NAVER_AUTH_CLIENT_ID
    );

    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI
    );

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
  };

  return (
    <img
      src={NaverLoginBtnImage}
      alt="Naver Login Button"
      className="cursor-pointer transition-opacity duration-1000"
      style={{ opacity, width: '180px', height: '45px' }}
      onClick={handleLoginClick}
    />
  );
};

export default NaverLoginBtn;
