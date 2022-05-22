import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Layout } from '@components/common/layout';
import Web3 from 'web3';
// import { BlockHeader, Block } from 'web3-eth'; // ex. package types
// import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from 'web3modal';
// import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet',
    },
    options: {
      appName: 'Coinbase',
      networkUrl: `https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/02c301807629853cb96d4812097a523b`,
      chainId: 137,
    },
    package: null,
  },
};

// const [provider, setProvider] = useState<any>();
// const [instance, setInstance] = useState<any>();
// const [signer, setSigner] = useState<any>();
var provider: any;
var library: any;
var account: any;
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window) {
      if (!provider) {
        connectWallet();
      }
      //console.log(provider.listAccounts());
      web3.eth.getAccounts().then(console.log);
      console.log(provider);
    }
  });

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

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
