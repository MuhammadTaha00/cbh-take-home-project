const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.getDeterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY
  let partitionKey;

  if (event.partitionKey) {
    partitionKey = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  }

  return partitionKey
};
