import './Leaderboard.scss';
import accountIcon from '../../assets/svg/account.svg';

export function Leaderboard() {
  return (
    <>
      <h1 className="right-aligned">Leader Board</h1>

      <div className="leaderboard-container">
        <div className="leaderboard-row leaderboard-header">
          <span>#</span>
          <span>Player</span>
          <span>Score</span>
        </div>
        <div className="leaderboard-row">
          <span className="rank rank-1"> 1</span>
          <span className="player-name">
            <img className="avatar" src={accountIcon} />
            Alice
          </span>
          <span className="highscore">9,800</span>
        </div>
        <div className="leaderboard-row">
          <span className="rank rank-2">2</span>
          <span className="player-name">
            <img className="avatar" src={accountIcon} />
            Bob
          </span>
          <span className="highscore">8,450</span>
        </div>
        <div className="leaderboard-row">
          <span className="rank rank-3">3</span>
          <span className="player-name">
            <img className="avatar" src={accountIcon} />
            Carol
          </span>
          <span className="highscore">7,200</span>
        </div>
        <div className="leaderboard-row">
          <span className="rank">4</span>
          <span className="player-name">
            <img className="avatar" src={accountIcon} />
            Dave
          </span>
          <span className="highscore">6,100</span>
        </div>
      </div>
    </>
  );
}
