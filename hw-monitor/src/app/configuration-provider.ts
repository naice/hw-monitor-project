import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { DisplayDataManipulatorConfig } from "./data-manipulation.service";

export interface DisplayDataConfiguration {
  hardwareDataPath: string;
  manipulators?: DisplayDataManipulatorConfig [];
  icon?: string;
  backdrop?: string;
  name?: string;
}

export interface Configuration {
  displayData: DisplayDataConfiguration[];
}

const configuration : Configuration = {
  displayData: [
    {
      manipulators: [ { name: 'fan-data-readable' }, { name: 'suffix-data', parameter: ' RPM' } ],
      hardwareDataPath: '/lpc/nct6798d/fan/6',
      name: 'Water Pump',
      backdrop: 'waterpump-bg.png',
      icon: 'fan',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/nvidiagpu/0/temperature/0',
      name: 'RTX 3090',
      backdrop: 'gpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/10',
      name: 'CPU All',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/0',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/1',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/2',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/3',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/4',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/5',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/6',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/7',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/8',
      backdrop: 'cpu-bg.png',
    },
    {
      manipulators: [ { name: 'temperatur-icon' }, { name: 'suffix-data', parameter: ' °C' } ],
      hardwareDataPath: '/intelcpu/0/temperature/9',
      backdrop: 'cpu-bg.png',
    },
  ]
}

@Injectable({providedIn: 'root'})
export class ConfigurationProvider {

  public configuration: Observable<Configuration> = of(configuration);

}
