interface Payload<T> {
    data: T;
    count: number;
}
export interface MsgData<T> {
    msg: string;
    payload: Payload<T>;
}