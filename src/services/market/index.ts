
import { MsgData } from './../../types/services';
import { getRequest, postRequest } from './../utils';
import { IMarket, IMarketCreation } from './../../types/market';

export const getAllMarket = () => getRequest<MsgData<IMarket[]>>(`market`);
export const createMarket = (data: IMarketCreation) => postRequest('market', data);