
import { MsgData } from './../../types/services';
import { getRequest, postRequest } from './../utils';
import { IHistoric, IHistoricCreate } from '../../types/historic';

export const getAllHistoric = (product: string, market: string) =>
    getRequest<MsgData<IHistoric[]>>(`historic?product=${product}&market=${market}`);
export const createHistoric = (data: IHistoricCreate) => postRequest('historic', data);