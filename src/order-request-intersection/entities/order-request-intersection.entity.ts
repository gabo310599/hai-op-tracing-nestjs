/* eslint-disable prettier/prettier */
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('order-request-intersection')
export class OrderRequestIntersection{

    constructor(order: ProductionOrder, request: RequestNote){
        this.order = order;
        this.request = request;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => ProductionOrder)
    @JoinColumn()
    order: ProductionOrder;

    @OneToOne(() => RequestNote)
    @JoinColumn()
    request: RequestNote;
    
}