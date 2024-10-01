// Le tableau d'objet ci dessous permet de lister les element à mettre dans le header
// de l'application. Lors de la création d'un nouvel élement, il faut indiquer le nom,
// aisin que le chemin associé
// ⚠️⚠️ Lors de la création d'un nouvel item, la route correspondante doit être ajouté
// au fichier "front/src/constants/cts_routes.tsx"

import { IMenuElements } from "../interfaces/menu";
import PATH from "./cts_routes";

export const logo : string = "https://www.dev-together.com/wp-content/uploads/2022/05/Dev-Together-logo-1.svg"
export const headerElements : IMenuElements[] = [ 
  {
    name : "home",
    to : PATH.home,
    logo: "ri-home-2-line",
  },
  {
    name : "users",
    to : PATH.users,
    logo: "ri-user-line",
  },
  {
    name : "messages",
    to : PATH.messages,
    logo: "ri-mail-line",
  },
  {
    name : "articles",
    to : PATH.items,
    logo: "ri-article-line",
  }
];