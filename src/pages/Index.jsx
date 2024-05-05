import React, { useState } from 'react';
import { Container, VStack, Text, Input, Button, Box } from '@chakra-ui/react';

const dictionary = ["adventure", "castle", "dragon", "wizard", "forest", "magic", "princess", "quest", "treasure", "knight"];

const Index = () => {
  const [story, setStory] = useState([]);
  const [inputWord, setInputWord] = useState('');

  const addWordToStory = (word) => {
    const newStory = [...story, word];
    setStory(newStory);
    setTimeout(() => {
      const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
      setStory([...newStory, randomWord]);
    }, 1000);
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
        <Input placeholder="Add your word..." value={inputWord} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={handleSubmit}>Add Word</Button>
      </VStack>
    </Container>
  );
};

export default Index;