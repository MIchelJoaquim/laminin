
import { MsgData } from './../../types/services';
import { getRequest, postRequest } from './../utils';
import { IHistoric, IHistoricCreate } from '../../types/historic';

export const getAllHistoric = () => getRequest<MsgData<IHistoric[]>>(`historic`);
export const createHistoric = (data: IHistoricCreate) => postRequest('historic', data);