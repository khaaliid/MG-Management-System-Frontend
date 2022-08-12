import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { Vendor } from "../dtos/Vendor";
import { VendorCrudService } from "../services/VendorCrudService";

export class LessonsDataSource implements DataSource<Vendor> {

    private lessonsSubject = new BehaviorSubject<Vendor[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private vendorService: VendorCrudService) {}

    connect(collectionViewer: CollectionViewer): Observable<Vendor[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadvendors(vendorId: number, filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.vendorService.getAllVendors(vendorId)
        .subscribe(vendors => this.lessonsSubject.next(vendors));
    }    
}