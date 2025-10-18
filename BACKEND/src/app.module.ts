import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/products.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/payment.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/orders.entity';

@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root', 
      database: 'ecommerce_db', 
      entities: [User, Order, Product, Payment], 
      synchronize: false, // Only for development; set to false in production
    }),
    UsersModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
