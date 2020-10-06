import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/core";
import { useGetIntId } from "../../utils/useGetIntId";
import { EditDeleteButtons } from "../../components/EditDeleteButtons";

const Post = ({}) => {
  const intId = useGetIntId();
  const router = useRouter();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return (
      <Layout>
        <div>...loading</div>
      </Layout>
    );
  }

  if (!data?.post) {
    <Layout>Could not find post</Layout>;
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>

      <EditDeleteButtons id={data.post.id} creatorId={data.post.creator.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
