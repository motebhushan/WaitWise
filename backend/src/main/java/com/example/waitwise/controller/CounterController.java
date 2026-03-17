package com.example.waitwise.controller;

import com.example.waitwise.model.Counter;
import com.example.waitwise.model.Token;
import com.example.waitwise.service.CounterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/api")
public class CounterController {
    CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @PostMapping("/counter/add")
    public Counter addCounter(@RequestBody Counter counter,@RequestParam String organizationCode){
        return counterService.addCounter(organizationCode,counter);
    }
    @GetMapping("/get/tokens")
    List<Token>getAllTokens( @RequestParam String organizationCode,@RequestParam String counterCode){
        return counterService.getAllTokens(organizationCode,counterCode);
    }
    @GetMapping("/waiting/list")
    List<Token>getWaitingList(@RequestParam String counterNumber){
        return counterService.getWaitingList(counterNumber,"waiting");
    }
    @GetMapping("/completed/list")
    List<Token>getCompletedList(@RequestParam String counterNumber){
        return counterService.getWaitingList(counterNumber,"completed");
    }
    @GetMapping("/serving/list")
    List<Token>getCurrentList(@RequestParam String counterNumber){
        return counterService.getWaitingList(counterNumber,"serving");
    }

    @PostMapping("/next")
    public Token serveNext() {
        return counterService.serveNextToken();
    }
}
