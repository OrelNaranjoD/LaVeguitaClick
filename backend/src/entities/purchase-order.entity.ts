import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderStatusType } from "./enumerators/order-status-type";
import { Order } from "./order.entity";
import { Supplier } from "./supplier.entity";

@Entity()
export class PurchaseOrder extends Order {
    @ManyToOne(() => Supplier)
    supplier: Supplier;

    @Column()
    status: PurchaseOrderStatusType;
}
