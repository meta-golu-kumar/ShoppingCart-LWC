import { api, LightningElement } from 'lwc';

export default class Pagination extends LightningElement {

    currentPage = 0;
    totalRecords
    recordSize = 10;
    totalPage = 0
    get records() {
        return this.visibleRecords;
    }
    @api set records(data) {
        if (data) {
            if (data.length > 0)
                this.currentPage = 1
            this.totalRecords = data;
            this.visibleRecords = data.slice(0, this.recordSize);
            this.totalPage = Math.ceil(data.length / this.recordSize);
            this.updateRecords();
        }
    }

    firstHandler(event) {
        if (this.currentPage > 1) {
            this.currentPage = 1;
            this.updateRecords();
        }
    }
    previousHandler(event) {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateRecords();
        }
    }
    nextHandler(event) {
        if (this.currentPage < this.totalPage) {
            this.currentPage++;
            this.updateRecords();
        }
    }
    lastHandler(event) {
        if (this.currentPage < this.totalPage) {
            this.currentPage = this.totalPage;
            this.updateRecords();
        }
    }

    get disablePrevious() {
        return this.currentPage <= 1;
    }

    get disbaleNext() {
        return this.currentPage >= this.totalPage;
    }

    updateRecords() {
        const start = (this.currentPage - 1) * this.recordSize;
        const end = this.recordSize * this.currentPage;
        this.visibleRecords = this.totalRecords.slice(start, end);
        this.dispatchEvent(new CustomEvent('update', {
            detail: {
                records: this.visibleRecords
            }
        }))
    }
}