import { LightningElement, track } from 'lwc';
import getPurchaseOrders from '@salesforce/apex/PageController.getPurchaseOrders';
import { NavigationMixin } from 'lightning/navigation';
const columns = [{
        label: 'PO Id',
        fieldName: 'Id',
        cellAttributes: {
            alignment: 'left'
        },
    },
    {
        label: 'Status',
        fieldName: 'Status__c',
        type: 'picklist',
        cellAttributes: {
            alignment: 'left'
        },
    },
    {
        label: 'Order Total',
        fieldName: 'Order_Total__c',
        type: 'currency',
        cellAttributes: {
            alignment: 'left'
        },
    },
];
export default class MyOrderPage extends NavigationMixin(LightningElement) {

    @track columns = columns;
    @track purchaseOrder;
    @track visiblePurchaseOrder;

    connectedCallback() {
        getPurchaseOrders()
            .then(result => {
                this.purchaseOrder = result;
                //console.log(JSON.stringify(this.result));
            })
            .catch(error => {
                console.error(error);
            })
    }

    updateOrderHandler(event) {
        this.visiblePurchaseOrder = [...event.detail.records];
        console.log(JSON.stringify(this.visiblePurchaseOrder));
    }

    newPurchaseOrderHandler(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__navigateToProductPage"
            },
        });
    }
}