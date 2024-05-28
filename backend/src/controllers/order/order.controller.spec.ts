import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreatePurchaseOrderDto } from '../../dto/order/create-purchase-order.dto';
import { CreateSaleOrderDto } from '../../dto/order/create-sale-order.dto';
import { UpdatePurchaseOrderDto } from '../../dto/order/update-purchase-order.dto';
import { UpdateSaleOrderDto } from '../../dto/order/update-sale-order.dto';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../entities/order.entity';
import { UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderDetail } from '../../entities/order-detail.entity';
import { CreateOrderDetailDto } from '../../dto/order/create-order-detail.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        },
        {
          provide: getRepositoryToken(OrderDetail),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a purchase order', async () => {
    const dto = new CreatePurchaseOrderDto();
    const order = new Order();
    jest.spyOn(service, 'createPurchaseOrder').mockResolvedValueOnce(order);
    expect(await controller.createPurchaseOrder(dto)).toBe(order);
    expect(service.createPurchaseOrder).toHaveBeenCalledWith(dto);
  });

  it('should create a sale order', async () => {
    const dto = new CreateSaleOrderDto();
    const order = new Order();
    jest.spyOn(service, 'createSaleOrder').mockResolvedValueOnce(order);
    expect(await controller.createSaleOrder(dto)).toBe(order);
    expect(service.createSaleOrder).toHaveBeenCalledWith(dto);
  });

  it('should create a detail', async () => {
    const orderId = '1';
    const dto = new CreateOrderDetailDto();
    const orderDetail = new OrderDetail();
    jest.spyOn(service, 'createDetail').mockResolvedValueOnce(orderDetail);
    expect(await controller.createDetail(orderId, dto)).toBe(orderDetail);
    expect(service.createDetail).toHaveBeenCalledWith(+orderId, dto);
  });

  it('should find all purchase orders', async () => {
    const orders = [new Order(), new Order()];
    jest.spyOn(service, 'findAllPurchaseOrder').mockResolvedValueOnce(orders);
    expect(await controller.findAllPurchaseOrder()).toBe(orders);
    expect(service.findAllPurchaseOrder).toHaveBeenCalled();
  });

  it('should find one purchase order', async () => {
    const order = new Order();
    jest.spyOn(service, 'findOnePurchaseOrder').mockResolvedValueOnce(order);
    expect(await controller.findOnePurchaseOrder('1')).toBe(order);
    expect(service.findOnePurchaseOrder).toHaveBeenCalledWith(1);
  });

  it('should update a purchase order', async () => {
    const dto = new UpdatePurchaseOrderDto();
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'updatePurchaseOrder').mockResolvedValueOnce(updateResult);
    expect(await controller.updatePurchaseOrder('1', dto)).toBe(updateResult);
    expect(service.updatePurchaseOrder).toHaveBeenCalledWith(1, dto);
  });

  it('should nullify a purchase order', async () => {
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'nullifyPurchaseOrder').mockResolvedValueOnce(updateResult);
    expect(await controller.nullifyPurchaseOrder('1')).toBe(updateResult);
    expect(service.nullifyPurchaseOrder).toHaveBeenCalledWith(1);
  });

  it('should find all sale orders', async () => {
    const orders = [new Order(), new Order()];
    jest.spyOn(service, 'findAllSaleOrder').mockResolvedValueOnce(orders);
    expect(await controller.findAllSaleOrder()).toBe(orders);
    expect(service.findAllSaleOrder).toHaveBeenCalled();
  });

  it('should find one sale order', async () => {
    const order = new Order();
    jest.spyOn(service, 'findOneSaleOrder').mockResolvedValueOnce(order);
    expect(await controller.findOneSaleOrder('1')).toBe(order);
    expect(service.findOneSaleOrder).toHaveBeenCalledWith(1);
  });

  it('should update a sale order', async () => {
    const dto = new UpdateSaleOrderDto();
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'updateSaleOrder').mockResolvedValueOnce(updateResult);
    expect(await controller.updateSaleOrder('1', dto)).toBe(updateResult);
    expect(service.updateSaleOrder).toHaveBeenCalledWith(1, dto);
  });

  it('should nullify a sale order', async () => {
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'nullifySaleOrder').mockResolvedValueOnce(updateResult);
    expect(await controller.nullifySaleOrder('1')).toBe(updateResult);
    expect(service.nullifySaleOrder).toHaveBeenCalledWith(1);
  });

  it('should remove a detail', async () => {
    const id = '1';
    const orderDetail = { affected: 1, raw: [] };
    jest.spyOn(service, 'removeDetail').mockResolvedValueOnce(orderDetail);
    expect(await controller.removeDetail(id)).toBe(orderDetail);
    expect(service.removeDetail).toHaveBeenCalledWith(1);
  });
});