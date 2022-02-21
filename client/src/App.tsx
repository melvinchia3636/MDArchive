/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-children-prop */
import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Icon } from '@iconify/react';
// @ts-ignore
import emoji from 'emoji-dictionary';
// @ts-ignore
import remarkSectionize from 'remark-sectionize';
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// @ts-ignore
import CTP from 'convert-chinese-to-pinyin';
import {
  Link, Route, Routes, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import TOC from './toc';

function useOnScreen(ref: RefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

interface IFileData {
  id: string;
  name: string;
}

function flatten(text: string, child: any): any {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const navigate = useNavigate();

  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = `${CTP(text)}-${props.node.position.start.line - 1}`;

  useEffect(() => {
    if (isVisible) navigate(`#${slug}`);
  }, [isVisible]);

  return React.createElement(`h${props.level}`, { id: slug, ref }, props.children);
}

function Outline({ content }: { content: string }) {
  const params = useParams();

  return (
    <div className="px-4">
      <div className="w-full flex items-center justify-between mb-6">
        <Link to={`/${params.folder}/${params.file}/articles${location.hash}`}>
          <Icon icon="mdi:view-agenda-outline" className="w-4 h-4 text-neutral-700" />
        </Link>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">outline</h1>
        <Icon icon="uil:brightness" className="w-[1.1rem] h-[1.1rem] text-neutral-700" />
      </div>
      <ReactMarkdown
        children={TOC(content)}
        components={{
          a: (props: any): JSX.Element => (
            <a
              href={props.href}
              target={!props.href.startsWith('#') ? '_blank' : ''}
              rel="noreferrer"
              className={`break-all ${props.href === window.location.hash ? 'active-section' : ''}`}
            >
              {props.children}
            </a>
          ),
        }}
      />
    </div>
  );
}

function FolderChooser({ data }: { data: IFileData[] }) {
  const [isExpand, setExpand] = useState(false);
  const params = useParams();

  return (
    <div className={`${isExpand ? 'max-h-screen' : 'max-h-9'} w-full duration-700 overflow-hidden transition-all bg-neutral-100 -mt-2 pb-1 border-b`}>
      <div className="flex justify-center items-center">
        <button type="button" onClick={() => setExpand(!isExpand)} className="uppercase font-medium text-xs flex items-center gap-1 -mr-1">
          {data.filter((e) => e.id === params.folder)[0]?.name.replace(/-/g, ' ')}
          <span className="mt-[1.6px]">
            <Icon icon="uil:angle-down" />
          </span>
        </button>
      </div>
      <div className="flex flex-col mt-4 px-4 divide-y">
        {data.map(({ id, name }) => (
          <Link
            onClick={() => setExpand(false)}
            key={name}
            className={`text-neutral-700 py-4 uppercase text-xs font-medium no-underline ${
              name === params.folder ? 'font-semibold text-neutral-800' : ''
            }`}
            to={`/${id}/null/articles`}
          >
            {name.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Files() {
  const params = useParams();
  const [folders, setFolders] = useState<IFileData[]>([]);
  const [files, setFiles] = useState<IFileData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/folder/list')
      .then((res) => res.json())
      .then((d: IFileData[]) => setFolders(d));

    fetch(`http://localhost:3001/file/list/${params.folder}`)
      .then((res) => res.json())
      .then((d: IFileData[]) => setFiles(d));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/file/list/${params.folder}`)
      .then((res) => res.json())
      .then((d: IFileData[]) => setFiles(d));
  }, [params.folder]);

  return (
    <div>
      <FolderChooser data={folders} />
      <div className="w-full flex items-center justify-between mb-6 px-4 mt-4">
        <Link to={`/${params.folder}/${params.file}/outline${location.hash}`}>
          <Icon icon="mdi:format-list-bulleted" className="w-4 h-4 text-neutral-700" />
        </Link>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">articles</h1>
        <Icon icon="uil:brightness" className="w-[1.1rem] h-[1.1rem] text-neutral-700" />
      </div>
      <div className="divide-y mb-3">
        {files.map(({ id, name }) => (
          <div className={`p-4 ${id === params.file ? 'border-l-4 border-l-amber-500' : ''}`} key={Math.random()}>
            <Link to={`/${params.folder}/${id}/${params.section}`} className="text-sm no-underline text-neutral-700">
              {name.replace(/\.md$/, '')}
              <span className="text-neutral-300 text-xs ml-0.5">.md</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Main() {
  const params = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent('');
    if (params.file !== 'null') {
      fetch(`http://localhost:3001/file/content/${params.file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, [params.file]);

  useEffect(() => {
    setContent('');
    if (params.file !== 'null') {
      fetch(`http://localhost:3001/file/content/${params.file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, []);

  return (
    <div className="App flex">
      <div className="flex-shrink-0 flex-auto toc w-[26%] py-6 h-screen overflow-y-auto overflow-x-hidden border-r-[1.6px] border-neutral-200">
        {params.section === 'articles' ? <Files /> : ''}
        {params.section === 'outline' ? <Outline content={content} /> : ''}
      </div>
      <div className="px-32 flex-shrink py-12 flex-auto w-[74%] h-screen overflow-y-auto overflow-x-hidden flex flex-col">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkSectionize]}
            children={content.replace(/:\w+:/gi, (name) => emoji.getUnicode(name))}
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
                    children={String(children).replace(/\n$/, '')}
                    style={atomOneLight}
                    customStyle={{
                      backgroundColor: 'rgb(229 229 229)',
                    }}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
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
    </div>
  );
}

function App() {
  const location = useLocation();
  useEffect(() => {
    window.addEventListener('hashchange', () => console.log('hashchange1', location.hash));
  }, []);

  return (
    <Routes>
      <Route path="/:folder/:file/:section" element={<Main />} />
    </Routes>
  );
}

export default App;
