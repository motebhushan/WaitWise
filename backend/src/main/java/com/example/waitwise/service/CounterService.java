package com.example.waitwise.service;

import com.example.waitwise.model.Counter;
import com.example.waitwise.model.Organization;
import com.example.waitwise.model.Token;
import com.example.waitwise.repository.CounterRepository;
import com.example.waitwise.repository.OrganizationRepository;
import com.example.waitwise.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CounterService {
   final private OrganizationRepository organizationRepository;
    final private CounterRepository counterRepository;
    final private TokenRepository tokenRepository;

    public CounterService(OrganizationRepository organizationRepository, CounterRepository counterRepository, TokenRepository tokenRepository) {
        this.organizationRepository = organizationRepository;
        this.counterRepository = counterRepository;
        this.tokenRepository = tokenRepository;
    }

    public Counter addCounter(String organizationCode, Counter counter) {

        Organization organization = organizationRepository
                .findByOrganizationCode(organizationCode)
                .orElseThrow(() ->
                        new RuntimeException("Organization not found"));

        counter.setOrganization(organization);
        counter=counterRepository.save(counter);
        String counterNumber = "C" + String.format("%03d", counter.getCounterId());
        counter.setCounterNumber(counterNumber);
        return counter;
    }

    public List<Token> getAllTokens(String organizationCode, String counterCode) {
        return tokenRepository.findByOrganization_OrganizationCodeAndCounter_CounterNumber
                (organizationCode,counterCode);

    }

    public List<Token> getWaitingList(String counterNumber,String status){
        Counter counter = counterRepository.findByCounterNumber(counterNumber)
                .orElseThrow(() -> new RuntimeException("Counter not found"));

        return tokenRepository
                .findByCounter_CounterNumberAndStatusOrderByTokenIdAsc(
                        counter.getCounterNumber(),
                        status
                );
    }

    public Token serveNextToken() {
        Optional<Token> currentOpt =
                tokenRepository.findFirstByStatusOrderByTokenIdAsc("serving");


        if (currentOpt.isPresent()) {
            Token current = currentOpt.get();
            current.setStatus("completed");
            tokenRepository.save(current);
        }


        Optional<Token> waitingOpt =
                tokenRepository.findFirstByStatusOrderByTokenIdAsc("waiting");

        if (waitingOpt.isEmpty()) {
            throw new RuntimeException("No tokens in waiting queue");
        }

        Token next = waitingOpt.get();
        next.setStatus("serving");

        return tokenRepository.save(next);
    }
}
