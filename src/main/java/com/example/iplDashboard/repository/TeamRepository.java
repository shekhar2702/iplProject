package com.example.iplDashboard.repository;

import com.example.iplDashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team,Long> {
    public Team findByTeamName(String teamName);
}
