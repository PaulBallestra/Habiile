export interface IUserInfos {
  image: string | undefined;
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber? : string,
  id: number,
}

export interface IUserContext {
  onCreateAccount: ({}) => Promise<object>;
  onLostPassword: ({}) => Promise<object>;
  onResetPassword: ({}) => Promise<object>;
  onSendContactMessage: ({}) => Promise<object>;
  onChangePassword: ({}) => Promise<object>;
  onGetCurrentUser: () => Promise<IUserInfos>;
  onEditAccount: ({}) => Promise<object>;
  onDeleteAccount: ({}) => Promise<object>;
}