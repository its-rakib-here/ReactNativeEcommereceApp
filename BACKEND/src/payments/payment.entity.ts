// payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
// Assuming you have Order and User entities defined elsewhere
import { Order } from '../orders/orders.entity';
import { User } from '../users/users.entity';

// Define the TypeScript ENUMs corresponding to the database ENUMs
export enum PaymentMethod {
  COD = 'Cash on Delivery',
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
  BKash = 'bKash',
  Nagad = 'Nagad',
  Rocket = 'Rocket',
  PayPal = 'PayPal',
  Stripe = 'Stripe',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

@Entity('payments')
@Unique(['transaction_id']) // Enforces the UNIQUE constraint on transaction_id
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  // Foreign Key to Order
  @Column({ name: 'order_id' })
  order_id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // Foreign Key to User
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
  })
  payment_method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  payment_status: PaymentStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  transaction_id: string; // Nullable in TypeORM to handle potential NULL if needed, but unique

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  payment_date: Date;
}