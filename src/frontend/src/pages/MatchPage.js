import {React,useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {MatchDetailCard} from "../components/MatchDetailCard";

export const MatchPage = () => {
    const [matches,setMatches] = useState();
    const {teamName,year} = useParams();
    useEffect(()=>{
        const getMatches = async() => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);
            // console.log(data);
        }
        getMatches();
    },[])
    return matches ? (
        <div className="MatchPage">
            <h1>Match Page.</h1>
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            {matches.map(match => {
                return <MatchDetailCard key={match.id} match={match} teamName={teamName} />
            })}
        </div>
    ) : null;
}

