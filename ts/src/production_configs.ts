import * as _ from 'lodash';

import { ServerMode } from './types';

export const configs = {
    // Server mode to run in, either http with port or unix domain socket
    SERVER_MODE: process.env.COORDINATOR_SERVER_MODE === undefined ? ServerMode.HttpPort : process.env.COORDINATOR_SERVER_MODE as ServerMode,
    // Network port to listen on
    HTTP_PORT: process.env.COORDINATOR_HTTP_PORT === undefined ? 3000 : _.parseInt(process.env.COORDINATOR_HTTP_PORT),
    // Socket file location for ServerMode.UnixSocket mode
    SOCKET_FILE: process.env.COORDINATOR_SOCKET_FILE || "",
    // Ethereum RPC url
    NETWORK_ID_TO_SETTINGS: {
        1: {
            FEE_RECIPIENTS: [
                {
                    ADDRESS: process.env.MAINNET_FEE_RECIPIENT_ADDRESS_ONE || 'FILL_ME_IN',
                    PRIVATE_KEY: process.env.MAINNET_FEE_RECIPIENT_PRIVATE_KEY_ONE || 'FILL_ME_IN',
                },
            ],
            RPC_URL: process.env.MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/e2c067d9717e492091d1f1d7a2ec55aa',
        },
    },
    // Time interval to ping connected websocket clients, to keep the connection alive
    WEBSOCKET_PING_INTERVAL_MS:
        process.env.WEBSOCKET_PING_INTERVAL_MS === undefined ? 30000 : _.parseInt(process.env.WEBSOCKET_PING_INTERVAL_MS),
    // Optional selective delay on fill requests
    SELECTIVE_DELAY_MS:
        process.env.SELECTIVE_DELAY_MS === undefined ? 1000 : _.parseInt(process.env.SELECTIVE_DELAY_MS),
    EXPIRATION_DURATION_SECONDS:
        process.env.EXPIRATION_DURATION_SECONDS === undefined
            ? 60
            : _.parseInt(process.env.EXPIRATION_DURATION_SECONDS), // 1 minute
};
