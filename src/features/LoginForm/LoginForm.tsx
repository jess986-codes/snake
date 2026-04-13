import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './LoginForm.scss';

export function LoginForm() {
  return (
    <div className="login-form">
      <Input placeholder="username"></Input>
      <Input placeholder="password"></Input>
      <Button variant="primary" size="large">
        Log In
      </Button>
    </div>
  );
}
