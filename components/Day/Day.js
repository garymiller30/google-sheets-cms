import { Box, Text } from "@chakra-ui/react";
import Lesson from "./../../components/Lesson/Lesson";

export default function Day({ day = new Day() }) {
  return (
    <Box p={3} m={3} maxW={500} border="1px solid gray" borderRadius={10}>
      <Text align="center" fontSize="3xl">
        {day.title}
      </Text>
      {day.lessons.map((lesson, idx) => (
        <Lesson key={idx} lesson={lesson} />
      ))}
    </Box>
  );
}
