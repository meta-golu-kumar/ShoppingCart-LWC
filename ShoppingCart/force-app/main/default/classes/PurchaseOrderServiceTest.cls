@IsTest
public with sharing class PurchaseOrderServiceTest {

    @isTest
    static void testMakePurchaseOrder_CreateOnePurchaseOrder_Expecting1AsStatusCode(){

        fflib_ApexMocks mocks = new fflib_ApexMocks();
        fflib_ISObjectUnitOfWork uowMock = (fflib_ISObjectUnitOfWork)mocks.mock(fflib_ISObjectUnitOfWork.class);

        Application.UnitOfWork.setMock(uowMock);

        String productDetails = '[{"Name":"GenWatt Propane 500kW","Price":30,"ProductCode":"GC3040","AvailableUnits":3,"Id":"01t5j000005AShiAAG","Unit":1,"Total":30}]';
        

        Integer result = PurchaseOrderService.makePurchaseOrder(productDetails, '876902');

        
        System.assertEquals(1, result,'Expecting 1 as succsses');

    }
    

}
