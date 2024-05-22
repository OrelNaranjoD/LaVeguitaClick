import { User } from "../../entities/user.entity";

export class CreateAccountDto {
    isActive: boolean;
    user: User;
}
