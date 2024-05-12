import { useFadeIn } from '../../hooks/useFadeIn';
import GoogleLoginBtnImage from '../../assets/icons/googleLoginBtn.png';

const GoogleLoginBtn = () => {
  const opacity = useFadeIn(0, 1, 1000);

  const handleLoginClick = () => {
    const clientId = encodeURIComponent(
      import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID
    );

    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI
    );

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${clientId}}
		&redirect_uri=${redirectUri}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <img
      src={GoogleLoginBtnImage}
      alt="Google Login Button"
      className="cursor-pointer transition-opacity duration-1000"
      style={{ opacity, width: '180px', height: '45px' }}
      onClick={handleLoginClick}
    />
  );
};

export default GoogleLoginBtn;
