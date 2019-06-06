import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'taker_blacklist' })
export class TakerBlacklistEntity {
    @PrimaryColumn()
    public address!: string;
}
