package com.pricebasketbackend.api.controller;

import com.pricebasketbackend.service.Basket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class BasketController {

    private final Basket basket;

    @Autowired
    public BasketController(Basket basket){
        this.basket = basket;
    }

    @PutMapping("/basket/update")
    public List updateItems (@RequestParam String name, @RequestParam Integer count) {
        basket.update(name, count);
        return basket.getBasketItems();
    }

    @PutMapping("/basket/reset")
    public List resetBasket () {
        basket.resetBasket();
        return basket.getBasketItems();
    }

    @GetMapping("/basket/items")
    public List getBasketItems(){
        return basket.getBasketItems();
    }

    @GetMapping("/basket/price")
    public List getBasketPrice() {
        return basket.getPrice();
    }
}
