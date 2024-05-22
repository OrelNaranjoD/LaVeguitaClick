import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class AuditAuth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tableName: string;

    @Column()
    action: string;

    @Column()
    success: boolean;

    @Column()
    recordId: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
