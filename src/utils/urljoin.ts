import {API_ENDPOINT} from '../constatns'

export const endpointUrlJoin = (strings: any, ...values) => {
  const result = [];
  for (let i = 0; i < strings.length - 1; i++) {
    result.push(strings[i], encodeURIComponent(values[i]));
  }
  result.push(strings[strings.length - 1]);
  return `${API_ENDPOINT}${result.join("")}`
};