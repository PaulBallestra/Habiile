import { instanceAxios } from "../utils/axios-api";

// login
export const onLoginApi = (
  {email, password}:
  {email: string, password: string}
) => (
  instanceAxios.post('/auths/login', {email, password})
    .then((response) => (response.data ? response.data : null))
)

// Auto login
// if user connected, auto login every time he changes the route
export const onAutoLoginApi = () => (
  instanceAxios.get('/auths/auto-login')
    .then((response) => (response.data ? response.data : null))
)

// logout
export const onLogoutApi = () => {
  return  instanceAxios
          .get("/auths/logout")
          .then((response) => (response.data) ? response.data : null);
}

// get authenticated user
export const onGetUserIfAuthenticatedApi = () => (
  instanceAxios.get('/auths/get-user-if-authenticated')
    .then((response) => (response.data ? response.data : null))
)