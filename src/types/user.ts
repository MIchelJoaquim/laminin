import { Consultant } from "../constants/entiteis";

export interface IConsultant {
    [Consultant.id]?: string,
    [Consultant.Email]: string,
    [Consultant.Name]: string;
    [Consultant.password]?: string;
}