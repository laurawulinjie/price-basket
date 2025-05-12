package com.pricebasketbackend.api.controller;

import com.pricebasketbackend.service.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin
@RestController
public class StoreController {
    private Store store;

    @Autowired
    public StoreController(Store store){
        this.store = store;
    }

    @GetMapping("/store/products")
    public List getProducts(){
        return store.getItemList();
    }

    @GetMapping("/store/offers")
    public List getOffersInfo() {
        return store.getOffersInfo();
    }
}
