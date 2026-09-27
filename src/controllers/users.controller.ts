import { Response, Router } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import { NewUserDTO, User } from "../models/users.model";
import { isString } from "../utils/guards";
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

    res.status(200).json(UserMapper.toDTO(user));
})




usersController.post("/", (req: AuthenticatedRequest, res: Response) => {
 const user : NewUserDTO = req.body

//    "pseudo": "Vivegriffe",
//     "email": "gareth.vivegriffe@mailfence.com",
//     "role": "user",
//     "motDePasse": "Test1234",
//     "avatar": "avatar.png",
//     "dateDeNaissance": "1995-02-04"


});