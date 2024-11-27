import React, { useState } from 'react';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Web3 from 'web3';
import ContractABI from './contractABI.json';

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const contractAddress = '0x8B37e9AbFc9953e8357f971029cA11182033c721'; // Replace with deployed address
      const contractInstance = new web3.eth.Contract(ContractABI, contractAddress);
      setContract(contractInstance);
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Decentralized Social Media
          </Typography>
          {!account ? (
            <Button color="inherit" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Typography variant="subtitle1">Wallet: {account}</Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        {account ? (
          <>
            <Profile account={account} contract={contract} />
            <CreatePost account={account} contract={contract} />
            <Posts contract={contract} />
          </>
        ) : (
          <Typography variant="h6" align="center">
            Please connect your wallet to start using the platform.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default App;
