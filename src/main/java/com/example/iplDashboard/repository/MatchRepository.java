package com.example.iplDashboard.repository;

import com.example.iplDashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
    List<Match> findByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);
    default List<Match> findLatestMatches(String teamName, int count) {
        return findByTeam1OrTeam2OrderByDateDesc(teamName,teamName, PageRequest.of(0,count));
    }

//    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String team1, LocalDate date1, LocalDate date2, String team2, LocalDate date3, LocalDate date4);

    @Query("Select m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and m.date between :startDate and :endDate order by m.date desc")
    List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
