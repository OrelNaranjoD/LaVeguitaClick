import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmployeeDetail } from "./employee-detail.entity";
import { IsRut } from "../validators/rut/rut.validator";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @IsRut()
    @Column()
    run: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ type: 'date'})
    birth_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @ManyToOne(() => Employee, employee => employee.id, { nullable: true })
    manager: Employee;

    @OneToMany(() => EmployeeDetail, employeeDetail => employeeDetail.employee, { nullable: true })
    employeeDetails: EmployeeDetail[];

    @Column({ default: false })
    is_deleted: boolean;
}
