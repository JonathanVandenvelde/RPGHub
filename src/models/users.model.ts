import { BasicModel, BasicModelDBO, BasicModelDTO } from "./basic.model";

export enum ERole {
  USER = "user",
  ADMIN = "admin",
}

export interface User extends BasicModel {
    pseudo: string;
    email: string;
    role: ERole;
    avatar?: string;
    dateDeNaissance: Date;
    lastSession: Date;
}

export interface UserDTO extends BasicModelDTO {
    pseudo: string;
    email: string;
    role: ERole;
    avatar?: string;
    dateDeNaissance: string;
    lastSession: string;
}

export interface UserDBO extends BasicModelDBO {
    pseudo: string;
    email: string;
    role: ERole;
    mot_de_passe: string;
    avatar?: string;
    date_de_naissance: string;
    last_session: string;
}

export interface NewUser {
    pseudo: string;
    email: string;
    motDePasse: string;
    avatar?: string;
    dateDeNaissance: Date;
}

export interface NewUserDTO {
    pseudo: string;
    email: string;
    motDePasse: string;
    avatar?: string;
    dateDeNaissance: string;
}


export interface UserShortDTO extends BasicModelDTO {
    pseudo: string;
    avatar?: string;
    dateDeNaissance: string;
}