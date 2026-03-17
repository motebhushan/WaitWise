package com.example.waitwise.controller;

import com.example.waitwise.model.Token;
import com.example.waitwise.service.TokenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class TokenController {
    final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/token")
    Token generateToken(@RequestBody Token token, @RequestParam String organizationCode,
                        @RequestParam String counterCode ){

        return tokenService.generateToken(token,organizationCode,counterCode);
    }


}
