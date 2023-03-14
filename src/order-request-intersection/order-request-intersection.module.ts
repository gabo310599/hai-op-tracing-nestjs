/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { OrderRequestIntersection } from './entities/order-request-intersection.entity';
import { OrderRequestIntersectionController } from './order-request-intersection.controller';
import { OrderRequestIntersectionService } from './order-request-intersection.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRequestIntersection, ProductionOrder, RequestNote])
    ],
    controllers: [OrderRequestIntersectionController],
    providers: [OrderRequestIntersectionService],
})
export class OrderRequestIntersectionModule {}
