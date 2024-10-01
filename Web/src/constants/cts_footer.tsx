// Le tableau d'objet ci dessous permet de lister les element à mettre dans le footer
// de l'application. Lors de la création d'un nouvel élement, il faut indiquer le nom
// ainsi que le chemin associé
// ⚠️⚠️ Lors de la création d'un nouvel item, la route correspondante doit être ajouté
// au fichier "front/src/constants/cts_routes.tsx"

import { IMenuElements } from "../interfaces/menu"
import PATH from "./cts_routes";

// the names are used in translation
export const footerElements : IMenuElements[] = [ 
  {
    name : "aboutUs",
    to : PATH.about
  },
  {
    name : "legals",
    to : PATH.legals
  },
];