const { getDeterministicPartitionKey } = require("./dpk");

describe("getDeterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = getDeterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("It returns key when given input", () => {
    const trivialKey = getDeterministicPartitionKey({ name: "alex" });
    expect(trivialKey).toBe("1e4ed53da85aaaf7fa81a5c5ca7a0834f5817261133920f25d3e19c8f2512a9e535e3ccfbd1e56d16612682bb44372640e7943fdd22eab811ecb3b6478752dc3");
  });

  it("It returns the same key when input already has a partition key", () => {
    const trivialKey = getDeterministicPartitionKey({ partitionKey: "1e4ed53da85aaaf7fa81a5c5ca7a0834f5817261133920f25d3e19c8f2512a9e535e3ccfbd1e56d16612682bb44372640e7943fdd22eab811ecb3b6478752dc3" });
    expect(trivialKey).toBe("1e4ed53da85aaaf7fa81a5c5ca7a0834f5817261133920f25d3e19c8f2512a9e535e3ccfbd1e56d16612682bb44372640e7943fdd22eab811ecb3b6478752dc3");
  });

  it("It creates new partition key if existing partition key exceeds max partition key length", () => {
    const trivialKey = getDeterministicPartitionKey({ partitionKey: "1e4ed53da85aaaf7fa81a5c5ca7a0834f5817261133920f25d3e19c8f2512a9e535e3ccfbd1e56d16612682bb44372640e7943fdd22eab811ecb3b6478752dc31e4ed53da85aaaf7fa81a5c5ca7a0834f5817261133920f25d3e19c8f2512a9e535e3ccfbd1e56d16612682bb44372640e7943fdd22eab811ecb3b6478752dc34" });
    expect(trivialKey).toBe("a5a2809be595aebb722dc7e838b7063331c6c1049b2e57740a75cc29ff89af4a6b49009ba61e9f33e2669b7c7867a110e2cdf5d1184e4918000fd9e07df391fe");
  });
});
