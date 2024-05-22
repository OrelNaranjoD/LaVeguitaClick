import { Account } from "../../entities/account.entity";
import { Role } from "../../entities/role.entity";

export class CreateUserDto {
    username: string;
    password: string;
    email: string;
    account: Account;
    roles: Role[];
}
