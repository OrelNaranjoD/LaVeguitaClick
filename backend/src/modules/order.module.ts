import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order/order.controller';
import { OrderService } from '../services/order/order.service';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import { SaleOrder } from '../entities/sale-order.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
