import { Link } from 'react-router';
import { SnakeIcon } from '../icons/SnakeIcon';
import { LeaderboardIcon } from '../icons/LeaderboardIcon';
import { AccountIcon } from '../icons/AccountIcon';
import './Navbar.scss';

export function Navbar() {
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
          <Link to="/login" className="navbar-link">
            <AccountIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}
