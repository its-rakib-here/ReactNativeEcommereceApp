import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * POST /payments
   * Endpoint to create a new payment record.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  /**
   * GET /payments
   * Endpoint to retrieve all payment records.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  /**
   * GET /payments/:id
   * Endpoint to retrieve a single payment by its unique ID.
   * Uses ParseIntPipe to ensure the ID is a number.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  /**
   * GET /payments/customer/:userId
   * Endpoint to retrieve all payments made by a specific customer (user_id).
   * NOTE: The path is 'customer/:userId' to prevent conflict with the ':id' route above.
   */
  @Get('customer/:userId')
  @HttpCode(HttpStatus.OK)
  async findByCustomer(@Param('userId', ParseIntPipe) userId: number): Promise<Payment[]> {
    return this.paymentsService.findByCustomer(userId);
  }
}
