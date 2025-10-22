import WebTorrent from 'webtorrent';

// Reuse a single client instance
const client = new WebTorrent();

function seedFile(filePath) {
    return new Promise((resolve, reject) => {
        try {
            const torrent = client.seed(filePath, (t) => {
                // Resolve when seeding is ready
                resolve({ magnetURI: t.magnetURI, infoHash: t.infoHash });
                console.log(t.magnetURI);
            });
            torrent.on('error', reject);
        } catch (err) {
            reject(err);
        }
    });
}
export { seedFile };