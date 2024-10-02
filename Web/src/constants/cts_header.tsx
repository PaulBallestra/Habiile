// Le tableau d'objet ci dessous permet de lister les element à mettre dans le header
// de l'application. Lors de la création d'un nouvel élement, il faut indiquer le nom,
// ainsi que le chemin associé
// ⚠️⚠️ Lors de la création d'un nouvel item, la route correspondante doit être ajoutée
// au fichier "front/src/constants/cts_routes.tsx"

import { IMenuElements } from "../interfaces/menu";
import PATH from "./cts_routes";

// the names are used in translation
export const headerElements: IMenuElements[] = [
  // DIAGNOSTIC
  {
    name: "diagnosis",
    to: PATH.diagnosis,
  },
  // DEVIS
  {
    name: "estimate",
    to: PATH.estimate,
  },
  // SUIVI DES TRAVAUX
  {
    name: "workMonitoring",
    to: PATH.work_monitoring,
  },
  // SUBVENTIONS
  {
    name: "grants",
    to: PATH.grants,
  },
];
