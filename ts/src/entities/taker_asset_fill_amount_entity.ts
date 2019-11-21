import { BigNumber } from '@0x/utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TransactionEntity } from '../entities/transaction_entity';
import { bigNumberTransformer } from '../transformers/big_number';

@Entity()
export class TakerAssetFillAmountEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'numeric', transformer: bigNumberTransformer, precision: 30, scale: 0, default: 0 })
    public takerAssetFillAmount!: BigNumber;

    @Column()
    public orderHash!: string;

    @ManyToOne(
        _type => TransactionEntity,
        transaction => transaction.takerAssetFillAmounts,
    )
    public transaction!: TransactionEntity;
}
