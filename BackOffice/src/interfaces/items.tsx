export interface IItemsInfos {
  id: number,
  title: string,
  description: string,
  price: string,
  image_path: string,
  status: string,
  created_at: string,
}

export interface IItemsContext {
  onGetAllItems: () => Promise<IItemsInfos[]>;
  onCreateItem: ({}) =>  Promise<Object>,
  onGetItem: ({}) => Promise<Object>;
  onDeleteItem: ({}) => Promise<object>;
  onUpdateItem: ({}) => Promise<Object>;
}