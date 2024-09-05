import NDK, { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { getBitcoinPrice } from './services/yadio';
import { makeEvent } from './utils/nostrEvent';

const start = async () => {
    try {
        const signer = new NDKPrivateKeySigner(process.env.NOSTR_PRIVATE_KEY!);

        const ndk = new NDK({
            explicitRelayUrls: [
                'wss://nos.lol',
                'wss://nostr-pub.wellorder.net',
                'wss://relay.damus.io',
                'wss://relay.hodl.ar',
            ],
            signer,
        });

        ndk.connect();

        console.log('ready'); // debug

        const price = await getBitcoinPrice('usd');

        const event = await makeEvent('btc:price', price.toString(), ndk);

        console.log('event: ', await event.toNostrEvent()); // debug
        console.log('relays', ndk!.explicitRelayUrls); // debug

        await event.publish();
    } catch (error) {
        console.error('Error to publish event', error);
    }
};

start();
