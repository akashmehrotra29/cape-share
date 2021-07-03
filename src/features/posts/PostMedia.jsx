import { Box, Center } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useState } from "react";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

export const PostMedia = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextMedia = () => {
    if (currentIndex === media.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousMedia = () => {
    if (currentIndex === 0) {
      setCurrentIndex(media.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Box position="relative" width="full" height="auto" mt={4}>
        {media.length > 1 && (
          <IconButton
            zIndex="1"
            position="absolute"
            left={5}
            fontSize={23}
            color="gray.900"
            top="50%"
            transform="translateY(-50%);"
            aria-label="Previous Media"
            isRound="true"
            onClick={() => previousMedia()}
            icon={<ImArrowLeft2 />}
          />
        )}

        <Center>
          {media[currentIndex].mediaType === "IMAGE" && (
            <Image src={media[currentIndex].source} alt="Post Image" />
          )}

          {media[currentIndex].mediaType === "VIDEO" && (
            <video
              style={{ width: "100%" }}
              controls
              key={media[currentIndex]._id}
            >
              <source src={media[currentIndex].source} type="video/mp4" />
              HTML video is not supported on this browser.
            </video>
          )}
        </Center>
        {media.length > 1 && (
          <IconButton
            zIndex="1"
            position="absolute"
            right={5}
            fontSize={23}
            color="gray.900"
            top="50%"
            transform="translateY(-50%);"
            aria-label="Next Media"
            isRound="true"
            onClick={() => nextMedia()}
            icon={<ImArrowRight2 />}
          />
        )}
      </Box>
    </>
  );
};
