/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */

import { Icon } from '@iconify/react';
import { Dispatch } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useParams } from 'react-router-dom';
import TOC from '../toc';

/* eslint-disable react/jsx-filename-extension */
function OutlineExplorer({ content, theme, setTheme }: {
    content: string,
    theme: string,
    setTheme: Dispatch<any>
  }) {
  const params = useParams();
  const location = useLocation();

  return (
    <div className="px-4">
      <div className="w-full flex items-center justify-between mb-6">
        <Link to={`/${params.folder}/${params.file}/articles${location.hash}`}>
          <Icon icon="mdi:view-agenda-outline" className="w-4 h-4 text-neutral-700 dark:text-neutral-100" />
        </Link>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">outline</h1>
        <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon icon={`uil:${theme === 'dark' ? 'moon' : 'brightness'}`} className="w-[1.1rem] h-[1.1rem] text-neutral-700 dark:text-neutral-100" />
        </button>
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

export default OutlineExplorer;
