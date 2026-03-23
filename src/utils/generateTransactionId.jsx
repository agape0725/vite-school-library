// utils/generateTransactionId.js
export default function generateTransactionId() {
  const now = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const rand = Math.floor(Math.random() * 1000); // random 0–999
  return `TXN-${now}-${rand}`;
}
