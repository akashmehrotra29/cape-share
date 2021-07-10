import { Text } from "@chakra-ui/layout";

import { parseISO, formatDistanceToNow } from "date-fns";

export const CreationTimeStamp = ({ timestamp }) => {
  let timePeriodStamp = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timePeriodStamp = `${timePeriod} ago`;
  }
  return (
    <>
      <Text
        title={timestamp}
        // color={useColorModeValue("grey.800", "grey.400")}
        color="grey"
      >
        {timePeriodStamp}
      </Text>
    </>
  );
};
