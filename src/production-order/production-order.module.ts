/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ProductionOrder } from './entities/production-order.entity';
import { ProductionOrderController } from './production-order.controller';
import { ProductionOrderService } from './production-order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductionOrder])
    ],
    controllers: [ProductionOrderController],
    providers: [ProductionOrderService],
})
export class ProductionOrderModule {}
