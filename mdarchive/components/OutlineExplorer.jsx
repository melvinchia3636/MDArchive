/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import TOC from '../toc';

function OutlineExplorer({
  content, theme, setTheme, setNavOpen, setSection
}) {
  const [current, setCurrent] = useState('');
  useEffect(() => {
    window.addEventListener('pushState', function(e) {
      setCurrent(window.location.hash)
    });
  }, []);
  return (
    <div className="px-4">
      <div className="w-full flex items-center justify-between mb-6">
        <button onClick={() => setSection("articles")}>
          <Icon icon="mdi:view-agenda-outline" className="w-4 h-4 text-neutral-700 dark:text-neutral-100" />
        </button>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">outline</h1>
        <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon icon={`uil:${theme === 'dark' ? 'moon' : 'brightness'}`} className="w-[1.1rem] h-[1.1rem] text-neutral-700 dark:text-neutral-100" />
        </button>
      </div>
      <ReactMarkdown
        children={TOC(content)}
        components={{
          a: (props) => (
            <a
              onClick={() => setNavOpen(false)}
              href={props.href}
              target={!props.href.startsWith('#') ? '_blank' : ''}
              rel="noreferrer"
              className={`break-all ${props.href === current ? 'active-section' : ''}`}
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
