import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from '../../dto/order/create-purchase-order.dto';
import { CreateSaleOrderDto } from '../../dto/order/create-sale-order.dto';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from '../../entities/order-detail.entity';
import { OrderType } from '../../entities/enumerators/order-type';
import { CreateOrderDetailDto } from '../../dto/order/create-order-detail.dto';
import { UpdateSaleOrderDto } from '../../dto/order/update-sale-order.dto';
import { UpdatePurchaseOrderDto } from '../../dto/order/update-purchase-order.dto';
import { UpdateOrderDetailDto } from '../../dto/order/update-order-detail.dto';
import { PurchaseOrderStatusType, SaleOrderStatusType } from '../../entities/enumerators/order-status-type';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) { }

  createPurchaseOrder(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const order = this.orderRepository.create(createPurchaseOrderDto);
    order.date = new Date();
    order.orderType = OrderType.PURCHASE;
    return this.orderRepository.save(order);
  }

  createSaleOrder(createSaleOrderDto: CreateSaleOrderDto) {
    const order = this.orderRepository.create(createSaleOrderDto);
    order.date = new Date();
    order.orderType = OrderType.SALE;
    return this.orderRepository.save(order);
  }

  async createDetail(orderId: number, createOrderDetailDto: CreateOrderDetailDto) {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    orderDetail.order = order;
    return this.orderDetailRepository.save(orderDetail);
  }

  findAllPurchaseOrder() {
    return this.orderRepository.find({ where: { orderType: OrderType.PURCHASE } });
  }

  findAllSaleOrder() {
    return this.orderRepository.find({ where: { orderType: OrderType.SALE } });
  }

  findOnePurchaseOrder(id: number) {
    return this.orderRepository.findOne({ where: { id: id, orderType: OrderType.PURCHASE } });
  }

  findOneSaleOrder(id: number) {
    return this.orderRepository.findOne({ where: { id: id, orderType: OrderType.SALE } });
  }

  updateSaleOrder(id: number, updateSaleOrderDto: UpdateSaleOrderDto) {
    return this.orderRepository.update(id, updateSaleOrderDto);
  }

  updatePurchaseOrder(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.orderRepository.update(id, updatePurchaseOrderDto);
  }

  async updateDetailOrder(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailRepository.update(id, updateOrderDetailDto);
  }

  nullifyPurchaseOrder(id: number) {
    return this.orderRepository.update(id, { is_nullified: true });
  }

  nullifySaleOrder(id: number) {
    return this.orderRepository.update(id, { is_nullified: true });
  }

  removeDetail(id: number) {
    return this.orderDetailRepository.delete(id);
  }
}
