import { instanceAxios } from "../utils/axios-api";

/**
 * This is a test to see if comments work
 */
export const onSendLanguageApi = (lang: string) => {
  return instanceAxios
    .post(`/language/send`, {lang})
    .then((response) => (response.data ? response.data.data : null))
}