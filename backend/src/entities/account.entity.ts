import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isActive: boolean;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;
}
