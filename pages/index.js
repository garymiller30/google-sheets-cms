import { Flex, Text } from "@chakra-ui/react";
import Day from "../components/Day/Day";
import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons = [] }) {
  const today = new Date().toLocaleDateString();
  const todayWeekDay = new Date().toLocaleString("local", { weekday: "long" });
  return (
    <>
      <header>
        <title>Розклад занять 4-В</title>
      </header>
      <Flex
        w="100%"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Text
          fontSize="2xl"
          align="center"
          w="100%"
          pt={1}
          pb={1}
          bg="blue.100"
          position="sticky"
          top="0"
          left="0"
        >
          Сьогодні: {today}
          {", "}
          <Text as="span" fontWeight="700">
            {todayWeekDay}
          </Text>
          <Text as="span">, розклад на: </Text>
          <Text as="span" fontWeight="700">
            10.10-14.10
          </Text>
        </Text>
        <Flex flexWrap="wrap" w="100%" justifyContent="center">
          {reasons.map((day, idx) => (
            <Day key={idx} day={day} />
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export async function getStaticProps(context) {
  const reasons = await getWhyNextReasons();

  return {
    props: {
      reasons,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
