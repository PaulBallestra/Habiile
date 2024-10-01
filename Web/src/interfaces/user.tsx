export interface IUserInfos {
  image: string | undefined;
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber? : string,
  roleName: string,
  password?: string,
  id: number,
  created_at: string,
}

export interface IUserAuthenticationInfos extends IUserInfos {
  isWaitingAuthenticationResponse: boolean,
  isAuthenticated: boolean,
}

export interface IUserContext {
  onCreateAccount: ({}) => Promise<object>;
  onLostPassword: ({}) => Promise<object>;
  onResetPassword: ({}) => Promise<object>;
  onSendContactMessage: ({}) => Promise<object>;
  onChangePassword: ({}) => Promise<object>;
  onGetCurrentUser: () => Promise<IUserInfos>;
  onGetAllUsersAdmin: () => Promise<IUserInfos[]>;
  onEditAccount: ({}) => Promise<object>;
  onUpdateUserByAdmin: ({}) => Promise<Object>;
  onDeleteAccount: ({}) => Promise<object>;
  onDeleteUserByAdmin: ({}) => Promise<object>;
  onCreateAccountByAdmin: ({}) => Promise<object>;
}