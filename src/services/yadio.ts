import axios from 'axios';

const urlBaseYadio = 'https://api.yadio.io/exrates/';

async function getBitcoinPrice(coin?: string): Promise<number> {
    switch (coin) {
        case 'ars':
            return await axios.get(urlBaseYadio + 'ars').then((res) => {
                return res.data.BTC;
            });
        case 'usd':
        default:
            return await axios.get(urlBaseYadio + 'usd').then((res) => {
                return res.data.BTC;
            });
    }
}

export { getBitcoinPrice };
