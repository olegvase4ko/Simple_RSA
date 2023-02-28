//Алгоритм создания ключей RSA
function CreateKey(p = 89n, q = 97n) {
    //Выбираем 2 простых числа p!==q
    let n = p * q;
    let EllerNum = Eller(p, q);
    let e = generateEncryptionExponent(EllerNum);
    let d = null;
    const Keys = {
        openKey: [],
        secretKey: []
    }
    function generateEncryptionExponent(phi) {
        let e = 47n;

        while (iNOD(e, phi) !== 1n) {
            e += 2n;
        }

        return e;
    }

    d = Euclid_gcd(e, EllerNum)[1];
    while (d < 1n) {
        d += EllerNum;
    }

    Keys.openKey.push(e, n);
    Keys.secretKey.push(d, n);

    console.log('n: ' + n);
    console.log('EllerNum: ' + EllerNum);
    console.log('e: ' + e);
    console.log('NOD(e,EllerNum): ' + iNOD(e, EllerNum));
    console.log('d: ' + d);
    console.log('openKey: ' + Keys.openKey);
    console.log('secretKey: ' + Keys.secretKey);

    return Keys;
}

function Eller(p, q) {
    return (p - 1n) * (q - 1n);
}

function iNOD(a, b) {
    while (a !== b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }
    return a;
}
function abs(x) {
    return x < 0n ? -x : x
}
function Euclid_gcd(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    if (a !== a || b !== b) {
        return [NaN, NaN, NaN];
    }

    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return [Infinity, Infinity, Infinity];
    }
    // Checks if a or b are decimals
    if ((a % 1n !== 0n) || (b % 1n !== 0n)) {
        return false;
    }
    let signX = (a < 0n) ? -1n : 1n,
        signY = (b < 0n) ? -1n : 1n,
        x = 0n,
        y = 1n,
        u = 1n,
        v = 0n,
        q, r, m, n;
    a = abs(a);
    b = abs(b);
    while (a !== 0n) {
        q = b / a;
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return [b, signX * x, signY * y];
}
//Конец создания ключей

function Encription(m) {
    const openKey = CreateKey().openKey;
    const e = openKey[0];
    const n = openKey[1];

    let c = m ** e % n;
    console.log('c: ' + c);
    return c;
}

function decoding() {
    const secretKey = CreateKey().secretKey;
    const d = secretKey[0];
    const n = secretKey[1];
    let c = Encription(64n);
    let m = c ** d % n;
    console.log('m : ' + m);

}
decoding();
//Encription();
//CreateKey();
