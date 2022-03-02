package com.zychp.backendfltshr.controllers.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;

@RestController
public class DemoController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/demo")
    public String demo() {
        executeSQL(dataSource, "truncate.sql");
        executeSQL(dataSource, "data.sql");
        return "refreshDB";
    }

    public void executeSQL(DataSource dataSource, String filename) {
        Resource resource = new ClassPathResource(filename);
        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator(resource);
        databasePopulator.execute(dataSource);
    }
}