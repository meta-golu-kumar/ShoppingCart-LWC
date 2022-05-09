public with sharing class PurchaseOrderService {

    static fflib_SObjectUnitOfWork uow = new fflib_SObjectUnitOfWork(
            new Schema.SObjectType[] {
                PurchaseOrder__c.SObjectType,
                PurchaseOrderLineItems__c.SObjectType,
                Product2.SObjectType
            }
    );

    // static fflib_SObjectUnitOfWork uowUpdate = new fflib_SObjectUnitOfWork(
    //     new List<SObjectType> { Product2.SObjectType, Product2.SObjectType  }
    // );
    public PurchaseOrderService() {

    }

    @AuraEnabled
    public static Integer makePurchaseOrder(String productDetails,String invoiceNumber){
        List<PurchaseOrderModelClass> arr = new List<PurchaseOrderModelClass>();
        try {
            arr = (List<PurchaseOrderModelClass>) System.JSON.deserialize(productDetails,List<PurchaseOrderModelClass>.class);
        } catch (Exception e) {
            return 0;
        }
        
        if(arr == null || arr.size() == 0){
            return 0;
            //throw new PurchaseOrderServiceException('Zero Items');
        }   
        try {
            PurchaseOrder__c newPurchaseOrder = new PurchaseOrder__c(Order_Total__c=0);
            newPurchaseOrder.Invoice_No__c = invoiceNumber;
            for(PurchaseOrderModelClass each: arr){
                newPurchaseOrder.Order_Total__c += each.Total;
            }
            newPurchaseOrder.Status__c = 'Processing';
            
            uow.registerNew(newPurchaseOrder);
            for(PurchaseOrderModelClass each: arr){
                PurchaseOrderLineItems__c newLineItem = new PurchaseOrderLineItems__c();
                newLineItem.ItemPrice__c = each.total;
                newLineItem.ItemQuantity__c = each.unit;
                newLineItem.Product__c = each.Id;
                uow.registerNew(newLineItem,PurchaseOrderLineItems__c.PurchaseOrder__c,newPurchaseOrder);
                Product2 prdt = new Product2(Id=each.id);
                prdt.Available_Units__c = each.AvailableUnits -  each.unit;
                uow.registerDirty(prdt);
            }
            uow.commitWork();
            return 1;
        } catch (Exception e) {
            return 0;
        }
        
    }
    @AuraEnabled
    public static String generateInvoiceNumber(){
        return String.valueOf(Math.round((Math.random() * (900000) + 100000)));
    }

    public class PurchaseOrderServiceException extends Exception {} 
}
