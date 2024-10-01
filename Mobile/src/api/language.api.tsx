import { instanceAxios } from "../utils/axios-api";

export const onSendLanguageApi = (lang: string) => {
  return instanceAxios
    .post(`/language/send`, {lang})
    .then((response) => (response.data ? response.data.data : null))
}