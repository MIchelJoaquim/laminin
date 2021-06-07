import { Document } from 'mongoose';
import { Market } from '../constants/market';

export interface IMarket extends Document {
  [Market.name]: string;
}
