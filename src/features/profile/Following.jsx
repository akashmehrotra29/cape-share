import {
  Center,
  Container,
  VStack,
  Box,
  Flex,
  Stack,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Spinner } from "@chakra-ui/spinner";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

export const Following = () => {
  const [following, setFollowing] = useState([]);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const {
    state: { userId },
  } = useLocation();

  useEffect(() => {
    (async function () {
      setStatus("loading");
      const response = await axios.get(
        `/user-links?userId=${userId}&&type=following`
      );
      setFollowing(response.data.followings);
      setStatus("idle");
    })();
  }, []);

  return (
    <>
      {status === "loading" && (
        <Center>
          <Spinner />
        </Center>
      )}
      {status === "idle" && (
        <Container maxW="container.sm">
          <Heading as="h3" size="lg" mt={8} align="center">
            Following
          </Heading>
          <VStack>
            {following.map((following) => {
              return (
                <Box key={following._id} width="full">
                  <Flex
                    width="full"
                    cursor="pointer"
                    mb={2}
                    onClick={() =>
                      navigate("/profile", {
                        state: { userId: following.follows._id },
                      })
                    }
                  >
                    <Avatar
                      size="md"
                      name={following.follows.name}
                      src={following.follows.photo}
                    />
                    <Stack ml={4} direction="column" spacing={1}>
                      <Text fontSize={18} fontWeight="medium">
                        {following.follows.name}
                      </Text>
                      <Text>@{following.follows.username}</Text>
                    </Stack>
                  </Flex>
                  <Divider />
                </Box>
              );
            })}
          </VStack>
        </Container>
      )}
    </>
  );
};
