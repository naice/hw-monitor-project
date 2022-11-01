import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { interval, mergeMap, Observable, Subject, Subscription } from 'rxjs';

export interface HardwareItem {
  id?: string;
  text?: string;
  children?: HardwareItem[];
  min?: number;
  value?: number;
  max?: number;
}




@Injectable({ providedIn: 'root'})
export class HardwareDataService {

  private dataRefreshRate: number = 2000;
  private dataUrl = 'http://localhost:8085/Vitals';

  public data = interval(this.dataRefreshRate).pipe(mergeMap(() => this.http.get<HardwareItem>(this.dataUrl)));
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.start();
  }

  private start(): void {
    this.subscriptions.push(this.data.subscribe());
  }


  public stop() : void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

