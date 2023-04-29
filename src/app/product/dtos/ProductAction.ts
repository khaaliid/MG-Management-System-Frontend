import { Product } from "./Product";

export class ProductActionResponse {
    
    /**
     * 
     * @param Product vendro to process
     * @param action action to be taken
     * @param statusCode statusCode
     * @param statusMessage status message
     * @param cachedIndex index of the object in the source if it is required to be maintained after the proccessing
     */
    constructor(private product:Product|null, private action: number, private statusCode: number, private statusMessage: String, private cachedIndex: number){}

    getVendor(){
        return this.product;
    }

    getCachedIndex(){
        return this.cachedIndex;
    }
}