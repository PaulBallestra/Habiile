import { instanceAxios } from "../utils/axios-api";

export const onCreateItemApi = (
  { image_path, title, description, price  } :
  { image_path: string, title: string, description: string, price: string  }
) => {
  const formData = new FormData();
  formData.append("image", image_path || "");
  formData.append("title", title || "");
  formData.append("description", description || "");
  formData.append("price", price || "");

  return instanceAxios
    .post("/items/publish", formData)
    .then((response) => (response.data ? response.data : null));
};

export const onGetAllItemsApi = () => {
  return instanceAxios
    .get(`/items/get-all-items`)
    .then((response) => (response.data ? response.data.data : null))
}

export const onGetItemApi = (id : number) => {
  return instanceAxios
    .get(`/items/unique/${id}`)
    .then((response) => (response.data ? response.data.data : null))
}