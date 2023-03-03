package com.pricebasketbackend.service;

import com.pricebasketbackend.api.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Store {
    public Map<String, Item> itemList = new HashMap<>();

    Comparator<Object> nameComparator = (o1, o2) -> {
        String name1 = ((Item) o1).getName();
        String name2 = ((Item) o2).getName();
        return name1.compareTo(name2);
    };

    public Store(){
        itemList.put("Soup", new Soup());
        itemList.put("Bread", new Bread());
        itemList.put("Milk", new Milk());
        itemList.put("Apples", new Apples());
    }

    public List<Item> getItemList(){
        List items = new ArrayList<>();
        for (String key: itemList.keySet()){
            items.add(itemList.get(key));
        }
        items.sort(nameComparator);
        return items;
    }

    public Item getItem(String name){
        for (String key: itemList.keySet()){
            if (itemList.containsKey(name)){
                return itemList.get(name);
            }
        }
        return null;
    }

    public List getOffersInfo() {
        List offers = new ArrayList<>();
        offers.add("Apples have a 10% discount off their normal price");
        offers.add("Buy 2 tins of soup and get a loaf of bread for half price");
        return offers;
    }
}
