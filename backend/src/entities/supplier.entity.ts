import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { Address } from "./address.entity";

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rut: string;

    @Column()
    company_name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    description: string;

    @Column()
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @Column({ default: false })
    is_deleted: boolean;

    @OneToMany(() => Contact, _ => { })
    contacts: Contact[];

    @OneToMany(() => Address, _ => { })
    address: Address[];
}
