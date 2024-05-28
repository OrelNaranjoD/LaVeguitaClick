import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    cost: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, order => order.orderDetails)
    order: Order;
}
