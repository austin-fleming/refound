// import * as web3 from '@solana/web3.js';
const web3 = require('@solana/web3.js');
const {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');
const FIGMENT_DEVNET_ENDPOINT =
  'https://solana--devnet.datahub.figment.io/apikey/3c8ef209f3df849a43febff9a14d3a44';

export const sendSol = async (data) => {
  const { solAmount, toPublicKey, fromWallet } = data;
  const toPubkey = new web3.PublicKey(toPublicKey);

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  const airdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    LAMPORTS_PER_SOL * 2,
  );

  await connection.confirmTransaction(airdropSignature);

  const lamports = LAMPORTS_PER_SOL * solAmount;

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toPubkey,
      lamports,
    }),
  );
  console.log(transferTransaction);

  await sendAndConfirmTransaction(connection, transferTransaction, [fromWallet]);
};

// sendSol({});
// import {
//   Connection,
//   Keypair,
//   SystemProgram,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   sendAndConfirmTransaction,
// } from "@solana/web3.js";

// (async () => {
//   const fromKeypair = Keypair.generate();
//   const toKeypair = Keypair.generate();

//   const connection = new Connection(
//     "https://api.devnet.solana.com",
//     "confirmed"
//   );

//   const airdropSignature = await connection.requestAirdrop(
//     fromKeypair.publicKey,
//     LAMPORTS_PER_SOL
//   );

//   await connection.confirmTransaction(airdropSignature);

//   const lamportsToSend = 1_000_000;

//   const transferTransaction = new Transaction().add(
//     SystemProgram.transfer({
//       fromPubkey: fromKeypair.publicKey,
//       toPubkey: toKeypair.publicKey,
//       lamports: lamportsToSend,
//     })
//   );

//   await sendAndConfirmTransaction(connection, transferTransaction, [
//     fromKeypair,
//   ]);
// })();
