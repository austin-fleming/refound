// import * as web3 from '@solana/web3.js';
const web3 = require('@solana/web3.js');
const {
  Connection,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

export const sendSol = async (data: any) => {
  const { connection, solAmount, toPublicKey, fromWallet: _ } = data;
  const fromWallet = Keypair.generate();
  const toPubkey = new web3.PublicKey(toPublicKey);

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

  await sendAndConfirmTransaction(connection, transferTransaction, [fromWallet]).then(() => {
    alert('Success! You have successfully supported Jane Doe!');
  });
};
