import { LightningElement, track } from 'lwc';
import getProducts from '@salesforce/apex/PageController.getProducts';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Price', fieldName: 'Price', type: 'currency', sortable: true },
    { label: 'Product Code', fieldName: 'ProductCode' },
    { label: 'Available Units', fieldName: 'AvailableUnits', type: 'number', sortable: true },
];
export default class ProductListPage extends NavigationMixin(LightningElement) {
    @track products;
    error;
    @track columns = columns;
    @track searchKey = '';
    @track rowOffset = 0;
    visibleProducts;
    @track selectedProducts = [];

    connectedCallback() {
        // this.template.querySelector("lightning-datatable").selectedRows = [];
        getProducts({ searchKey: this.searchKey })
            .then(result => {
                let tempProduct = JSON.stringify(result).split('"Price__c":').join('"Price":');
                tempProduct = tempProduct.split('"Available_Units__c":').join('"AvailableUnits":');
                this.products = JSON.parse(tempProduct);
                console.log(JSON.stringify(this.products));
            })
            .catch(error => {
                this.error = error;
                console.log(error);
            })

    }

    renderedCallback() {
        console.log('called render');
        this.template.querySelector("lightning-datatable").selectedRows = [];
    }


    handleKeyUp(event) {
        this.searchKey = event.target.value;
        getProducts({ searchKey: this.searchKey })
            .then(result => {
                let tempProduct = JSON.stringify(result).split('"Price__c":').join('"Price":');
                tempProduct = tempProduct.split('"Available_Units__c":').join('"AvailableUnits":');
                this.products = JSON.parse(tempProduct);
            })
            .catch(error => {
                this.error = error;
                console.log(error);
            })
    }

    updateProductHandler(event) {
        this.visibleProducts = [...event.detail.records];
        this.rowOffset += this.rowOffset;
        console.log(event.detail.records);
    }

    addToCartHandler(event) {
        this.selectedProducts = this.template.querySelector("lightning-datatable").getSelectedRows();
        for (let index = 0; index < this.selectedProducts.length; index++) {
            if (this.selectedProducts[index].AvailableUnits == undefined ||
                this.selectedProducts[index].AvailableUnits === 0) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while Selecting Product',
                        message: 'Empty stocks!',
                        variant: 'error'
                    })
                );
                return;
            }
        }
        if (this.selectedProducts.length > 0) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__navigateToCartPage"
                },
                state: {
                    c__propertyValue: JSON.stringify(this.selectedProducts.map(v => ({...v, Unit: 1 })))
                }
            });
        }
    }

    disconnectedCallback() {
        console.log('called disconnected');
        this.searchKey = '';
        this.products = undefined;
        this.selectedProducts = undefined;
        this.visibleProducts = undefined;
        this.template.querySelector("lightning-datatable").selectedRows = [];
    }

}