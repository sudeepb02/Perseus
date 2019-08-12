const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

const htmlfile = hash =>
  `<!DOCTYPE HTML>< html lang = "en-US" ><head> <meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=https://arweave.net/${hash}"><script type="text/javascript">window.location.href = "https://arweave.net/${hash}"</script><title>Page Redirection</title></head><body>If you are not redirected automatically, follow this <a href='https://arweave.net/${hash}'>Click if not automatically redirected</a>.</body></html>`;

export const addToIpfs = async hash => {
  const file = htmlfile(hash);
  const buffer = Buffer.from(file, "utf8");
  await ipfs.add(buffer, (err, ipfsHash) => {
    console.log("err", err);
    console.log("ipfshash", ipfsHash);
  });
};
