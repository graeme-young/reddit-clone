import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import {
  Link,
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";
import { Voting } from "../components/Voting";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Posts failed to load, try again later.</div>;
  }

  return (
    <Layout>
      <Flex align="centre">
        <Heading>Reddit Clone</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <Box>
                <Voting post={p} />
              </Box>
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>Posted by: {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            m="auto"
            my={8}
            isLoading={fetching}
          >
            Load more posts {data.posts.hasMore}
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
