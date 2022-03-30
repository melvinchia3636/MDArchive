import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSectionize from 'remark-sectionize';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import emoji from 'emoji-dictionary';
import rehypeRaw from 'rehype-raw';
import { Icon } from '@iconify/react';

import HeadingRenderer from './HeadingRenderer';

function ContentExplorer({ content, setCurrent, file }) {
  return (
    <div className="px-8 content sm:px-32 w-full h-full py-12 pb-32 overflow-y-auto scroll-pt-8 overflow-x-hidden flex flex-col">
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSectionize]}
          rehypePlugins={[rehypeRaw]}
          children={content.replace(/:\w+:/gi, (name) => emoji.getUnicode(name))}
          components={{
            h1: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            h2: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            h3: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            h4: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            h5: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            h6: (props) => <HeadingRenderer {...props} setCurrent={setCurrent} />,
            code({
              node, inline, className, children, ...props
            }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomOneDarkReasonable}
                  customStyle={{
                    backgroundColor: 'transparent',
                  }}
                  language={match[1]}
                  {...props}
                >
                  {children.join('').replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a: (props) => (
              <a
                href={props.href}
                target={!props.href.startsWith('#') ? '_blank' : ''}
                rel="noreferrer"
                className="break-all"
              >
                {props.children}
              </a>
            ),
            blockquote: (props) => (
              <blockquote>
                <Icon icon="mdi:format-quote-open" className="w-8 h-8 text-amber-500 -ml-1 -mb-4 mt-3" />
                {props.children}
              </blockquote>
            ),
          }}
        />
      ) : <div className="text-neutral-400 text-center w-full self-center">
        {file !== "null" ? "Loading file..." : "No file is opened"}</div>}
    </div>
  );
}

export default ContentExplorer;
