import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Payment } from '../payments/payment.entity';

export enum UserType {
  CUSTOMER = 'Customer',
  SELLER = 'Seller',
}

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  // select: false prevents password hash from being retrieved by default
  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.CUSTOMER,
  })
  user_type: UserType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
