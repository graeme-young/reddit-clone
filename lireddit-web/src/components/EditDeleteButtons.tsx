import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} icon="edit" aria-label="Edit Post" mr={1} />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={async () => {
          await deletePost({ id });
        }}
      />
    </>
  );
};
