import { Document } from 'mongoose';
import { Historic } from '../constants/historic';

export interface IHistoric extends Document {
  [Historic.market]: string;
  [Historic.productName]: string;
  [Historic.productPrice]: Number;
}
