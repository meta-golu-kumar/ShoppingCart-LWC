@IsTest
public with sharing class ProductSelectorTest {

    @IsTest
    static void testGetAllProducts_WithNoSearchKey_ExpectingGetAllProducts(){

        
        Product2 prod = new Product2(Name='Zara',ProductCode ='ZER-1');
        insert prod;

        // When 
        List<Product2> result = new ProductsSelector().getAllProducts('');
        // then
        System.assertEquals(1, result.size(),'Expecting only one record');

    }

@IsTest
    static void testGetAllProducts_WithSomeSearchKey_ExpectingGetOneProducts(){
            // Given - Test Setup
        List<Product2> productList = new List<Product2>();
        productList.add(new Product2(Name='Zara',ProductCode ='ZER-1'));
        productList.add(new Product2(Name='Peter England',ProductCode ='PET-1'));
        insert productList;

        // When 
        List<Product2> result = PageController.getProducts('Pet');
        // then
        System.assertEquals(1, result.size(),'Expecting only one record with name Pet');
        System.assertEquals('Peter England', result.get(0).Name,'Expecting Peter England');
    }
}
