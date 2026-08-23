package com.kunal.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private LocalDateTime releaseDate;
    private Integer quantity;
    private Boolean available;
    private String brand;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<Image> images;
}
