import React, { useState } from "react";
import { VStack, Input, IconButton, HStack, Box, Heading, Text, StackDivider, useColorModeValue, Spacer, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/color-mode";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const addTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Box p={4} bg={useColorModeValue("gray.100", "gray.700")}>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading mb={6}>Todo App</Heading>
          <IconButton aria-label="Toggle dark mode" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} isRound={true} />
        </HStack>
        <HStack>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="What needs to be done?" onKeyPress={handleKeyPress} />
          <IconButton aria-label="Add todo" icon={<FaPlus />} onClick={addTodo} isRound={true} />
        </HStack>
        <VStack divider={<StackDivider />} borderColor="gray.400" borderWidth="2px" p={4} borderRadius="md" w="100%" maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }} alignItems="stretch">
          {todos.map((todo) => (
            <HStack key={todo.id}>
              <Text>{todo.content}</Text>
              <Spacer />
              <IconButton aria-label={`Delete todo ${todo.id}`} icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} variant="ghost" />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;
