import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


const actions = [
    { label: 'Delete', name: 'delete', iconName: 'utility:delete' },
];

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Price', fieldName: 'Price', type: 'currency' },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
    { label: 'Units', fieldName: 'Unit', type: 'number', editable: true },
    {
        type: 'action',
        label: 'Delete',
        name: 'delete',
        typeAttributes: { rowActions: actions },
    },
];

export default class CartItemPage extends NavigationMixin(LightningElement) {
    @track columns = columns;
    @track cartItems;
    @api propertyValue;
    @track productDetails;
    draftValues = [];

    connectedCallback() {
        this.cartItems = JSON.parse(this.propertyValue).map(v => ({...v, Total: v.Price }));
        this.productDetails = JSON.parse(this.propertyValue);
        for (let index = 0; index < this.productDetails.length; index++) {
            this.productDetails[index].AvailableUnits--;
        }
    }
    checkOutHandler(event) {
        this.selectedCart = this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log(JSON.stringify(this.selectedCart));
        if (this.selectedCart.length > 0) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__navigateToPlaceOrderPage"
                },
                state: {
                    c__propertyValue: JSON.stringify(this.selectedCart)
                }
            });
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.cartItems = this.cartItems
                .slice(0, index)
                .concat(this.cartItems.slice(index + 1));
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.cartItems.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    handleSave(event) {
        const cartId = event.detail.draftValues[0].Id;
        const newQty = event.detail.draftValues[0].Unit;
        if (newQty <= 0) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while editing qty',
                    message: 'Can not give 0 or negative number',
                    variant: 'error'
                })
            );
            this.draftValues = [];
            return;
        }
        let cartItemIdx = 0;
        for (let index = 0; index < this.cartItems.length; index++) {
            if (this.cartItems[index].Id == cartId) {
                cartItemIdx = index;
                break;
            }

        }
        if (this.cartItems[cartItemIdx].Unit > newQty ||
            this.productDetails[cartItemIdx].AvailableUnits + this.cartItems[cartItemIdx].Unit >= newQty) {
            this.productDetails[cartItemIdx].AvailableUnits += this.cartItems[cartItemIdx].Unit - newQty;
            this.cartItems[cartItemIdx].Unit = newQty;
            this.cartItems[cartItemIdx].Total = newQty * this.cartItems[cartItemIdx].Price;
        } else if (this.productDetails[cartItemIdx].AvailableUnits < newQty) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while editing qty',
                    message: 'Unit should not be more than total quantity',
                    variant: 'error'
                })
            );
            this.draftValues = [];
            return;
        }
        this.draftValues = [];
        console.log(event.detail.draftValues[0].Id);
    }

    disconnectedCallback() {
        this.cartItems = undefined;
        this.productDetails = undefined;
        this.template.querySelector("lightning-datatable").selectedRows = [];
    }
}