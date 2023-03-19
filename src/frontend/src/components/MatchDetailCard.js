import {React} from "react";

export const MatchDetailCard = ({match}) => {
    return match ? (
        <div className="MatchDetailCard">
            <h3>Latest Matches</h3>
            <p>{match.team1} VS {match.team2}</p>
        </div>
    ) : null;
}