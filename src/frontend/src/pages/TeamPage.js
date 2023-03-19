import {React, useState, useEffect} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import {useParams} from "react-router-dom";

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
        <h1>{team.teamName}</h1>
        <MatchDetailCard match = {team.matches[0]}
                         teamName = {team.teamName}/>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match = {match} teamName = {teamName} />)}
    </div>
    )
        : null;
}