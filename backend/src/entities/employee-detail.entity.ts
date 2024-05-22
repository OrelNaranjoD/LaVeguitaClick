import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContractType } from "./enumerators/contract-type";
import { Employee } from "./employee.entity";

@Entity()
export class EmployeeDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: string;

    @Column()
    department: string;

    @Column()
    salary: number;

    @Column()
    hire_date: Date;

    @Column({ default: null, nullable: true})
    fire_date: Date;

    @Column({ type: 'enum', enum: ContractType, default: ContractType.INDEFINITE})
    contract_type: ContractType;

    @Column()
    cotract_number: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @ManyToOne(() => Employee, employee => employee.employeeDetails)
    employee: Employee;

    @Column({ default: false })
    is_deleted: boolean;
}
