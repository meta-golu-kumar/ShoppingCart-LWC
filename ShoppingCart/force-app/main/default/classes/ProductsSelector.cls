public with sharing class ProductsSelector extends fflib_SObjectSelector{
    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField> {
            Product2.Name,
            Product2.Price__c,
            Product2.ProductCode,
            Product2.Available_Units__c
            };
    }
    public Schema.SObjectType getSObjectType() {
        return Product2.sObjectType;
    }
    
    public List<Product2> getAllProducts(String searchKey){
        searchKey = '%' + searchKey + '%';
        String query = String.format('SELECT {0} FROM {1} WHERE NAME LIKE :searchKey', new List<String>{
            getFieldListString(),
            getSObjectName()
        });

        return (List<Product2>) Database.query(query);
    }
}
