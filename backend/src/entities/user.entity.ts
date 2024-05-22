import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    username: string;

    @Column()
    password: string;

    @Column({ length: 100 })
    email: string;

    @OneToOne(() => Account, account => account.user)
    account: Account;

    @ManyToMany(() => Role, role => role.users)
    roles: Role[];
}
