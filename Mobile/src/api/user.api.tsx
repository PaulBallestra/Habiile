import { Asset } from "react-native-image-picker";
import { instanceAxios } from "../utils/axios-api";

// Get current user
export const onGetCurrentUserApi = () => {
  return instanceAxios
      .get('/users/me')
      .then((response) => response.data ? response.data.data : null)
}

// Create an account
export const onCreateAccountApi = (
  {firstName, lastName, email, phoneNumber, password}:
  {firstName: string, lastName: string, email: string, phoneNumber?: string, password: string}
) => {
  return  instanceAxios
            .post("/users/create-account",
              {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
              }
            )
            .then((response) => (response.data) ? response.data : null);
}

// edit account
export const onEditAccountApi = (
  {userId, lastName, firstName, email, phoneNumber, profileImage}: 
  {userId: number, lastName: string, firstName: string, email: string, phoneNumber?: string, profileImage: any}
) => {
  const formData = new FormData();
  formData.append('lastName', lastName);
  formData.append('firstName', firstName);
  formData.append('email', email);
  formData.append('phoneNumber', phoneNumber || "");
  // check if user entered an image to bypass the error: "Cannot read property 'uri' of null"
  if(profileImage) {
    formData.append('profileImage', {
      // @ts-ignore
      uri: profileImage.uri,
      name: profileImage.fileName,
      type: profileImage.type,
    });
  }
  
  return  instanceAxios
            .put("/users/update-infos/" + userId, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => (response.data) ? response.data : null);
}

// delete account
export const onDeleteAccountApi = (
  {email, password}:
  {email: string, password: string}
) => {
  return instanceAxios
      .put('/users/delete-account', { 
        email,
        password }
      )
      .then((response) =>(response.data ? response.data.data : null))
}

// Lost Password
export const onLostPasswordApi = ({email} : {email : string}) => {
  return  instanceAxios
            .get(`/users/lost-password/${email}`)
            .then((response) => (response.data ? response.data : null))
}

// Reset Password
export const onResetPasswordApi = (
  {new_password_token, email, password} : 
  {new_password_token: string, email : string, password: string}) => {
  return  instanceAxios
            .put(`/users/reset-password/`, {
              new_password_token,
              email,
              password
            })
            .then((response) => (response.data ? response.data : null))
}

// Change password
export const onChangePasswordApi = (
  {userId, newPassword}:
  {userId: number, newPassword: string}
) => {
  return  instanceAxios
          .put("/users/change-password/" + userId,
            {
              newPassword,
            }
          )
          .then((response) => (response.data) ? response.data : null);
}

// Send contact message
export const onSendContactMessageApi = (
  {firstName, lastName, email, phoneNumber, message}:
  {firstName: string, lastName: string, email: string, phoneNumber: string, message: string}
) => {
  return  instanceAxios
          .post("/messages/create-message",
            {
              firstName,
              lastName,
              email,
              phoneNumber,
              message,
            }
          )
          .then((response) => (response.data) ? response.data : null);
}