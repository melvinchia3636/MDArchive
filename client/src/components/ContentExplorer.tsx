/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkSectionize from 'remark-sectionize';
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// @ts-ignore
import emoji from 'emoji-dictionary';
// @ts-ignore
import rehypeRaw from 'rehype-raw';
import { Icon } from '@iconify/react';

import HeadingRenderer from './HeadingRenderer';

function ContentExplorer({ content }: { content: string }) {
  return (
    <div className="px-8 sm:px-32 w-full h-full py-12 pb-32 overflow-y-auto overflow-x-hidden flex flex-col">
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSectionize]}
          rehypePlugins={[rehypeRaw]}
          children={content.replace(/:\w+:/gi, (name: string) => emoji.getUnicode(name))}
          components={{
            h1: HeadingRenderer,
            h2: HeadingRenderer,
            h3: HeadingRenderer,
            h4: HeadingRenderer,
            h5: HeadingRenderer,
            h6: HeadingRenderer,
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
            a: (props: any): JSX.Element => (
              <a
                href={props.href}
                target={!props.href.startsWith('#') ? '_blank' : ''}
                rel="noreferrer"
                className="break-all"
              >
                {props.children}
              </a>
            ),
            blockquote: (props: any): JSX.Element => (
              <blockquote>
                <Icon icon="mdi:format-quote-open" className="w-8 h-8 text-amber-500 -ml-1 -mb-4 mt-3" />
                {props.children}
              </blockquote>
            ),
          }}
        />
      ) : <div className="text-neutral-400 text-center w-full self-center">No file is opened</div>}
    </div>
  );
}

export default ContentExplorer;
