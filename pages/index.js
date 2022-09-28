import { Container, Flex } from "@chakra-ui/react";
import Day from "../components/Day/Day";
import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons = [] }) {
  return (
    <Flex flexWrap="wrap">
      {reasons.map((day, idx) => (
        <Day key={idx} day={day} />
      ))}
    </Flex>
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
