export interface IMessageInfos {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber? : string,
  status: string,
  id: number,
  message: string,
  created_at: string,
}

export interface IMessageContext {
  onGetAllMessages: () => Promise<IMessageInfos[]>;
  onUpdateMessage: ({}) => Promise<Object>;
  onDeleteMessage: ({}) => Promise<object>;
}