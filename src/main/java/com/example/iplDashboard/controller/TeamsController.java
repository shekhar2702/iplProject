package com.example.iplDashboard.controller;

import com.example.iplDashboard.model.Team;
import com.example.iplDashboard.repository.MatchRepository;
import com.example.iplDashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamsController {
    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    TeamsController(TeamRepository teamRepository,MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(this.matchRepository.findLatestMatches(teamName,4));
        return team;
    }
}
