import { Flex, Spacer, Stack, Text, VStack, HStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { IoMdOpen } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { follow, unFollow } from "./profileSlice";

export const ProfileInfo = ({ user, following }) => {
  const { loggedInUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Flex mt={4}>
        <Avatar size="xl" name={user?.name} src={user?.photo} />
        <Spacer maxW="10px" />
        <Stack direction="column" ml={3} spacing={2}>
          <Text fontSize="2xl" justifySelf="start">
            {user?.name}
          </Text>
          <VStack spacing={2}>
            <HStack
              onClick={() =>
                navigate("/following", { state: { userId: user._id } })
              }
            >
              <Text cursor="pointer" display="inline-block">
                {user?.followingCount} following
              </Text>
              <IoMdOpen />
            </HStack>
            <HStack
              onClick={() =>
                navigate("/followers", { state: { userId: user._id } })
              }
            >
              <Text cursor="pointer" display="inline-block">
                {user?.followerCount} followers
              </Text>
              <IoMdOpen />
            </HStack>
          </VStack>
        </Stack>
      </Flex>
      <Flex>
        <Stack direction="column" mt={4} ml={3} spacing={2}>
          <Text fontWeight="medium" color="grey">
            @{user?.username}
          </Text>
          {user?.bio && <Text>{user?.bio}</Text>}
          {loggedInUser?._id !== user?._id && !following && (
            <Button
              mt={5}
              borderRadius="1.5rem"
              border="1px"
              borderColor="#0EA5E9"
              onClick={() =>
                dispatch(
                  follow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Follow
            </Button>
          )}
          {loggedInUser?._id !== user?._id && following && (
            <Button
              mt={5}
              borderRadius="1.5rem"
              bg="#0EA5E9"
              color="white"
              onClick={() =>
                dispatch(
                  unFollow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Following
            </Button>
          )}
        </Stack>
      </Flex>
    </>
  );
};
