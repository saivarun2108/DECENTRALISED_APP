import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Posts = ({ contract }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    if (contract) {
      const postCount = await contract.methods.postCount().call();
      const allPosts = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await contract.methods.posts(i).call();
        allPosts.push(post);
      }
      setPosts(allPosts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component is mounted
  }, [contract]);

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Posts
      </Typography>
      <Button variant="contained" onClick={fetchPosts} sx={{ marginBottom: 2 }}>
        Refresh Posts
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography>Content: {post.content}</Typography>
                  <Typography variant="caption">Author: {post.author}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
