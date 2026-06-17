package com.eazybytes.jobportal.company.controller;

import com.eazybytes.jobportal.dto.CompanyDto;
import com.eazybytes.jobportal.company.service.ICompanyService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);
    private final ICompanyService companyService;

    @GetMapping("/public")
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {

        List<CompanyDto> companyList = companyService.getAllCompanies();




        return ResponseEntity.ok(companyList);
    }
}