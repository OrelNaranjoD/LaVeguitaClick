import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./supplier.entity";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    position: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}
