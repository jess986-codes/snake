import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { signUp, signInWithGoogle } from '../../services/auth';
import './RegisterationForm.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { GoogleIcon } from '../../components/icons/GoogleIcon';

export function RegisterationForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const { error } = await signUp(email, password, username);

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="registration-form">
      <Input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={error}
      ></Input>
      <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      ></Input>
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error}
      ></Input>
      <Button
        variant="primary"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      <Button
        variant="icon"
        size="large"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <GoogleIcon />
        Sign up with Google
      </Button>
      <div className="action-links">
        Already have an account?
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
