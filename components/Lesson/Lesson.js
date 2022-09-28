import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
export default function Lesson({ lesson = new Lesson() }) {
  const { time, teacher, theme, subject, link, timeStart, timeEnd } = lesson;
  return subject ? (
    <Box pt={2} pb={2}>
      <HStack>
        <Box>
          <Text>{timeStart}</Text>
          <Text>{timeEnd}</Text>
        </Box>
        <Box>
          <HStack>
            <Text fontSize="larger" fontWeight="700">
              {subject}
            </Text>
            <Text>({teacher})</Text>
          </HStack>
          <Text as="i">{theme}</Text>
          <br />
          <Text wordBreak="break-all" as="code" bg="blue.50">
            {link}
          </Text>
        </Box>
      </HStack>
    </Box>
  ) : null;
}
