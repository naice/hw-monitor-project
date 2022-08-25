import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';

export interface HardwareItem {
  Id?: string;
  Text?: string;
  Children?: HardwareItem[];
  Min?: number;
  Value?: number;
  Max?: number;
}




@Injectable({ providedIn: 'root'})
export class HardwareDataService {

  private dataRefreshRate: number = 2000;
  private dataUrl = 'https://localhost:8086/Vitals';

  public data = new Subject<HardwareItem>();

  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.beginBroadCast();
  }

  beginBroadCast(): void {
    this.subscriptions.push(
      interval(this.dataRefreshRate).subscribe(num => this.loadDataAndEmit())
    );
  }


  public stop() : void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadDataAndEmit(): void {
    this.http.get<HardwareItem>(this.dataUrl)
      .toPromise()
      .catch(reason => console.log(reason))
      .then(data => this.data.next(data as HardwareItem));
  }
}
