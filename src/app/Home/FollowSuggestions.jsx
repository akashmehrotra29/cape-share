import { Box, Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { FaWindowClose } from "react-icons/fa";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const FollowSuggestions = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { loggedInUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await axios.get(`/users/follow-suggestions`);
        setSuggestedUsers(response.data.users);
      })();
    }
  }, [loggedInUser]);

  return (
    suggestedUsers.length > 0 && (
      <>
        <Box
          position="relative"
          width="full"
          display={isOpen ? "block" : "none"}
          mt={4}
        >
          <IconButton
            onClick={() => setIsOpen(false)}
            position="absolute"
            top={0}
            right={2}
            aria-label="Search database"
            variant="ghost"
            icon={<FaWindowClose />}
          />

          <Flex
            justifyContent="center"
            direction="row"
            gridGap={4}
            width="full"
            flexWrap="wrap"
          >
            {suggestedUsers?.map((user) => {
              return (
                <Box
                  key={user._id}
                  textAlign="center"
                  boxShadow="md"
                  p={4}
                  cursor="pointer"
                  onClick={() =>
                    navigate("/profile", { state: { userId: user._id } })
                  }
                >
                  <Avatar size="md" name={user.name} src={user.photo} />
                  <Text mt={2} fontWeight="medium" fontSize={18}>
                    {user.name}
                  </Text>
                  <Text>@{user.username}</Text>

                  <Button
                    mt={5}
                    borderRadius="1.5rem"
                    border="1px"
                    borderColor="#0EA5E9"
                    size="sm"
                  >
                    Follow
                  </Button>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </>
    )
  );
};
