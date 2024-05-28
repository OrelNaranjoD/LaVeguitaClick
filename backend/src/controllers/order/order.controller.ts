import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDetailDto } from '../../dto/order/create-order-detail.dto';
import { CreatePurchaseOrderDto } from '../../dto/order/create-purchase-order.dto';
import { CreateSaleOrderDto } from '../../dto/order/create-sale-order.dto';
import { UpdatePurchaseOrderDto } from '../../dto/order/update-purchase-order.dto';
import { UpdateSaleOrderDto } from '../../dto/order/update-sale-order.dto';
import { OrderService } from '../../services/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('purchase')
  createPurchaseOrder(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.orderService.createPurchaseOrder(createPurchaseOrderDto);
  }

  @Post('sale')
  createSaleOrder(@Body() createSaleOrderDto: CreateSaleOrderDto) {
    return this.orderService.createSaleOrder(createSaleOrderDto);
  }

  @Post(':id/detail')
  createDetail(@Param('id') orderId: string, @Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderService.createDetail(+orderId, createOrderDetailDto);
  }

  @Get('purchase')
  findAllPurchaseOrder() {
    return this.orderService.findAllPurchaseOrder();
  }

  @Get('sale')
  findAllSaleOrder() {
    return this.orderService.findAllSaleOrder();
  }

  @Get('purchase/:id')
  findOnePurchaseOrder(@Param('id') id: string) {
    return this.orderService.findOnePurchaseOrder(+id);
  }

  @Get('sale/:id')
  findOneSaleOrder(@Param('id') id: string) {
    return this.orderService.findOneSaleOrder(+id);
  }

  @Patch('sale/:id')
  updateSaleOrder(@Param('id') id: string, @Body() updateSaleOrderDto: UpdateSaleOrderDto) {
    return this.orderService.updateSaleOrder(+id, updateSaleOrderDto);
  }

  @Patch('purchase/:id')
  updatePurchaseOrder(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.orderService.updatePurchaseOrder(+id, updatePurchaseOrderDto);
  }

  @Patch('purchase/:id/nullify')
  nullifyPurchaseOrder(@Param('id') id: string) {
    return this.orderService.nullifyPurchaseOrder(+id);
  }

  @Patch('sale/:id/nullify')
  nullifySaleOrder(@Param('id') id: string) {
    return this.orderService.nullifySaleOrder(+id);
  }

  @Delete('detail/:id')
  removeDetail(@Param('id') id: string) {
    return this.orderService.removeDetail(+id);
  }
}