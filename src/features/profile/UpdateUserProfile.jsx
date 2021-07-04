import { Container, Box, Heading, VStack, Flex } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";

import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { uploadImage } from "../posts/posts.utils";
import { updateUserProfile } from "../user/userSlice";
import { IconButton, Spinner } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";

export const UpdateUserProfile = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const [formInputs, setFormInputs] = useState({
    photo: null,
    username: "",
    bio: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      setFormInputs(() => ({
        username: loggedInUser.username || "",
        bio: loggedInUser.bio || "",
        photo: null,
      }));
    }
  }, [loggedInUser]);

  const handleFormInputsChange = (event) => {
    if (event.target.name === "photo") {
      setFormInputs((formInputs) => {
        return { ...formInputs, [event.target.name]: event.target.files };
      });
    } else {
      setFormInputs((formInputs) => {
        return { ...formInputs, [event.target.name]: event.target.value };
      });
    }
  };

  const handleSave = async () => {
    try {
      let uploadedImageUrl = null;
      let requestBody = {};
      if (formInputs.photo && formInputs.photo.length > 0) {
        uploadedImageUrl = await uploadImage(formInputs.photo);
        requestBody.photo = uploadedImageUrl[0];
      }
      if (formInputs.username !== "" || formInputs.username !== null) {
        requestBody.username = formInputs.username;
      }
      if (formInputs.bio !== "" || formInputs.bio !== null) {
        requestBody.bio = formInputs.bio;
      }
      dispatch(updateUserProfile(requestBody));
      toast({
        position: "bottom-right",
        title: "Saved",
        description: "Profile details updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsEditMode((curr) => !curr);
    } catch (error) {
      console.log(error);
      toast({
        position: "bottom-right",
        title: "Failed",
        description: "Something went wrong. Please try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return loggedInUser ? (
    <Container maxW="container.sm" mt={8}>
      <Box>
        <Flex justifyContent="space-between">
          <Heading as="h4" size="md" mb={4}>
            Profile Photo
          </Heading>
          <Box display={isEditMode && "none"}>
            <IconButton
              fontSize="xl"
              isRound="true"
              varient="ghost"
              icon={<FaUserEdit />}
              onClick={() => setIsEditMode(true)}
            />
          </Box>
        </Flex>

        <Box>
          <Avatar
            mb={4}
            size="md"
            name={loggedInUser?.name}
            src={loggedInUser?.photo}
          />
        </Box>
        <input
          readOnly={!isEditMode}
          type="file"
          id="file"
          onChange={(event) => handleFormInputsChange(event)}
          name="photo"
          accept="image/*"
        />
        <VStack spacing={5} mt={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              readOnly={!isEditMode}
              width="full"
              size="md"
              type="text"
              name="username"
              value={formInputs.username}
              onChange={(event) => handleFormInputsChange(event)}
              placeholder="@username"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              width="full"
              name="bio"
              value={formInputs.bio}
              onChange={(event) => handleFormInputsChange(event)}
              placeholder="About yourself"
            />
          </FormControl>
        </VStack>
        <Flex justifyContent="flex-end" mt={4}>
          <Button
            display={!isEditMode && "none"}
            borderRadius="1.5rem"
            bg="#0EA5E9"
            color="white"
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Container>
  ) : (
    <Container maxW="container.sm" centerContent mt={4}>
      <Spinner size="lg" />
    </Container>
  );
};
