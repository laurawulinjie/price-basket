package com.pricebasketbackend.service;

import com.pricebasketbackend.api.model.Item;

import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;

public class Calculator {

    private final Map<Item, Integer> items;
    private double subtotal = 0.00;
    private double discount = 0.00;
    private String discountInfo = "";
    private int applesCount = 0;
    private double applesPrice = 0.00;
    private int breadCount = 0;
    private double breadPrice = 0.00;
    private int soupCount = 0;

    public Calculator(Map items) {
        this.items = items;
    }

    public Map result = new HashMap();
    public Map getResult(){
        result.put("subtotal", getSubtotal());
        result.put("discount", getDiscount());
        result.put("discountInfo", getDiscountInfo());
        result.put("total", getTotal());

        return result;
    }

    public double getSubtotal(){
        for (Map.Entry<Item, Integer> entry: items.entrySet()){
            subtotal += entry.getKey().getPrice() * entry.getValue();
        }
        return subtotal;
    }

    public double getDiscount(){
        checkDiscountItems();
        getApplesDiscount();
        getTwoSoupsForHalfBreadDiscount();
        return discount;
    }

    public String getDiscountInfo(){
        if (discount == 0) {
            discountInfo = "(No offers available)";
        }
        return discountInfo;
    }

    private void getTwoSoupsForHalfBreadDiscount() {
        if (breadCount > 0 && soupCount >= 2) {
            int breadDiscountCount = soupCount / 2;
            if (breadDiscountCount > breadCount) {
                breadDiscountCount = breadCount;
            }
            double twoSoupsForHalfBreadDiscount = breadDiscountCount * breadPrice * 0.5;

            if(!discountInfo.equals("")) { discountInfo+="\n";}
            discountInfo += "Buy 2 Soups and get a half price Bread: -" + formatNumberToCurrency(twoSoupsForHalfBreadDiscount);
            discount += twoSoupsForHalfBreadDiscount;
        }
    }

    private void getApplesDiscount() {
        if (applesCount>0) {
            double applesDiscount = applesPrice * applesCount * 0.1;
            if(!discountInfo.equals("")) { discountInfo+="\n";}
            discountInfo += "Apples 10% off: -" + formatNumberToCurrency(applesDiscount);
            discount += applesDiscount;
        }
    }

    private String formatNumberToCurrency(double number) {
        if (number >= 1) {
            return NumberFormat.getCurrencyInstance().format(number);
        } else {
            return ((int)(number % 1 *100)+ "p");
        }
    }

    private void checkDiscountItems() {
        for (Map.Entry<Item, Integer> entry: items.entrySet()) {
            switch (entry.getKey().getName()) {
                case "Apples" -> {
                    applesCount = entry.getValue();
                    applesPrice = entry.getKey().getPrice();
                }
                case "Bread" -> {
                    breadCount = entry.getValue();
                    breadPrice = entry.getKey().getPrice();
                }
                case "Soup" -> soupCount = entry.getValue();
            }
        }
    }

    public double getTotal(){
        return subtotal - discount;
    }

}
