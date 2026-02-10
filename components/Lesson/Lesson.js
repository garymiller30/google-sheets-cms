import { Box, HStack, Link, Text } from "@chakra-ui/react";
export default function Lesson({ lesson = new Lesson() }) {
  const { teacher, theme, subject, link, timeStart, timeEnd } = lesson;
  return subject ? (
    <Box pt={2} pb={2}>
      <HStack>
        <Box>
          <Text>{timeStart}</Text>
          <Text>{timeEnd}</Text>
        </Box>
        <Box minW={0}>
          <HStack>
            <Text fontSize="larger" fontWeight="700" textTransform="uppercase">
              {subject}
            </Text>
            <Text>({teacher})</Text>
          </HStack>
          {GetLinkComponent(theme)}

          <br />
          <Text
            as="code"
            bg="blue.50"
            display="block"
            maxW="100%"
            whiteSpace="normal"
            overflowWrap="anywhere"
            wordBreak="break-all"
          >
            {link}
          </Text>
        </Box>
      </HStack>
    </Box>
  ) : null;
}

function GetLinkComponent(theme) {
  // із рядка теми виділяємо посилання та текст
  const linkRegex = /https?:\/\/[^\s]+/g;
  const parts = theme.split(linkRegex).filter((part) => part.trim() !== "");
  const links = theme.match(linkRegex) || [];

  const components = [];

  for (const link of links) {
    components.push(LinkComponent(link));
  }

  for (const part of parts) {
    components.push(TextConponent(part));
  }
  return components;
}

function LinkComponent(link) {
  return (
    <Link href={link} isExternal color="blue.500" fontWeight="500">
      ZOOM
    </Link>
  );
}

function TextConponent(text) {
  return <Text>{text}</Text>;
}
