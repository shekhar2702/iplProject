import {React, useState, useEffect} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";

export const TeamPage = () => {

    const [team, setTeam] = useState();
    useEffect(() => {
        const getTeams = async () => {
            const response = await fetch("http://localhost:8080/team/Chennai%20Super%20Kings");
            const data = await response.json();
            setTeam(data);
            // console.log(data);
        }
        getTeams();
    },[])

    return team ? (
        <div className="TeamPage">
        <h1>{team.teamName}</h1>
        <MatchDetailCard match = {team.matches[0]}/>
            <h1>Test</h1>
            {/*{(team.matches.slice(1).map(eachMatch => {*/}
            {/*    <MatchSmallCard match = {eachMatch}/>*/}
            {/*}))}*/}
            {team.matches.slice(1).map(match => <MatchSmallCard match = {match}/>)}
    </div>
    )
        : null;
}