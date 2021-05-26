const blake2 = require("blake2");
const Base58 = require("base-58");

const accountTypes = {
  user: {
    hex: "0x10",
    decimal: 16,
  },
  organization: {
    hex: "0x20",
    decimal: 32,
  },
};

const getAccountTypeHex = (accountType) => {
  return accountTypes[accountType].hex;
};

const epochTime = new Date().valueOf();

const hashEmailBuffer = blake
  .createHash("blake2b", { digestLength: 32 })
  .update(Buffer.from("email address"))
  .end()
  .read()
  .slice(0, 4);

const preHashValue = Buffer.concat([
  getAccountTypeHex("user"),
  Buffer.from(epochTime),
  Buffer.from("email"),
]);

const hashFunction = () => {
  // hashing without key
  return blake2.createHash("blake2b", { digestLength: 32 });
};

const h = hashFunction().update(Buffer.from("test"));
h.end();
console.log(Base58.encode(h.read()));
