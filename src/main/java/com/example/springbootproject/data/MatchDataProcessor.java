package com.example.springbootproject.data;

import com.example.springbootproject.model.Match;
import org.springframework.batch.item.ItemProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;

public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {
    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);
    private static final String BAT = "BAT";
    @Override
    public Match process(final MatchInput matchInput) throws Exception {
        Match match = new Match();
        match.setId(Long.parseLong(matchInput.getId()));
        match.setCity(matchInput.getCity());
        match.setDate(LocalDate.parse(matchInput.getDate()));
        match.setPlayerOfMatch(matchInput.getPlayer_of_match());
        match.setVenue(matchInput.getVenue());
        match.setNeutralVenue(matchInput.getNeutral_venue());
        //venue,neutraVenue not reqd.
        String firstBatTeam = findTeam1(matchInput.getTeam1(),matchInput.getTeam2(),matchInput.getToss_winner(),matchInput.getToss_decision());
        String secondBatTeam = findTeam2(firstBatTeam,matchInput.getTeam1(),matchInput.getTeam2());
        match.setTeam1(firstBatTeam);
        match.setTeam2(secondBatTeam);
        match.setTossWinner(matchInput.getToss_winner());
        match.setTossDecision(matchInput.getToss_decision());
        match.setWinner(matchInput.getWinner());
        match.setResult(matchInput.getResult());
        match.setResultMargin(matchInput.getResult_margin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());
        return match;
    }

    private String findTeam1(String team1,String team2,String tossWinner,String tossDecision) {
        if(tossWinner.equals(team1)) {
            return tossDecision.equals(BAT) ? team1 : team2;
        }
        else {
            return tossDecision.equals(BAT) ? team2 : team1;
        }
    }

    private String findTeam2(String firstBatTeam,String team1,String team2) {
        return firstBatTeam.equals(team1) ? team2 : team1;
    }


}
