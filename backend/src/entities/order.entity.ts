import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { OrderType } from "./enumerators/order-type";
import { SaleOrderStatusType } from "./enumerators/order-status-type";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;;

    @Column()
    total: number;

    @Column({
        type: "enum",
        enum: OrderType
    })
    orderType: OrderType;

    @Column(
        {
            type: "enum",
            enum: SaleOrderStatusType,
            default: SaleOrderStatusType.SENDING
        }
    )
    statusType: SaleOrderStatusType;

    @Column()
    is_nullified: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];
}