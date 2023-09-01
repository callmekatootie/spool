import type { Thread, Candidate, ThreadsHdProfilePicVersion } from "threads-api"

export type GetUserTimeline = {
  threads: Thread[],
  cursor?: string
}

export type SpoolThreadLinkPreview = {
  displayUrl: string,
  imageUrl: string,
  title: string,
  url: string,
}

export type SpoolThread = {
  content: string,
  createdAt: number,
  handle: string,
  hasLiked?: boolean,
  id: string,
  image?: Candidate | ThreadsHdProfilePicVersion,
  isInternalNode: boolean,
  isLeafNode: boolean,
  isRepost: boolean,
  isReply: boolean,
  isRootNode: boolean,
  isUserVerified: boolean,
  likeCount: number,
  linkPreview?: SpoolThreadLinkPreview,
  profilePic: string,
  quotedPost?: {
    content: string,
    createdAt: number,
    handle: string,
    image?: Candidate | ThreadsHdProfilePicVersion,
    isUserVerified: boolean,
    likeCount: number,
    linkPreview?: SpoolThreadLinkPreview,
    nestedQuotedPost?: {
      content: string,
      handle: string,
      hasImage?: boolean,
      hasVideo?: boolean,
    },
    video?: string,
    profilePic: string,
  },
  replyCount: number,
  replyTo?: string,
  repostedBy?: string,
  urlCode: string,
  video?: string
}
