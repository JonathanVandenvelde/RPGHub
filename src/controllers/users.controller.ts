import { Response, Router } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import { NewUserDTO, User, UserDTO } from "../models/users.model";
import { isNewUserDTO, isString } from "../utils/guards";
import { LoggerService } from "../services/logger.service";
import { UsersService } from "../services/users.service";
import { UserMapper } from "../mappers/users.mapper";

export const usersController = Router();




//    "pseudo": "Vivegriffe",
//     "email": "gareth.vivegriffe@mailfence.com",
//     "role": "user",
//     "motDePasse": "Test1234",
//     "avatar": "avatar.png",
//     "dateDeNaissance": "1995-02-04"

// 1) rechercher via getPseudo si existe

usersController.get("/pseudo/:pseudo", (req: AuthenticatedRequest, res: Response) => {
    LoggerService.info("[GET] /users/pseudo/");

    const pseudo: string = String(req.params.pseudo);
    
    if(!isString(pseudo)) {
        return res.sendStatus(400);
    }

    // ---- usersService----
    const user : User | undefined = UsersService.getPseudo(pseudo);
    if(user === undefined)
        return res.sendStatus(404);

    res.status(200).json(UserMapper.toShortDTO(user));
})
usersController.get("/email/:email", (req: AuthenticatedRequest, res: Response) => {
    LoggerService.info("[GET] /users/email/");

    const email: string = String(req.params.email);
    
    if(!isString(email)) {
        return res.sendStatus(400);
    }

    // ---- usersService----
    const user : User | undefined = UsersService.getEmail(email);
    if(user === undefined)
        return res.sendStatus(404);

    res.status(200).json(UserMapper.toShortDTO(user));
})


usersController.post("/", (req: AuthenticatedRequest, res: Response) => {
    LoggerService.info("[POST] /users/");

    const newUser : NewUserDTO = req.body

    if(!isNewUserDTO(newUser))
        return res.sendStatus(400);

    if(UsersService.getPseudo(newUser.pseudo))
        return res.status(400).json("Le pseudo est déjà utilisé.");
    
    if(UsersService.getEmail(newUser.email))
        return res.status(400).json("L'email est déjà utilisé.");

// Controller =>DTO
// quand tu transfere controller => service (changement de dto vers model)
// dans le Service => changement du model vers dbo

     const user : User | undefined = UsersService.create(UserMapper.fromNewDTO(newUser));
    
     if(!user) return  res.status(500).json("DB planté.");

    res.status(200).json("Votre compte a été créé");;
});