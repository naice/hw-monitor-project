import { Type } from "@angular/core";
import { DisplayData } from "../app.component";

/**
 * Display data manipulation interface
 */
export abstract class DisplayDataManipulator {

  /**
   * Manipulate the input data.
   * @param data input data
   */
  public abstract Manipulate(data: DisplayData, parameter: any | null): void;

  /**
   * Will match only numbers and parse.
   * @param str string containing numbers
   */
  public static getNumber(str: string | undefined): number {
    if (!str) {
      return Number.NaN;
    }
    let result: number = +(str.replace(/[0-9]+([,.][0-9]+)?/g, ''));
    return result;
  }
}
