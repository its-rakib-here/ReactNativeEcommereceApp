import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const newPayment = this.paymentsRepository.create(createPaymentDto);
      return await this.paymentsRepository.save(newPayment);
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new InternalServerErrorException('Could not create payment due to a server error.');
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { payment_id: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }

    return payment;
  }

  async findByCustomer(userId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { user_id: userId },
      order: { payment_date: 'DESC' },
    });
  }
}
