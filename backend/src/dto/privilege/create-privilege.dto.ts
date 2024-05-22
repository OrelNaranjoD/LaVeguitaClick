import { Role } from "../../entities/role.entity";

export class CreatePrivilegeDto {
    name: string;
    description: string;
    roles: Role[];
}
