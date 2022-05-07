import { LightningElement, track, api } from 'lwc';
import generateInvoiceNumber from '@salesforce/apex/PurchaseOrderService.generateInvoiceNumber';
import makePurchaseOrder from '@salesforce/apex/PurchaseOrderService.makePurchaseOrder';

const columns = [{
        label: 'Name',
        fieldName: 'Name',
        editable: false,
        displayReadOnlyIcon: true,
        cellAttributes: {
            alignment: 'left'
        },
        hideDefaultActions: true,
    },
    {
        label: 'Price',
        fieldName: 'Price',
        type: 'currency',
        editable: false,
        displayReadOnlyIcon: true,
        cellAttributes: {
            alignment: 'left'
        },
        hideDefaultActions: true,
    },
    {
        label: 'Product Code',
        fieldName: 'ProductCode',
        type: 'text',
        editable: false,
        displayReadOnlyIcon: true,
        cellAttributes: {
            alignment: 'left'
        },
        hideDefaultActions: true,
    },
    {
        label: 'Units',
        fieldName: 'Unit',
        type: 'number',
        editable: false,
        displayReadOnlyIcon: true,
        cellAttributes: {
            alignment: 'left'
        },
        hideDefaultActions: true,
    },
    {
        label: 'Total',
        fieldName: 'Total',
        type: 'currency',
        editable: false,
        displayReadOnlyIcon: true,
        cellAttributes: {
            alignment: 'left'
        },
        hideDefaultActions: true,
    },
];
export default class PlaceOrderPage extends LightningElement {
    @track columns = columns;
    @track data
    @track currentDate;
    @api propertyValue;
    @track invoiceCode;
    connectedCallback() {
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'short' });
        this.currentDate = today.getDate() + '-' + monthName + '-' + today.getFullYear();
        generateInvoiceNumber()
            .then(result => {
                this.invoiceCode = result;
            })
            .catch(error => {
                console.log(error);
            })
        this.data = JSON.parse(this.propertyValue);
    }

    placeOrderHandler(event) {
        console.log(JSON.stringify(this.data));
        makePurchaseOrder({ productDetails: JSON.stringify(this.data), invoiceNumber: this.invoiceCode })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            });

        console.log('helo');
    }
}