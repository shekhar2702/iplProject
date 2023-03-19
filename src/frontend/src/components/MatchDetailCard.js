import {React} from "react";
import {Link} from "react-router-dom";

export const MatchDetailCard = ({match,teamName}) => {
    const opponentTeam = match.team1 === teamName ? match.team2 : match.team1;
    const opponentTeamRoute = `/teams/${opponentTeam}`;
    return (
        <div className="MatchDetailCard">
            <h3>Latest Matches</h3>
            <h1>VS <Link to={opponentTeamRoute}>{opponentTeam}</Link></h1>
            <h2 className="match-date">{match.date}</h2>
            <h3 className="match-venue">at {match.venue}</h3>
            <h3 className="match-result">{match.winner} won by {match.resultMargin} {match.result} </h3>
        </div>
    )
}