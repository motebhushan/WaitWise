package com.example.waitwise.service;

import com.example.waitwise.model.Counter;
import com.example.waitwise.model.Organization;
import com.example.waitwise.model.Token;
import com.example.waitwise.repository.CounterRepository;
import com.example.waitwise.repository.OrganizationRepository;
import com.example.waitwise.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TokenService {
    final TokenRepository tokenRepository;
    final OrganizationRepository organizationRepository;
    final CounterRepository counterRepository;

    public TokenService(TokenRepository tokenRepository, OrganizationRepository organizationRepository, CounterRepository counterRepository) {
        this.tokenRepository = tokenRepository;
        this.organizationRepository = organizationRepository;
        this.counterRepository = counterRepository;
    }

    public Token generateToken(Token token,String organizationCode,String counterCode) {
        Organization organization = organizationRepository
                .findByOrganizationCode(organizationCode)
                .orElseThrow(() ->
                        new RuntimeException("Organization not found"));

        token.setOrganization(organization);
        Counter counter=counterRepository.findByCounterNumber(counterCode)
                .orElseThrow(()->new RuntimeException("counter not found"));
        token.setCounter(counter);
        token.setStatus("waiting");
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
        token.setArrivalTime(LocalDateTime.now().format(formatter));
        
        token=tokenRepository.save(token);
        String tokenNumber = "T" + String.format("%03d", token.getTokenId());
        token.setTokenNumber(tokenNumber);
        return token;
    }


}
