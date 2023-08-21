import Linkify from "linkify-react";
import "linkify-plugin-mention";
import "linkify-plugin-hashtag";

export default function TextContent({ content }) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 whitespace-pre-wrap">
      <Linkify
        options={{
          className: "text-sky-500",
          target: "_blank",
          render: {
            mention: ({ attributes, content }) => {
              const { href, class: c, ...props } = attributes;

              return (
                <a
                  href={`https://threads.net/@${href.substring(1)}`}
                  className={`${c} hover:underline`}
                  {...props}
                  onClick={(e) => e.stopPropagation()}
                >
                  {content}
                </a>
              );
            },
            hashtag: (attributes) => {
              const {
                content,
                attributes: { class: c },
              } = attributes;

              return (
                <a href="#" className={c}>
                  {content}
                </a>
              );
            },
          },
        }}
      >
        {content}
      </Linkify>
    </div>
  );
}
