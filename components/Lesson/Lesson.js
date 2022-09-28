import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
export default function Lesson({ lesson = new Lesson() }) {
  const { time, teacher, theme, subject, link } = lesson;
  return subject ? (
    <Box pt={2} pb={2}>
      <HStack>
        <Text>{time}</Text>
        <Box>
          <HStack>
            <Text fontWeight="700">{subject}</Text>
            <Text>({teacher})</Text>
          </HStack>
          <Text>{theme}</Text>
          <Text bg="blue.50">{link}</Text>
        </Box>
      </HStack>
    </Box>
  ) : null;
}
