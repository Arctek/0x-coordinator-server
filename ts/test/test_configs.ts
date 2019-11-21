import { FEE_RECIPIENT_ADDRESS_ONE, FEE_RECIPIENT_ADDRESS_TWO } from './constants';

import { ServerMode } from '../src/types';

export const configs = {
     // Server mode to run in, either http with port or unix domain socket
    SERVER_MODE: ServerMode.HttpPort,
    // Network port to listen on
    HTTP_PORT: 3000,
    // Socket file location for ServerMode.UnixSocket mode
    SOCKET_FILE: "",
    // The fee recipient details used by the coordinator's relayer for a particular network
    CHAIN_ID_TO_SETTINGS: {
        1337: {
            FEE_RECIPIENTS: [
                {
                    ADDRESS: FEE_RECIPIENT_ADDRESS_ONE,
                    PRIVATE_KEY: 'ff12e391b79415e941a94de3bf3a9aee577aed0731e297d5cfa0b8a1e02fa1d0',
                },
                {
                    ADDRESS: FEE_RECIPIENT_ADDRESS_TWO,
                    PRIVATE_KEY: '752dd9cf65e68cfaba7d60225cbdbc1f4729dd5e5507def72815ed0d8abc6249',
                },
            ],
            // Ethereum RPC url
            RPC_URL: 'https://mainnet.infura.io/v3/e2c067d9717e492091d1f1d7a2ec55aa',
        },
    },
    // Time interval to ping connected websocket clients, to keep the connection alive
    WEBSOCKET_PING_INTERVAL_MS: 30000,
    // Optional selective delay on fill requests
    SELECTIVE_DELAY_MS: 0,
    EXPIRATION_DURATION_SECONDS: 10, // 10 seconds
};
