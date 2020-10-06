import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VotingProps {
  post: PostSnippetFragment;
}

export const Voting: React.FC<VotingProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "up-loading" | "down-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={2}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("up-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "up-loading"}
        icon="chevron-up"
        aria-label="Upvote"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("down-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "down-loading"}
        icon="chevron-down"
        aria-label="Upvote"
      />
    </Flex>
  );
};
