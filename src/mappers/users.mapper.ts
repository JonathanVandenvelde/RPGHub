import { NewUser, NewUserDTO, User, UserDBO, UserDTO, UserShortDTO } from "../models/users.model";

export class UserMapper{
    static toDTO = (user : User): UserDTO => {
        return {
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            dateDeNaissance: user.dateDeNaissance.toISOString(),
            lastSession: user.lastSession.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        }
    }

 static toShortDTO = (user : User): UserShortDTO => {
        return {
            id: user.id,
            pseudo: user.pseudo,
            avatar: user.avatar,
            dateDeNaissance: user.dateDeNaissance.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        }
    }

    static toDBO = (user : User): UserDBO => {
        return {
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            mot_de_passe: "",
            role: user.role,
            avatar: user.avatar,
            date_de_naissance: user.dateDeNaissance.toISOString(),
            last_session: user.lastSession.toISOString(),
            created_at: user.createdAt.toISOString(),
            updated_at: user.updatedAt.toISOString(),
        }
    }

    static fromDTO = (userDTO : UserDTO): User => {
        return {
            id: userDTO.id,
            pseudo: userDTO.pseudo,
            email: userDTO.email,
            role: userDTO.role,
            avatar: userDTO.avatar,
            dateDeNaissance: new Date(userDTO.dateDeNaissance),
            lastSession: new Date(userDTO.lastSession),
            createdAt: userDTO.createdAt ?  new Date(userDTO.createdAt) :  new Date(),
            updatedAt: userDTO.updatedAt ? new Date(userDTO.updatedAt): new Date(), 
        }
    }


    static fromDBO = (userDBO : UserDBO) : User =>{
        return{
            id: userDBO.id,
            pseudo: userDBO.pseudo,
            email: userDBO.email,
            role: userDBO.role,
            avatar: userDBO.avatar,
            dateDeNaissance: new Date(userDBO.date_de_naissance),
            lastSession: new Date(userDBO.last_session),
            createdAt: new Date(userDBO.created_at),
            updatedAt: new Date(userDBO.updated_at), 
        }
    }

    static fromNewDTO = (newUser : NewUserDTO) : NewUser =>{
        return {
            pseudo: newUser.pseudo,
            email: newUser.email,
            motDePasse: newUser.motDePasse,
            avatar: newUser.avatar,
            dateDeNaissance: new Date(newUser.dateDeNaissance),
        }
    }
}
