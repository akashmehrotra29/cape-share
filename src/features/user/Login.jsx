import { Grid, Image } from "@chakra-ui/react";
import { Box, Center, Heading, VStack, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useMediaQuery } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login, logout } from "./userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setupAuthExceptionHandler } from "./user.utils";

export const Login = () => {
  const [formInputs, setFormInputs] = useState({
    email: null,
    password: null,
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await dispatch(login(formInputs));
      unwrapResult(result);
      setupAuthExceptionHandler(dispatch, logout, navigate, toast);
      toast({
        position: "bottom-right",
        title: "Successfully Logged In",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.response);
      toast({
        position: "bottom-right",
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleFormInput = (event) => {
    setFormInputs((formInput) => {
      formInput[event.target.name] = event.target.value;
      return { ...formInput };
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box w="100%" h="100vh">
          <Center alignItems="center" padding={4}>
            <Box
              boxShadow="2xl"
              minWidth={["90vw", "500"]}
              p={10}
              borderWidth="1px"
              borderRadius="lg"
              mt="30%"
            >
              <Box mb={5} textAlign="center">
                <Heading as="h2" size="lg">
                  Login
                </Heading>
              </Box>
              <form onSubmit={handleFormSubmit}>
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="md"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      values={formInputs.email}
                      onChange={handleFormInput}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      size="md"
                      name="password"
                      type="password"
                      placeholder="Password"
                      values={formInputs.password}
                      onChange={handleFormInput}
                    />
                  </FormControl>
                  <Button
                    width="full"
                    borderRadius="1.5rem"
                    bg="#0EA5E9"
                    color="white"
                    type="submit"
                  >
                    {(user.status === "idle" || user.status === "error") && (
                      <span>LogIn</span>
                    )}
                    {user.status === "loading" && <Spinner />}
                  </Button>
                </VStack>
              </form>
              <Text m={4} width="100%" textAlign="center">
                Don't have an account ?{" "}
                <Button
                  variant="link"
                  color="#0EA5E9"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>{" "}
              </Text>
            </Box>
          </Center>
        </Box>
        <Box w="100%" h="100vh" display={isMobile ? "none" : "block"}>
          <Image
            boxSize="100%"
            src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Segun Adebayo"
          />
        </Box>
      </Grid>
    </>
  );
};
