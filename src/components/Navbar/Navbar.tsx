import { Link } from 'react-router';
import { SnakeIcon } from '../icons/SnakeIcon';
import { LeaderboardIcon } from '../icons/LeaderboardIcon';
import { AccountIcon } from '../icons/AccountIcon';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { signOut } from '../../services/auth';
import { Button } from '../Button/Button';
import './Navbar.scss';

export function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav>
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          <SnakeIcon />
        </Link>
        <div className="navbar-menu">
          {/* <Link to="/" className="navbar-link play-button">
            Play!
          </Link> */}
          <Link to="/leaderboard" className="navbar-link">
            <LeaderboardIcon />
          </Link>

          {user ? (
            <>
              <Link to="/" className="navbar-link"></Link>
              <Button variant="primary" size="medium" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                <AccountIcon />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
