import {
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/popover";
import { IconButton } from "@chakra-ui/button";
import { FaUser } from "react-icons/fa";
import { Portal } from "@chakra-ui/portal";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

export const AccountDrawer = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    //reset profile notification and feed
    navigate("/login");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="md"
          fontSize="2xl"
          aria-label="account"
          variant="ghost"
          color="white"
          icon={<FaUser />}
          isRound="true"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader align="center">Account Details</PopoverHeader>
          <PopoverBody maxHeight="70vh">
            <Button
              onClick={() => {
                onClose();
                navigate("/profile", {
                  state: { userId: user.loggedInUser._id }, //to avoid sending user id in url
                });
              }}
              variant="ghost"
              width="full"
            >
              Profile
            </Button>
            <Divider />
            <Button
              onClick={() =>
                navigate("/edit-profile", {
                  state: { userId: user.loggedInUser._id },
                })
              }
              variant="ghost"
              width="full"
            >
              Edit Profile
            </Button>
            <Divider />
            <Button onClick={() => handleLogout()} variant="ghost" width="full">
              LogOut
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
