import './Leaderboard.scss';
import accountIcon from '../../assets/svg/account.svg';
import { useTopScores } from '../../services/useLeaderboard';

export function Leaderboard() {
  const { data, isLoading, isError } = useTopScores();

  console.log(data);

  return (
    <>
      <h1 className="right-aligned">Leader Board</h1>

      <div className="leaderboard-container">
        <div className="leaderboard-row leaderboard-header">
          <span>#</span>
          <span>Player</span>
          <span>Score</span>
        </div>

        {data?.map((player, index) => (
          <div className="leaderboard-row" key={player.id}>
            <span className={`rank rank-${index + 1}`}>{index + 1}</span>
            <span className="player-name">
              <img className="avatar" src={accountIcon} />
              {player.username}
            </span>
            <span className="highscore">{player.topScore}</span>
          </div>
        ))}
      </div>
    </>
  );
}
