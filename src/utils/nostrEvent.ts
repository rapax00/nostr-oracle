import * as dotenv from 'dotenv';
import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';

dotenv.config();

type UnsignedEvent = {
    kind: number;
    tags: [string, string][];
    content: string;
    created_at: number;
    pubkey: string;
};

async function makeEvent(
    dTagValue: string,
    content: string,
    ndk: NDK
): Promise<NDKEvent> {
    try {
        const unsignedEvent: UnsignedEvent = {
            kind: 30021,
            tags: [['d', dTagValue]],
            content: content,
            created_at: Math.round(Date.now() / 1000),
            pubkey: process.env.NOSTR_PUBLIC_KEY!,
        };

        const ndkEvent: NDKEvent = new NDKEvent(ndk, unsignedEvent);

        await ndkEvent.sign();

        return ndkEvent;
    } catch (error) {
        throw new Error('Error making event: ' + error);
    }
}

export { makeEvent };
