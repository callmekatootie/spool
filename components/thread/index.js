import clsx from "clsx";
import Linkify from "linkify-react";
import "linkify-plugin-mention";
import "linkify-plugin-hashtag";
import CellA from "./cellA";
import CellB from "./cellB";
import CellC from "./cellC";
import CellD from "./cellD";
import CellE from "./cellE";
import CellF from "./cellF";
import CellG from "./cellG";
import CellJ from "./cellJ";

export default function Thread({
  isRepost, // Is this thread a repost?
  repostedBy, // Handle of author that reposted
  handle, // Handle of author of thread
  profilePic, // Profile picture of author of thread
  isReply, // Is this a reply to another thread?
  replyTo, // If it's a reply, handle of author being replied to
  content, // Thread body
  likeCount, // # of likes
  replyCount, // # of replies
  isInternalNode, // Is it part of a tree, but neither root node nor leaf node
  isRootNode, // Is it the first node in the tree
  isLeafNode, // Is it the last node in the tree
}) {
  return (
    <article
      className={clsx("bg-white flex", {
        "pt-3": isRootNode,
        "border-b": isLeafNode,
        "py-3 border-b": !isInternalNode && !isRootNode && !isLeafNode,
      })}
    >
      <div className="flex flex-col w-16 shrink-0">
        <CellA
          isRepost={isRepost}
          isInternalNode={isInternalNode}
          isLeafNode={isLeafNode}
        />
        <CellB handle={handle} profilePic={profilePic} />
        <CellC isInternalNode={isInternalNode} isRootNode={isRootNode} />
      </div>
      <div
        className={clsx("flex flex-col grow pr-3 text-sm", {
          "pb-3": isInternalNode || isRootNode || isLeafNode,
        })}
      >
        <CellD handle={repostedBy} isRepost={isRepost} />
        <CellE handle={handle} createdDate={"TBD"} />
        <CellF isReply={isReply} replyTo={replyTo} />

        <Linkify
          as="p"
          options={{
            className: "text-sky-500",
            target: "_blank",
            render: {
              mention: ({ attributes, content }) => {
                const { href, ...props } = attributes;

                return (
                  <a
                    href={`https://threads.net/@${href.substring(1)}`}
                    {...props}
                  >
                    {content}
                  </a>
                );
              },
              hashtag: (attributes, content) => {
                console.log(attributes, content);
                return <a>Test</a>;
              },
            },
          }}
        >
          {content}
        </Linkify>

        <CellG />
        <CellJ likeCount={likeCount} replyCount={replyCount} />
      </div>
    </article>
  );
}
