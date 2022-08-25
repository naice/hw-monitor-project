import { Injectable } from "@angular/core";
import { DisplayData } from "../app.component";
import { DisplayDataManipulator } from "./display-data-manipulator";

/**
 * Converts temperatur value to thermometer icon
 */
@Injectable({providedIn:'root'})
export class SuffixDataManipulator extends DisplayDataManipulator {
  public Manipulate(data: DisplayData, parameter: any | null): void {
    if (!parameter || typeof parameter !== 'string') {
      return;
    }
    data.max += parameter;
    data.min += parameter;
    data.val += parameter;
  }
}
