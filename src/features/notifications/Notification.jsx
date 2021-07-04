import {
  Container,
  VStack,
  Heading,
  Box,
  Flex,
  Link,
  Divider,
  Center,
} from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { CreationTimeStamp } from "../posts/CreationTimeStamp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getNotifications } from "./notificationSlice";
import { PopoverBody } from "@chakra-ui/react";

export const Notification = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        dispatch(getNotifications());
      })();
    }
  }, [loggedInUser]);

  return (
    <>
      <Container maxW="container.sm">
        <Heading as="h3" size="lg" mt={8} mb={6} align="center">
          Notifications
        </Heading>
        <VStack>
          {notifications.length > 0 && (
            <Box width="max-content">
              {notifications.map((notification) => {
                return (
                  <div key={notification._id}>
                    <Box width="full" mb={2} mt={2}>
                      <Flex>
                        <Avatar
                          size="sm"
                          name={notification.sourceUser.name}
                          src={notification.sourceUser.photo}
                        />
                        <Box width="full" ml={2}>
                          {notification.notificationType === "NEW POST" && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate("/profile", {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp; posted somthing new.</span>
                            </>
                          )}
                          {notification.notificationType === "NEW FOLLOWER" && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate("/profile", {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;followed you.</span>
                            </>
                          )}
                          {notification.notificationType === "LIKE" && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate("/profile", {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;liked your post.</span>
                            </>
                          )}
                          {notification.notificationType === "COMMENT" && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate("/profile", {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;commented on your post.</span>
                            </>
                          )}
                          <CreationTimeStamp timestamp={notification.time} />
                        </Box>
                      </Flex>
                    </Box>
                    <Divider />
                  </div>
                );
              })}
            </Box>
          )}
          {notifications.length === 0 && (
            <Center mt={2} mb={2} fontWeight="bold">
              Oops! You don't have any Notifications.
            </Center>
          )}
        </VStack>
      </Container>
    </>
  );
};
