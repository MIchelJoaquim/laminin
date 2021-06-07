import { ICredential } from "../../types/credential";
import { postRequest } from "../utils";
import { MsgData } from './../../types/services';
import { IConsultant } from './../../types/user';

export const authLogin = (credential: ICredential) => postRequest<MsgData<IConsultant>>('auth/login', credential);
export const authSignUp = (consultant: IConsultant) => postRequest<MsgData<IConsultant>>('auth/register', consultant);