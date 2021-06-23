export enum ServiceResponseStatus {
    LOADING,
    ERROR,
    LOADED,
}
interface ServiceResponseLoading {
    status: ServiceResponseStatus.LOADING;
}
interface ServiceResponseLoaded<T> {
    status: ServiceResponseStatus.LOADED;
    payload: T;
}
interface ServiceResponseError {
    status: ServiceResponseStatus.ERROR;
    error: Error;
}
export type ServiceResponse<T> =
    | ServiceResponseLoading
    | ServiceResponseLoaded<T>
    | ServiceResponseError;
