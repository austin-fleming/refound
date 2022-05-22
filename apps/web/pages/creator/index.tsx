import { ContentSection } from '@components/common/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchCreator } from '@modules/creator/fetchCreator';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import {useState, useEffect} from "react";

//const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      name: "Coinbase",
      description: "Connect to Coinbase Wallet"
    },
    options:{
      appName:"Refound",
      networkUrl: `https://matic-testnet-archive-rpc.bwarelabs.com`,
      chainId: 80001//main:137
    },
    package: null
  }
};

var provider: any;
var library: any;
var account: any;

const CreatorPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: creator, error } = useSwr(id, fetchCreator);

  useEffect(() => {
    
    if (window) {
      if(!provider){
        connectWallet();
      }
   }
   
  });

  const connectWallet = async () => {
    console.log('connect walet');
    try {
      const web3Modal = new Web3Modal({
        network: "devnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
      
      provider = await web3Modal.connect();
      if(provider){
        console.log('provider');
        console.log(provider);
        library = new ethers.providers.Web3Provider(provider);
      }

      if(library){
        console.log('library');
        console.log(library);
      }

      const accounts = await library.listAccounts();
      if (accounts){ 
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

  const donateClicked = async() => {
    var donationAmt = document.getElementById("donationAmt") as HTMLInputElement | null;
   
    if(donationAmt){
      if(provider){
        const tx = {
          from: account,
          to: creator?.id,
          value: ethers.utils.parseEther(donationAmt.value),
          gasLimit: ethers.utils.hexlify(10000),
          gasPrice: ethers.utils.hexlify(parseInt(await library.getGasPrice())),
        }
  
        var signer = library.getSigner();
        signer.sendTransaction(tx).then((transaction: any) => {
          console.dir(transaction);
          alert("Send finished!");
        })
      }
    }

  }

  return creator ? (
    <>
      <ContentSection className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 items-baseline'>
        <h1 className='text-8xl font-bold'>{'creator.name'}</h1>
        <div className='flex flex-col gap-8'>
          <p>{'creator.description'}</p>
          <div><input type="number" placeholder="$MATIC" id="donationAmt"></input>
          <button type='button' onClick={donateClicked}>Donate</button></div>
        </div>
      </ContentSection>

      <ContentSection>
        <div>gallery</div>
      </ContentSection>
    </>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default CreatorPage;
