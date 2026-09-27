import { UserMapper } from "../mappers/users.mapper";
import { User, UserDBO,NewUser, ERole } from "../models/users.model";
import { FilesService } from "./files.service";
import { LoggerService } from "./logger.service";

export class UsersService{
     protected static dbPath: string = "data/users.json";

 static readDB(): UserDBO[] | undefined {
    let dbos = [];
    try {
      dbos = FilesService.readFile<UserDBO>(this.dbPath);
    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }

    return dbos;
 }

 static writeDB(usersDBO : UserDBO []): boolean
{ try {
      FilesService.writeFile<UserDBO>(this.dbPath,usersDBO);
    } catch (error) {
      LoggerService.error(error);
      return false;
    }
    
return true;
}

static getPseudo = (pseudo : string) : User | undefined => {
    const dbos : UserDBO[] | undefined = this.readDB()
    if(dbos === undefined)
        return undefined;

    for (const user of dbos) {
        if(user.pseudo.toLowerCase() === pseudo.toLowerCase()) return UserMapper.fromDBO(user);
    }
    
    return undefined;
    }   

    static getEmail = (email : string) : User | undefined => {
    const dbos : UserDBO[] | undefined = this.readDB()
    if(dbos === undefined)
        return undefined;

    for (const user of dbos) {
      if(user.email.toLowerCase() === email.toLowerCase()) return UserMapper.fromDBO(user);
    }
    
    return undefined;
    }   

    static create = (newUser: NewUser) : User | undefined => {
      
    const dbos : UserDBO[] | undefined = this.readDB()
    if(dbos === undefined) return undefined;


    let compteur = 0;
    for (const user of dbos) {
      if(user.id > compteur)
        compteur = user.id;
    }
      

    const userDBO : UserDBO = {
            id: compteur+1,
            pseudo: newUser.pseudo,
            email: newUser.email,
            // bcrypt hachage obligé
            mot_de_passe:newUser.motDePasse,
            role: ERole.USER,
            avatar: newUser.avatar,
            date_de_naissance: new Date(newUser.dateDeNaissance).toISOString(),
            last_session: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(), 
    }
    
    dbos.push(userDBO);
    if(!this.writeDB(dbos)) return undefined

    return UserMapper.fromDBO(userDBO);
    }

   

}
