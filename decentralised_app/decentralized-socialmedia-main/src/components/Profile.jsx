import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const Profile = ({ account, contract }) => {
  const [username, setUsername] = useState('');
  const [reputation, setReputation] = useState(0);

  const fetchProfile = async () => {
    if (contract) {
      const profile = await contract.methods.getProfile(account).call();
      setUsername(profile[0]);
      setReputation(profile[1]);
    }
  };

  const createProfile = async () => {
    const user = prompt('Enter your username');
    if (user && contract) {
      await contract.methods.createProfile(user).send({ from: account });
      fetchProfile();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [contract]);

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5">Profile</Typography>
        {username ? (
          <div>
            <Typography>Username: {username}</Typography>
            <Typography>Reputation: {reputation}</Typography>
          </div>
        ) : (
          <Button variant="contained" onClick={createProfile}>
            Create Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
