import {React, useState, useEffect} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import {useParams} from "react-router-dom";
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {

    const [team, setTeam] = useState();
    const {teamName} = useParams();
    useEffect(() => {
        const getTeams = async () => {
            // console.log(teamName);
            const response = await fetch(`http://localhost:8080/team/${teamName}`);
            const data = await response.json();
            setTeam(data);
            console.log(data);
        }
        getTeams();
    },[teamName])

    return team ? (
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
           <a href="#">More></a>
       </div>
    </div>
    )
        : null;
}