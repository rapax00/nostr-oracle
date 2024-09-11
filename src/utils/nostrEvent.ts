import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';
import { UnsignedEvent } from 'nostr-tools';

async function makeEvent(
    dTagValue: string,
    content: string,
    ndk: NDK
): Promise<NDKEvent> {
    try {
        const pubkey = (await ndk.signer!.user()).pubkey;

        const unsignedEvent: UnsignedEvent = {
            kind: 30021,
            tags: [['d', dTagValue]],
            content,
            created_at: Math.round(Date.now() / 1000),
            pubkey,
        };

        const ndkEvent: NDKEvent = new NDKEvent(ndk, unsignedEvent);

        await ndkEvent.sign();

        return ndkEvent;
    } catch (error) {
        throw new Error('Error making event: ' + error);
    }
}

export { makeEvent };
