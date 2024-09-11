import 'websocket-polyfill';
import { getBitcoinPrice } from './services/yadio';
import { makeEvent } from './utils/nostrEvent';
import { ndkClient } from './services/ndk';

const start = async () => {
    try {
        // NDK
        await ndkClient.init();

        const ndk = ndkClient.getInstance();

        // Make Event
        const price = await getBitcoinPrice('usd');

        const event = await makeEvent('btc:price', price.toString(), ndk);

        // Publish Event
        await event.publish();
    } catch (error) {
        console.error('Error to publish event', error);
    }
};

start();
