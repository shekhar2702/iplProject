import { React, useEffect, useState } from 'react';
import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';
import {HomeLink} from "../components/HomeLink";


export const HomePage = () => {

    const [teams, setTeams] = useState([]);
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams`);
                const data = await response.json();
                setTeams(data);

            };
            fetchAllTeams();



        }, []
    );

    return (
        <div className="HomePage">
            <HomeLink />
            <div className="header-section">
                <h1 className="app-name">IPL Teams Scoreboard</h1>
            </div>
            <div className="team-grid">
                { teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)}
            </div>
        </div>

    );
}