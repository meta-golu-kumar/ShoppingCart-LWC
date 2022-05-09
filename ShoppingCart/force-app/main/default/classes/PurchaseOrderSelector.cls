public with sharing class PurchaseOrderSelector extends fflib_SObjectSelector implements IPurchaseOrderSelector{
    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField> {
            PurchaseOrder__c.Id,
            PurchaseOrder__c.Status__c,
            PurchaseOrder__c.Order_Total__c
            };
    }
    public Schema.SObjectType getSObjectType() {
        return PurchaseOrder__c.sObjectType;
    }
    
    public List<PurchaseOrder__c> getAllPurchaseOrder(){
        String query = String.format('SELECT {0} FROM {1} ', new List<String>{
            getFieldListString(),
            getSObjectName()
        });

        return (List<PurchaseOrder__c>) Database.query(query);
    }

    public static PurchaseOrderSelector newInstance()
	{
		return (PurchaseOrderSelector) Application.Selector.newInstance(PurchaseOrder__c.SObjectType);
	}

    public interface IPurchaseOrderSelector extends fflib_ISObjectSelector {
        List<PurchaseOrder__c> getAllPurchaseOrder();
    }
}
