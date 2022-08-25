import { Injectable } from "@angular/core";
import { DisplayData } from "../app.component";
import { Icons } from "../app.icon-definition";
import { DisplayDataManipulator } from "./display-data-manipulator";

const faThermometerEmpty = Icons['thermometer-empty'];
const faThermometerFull = Icons['thermometer-full'];
const faThermometerHalf = Icons['thermometer-half'];
const faThermometerQuarter = Icons['thermometer-quarter']
const faThermometerThreeQuarters = Icons['thermometer-three-quaters'];

/**
 * Converts temperatur value to thermometer icon
 */
@Injectable({providedIn:'root'})
export class TemperatureIconManipulator extends DisplayDataManipulator {

  public Manipulate(data: DisplayData): void {
    data.icon = this.getTempIcon(DisplayDataManipulator.getNumber(data.val));
  }

  private getTempIcon(celsius: number): any {
    if (Number.isNaN(celsius) || celsius <= 30) {
      return faThermometerEmpty;
    }
    if (celsius <= 45) {
      return faThermometerQuarter;
    }
    if (celsius <= 60) {
      return faThermometerHalf;
    }
    if (celsius <= 75) {
      return faThermometerThreeQuarters;
    }
    return faThermometerFull;
  }
}
