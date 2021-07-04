import { Flex, Heading, HStack, Spacer, Box, Circle } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/react";
import { FaBell, FaHome } from "react-icons/fa";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToggleMode } from "./ToggleMode";
import { AccountDrawer } from "./AccountDrawer";

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const navigate = useNavigate();

  return (
    <Flex
      p={2}
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={useColorModeValue("#0EA5E9", "gray.800")}
    >
      <HStack
        p="2"
        onClick={() => user.loggedInUser && navigate("/")}
        cursor="pointer"
      >
        <Image
          boxSize="12"
          // src={logo}
          alt="cape shares"
          onClick={() => navigate("/")}
        />
      </HStack>
      <Spacer />
      <HStack spacing={2}>
        {user.loggedInUser && (
          <>
            <ToggleMode />
            <IconButton
              size="md"
              fontSize="2xl"
              aria-label="home"
              variant="ghost"
              color="white"
              icon={<FaHome />}
              isRound="true"
              onClick={() => navigate("/")}
            />
            <AccountDrawer />
            <Box position="relative" onClick={() => navigate("/notifications")}>
              <IconButton
                size="md"
                fontSize="2xl"
                aria-label="notifications"
                variant="ghost"
                color="white"
                icon={<FaBell />}
              />
              <Box display={notifications.length < 1 && "none"}>
                <Circle
                  cursor="pointer"
                  fontSize={10}
                  size="20px"
                  bg="pink.500"
                  color="white"
                  position="absolute"
                  top="0"
                  right="0"
                >
                  {notifications.length}
                </Circle>
              </Box>
            </Box>
          </>
        )}
      </HStack>
    </Flex>
  );
};
