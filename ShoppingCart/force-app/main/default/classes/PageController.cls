public with sharing class PageController {
    public PageController() {

    }

    
    @AuraEnabled
    public static List<Product2> getProducts(String searchKey){
       
        return new ProductsSelector().getAllProducts(searchKey);
        
    }

    @AuraEnabled
    public static List<PurchaseOrder__c> getPurchaseOrders(){
        return new PurchaseOrderSelector().getAllPurchaseOrder();
    }
}
