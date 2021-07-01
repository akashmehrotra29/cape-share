import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ToggleMode = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  
  return (
    <IconButton
      size="md"
      fontSize="2xl"
      aria-label={`Switch mode`}
      variant="ghost"
      isRound="true"
      color="white"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};
