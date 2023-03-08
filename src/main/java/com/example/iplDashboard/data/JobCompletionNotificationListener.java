package com.example.iplDashboard.data;


import com.example.iplDashboard.model.Team;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;


//@Component
//public class JobCompletionNotificationListener implements JobExecutionListener {
//
//    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);
//
//    private final JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
//
//    @Override
//    public void afterJob(JobExecution jobExecution) {
//        System.out.println("balalalal5");
//        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
//            log.info("!!! JOB FINISHED! Time to verify the results");
//
//            jdbcTemplate.query("SELECT team1,team2,date FROM match",
//                            (rs, row) -> "Team 1 " + rs.getString(1) + " Team 2 " + rs.getString(2) + " Date " + rs.getString(3))
//                    .forEach(str -> System.out.println(str));
//        }
//    }
//}
@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager entityManager;

    @Autowired
    public JobCompletionNotificationListener(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            HashMap<String, Team> teamData =new HashMap<>();
            entityManager.createQuery("select m.team1,count(*) from Match m group by m.team1",Object[].class)
                    .getResultList()
                    .stream()
                    .map(element -> new Team((String) element[0],(long) element[1]))
                    .forEach(team -> teamData.put(team.getTeamName(),team));
            entityManager.createQuery("select m.team2,count(*) from Match m group by m.team2",Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(element -> {
                        if(element != null) {
                            Team team = teamData.get((String) element[0]);
                            team.setTotalMatches(team.getTotalMatches() + (long) element[1]);
                        }
                    });
            entityManager.createQuery("select m.winner,count(*) from Match  m group by m.winner",Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(element -> {
                        if(element != null) {
                            Team team = teamData.get((String)  element[0]);
                            if(team != null)
                                team.setTotalWins((long) element[1]);
                        }
                    });
            teamData.values().forEach(entityManager::persist);
            teamData.values().forEach(System.out::println);
//            jdbcTemplate.query("SELECT team1,team2,date FROM match",
//                            (rs, row) -> "Team 1 " + rs.getString(1) + " Team 2 " + rs.getString(2) + " Date " + rs.getString(3))
//                    .forEach(str -> System.out.println(str));
        }
    }
}