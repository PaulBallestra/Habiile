// Le tableau d'objet ci dessous permet de lister les element à mettre dans le header
// de l'application. Lors de la création d'un nouvel élement, il faut indiquer le nom,
// aisin que le chemin associé
// ⚠️⚠️ Lors de la création d'un nouvel item, la route correspondante doit être ajouté
// au fichier "front/src/constants/cts_routes.tsx"

import { IMenuElements } from "../interfaces/menu";
import PATH from "./cts_routes";

// the names are used in translation
export const headerElements : IMenuElements[] = [ 
  {
    name : "home",
    to : PATH.home,
  },
  {
    name : "contact",
    to : PATH.contact,
  },
  {
    name: "about",
    to: PATH.about,
  },
  {
    name: "legals",
    to: PATH.legals,
  }
];