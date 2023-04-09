import {React} from "react";
import {Link} from "react-router-dom";
import "./MatchSmallCard.scss"
export const MatchSmallCard = ({match,teamName}) => {
    const opponentTeam = match.team1 === teamName ? match.team2 : match.team1;
    const opponentTeamRoute = `/teams/${opponentTeam}`;
    const matchWon = teamName === match.winner;
    return (
        <div className={matchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
            <span className="vs">vs</span>
            <h1><Link to={opponentTeamRoute}>{opponentTeam}</Link></h1>
            <p className="match-result">{match.winner} won by {match.resultMargin} {match.result} </p>
        </div>
    )
}