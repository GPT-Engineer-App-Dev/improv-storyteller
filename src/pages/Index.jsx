import React, { useState, useEffect } from 'react';
import { Container, VStack, Text, Input, Button, Box } from '@chakra-ui/react';

const dictionary = ["adventure", "castle", "dragon", "wizard", "forest", "magic", "princess", "quest", "treasure", "knight"];

const Index = () => {
  const [story, setStory] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    console.warn('Please ensure your API key is kept secure and not exposed in client-side code in production environments.');
  }, []);

  const addWordToStory = async (word) => {
    const newStory = [...story, word];
    setStory(newStory);
    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            prompt: newStory.join(' ') + ' ',
            max_tokens: 5
          })
        });
        const data = await response.json();
        const randomWord = data.choices[0].text.trim();
        setStory([...newStory, randomWord]);
      } catch (error) {
        console.error('Failed to fetch from OpenAI:', error);
      }
    } else {
      const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
      setStory([...newStory, randomWord]);
    }
  };

  const handleInputChange = (event) => {
    setInputWord(event.target.value);
  };

  const handleSubmit = () => {
    addWordToStory(inputWord);
    setInputWord('');
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" mb={4}>Let's Build a Story Together!</Text>
        <Box p={4} w="100%" bg="gray.100" borderRadius="md">
          <Text fontSize="lg" mb={2}>Current Story:</Text>
          <Text>{story.join(' ')}</Text>
        </Box>
        <Input placeholder="Enter your OpenAI API key..." type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <Input placeholder="Add your word..." value={inputWord} onChange={handleInputChange} onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }} />
        <Button colorScheme="blue" onClick={handleSubmit}>Add Word</Button>
      </VStack>
    </Container>
  );
};

export default Index;