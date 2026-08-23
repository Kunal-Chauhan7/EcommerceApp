package com.kunal.ecommerce.repository;

import com.kunal.ecommerce.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image,Integer> {
}
