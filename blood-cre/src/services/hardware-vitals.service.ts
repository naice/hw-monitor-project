import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable, startWith, Subject, Subscription, take } from 'rxjs';


export interface HardwareItem {
  id?: string;
  text?: string;
  children?: HardwareItem[];
  min?: number;
  value?: number;
  max?: number;
}




@Injectable({ providedIn: 'root'})
export class HardwareVitalsService {

  private vitalsRefreshRate: number = 5000;
  private vitalsUrl = 'http://localhost:8085/Vitals';

  private vitalsSubject = new Subject<HardwareItem>();
  public vitals$ = this.vitalsSubject.asObservable();

  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public start(): void {
    this.subscriptions.push(
      interval(this.vitalsRefreshRate).pipe(startWith(0)).subscribe(() => this.loadDataAndEmit())
    );
  }


  public stop() : void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadDataAndEmit(): void {
    this.http.get<HardwareItem>(this.vitalsUrl)
      .pipe(take(1))
      .subscribe((data) => this.vitalsSubject.next(data as HardwareItem));
  }
}
