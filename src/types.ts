export interface Unit {
    id: number;
    name: string;
    symbol: string;
  }
  
  export interface UnitCategory {
    id: number;
    name: string;
  }
  
  export interface ConversionHistory {
    id: number;
    fromValue: number;
    fromUnitId: number;
    toUnitId: number;
    toValue: number;
    conversionDate: string;
  }