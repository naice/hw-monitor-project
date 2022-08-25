import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Icons } from './app.icon-definition';
import { Configuration, ConfigurationProvider } from './configuration-provider';
import { DataManipulationService } from './data-manipulation.service';
import { DisplayDataManipulatorRegister } from './DisplayDataManipulation/display-data-manipulator-register';
import { HardwareDataService, HardwareItem } from './hardware-data.service';

export interface DisplayData {
  icon?: any,
  name?: string,
  min?: string,
  max?: string,
  val?: string,
  backdrop?: string,
  source: HardwareItem,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('container')
  public containerDiv?: ElementRef<HTMLDivElement>;


  public data: DisplayData[] = [];
  public gridListBreakpoint: number = 1;

  private config: Configuration | null = null;
  private subscriptions: Subscription[] = [];

  private gridItemWidth = 460 + 2 * 16;

  constructor(
    private dataManipulationService: DataManipulationService,
    configurationProvider: ConfigurationProvider,
    hardwareDataService: HardwareDataService
  ) {
    this.subscriptions.push(
      configurationProvider.configuration.subscribe(config => this.onConfiguration(config))
    );
    this.subscriptions.push(
      hardwareDataService.data.subscribe(data => this.onDataReceived(data)));
  }

  ngAfterViewInit(): void {
    this.gridListBreakpoint = Math.floor(this.getContainerInnerWidth / this.gridItemWidth);
  }

  ngOnInit(): void {
  }

  get getContainerInnerWidth(): number {
    return (this.containerDiv?.nativeElement.clientWidth ?? 0) - 32;
  }

  calcGridListBreakpoint(): void {
    this.gridListBreakpoint = Math.floor(this.getContainerInnerWidth / this.gridItemWidth);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onConfiguration(config: Configuration): void {
    this.config = config;
  }

  onDataReceived(hwData: HardwareItem): void {
    if (this.config === null) {
      return;
    }
    const displayData: DisplayData[] = [];

    for (const config of this.config.displayData) {
      var item = this.getHardwareChild(config.hardwareDataPath, hwData);
      if (item === null) {
        console.log('Sensor not found', config.hardwareDataPath);
        continue;
      }

      const data: DisplayData = {
        source: item,
        name: config.name ?? item.text,
        min: ''+item.min,
        max: ''+item.max,
        val: ''+item.value,
        icon: config.icon,
        backdrop: config.backdrop,
      }

      if (config.icon) {
        data.icon = Icons[config.icon];
      }

      this.dataManipulationService.manipulate(data, config.manipulators);
      displayData.push(data);
    }

    for (let i = this.data.length-1; i >= 0; i--) {
      if (displayData.some(diDat => diDat.name === this.data[i].name)) {
        continue;
      }
      this.data.splice(i,1);
    }

    displayData.forEach(data => this.createOrUpdate(data));
  }

  private createOrUpdate(data: DisplayData): void {
    const found = this.data.find(dat => dat.name == data.name);
    if (found) {
      for (const key of Object.keys(found)) {
        (found as any)[key] = (data as any)[key];
      }
      return;
    }

    this.data.push(data);
  }

  private getHardwareChild(id:string, data: HardwareItem): HardwareItem | null {
    if (!data || !data.children || data.children.length <= 0) {
      console.log('No data?', data);
      return null;
    }
    const intitalChild = data;
    let currentChild: HardwareItem | undefined = data.children?.find(item => item.id == id);

    return (currentChild == intitalChild || currentChild == undefined) ? null : currentChild;
  }
}
