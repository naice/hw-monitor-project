import { Type } from "@angular/core";
import { DisplayDataManipulator } from "./display-data-manipulator";
import { FanDataReadableManipulator } from "./fan-data-readable-manipulator";
import { SuffixDataManipulator } from "./suffix-data-manipulator";
import { TemperatureIconManipulator } from "./temperatur-icon-manipulator";

export interface IDisplayDataManipulatorRegister {
  [key: string] : Type<DisplayDataManipulator>
}

export const DisplayDataManipulatorRegister: IDisplayDataManipulatorRegister = {};
DisplayDataManipulatorRegister['temperatur-icon'] = TemperatureIconManipulator;
DisplayDataManipulatorRegister['fan-data-readable'] = FanDataReadableManipulator;
DisplayDataManipulatorRegister['suffix-data'] = SuffixDataManipulator;
