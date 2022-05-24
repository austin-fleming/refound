import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
const { Connection } = require('@solana/web3.js');
import { sendSol } from 'js/donate';
import { ContentSection } from '@components/common/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchArtworkByCreator } from '@modules/creator/fetchArtworkByCreator';
import { fetchCreator } from '@modules/creator/fetchCreator';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

//const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet',
    },
    options: {
      appName: 'Refound',
      networkUrl: `https://matic-testnet-archive-rpc.bwarelabs.com`,
      chainId: 80001, //main:137
    },
    package: null,
  },
};

var provider: any;
var library: any;
var account: any;

const CreatorPage: NextPage = () => {
  const [amount, setAmount] = useState(1);
  const [usesCBWallet, setUsesCBWallet] = useState(false);
  const router = useRouter();
  // const { connection } = useConnection();
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const { publicKey } = useWallet();
  const { id } = router.query;

  const { data: creator, error: creatorError } = useSwr(id, fetchCreator);
  const { data: artworks, error: artworkError } = useSwr(`${id} `, fetchArtworkByCreator);

  useEffect(() => {
    if (window) {
      if (!provider) {
        connectWallet();
      }
    }
  }, []);

  const connectWallet = async () => {
    console.log('connect walet');
    try {
      const web3Modal = new Web3Modal({
        network: 'devnet', // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      provider = await web3Modal.connect();
      if (provider) {
        console.log('provider');
        console.log(provider);
        library = new ethers.providers.Web3Provider(provider);
      }

      if (library) {
        console.log('library');
        console.log(library);
      }

      const accounts = await library.listAccounts();
      if (accounts) {
        account = accounts[0];
        console.log('accounts');
        console.log(accounts);
        console.log(account);
      }

      //var signer = provider.getSigner();
      //console.log(signer);
    } catch (error) {
      console.error(error);
    }
  };

  const donateClicked = async () => {
    var donationAmt = document.getElementById('donationAmt') as HTMLInputElement | null;

    if (donationAmt) {
      if (provider) {
        const tx = {
          from: account,
          to: creator?.id,
          value: ethers.utils.parseEther(donationAmt.value),
          gasLimit: ethers.utils.hexlify(10000),
          gasPrice: ethers.utils.hexlify(parseInt(await library.getGasPrice())),
        };

        var signer = library.getSigner();
        signer.sendTransaction(tx).then((transaction: any) => {
          console.dir(transaction);
          alert('Send finished!');
        });
      }
    }
  };

  const DonateSol = () => {
    if (publicKey) {
      return (
        <div className='flex items-center p-6 border-t border-solid rounded-b justify-evenly border-slate-200'>
          <div className='flex flex-col w-1/3'>
            Support with $SOL:
            <input
              type='number'
              className='w-full h-full text-2xl border-4 border-black md:text-5xl'
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span>Value in USD: ${amount * 50}</span>
          </div>
          <button
            onClick={() => {
              sendSol({
                connection,
                solAmount: amount,
                toPublicKey: '6qTus3tf7BCDXY2i6RMYQEAijzVJTGDGg6vg3jAGESB5',
                fromWallet: publicKey,
              });
            }}
            className='p-4 border-4 border-black md:p-8 rounded-xl'
            type='button'>
            Donate
          </button>
        </div>
      );
    } else {
      return (
        <div className=''>
          <WalletMultiButton className='w-full bg-black text-white font-bold px-[1.5em] py-[1em] leading-none rounded [background-color:black_!important]'>
            Use a Solana Wallet
          </WalletMultiButton>
        </div>
      );
    }
  };

  return creator ? (
    <>
      <ContentSection className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 items-baseline'>
        <h1 className='font-bold text-8xl'>{creator.name}</h1>
        <div className='flex flex-col gap-8'>
          <p>{creator.description}</p>
          <div className='flex flex-col gap-4'>
            <h2 className='text-lg font-bold'>Donate to this Journalist</h2>

            <div className='flex flex-col gap-2'>
              {usesCBWallet ? (
                <div className='w-full text-left bg-black text-white font-bold px-[1.5em] py-[1em] leading-none rounded flex flex-row gap-2'>
                  <input
                    className='bg-transparent border-white border-solid rounded-none border-b-1'
                    type='number'
                    placeholder='$MATIC'
                    id='donationAmt'></input>
                  <button type='button' onClick={donateClicked}>
                    Donate
                  </button>
                </div>
              ) : (
                <button
                  className='w-full text-left bg-black text-white font-bold px-[1.5em] py-[1em] leading-none rounded'
                  type='button'
                  onClick={() => setUsesCBWallet(true)}>
                  Use Coinbase Wallet
                </button>
              )}

              <DonateSol />
            </div>
          </div>
        </div>
      </ContentSection>

      {artworks && artworks.length > 0 && (
        <ContentSection className='grid grid-cols-1 gap-4 py-12 md:grid-cols-2 lg:grid-cols-3 gap-y-12'>
          {artworks.map((artwork) => (
            <ArtworkPreview key={artwork.id} {...artwork} />
          ))}
        </ContentSection>
      )}
    </>
  ) : (
    <ContentSection>
      <h2>Loading...</h2>
    </ContentSection>
  );
};

export default CreatorPage;
