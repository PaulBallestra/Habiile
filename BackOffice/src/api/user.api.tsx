import { instanceAxios } from "../utils/axios-api";

// Get current user
export const onGetCurrentUserApi = () => {
  return instanceAxios
      .get('/users/me')
      .then((response) => response.data ? response.data.data : null)
}

export const onGetAllUsersByAdminApi = () => {
  return instanceAxios
      .get('/users/get-all')
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
  {userId: number, lastName: string, firstName: string, email: string, phoneNumber: string, profileImage: File}
) => {
  console.log("[user.api.tsx][line 39] => ", profileImage)
  return  instanceAxios
            .put("/users/update-infos/" + userId,
              {
                firstName,
                lastName,
                email,
                phoneNumber,
                profileImage,
              }
            )
            .then((response) => (response.data) ? response.data : null);
}

// delete account
export const onDeleteAccountApi = (
  {email, password}:
  {email: string, password: string}
) => {
  return  instanceAxios
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
          .post("/users/send-message",
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


// Create a user account (Available for admins only)
export const onCreateAccountByAdminApi = (
  {firstName, lastName, email, phoneNumber, roleName}:
  {firstName: string, lastName: string, email: string, phoneNumber?: string, roleName: string}
) => {
  return  instanceAxios
            .post("/users/create-account-by-admin",
              {
                firstName,
                lastName,
                email,
                phoneNumber,
                roleName,
              }
            )
            .then((response) => (response.data) ? response.data.data : null);
}

// delete user account (Available for admins only)

export const onDeleteAccountByAdminApi = (
  { id } :
  { id: number }
) => {
  return instanceAxios
          .put('/users/delete-account-by-admin/'+ id)
          .then((response) =>(response.data ? response.data.data : null))
}

// Update user account (Available for admins only)
export const onUpdateUserByAdminApi = (
  { email, firstName, lastName, phoneNumber, roleName, password, id } :
  { email: string, firstName: string, lastName: string, phoneNumber? : string, roleName: string, password: string, id: number }
) => {

  return  instanceAxios
            .put("/users/update-user-by-admin/" + id, 
                {
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  roleName,
                  password,
                }
              )
              .then((response) => (response.data) ?  response.data : null)
}