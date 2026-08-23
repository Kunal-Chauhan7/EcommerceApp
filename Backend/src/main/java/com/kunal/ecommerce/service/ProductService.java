package com.kunal.ecommerce.service;

import com.kunal.ecommerce.model.Image;
import com.kunal.ecommerce.model.Product;
import com.kunal.ecommerce.repository.ImageRepo;
import com.kunal.ecommerce.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ImageRepo imageRepo;

    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public Product getProduct(int id){
        return productRepo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile image) {
        try{

            byte[] imageData = image.getBytes();
            String imageType = image.getContentType();
            String imageName = image.getOriginalFilename();

            Product newProduct = productRepo.save(product);

            Image image1 = new Image();
            image1.setImageData(imageData);
            image1.setImageName(imageName);
            image1.setImageType(imageType);
            image1.setProduct(newProduct);

            imageRepo.save(image1);

            return newProduct;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
