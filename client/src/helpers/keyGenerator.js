import * as forge from 'node-forge';

const generateKey = () => {
    const {rsa} = forge.pki;
    const key = rsa.generateKeyPair();

    return {
        publicKey: forge.pki.publicKeyToPem(key.publicKey),
        privateKey: key.privateKey,
    };
};

export default generateKey;