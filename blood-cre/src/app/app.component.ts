import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { interval, map, Subscription, tap } from 'rxjs';
import { HardwareItem, HardwareVitalsService } from 'src/services/hardware-vitals.service';

Chart.register(...registerables);

const weekDays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {

  private subscriptions: Subscription[] = [];

  constructor(
    private hardwareVitals: HardwareVitalsService,
  ) {
    hardwareVitals.start();
  }

  public time = interval(500)
    .pipe(map(() => {
      var date = new Date();
      const str =
        this.fmtStr(date.getHours(), 2) +
        ":" +
        this.fmtStr(date.getMinutes(), 2);
        return str;
  }));

  public date = interval(500)
    .pipe(map(() => {
      var date = new Date();
      const str =
        weekDays[date.getDay()] +
        ", " +
        this.fmtStr(date.getDate(), 2) +
        "." +
        this.fmtStr(date.getMonth(), 2) +
        "." +
        this.fmtStr(date.getFullYear(), 4);
      return str;
  }));

  public fmtStr(num: number, len: number): string {
    return num.toString().padStart(len, '0');
  };

  public vitals$ = this.hardwareVitals.vitals$;
  public cpuTemp$ = this.vitals$.pipe(map((data) => {
    return this.getSensor("/intelcpu/0/temperature/10", data)?.value
  }));
  public gpuTemp$ = this.vitals$.pipe(map((data) => {
    return this.getSensor("/nvidiagpu/0/temperature/0", data)?.value
  }));
  public pumpRpm$ = this.vitals$.pipe(map((data) => {
    return Math.round(this.getSensor("/lpc/nct6798d/fan/6", data)?.value ?? 0)
  }));
  public sysTemp$ = this.vitals$.pipe(map((data) => {
    return this.getSensor("/lpc/nct6798d/temperature/6", data)?.value
  }));

  @ViewChild('cpuContext') cpuContextRef: ElementRef<HTMLCanvasElement> | undefined = undefined;
  public cpuChart: Chart | undefined = undefined;
  public cpuLoads$ = this.vitals$.pipe(map((data) => {
    return this.iterate(data, (index) => `/intelcpu/0/load/${index}`);
  }));
  public cpuChartData$ = this.cpuLoads$.pipe(map((loads) => {
    const data: number[] = [];
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    loads.forEach((item, index) => {
      data.push(item.value ?? 0);
      labels.push("CPU #" + (index + 1));
      backgroundColor.push("#FF000070");
    });
    return {
      labels,
      datasets: [
        {
          label: 'CPU Usage',
          data,
          backgroundColor,
        }
      ]
    };
  }), tap((data) => {
    if (!this.cpuChart) {
      return;
    }
    console.log(data);
    this.cpuChart.data = data
    this.cpuChart.update("none");
  }));

  @ViewChild('hddContext') hddContextRef: ElementRef<HTMLCanvasElement> | undefined = undefined;
  public hddChart: Chart | undefined = undefined;
  public hddLoads$ = this.vitals$.pipe(map((data) => {
    return this.iterate(data, (index) => `/hdd/${index}/load/0`);
  }));
  public hddChartData$ = this.hddLoads$.pipe(map((loads) => {
    const data: number[] = [];
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    loads.forEach((item, index) => {
      data.push(item.value ?? 0);
      labels.push("HDD " + (index + 1));
      backgroundColor.push("#FF000070");
    });
    return {
      labels,
      datasets: [
        {
          label: 'Hard drives',
          data,
          backgroundColor,
        }
      ]
    };
  }), tap((data) => {
    if (!this.hddChart) {
      return;
    }
    console.log(data);
    this.hddChart.data = data
    this.hddChart.update("none");
  }));

  public ngAfterViewInit() {
    this.hddChart = new Chart(this.hddContextRef?.nativeElement!, {
      type: 'polarArea',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Hard Drive Usage'
          }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            grid: {
              color: '#cf000070'
            },
            ticks: {
              display: false
            }
          }
        }
      }
    });
    this.cpuChart = new Chart(this.cpuContextRef?.nativeElement!, {
      type: 'bar',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'CPU Cores Usage'
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: {
              color: '#cf000070'
            },
            ticks: {
              stepSize: 10,
              color: '#cf000070'
            }
          },
          x: {
            grid: {
              color: '#cf000070'
            },
            ticks: {
              color: '#cf000070'
            }
          }
        }
      }
    });
    this.subscriptions.push(this.hddChartData$.subscribe());
    this.subscriptions.push(this.cpuChartData$.subscribe());
  }
  public ngOnDestroy(): void {
    this.hardwareVitals.stop();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private getSensor(id:string, data: HardwareItem): HardwareItem | null {
    if (!data || !data.children || data.children.length <= 0) {
      console.log('No data?', data);
      return null;
    }
    const intitalChild = data;
    let currentChild: HardwareItem | undefined = data.children?.find(item => item.id == id);

    const result = (currentChild == intitalChild || currentChild == undefined) ? null : currentChild;
    return result;
  }

  public iterate(data: HardwareItem, iter: (index: number) => string): HardwareItem[] {
    const items: HardwareItem[] = [];
    let item;
    let index = 0;
    while (item = this.getSensor(iter(index), data)) {
      items.push(item);
      index++;
    }
    return items;
  }
}
