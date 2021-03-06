import { ContractWrappers } from '@0x/contract-wrappers';
import { Web3ProviderEngine } from '@0x/subproviders';
import { Order, ZeroExTransaction } from '@0x/types';
import { BigNumber } from '@0x/utils';
import * as WebSocket from 'websocket';

export class WebSocketConnection extends WebSocket.connection {
    isAlive: boolean = true;
}

export enum ServerMode {
    HttpPort = "HttpPort",
    UnixSocket = "UnixSocket"
}

export interface Configs {
    SERVER_MODE: ServerMode;
    HTTP_PORT: number;
    SOCKET_FILE: string;
    NETWORK_ID_TO_SETTINGS: NetworkIdToNetworkSpecificSettings;
    WEBSOCKET_PING_INTERVAL_MS: number;
    SELECTIVE_DELAY_MS: number;
    EXPIRATION_DURATION_SECONDS: number;
    RESERVED_FILL_SLOTS: boolean;
}

export interface RequestTransactionResponse {
    signatures: string[];
    expirationTimeSeconds: number;
}

export interface CoordinatorApproval {
    txOrigin: string;
    transactionHash: string;
    transactionSignature: string;
    approvalExpirationTimeSeconds: number;
}

export interface Response {
    status: number;
    body?: any;
}

export enum EventTypes {
    FillRequestAccepted = 'FILL_REQUEST_ACCEPTED',
    FillRequestReceived = 'FILL_REQUEST_RECEIVED',
    CancelRequestAccepted = 'CANCEL_REQUEST_ACCEPTED',
}

export interface FillRequestReceivedEvent {
    type: EventTypes;
    data: {
        transactionHash: string;
    };
}

export interface FillRequestAcceptedEvent {
    type: EventTypes;
    data: {
        functionName: string;
        orders: Order[];
        txOrigin: string;
        signedTransaction: ZeroExTransaction;
        approvalSignatures: string[];
        approvalExpirationTimeSeconds: number;
    };
}

export interface CancelRequestAccepted {
    type: EventTypes;
    data: {
        orders: Order[];
        transaction: ZeroExTransaction;
    };
}

export interface OrderHashToFillAmount {
    [orderHash: string]: BigNumber;
}

export type BroadcastMessage = FillRequestReceivedEvent | FillRequestAcceptedEvent | CancelRequestAccepted;

export type BroadcastCallback = (message: BroadcastMessage, networkId: number) => void;

export interface OutstandingFillSignatures {
    approvalSignatures: string[];
    expirationTimeSeconds: number;
    orderHash: string;
    takerAssetFillAmount: BigNumber;
}

export interface FeeRecipient {
    ADDRESS: string;
    PRIVATE_KEY: string;
}

export interface NetworkSpecificSettings {
    FEE_RECIPIENTS: FeeRecipient[];
    RPC_URL: string;
}

export interface NetworkIdToNetworkSpecificSettings {
    [networkId: number]: NetworkSpecificSettings;
}

export interface NetworkIdToProvider {
    [networkId: number]: Web3ProviderEngine;
}

export interface NetworkIdToContractWrappers {
    [networkId: number]: ContractWrappers;
}

export interface NetworkIdToConnectionStore {
    [networkId: number]: Set<WebSocketConnection>;
}
