import { ApiRequestMethod, HttpResponse } from './services.types';

const BASE_API_URL = process.env.PUBLIC_API_URL || 'http://localhost:3001/api/';

export const makeRequest = (method: ApiRequestMethod) => async <T>(
  endpoint: string,
  data?: Object
): Promise<HttpResponse<T>> => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    method,
    mode: 'cors',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  if (response.status < 200 || response.status > 299) throw new Error(responseData.msg);

  return {
    status: response.status,
    data: responseData as T,
  };
};

export const postRequest = makeRequest('POST');
export const getRequest = makeRequest('GET');
export const deleteRequest = makeRequest('DELETE');
export const patchRequest = makeRequest('PATCH');
