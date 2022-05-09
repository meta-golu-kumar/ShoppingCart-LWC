@isTest
public with sharing class PageControllerTest {
    
    @isTest
    static void testGetProducts_WithNoSearchKey_ExpectingGetAllREcords(){

        // Create Mocks
        fflib_ApexMocks mocks = new fflib_ApexMocks();
        ProductsSelector prodSelecotorMock = (ProductsSelector)mocks.mock(ProductsSelector.class);

        // Given 
        mocks.startStubbing();  
            List<Product2> productsMock = new List<Product2>();
            Id prodId = fflib_IDGenerator.generate(Product2.SObjectType);
            Id prodId2 = fflib_IDGenerator.generate(Product2.SObjectType);
            productsMock.add(new Product2(Id= prodId,Name = 'Parle-G',Price__c=30,ProductCode='PAL-23',Available_Units__c=30));
            productsMock.add(new Product2(Id= prodId2,Name = 'Apple',Price__c=30,ProductCode='APP-24',Available_Units__c=30));
    
            Set<Id> idset = new Set<Id>{prodId,prodId2};
            mocks.when(prodSelecotorMock.SObjectType()).thenReturn(Product2.SObjectType);
            mocks.when(prodSelecotorMock.getAllProducts('')).thenReturn(productsMock);
        mocks.stopStubbing();

        Application.Selector.setMock(prodSelecotorMock);

        // when
        List<Product2> result = PageController.getProducts('');
        // String objectType = 
        

        // then 
        ((ProductsSelector)mocks.verify(prodSelecotorMock)).getAllProducts('');
        System.assertEquals(2, result.size(),'Expecting only one Product');

    }

    @isTest
    static void testGetProducts_WithSomeSearchKey_ExpectingGetOneRecord(){

        // Create Mocks
        fflib_ApexMocks mocks = new fflib_ApexMocks();
        ProductsSelector prodSelecotorMock = (ProductsSelector)mocks.mock(ProductsSelector.class);

        // Given 
        List<Product2> productsMock = new List<Product2>();
        Id prodId = fflib_IDGenerator.generate(Product2.SObjectType);
        Id prodId2 = fflib_IDGenerator.generate(Product2.SObjectType);
        productsMock.add(new Product2(Id= prodId, Name = 'Parle-G',Price__c=3));
        productsMock.add(new Product2(Id= prodId2, Name = 'Tiger',Price__c=5));
        mocks.startStubbing();
            mocks.when(prodSelecotorMock.sObjectType()).thenReturn(Product2.SObjectType);
            mocks.when(prodSelecotorMock.getAllProducts('T')).thenReturn(new List<Product2>{productsMock.get(1)});
        mocks.stopStubbing();

        Application.Selector.setMock(prodSelecotorMock);

        // when
        List<Product2> result = PageController.getProducts('T');

        // then 
        ((ProductsSelector)mocks.verify(prodSelecotorMock)).getAllProducts('T');
        System.assertEquals(1, result.size(),'Expecting only one Product');

    }

    @isTest
    static void testGetPurchaseOrders_WhenRecordExist_ExpetingOneRecord(){
    
        fflib_ApexMocks mocks = new fflib_ApexMocks();
        PurchaseOrderSelector orderSelecotorMock = (PurchaseOrderSelector)mocks.mock(PurchaseOrderSelector.class);

        // Given 
        List<PurchaseOrder__c> ordersMock = new List<PurchaseOrder__c>();
        Id prodId = fflib_IDGenerator.generate(PurchaseOrder__c.SObjectType);
        ordersMock.add(new PurchaseOrder__c(Invoice_No__c='876456',status__c='Processing'));
        mocks.startStubbing();
            mocks.when(orderSelecotorMock.sObjectType()).thenReturn(PurchaseOrder__c.SObjectType);
            mocks.when(orderSelecotorMock.getAllPurchaseOrder()).thenReturn(ordersMock);
        mocks.stopStubbing();

        Application.Selector.setMock(orderSelecotorMock);

        // when
        List<PurchaseOrder__c> result = PageController.getPurchaseOrders();

        // then 
        ((PurchaseOrderSelector)mocks.verify(orderSelecotorMock)).getAllPurchaseOrder();
        System.assertEquals(1, result.size(),'Expecting only one Order');
    }

}
