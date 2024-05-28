import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { Repository } from 'typeorm';
import { OrderType } from '../../entities/enumerators/order-type';
import { Supplier } from '../../entities/supplier.entity';
import { PurchaseOrder } from '../../entities/purchase-order.entity';
import { SaleOrder } from '../../entities/sale-order.entity';
import { Customer } from '../../entities/customer.entity';
import { CreateOrderDetailDto } from '../../dto/order/create-order-detail.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderDetailDto } from '../../dto/order/update-order-detail.dto';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<Order>;
  let orderDetailRepo: Repository<OrderDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useClass: Repository },
        { provide: getRepositoryToken(OrderDetail), useClass: Repository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderDetailRepo = module.get<Repository<OrderDetail>>(getRepositoryToken(OrderDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a purchase order', async () => {
    const supplier = new Supplier();
    supplier.company_name = 'Supplier1';
    const createPurchaseOrderDto = {
      supplierId: 1,
      total: 100,
      orderDetails: [
        { productId: 1, quantity: 1, price: 50, cost: 50 },
        { productId: 2, quantity: 1, price: 50, cost: 50 }
      ]
    };
    const purchaseOrder = new PurchaseOrder();
    purchaseOrder.supplier = supplier;
    purchaseOrder.date = new Date();
    purchaseOrder.orderType = OrderType.PURCHASE;

    jest.spyOn(orderRepo, 'save').mockResolvedValue(purchaseOrder);
    jest.spyOn(orderRepo, 'create').mockReturnValue(purchaseOrder);

    expect(await service.createPurchaseOrder(createPurchaseOrderDto)).toEqual(purchaseOrder);
  });

  it('should create a sale order', async () => {
    const customer = new Customer();
    const createSaleOrderDto = {
      customerId: 1,
      total: 100,
      orderDetails: [
        { productId: 1, quantity: 1, price: 50, cost: 50 },
        { productId: 2, quantity: 1, price: 50, cost: 50 }
      ]
    };
    const saleOrder = new SaleOrder();
    saleOrder.customer = customer;
    saleOrder.date = new Date();
    saleOrder.orderType = OrderType.SALE;

    jest.spyOn(orderRepo, 'save').mockResolvedValue(saleOrder);
    jest.spyOn(orderRepo, 'create').mockReturnValue(saleOrder);

    expect(await service.createSaleOrder(createSaleOrderDto)).toEqual(saleOrder);

  });

  it('should create a detail', async () => {
    const order = new Order();
    order.id = 1;
    const createOrderDetailDto = {
      productId: 1,
      quantity: 1,
      price: 50,
      cost: 50,
      orderId: order.id
    };
    const orderDetail = new OrderDetail();
    orderDetail.order = order;
    jest.spyOn(orderRepo, 'findOneBy').mockResolvedValue(order);
    jest.spyOn(orderDetailRepo, 'create').mockReturnValue(orderDetail);
    jest.spyOn(orderDetailRepo, 'save').mockResolvedValue(orderDetail);

    expect(await service.createDetail(1, createOrderDetailDto)).toEqual(orderDetail);
  });

  it('should find all purchase orders', async () => {
    const purchaseOrders = [{ id: 1, total: 100, orderType: OrderType.PURCHASE }];
    jest.spyOn(orderRepo, 'find').mockResolvedValue(purchaseOrders as any);

    expect(await service.findAllPurchaseOrder()).toEqual(purchaseOrders);
  });

  it('should find all sale orders', async () => {
    const saleOrders = [{ id: 1, total: 100, orderType: OrderType.SALE }];
    jest.spyOn(orderRepo, 'find').mockResolvedValue(saleOrders as any);

    expect(await service.findAllSaleOrder()).toEqual(saleOrders);
  });

  it('should find one purchase order', async () => {
    const purchaseOrder = { id: 1, total: 100, orderType: OrderType.PURCHASE };
    jest.spyOn(orderRepo, 'findOne').mockResolvedValue(purchaseOrder as any);

    expect(await service.findOnePurchaseOrder(1)).toEqual(purchaseOrder);
  });

  it('should find one sale order', async () => {
    const saleOrder = { id: 1, total: 100, orderType: OrderType.SALE };
    jest.spyOn(orderRepo, 'findOne').mockResolvedValue(saleOrder as any);

    expect(await service.findOneSaleOrder(1)).toEqual(saleOrder);
  });

  it('should update sale order', async () => {
    const updateSaleOrderDto = { total: 100 };
    jest.spyOn(orderRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.updateSaleOrder(1, updateSaleOrderDto)).toEqual({ affected: 1 });
  });

  it('should update purchase order', async () => {
    const updatePurchaseOrderDto = { total: 100 };
    jest.spyOn(orderRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.updatePurchaseOrder(1, updatePurchaseOrderDto)).toEqual({ affected: 1 });
  });

  it('should nullified purchase order', async () => {
    const purchaseOrder = new PurchaseOrder();
    purchaseOrder.id = 1;
    jest.spyOn(orderRepo, 'findOne').mockResolvedValue(purchaseOrder);
    jest.spyOn(orderRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.nullifyPurchaseOrder(1)).toEqual({ affected: 1 });
  });

  it('should nullified sale order', async () => {
    const saleOrder = new SaleOrder();
    saleOrder.id = 1;
    jest.spyOn(orderRepo, 'findOne').mockResolvedValue(saleOrder);
    jest.spyOn(orderRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.nullifySaleOrder(1)).toEqual({ affected: 1 });
  });

  it('should remove detail', async () => {
    jest.spyOn(orderDetailRepo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.removeDetail(1)).toEqual({ affected: 1 });
  });

  it('should throw an exception if order not found', async () => {
    const orderId = 1;
    const dto = new CreateOrderDetailDto();
    jest.spyOn(orderRepo, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.createDetail(orderId, dto)).rejects.toThrow(
      new NotFoundException(`Order with ID ${orderId} not found`)
    );
  });

  it('should update detail order', async () => {
    const id = 1;
    const updateOrderDetailDto = new UpdateOrderDetailDto();
    updateOrderDetailDto.quantity = 2;
    jest.spyOn(orderDetailRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    const result = await service.updateDetailOrder(id, updateOrderDetailDto);

    expect(result).toEqual({ affected: 1 });
    expect(orderDetailRepo.update).toHaveBeenCalledWith(id, updateOrderDetailDto);
  });
});