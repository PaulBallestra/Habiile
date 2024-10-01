import { IUserInfos } from "./user";
export interface IAuthenticationContext {
  user: IUserInfos,
  isWaitingAutoLogin : boolean,
  onLogin: ({}) => Promise<object>;
  onLogout: () => Promise<object>;
  onAutoLogin: ({}) => Promise<object>;
  onGetUserIfIsAuthenticated: () => Promise<IUserInfos>;
}