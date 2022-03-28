/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-globals */

import { Icon } from '@iconify/react';
import React from 'react';
import Link from 'next/link';

import FolderChooser from './FolderChooser';

function ArticlesExplorer({
  setTheme,
  theme,
  folders,
  files,
  setNavOpen,
  file,
  folder,
  setSection
}) {

  return (
    <div>
      <FolderChooser data={folders} folder={folder} />
      <div className="w-full flex items-center justify-between mb-6 px-4 mt-4">
        <button onClick={() => setSection("outline")}>
          <Icon icon="mdi:format-list-bulleted" className="w-4 h-4 text-neutral-700 dark:text-neutral-100" />
        </button>
        <h1 className="font-medium text-base mt-0 mb-0 outline-none after:hidden">articles</h1>
        <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon icon={`uil:${theme === 'dark' ? 'moon' : 'brightness'}`} className="w-[1.1rem] h-[1.1rem] text-neutral-700 dark:text-neutral-100" />
        </button>
      </div>
      <div className="divide-y dark:divide-neutral-700 mb-3 file-list">
        {files.map(({ id, name }) => (
          <div key={Math.random()}>
            <Link href={`/${folder}/${id}`}>
              <div onClick={() => setNavOpen(false)} className={`text-sm no-underline cursor-pointer text-neutral-700 dark:text-neutral-100 p-4 ${id === file ? 'border-l-4 border-l-amber-500' : ''} block hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300`}>
                {name.replace(/\.md$/, '')}
                <span className="text-neutral-300 text-xs ml-0.5">.md</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesExplorer;
