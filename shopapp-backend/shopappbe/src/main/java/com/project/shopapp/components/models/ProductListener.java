package com.project.shopapp.components.models;

import com.project.shopapp.models.Product;
import com.project.shopapp.services.product.IProductRedisService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
Install Debezium and configure it to capture changes in the MySQL product table.

Set up a Kafka Connect destination to consume the Debezium change data events.

Implement a Spring Boot application that subscribes to the Kafka Connect destination and updates the Redis cache accordingly.
* */
@AllArgsConstructor
public class ProductListener {
    private final IProductRedisService productRedisService;
    private static final Logger logger = LoggerFactory.getLogger(ProductListener.class);
    @PrePersist
    public void prePersist(com.project.shopapp.models.Product product) {
        logger.info("prePersist");
    }

    @PostPersist //save = persis
    public void postPersist(com.project.shopapp.models.Product product) {
        // Update Redis cache
        logger.info("postPersist");
        productRedisService.clear();
    }

    @PreUpdate
    public void preUpdate(com.project.shopapp.models.Product product) {
        //ApplicationEventPublisher.instance().publishEvent(event);
        logger.info("preUpdate");
    }

    @PostUpdate
    public void postUpdate(com.project.shopapp.models.Product product) {
        // Update Redis cache
        logger.info("postUpdate");
        productRedisService.clear();
    }

    @PreRemove
    public void preRemove(com.project.shopapp.models.Product product) {
        //ApplicationEventPublisher.instance().publishEvent(event);
        logger.info("preRemove");
    }

    @PostRemove
    public void postRemove(Product product) {
        // Update Redis cache
        logger.info("postRemove");
        productRedisService.clear();
    }
}
