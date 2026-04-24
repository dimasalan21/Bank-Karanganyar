import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import LoginForm from '../components/LoginForm';
import LoginWelcomeScreen from '../components/LoginWelcomeScreen';

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWelcome(true);
    setTimeout(() => setFadeOut(true), 1800);
    setTimeout(() => {
      setShowWelcome(false);
      login();
      navigate('/', { replace: true });
    }, 2600);
  };

  if (showWelcome) {
    return <LoginWelcomeScreen fadeOut={fadeOut} />;
  }

  return (
    <LoginForm
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
    />
  );
}
