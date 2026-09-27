import { LoggerService } from "../services/logger.service";

/**
 * Type guards : fonctions qui vérifient à l'exécution qu'une valeur inconnue
 * (typiquement req.body ou req.params) a bien la forme attendue.
 * Si la fonction renvoie true, TypeScript considère la valeur comme du type indiqué.
 */

export function isNumber(obj: any): obj is number {
  return typeof obj === "number" && !isNaN(obj) && isFinite(obj);
}

export function isString(obj: any): obj is string {
  return typeof obj === "string";
}

export function isNonEmptyString(obj: any): obj is string {
  return isString(obj) && obj.trim().length !== 0;
}

export function isObject(obj: any): obj is object {
  return typeof obj === "object" && obj !== null;
}
