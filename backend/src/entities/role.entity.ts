import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Privilege } from "./privilege.entity";
import { User } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.roles)
    @JoinTable()
    users: User[];

    @ManyToMany(() => Privilege)
    @JoinTable()
    privileges: Privilege[];
}