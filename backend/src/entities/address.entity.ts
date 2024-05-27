import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Commune } from "./commune.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    zip_code: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @ManyToOne(() => Commune)
    commune: Commune;
}