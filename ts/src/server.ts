import { RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';
import '@babel/polyfill';
import * as _ from 'lodash';
import 'reflect-metadata';

import { getAppAsync } from './app';
import { assertConfigsAreValid } from './assertions';
import { configs } from './production_configs';
import { NetworkIdToProvider, NetworkSpecificSettings, ServerMode } from './types';
import { utils } from './utils';

import * as fs from 'fs';

(async () => {
    assertConfigsAreValid(configs);

    const networkIdToProvider: NetworkIdToProvider = {};
    _.each(configs.NETWORK_ID_TO_SETTINGS, (settings: NetworkSpecificSettings, networkIdStr: string) => {
        const providerEngine = new Web3ProviderEngine();
        const rpcSubprovider = new RPCSubprovider(settings.RPC_URL);
        providerEngine.addProvider(rpcSubprovider);
        // HACK(fabio): Starting the provider this way avoids it's unused block poller from running
        (providerEngine as any)._ready.go();
        const networkId = _.parseInt(networkIdStr);
        networkIdToProvider[networkId] = providerEngine;
    });

    const app = await getAppAsync(networkIdToProvider, configs);

    if (configs.SERVER_MODE === ServerMode.HttpPort) {
        app.listen(configs.HTTP_PORT, () => {
            utils.log(`Coordinator SERVER API (HTTP) listening on port ${configs.HTTP_PORT}!`);
        });
    }
    else if (configs.SERVER_MODE === ServerMode.UnixSocket) {
        try {
            fs.unlinkSync(configs.SOCKET_FILE);
        } catch (err) {}

        app.listen(configs.SOCKET_FILE, () => {
            utils.log(`Coordinator SERVER API (HTTP) listening on socket ${configs.SOCKET_FILE}!`);

            try {
                fs.chmodSync(configs.SOCKET_FILE, '755');
            } catch (err) {}
        });
    }
})().catch(utils.log);
