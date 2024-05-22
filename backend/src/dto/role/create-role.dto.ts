import { Privilege } from "../../entities/privilege.entity";
import { User } from "../../entities/user.entity";

export class CreateRoleDto {
    name: string;
    description: string;
    users: User[];
    privileges: Privilege[];
}
