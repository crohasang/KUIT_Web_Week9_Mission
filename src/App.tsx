import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useStore from './store/useStore';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Loading from './pages/Loading';

const queryClient = new QueryClient();

function App() {
  // refresh Token을 주고 받기 위한 설정
  axios.defaults.withCredentials = true;

  const { logOut, setAccessToken } = useStore();

  // 토큰 유효성 검증하는 동안 로딩 컴포넌트를 띄우기 위한 상태
  const [isLoading, setIsLoading] = useState(true);

  const theme = createTheme({
    typography: {
      fontFamily: 'Pretendard, Arial, sans-serif',
    },
  });

  // 토큰 유효성 검증
  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        // httpOnly 쿠키에 있던 refresh Token이 서버로 전송
        // 그리고 응답으로 새로운 Access Token을 받는다
        const response = await axios.get('endpoint');

        // 새로 받아온 AccessToken 저장
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
      } catch (error) {
        // 유효성 검증 실패 시 로그아웃
        logOut();
      } finally {
        // 로딩 컴포넌트 끄기
        setIsLoading(false);
      }
    };

    validateAccessToken();
  }, [setAccessToken, logOut]);

  // 로딩 중이면 로딩 컴포넌트 표시
  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
