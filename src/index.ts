import 'websocket-polyfill';
import * as dotenv from 'dotenv';
import { getBitcoinPrice } from './services/yadio';
import { makeNostrEvent } from './utils/makeNostrEvent';
import { generateRelay } from './services/relay';

dotenv.config();

const start = async () => {
    try {
        // Key
        const privateKey = Uint8Array.from(
            Buffer.from(process.env.NOSTR_PRIVATE_KEY!, 'hex')
        );

        // Relay
        const relayUrl = 'wss://relay.damus.io';

        const relay = await generateRelay(relayUrl);

        // Make Event
        const price = await getBitcoinPrice('usd');

        const event = await makeNostrEvent(
            'btc:price',
            price.toString(),
            privateKey
        );

        // Publish Event
        console.log('Publishing event:', event);

        await relay.publish(event);
    } catch (error) {
        console.error('Error to publish event', error);
    }
};

setInterval(start, 5000);
