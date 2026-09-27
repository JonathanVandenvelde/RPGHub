import { UserMapper } from "../mappers/users.mapper";
import { User, UserDBO } from "../models/users.model";
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
}
