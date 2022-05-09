public with sharing class PageController {
    public PageController() {

    }

    @TestVisible
    @AuraEnabled
    public static List<Product2> getProducts(String searchKey){
        ProductsSelector newProductSelector = ProductsSelector.newInstance();
        return newProductSelector.getAllProducts(searchKey);
        
    }

    @AuraEnabled
    public static List<PurchaseOrder__c> getPurchaseOrders(){
        PurchaseOrderSelector newPurchaseOrderSelector = PurchaseOrderSelector.newInstance();
        return newPurchaseOrderSelector.getAllPurchaseOrder();
    }
}
