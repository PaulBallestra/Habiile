export interface IAuthenticationContext {
  user: any;
  isWaitingAutoLogin: boolean;
  onLogin: ({}) => Promise<object>;
  onLogout: () => Promise<object>;
  onAutoLogin: ({}) => Promise<object>;
}
