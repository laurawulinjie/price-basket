package com.pricebasketbackend.service;

import com.pricebasketbackend.api.model.Item;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Basket {
    Store store = new Store();
    private final Map<Item, Integer> items = new HashMap<>();

    Comparator<ArrayList<Object>> nameComparator = (o1, o2) -> {
        String name1 = (String) o1.get(0);
        String name2 = (String) o2.get(0);
        return name1.compareTo(name2);
    };


    public Basket(){
        update("Soup",0);
        update("Bread",0);
        update("Apples",0);
        update("Milk",0);
    }

    public void update(String name, Integer count) {
        Item item = store.getItem(name);
        items.put(item,count);
    }

    public List getBasketItems() {
        List basketItems = new ArrayList<>();
        for (Item key: items.keySet()){
            List item = new ArrayList<>();
            item.add(key.getName());
            item.add(items.get(key));
            basketItems.add(item);
        }
        basketItems.sort(nameComparator);
        return basketItems;
    }

    public List getPrice() {
        List priceInfo = new ArrayList<>();
        Calculator calculator = new Calculator(items);
        priceInfo.add(calculator.getResult());
        return priceInfo;
    }

    public void resetBasket() {
        update("Soup",0);
        update("Bread",0);
        update("Apples",0);
        update("Milk",0);
    }
}
