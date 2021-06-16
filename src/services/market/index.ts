
import { MsgData } from './../../types/services';
import { getRequest, postRequest } from './../utils';
import { IMarket } from './../../types/market';

export const getAllMarket = () => getRequest<MsgData<IMarket[]>>(`market`);
export const createMarket = (data: IMarket) => postRequest('market', data);