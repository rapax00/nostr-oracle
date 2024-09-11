import NDK, { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { NDKClientInterface } from '../types/ndk';

const relaysUrls = [
    'wss://nostr-pub.wellorder.net',
    'wss://relay.damus.io',
    'wss://relay.hodl.ar',
];

class NDKClient implements NDKClientInterface {
    private _ndk!: NDK;

    async init(): Promise<void> {
        const signer = new NDKPrivateKeySigner(process.env.NOSTR_PRIVATE_KEY!);

        await signer.blockUntilReady();

        this._ndk = new NDK({
            devWriteRelayUrls: relaysUrls,
            signer,
        });
    }

    getInstance(): NDK {
        return this._ndk;
    }
}

export const ndkClient = new NDKClient();
