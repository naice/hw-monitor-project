import { Injectable } from "@angular/core";
import { DisplayData } from "../app.component";
import { DisplayDataManipulator } from "./display-data-manipulator";

/**
 * Converts temperatur value to thermometer icon
 */
@Injectable({providedIn:'root'})
export class FanDataReadableManipulator extends DisplayDataManipulator {
  public Manipulate(data: DisplayData): void {
    data.max = '' + Math.round(data.source.max ?? 0);
    data.min = '' + Math.round(data.source.min ?? 0);
    data.val = '' + Math.round(data.source.value ?? 0);
  }
}
