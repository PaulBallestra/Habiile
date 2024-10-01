import { instanceAxios } from "../utils/axios-api";


export const onGetAllMessagesApi = () => {
  return  instanceAxios
            .get('/messages/get-all-messages')
            .then((response) => response.data ? response.data.data : null)
}

export const onDeleteMessageApi = (id : number) => {
  return instanceAxios
            .put('/messages/delete-message/' + id)
            .then((response) => response.data ? response.data.data : null)
}

export const onUpdateMessageApi = (
  {id, status, email, firstName, lastName, phoneNumber, message}: 
  {id: number, status: string, email: string, firstName: string, lastName: string, phoneNumber: string, message: string}
) => {
  console.log('status:', status)

  return  instanceAxios
            .put('/messages/update-message/' + id, {
              status,
              email,
              firstName,
              lastName,
              phoneNumber,
              message
            })
            .then((response) => response.data ? response.data.data : null)
}