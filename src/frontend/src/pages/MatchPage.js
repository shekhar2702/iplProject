import {React,useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {YearSelector} from "../components/YearSelector";
import "./MatchPage.scss";

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
    },[teamName,year])
    return matches ? (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
            {matches.map(match => {
                return <MatchDetailCard key={match.id} match={match} teamName={teamName} />
            })}
            </div>
        </div>
    ) : null;
}

