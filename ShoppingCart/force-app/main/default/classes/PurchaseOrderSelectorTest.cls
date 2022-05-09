@isTest
public with sharing class PurchaseOrderSelectorTest {
    
    @IsTest
    static void testGetAllPurchaseOrder_WithRecords_ExpectingOneRecord(){
        PurchaseOrder__c newPurchaseOrder = new PurchaseOrder__c(Order_Total__c=0,Invoice_No__c='345623');
        insert newPurchaseOrder;

        List<PurchaseOrder__c> result = new PurchaseOrderSelector().getAllPurchaseOrder();
        System.assertEquals(1, result.size(),'Expecting 1 records');
 
    }

    @IsTest
    static void testGetAllPurchaseOrder_WithNoRecords_ExpectingZeroRecord(){

        List<PurchaseOrder__c> result = new PurchaseOrderSelector().getAllPurchaseOrder();
        System.assertEquals(0, result.size(),'Expecting 0 records');
    }
}
