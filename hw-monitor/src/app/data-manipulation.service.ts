import { Injectable, Injector } from '@angular/core';
import { DisplayData } from './app.component';
import { DisplayDataManipulator } from './DisplayDataManipulation/display-data-manipulator';
import { DisplayDataManipulatorRegister } from './DisplayDataManipulation/display-data-manipulator-register';

export interface DisplayDataManipulatorConfig {
  name: string;
  parameter?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor(
    private injector: Injector,
  ) { }

  public manipulate(data: DisplayData, manipulators?: DisplayDataManipulatorConfig[]): void {
    if (!manipulators || manipulators.length <= 0) {
      return;
    }
    manipulators.forEach(manipulatorConfig => this.getManipulator(manipulatorConfig.name)?.Manipulate(data, manipulatorConfig.parameter));
  }

  private getManipulator(manipulatorId: string): DisplayDataManipulator | null {
    const classType = DisplayDataManipulatorRegister[manipulatorId];
    if (!classType) {
      console.log('No manipulator found for ' + manipulatorId);
      return null;
    }

    const manipulator = this.injector.get(classType, null);
    if (manipulator === null) {
      console.log('Could not instanciate manipulator ' + manipulatorId);
      return null;
    }

    return manipulator;
  }
}
