package com.pricebasketbackend.api.model;

public class Item {
    private final String name;
    private final double price;
    private final String unit;

    public Item(String name, double price, String unit) {
        this.name = name;
        this.price = price;
        this.unit = unit;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getUnit() {
        return unit;
    }
}
