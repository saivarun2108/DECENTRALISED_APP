import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';

const CreatePost = ({ account, contract }) => {
  const [content, setContent] = useState('');

  const handlePost = async () => {
    if (content && contract) {
      await contract.methods.createPost(content).send({ from: account });
      setContent(''); // Clear input field after posting
      alert('Post created successfully!');
    }
  };

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <TextField
          label="What's on your mind?"
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handlePost}>
          Post
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
