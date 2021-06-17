import { IMarket } from './market';
export interface IHistoric {
    market: IMarket;
    productName: string;
    productPrice: number;
}


export interface IHistoricCreate {
    marketId: string;
    productName: string;
    productPrice: number;
}