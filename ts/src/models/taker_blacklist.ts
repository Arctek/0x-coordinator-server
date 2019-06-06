import * as _ from 'lodash';

import { getDBConnection } from '../db_connection';
import { TakerBlacklistEntity } from '../entities/taker_blacklist';

export const takerBlacklistModel = {
    async createAsync(address: string): Promise<TakerBlacklistEntity> {
        let takerBlacklistEntity = new TakerBlacklistEntity();
        takerBlacklistEntity.address = address;

        const connection = getDBConnection();
        takerBlacklistEntity = await connection.manager.save(TakerBlacklistEntity, takerBlacklistEntity);
        return takerBlacklistEntity;
    },
    async findAsync(address: string): Promise<TakerBlacklistEntity | undefined> {
        const connection = getDBConnection();
        const takerIfExists = await connection.manager.findOne(TakerBlacklistEntity, address);
        return takerIfExists;
    },
};
