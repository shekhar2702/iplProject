import {React} from "react";
import {Link} from "react-router-dom"
export const MatchSmallCard = ({match,teamName}) => {
    const opponentTeam = match.team1 === teamName ? match.team2 : match.team1;
    const opponentTeamRoute = `/teams/${opponentTeam}`;
    return (
        <div className="MatchSmallCard">
            <span className="vs">vs</span>
            <h1><Link to={opponentTeamRoute}>{opponentTeam}</Link></h1>
            <p className="match-result">{match.winner} won by {match.resultMargin} {match.result} </p>
        </div>
    )
}