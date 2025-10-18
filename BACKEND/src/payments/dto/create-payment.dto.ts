// create-payment.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, PaymentStatus } from '../payment.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus = PaymentStatus.Pending;

  @IsOptional()
  @IsString()
  transaction_id?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  amount: number;
}