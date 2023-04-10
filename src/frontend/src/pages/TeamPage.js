import {React, useState, useEffect} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import {Link, useParams} from "react-router-dom";
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';
import {HomeLink} from "../components/HomeLink";

export const TeamPage = () => {

    const [team, setTeam] = useState();
    const {teamName} = useParams();
    useEffect(() => {
        const getTeams = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
            const data = await response.json();
            setTeam(data);
        }
        getTeams();
    },[teamName])

    return team ? (
    <div><HomeLink />
   <div className="TeamPage">
        <div className="team-name-section"><h1 className="team-name">{team.teamName}</h1></div>
        <div className="win-loss-section">
            Wins/Losses
            <PieChart
                data={[
                    { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                    { title: 'Wins', value: team.totalWins, color: '#4da375' },
                ]}
            />
        </div>
       <div className="match-detail-section">
        <MatchDetailCard match = {team.matches[0]}
                         teamName = {team.teamName}/>
       </div>
       {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match = {match} teamName = {teamName} />)}
       <div className="more-link">
           <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More></Link>
       </div>
    </div>
    </div>
    )
        : null;
}