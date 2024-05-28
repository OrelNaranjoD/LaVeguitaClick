import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SaleOrderStatusType } from "./enumerators/order-status-type";
import { Order } from "./order.entity";
import { Customer } from "./customer.entity";

@Entity()
export class SaleOrder extends Order {
    @ManyToOne(() => Customer)
    customer: Customer;

    @Column()
    status: SaleOrderStatusType;
}