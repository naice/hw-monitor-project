import { faFan, faThermometerEmpty, faThermometerFull, faThermometerHalf, faThermometerQuarter, faThermometerThreeQuarters, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IconDictionary {
  [key: string] : any
}
export const Icons: IconDictionary = {};
Icons['fan'] = faFan;
Icons['thermometer-empty'] = faThermometerEmpty;
Icons['thermometer-full'] = faThermometerFull;
Icons['thermometer-half'] = faThermometerHalf;
Icons['thermometer-quarter'] = faThermometerQuarter;
Icons['thermometer-three-quaters'] = faThermometerThreeQuarters;
Icons['thermometer-'] = faFan;
