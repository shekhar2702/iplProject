package com.example.iplDashboard.repository;

import com.example.iplDashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
    public List<Match> findByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);
    public default List<Match> findLatestMatches(String teamName, int count) {
        return findByTeam1OrTeam2OrderByDateDesc(teamName,teamName, PageRequest.of(0,count));
    }

    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String team1, LocalDate date1, LocalDate date2, String team2, LocalDate date3, LocalDate date4);

}
