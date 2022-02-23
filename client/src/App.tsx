/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */

import { Icon } from '@iconify/react';
import React, {
  useEffect, useState,
} from 'react';
import {
  Navigate, Route, Routes, useNavigate, useParams,
} from 'react-router-dom';

import ArticlesExplorer from './components/ArticlesExplorer';
import ContentExplorer from './components/ContentExplorer';
import OutlineExplorer from './components/OutlineExplorer';
import { IFileData } from './interfaces';

function Main() {
  const params = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [theme, setTheme] = useState(localStorage.theme);

  const [folders, setFolders] = useState<IFileData[]>([]);
  const [files, setFiles] = useState<IFileData[]>([]);

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  useEffect(() => {
    setFiles([]);
    fetch(`https://api.mdarchive.thecodeblog.net/file/list/${params.folder}`)
      .then((res) => res.json())
      .then((d: IFileData[]) => setFiles(d));
  }, [params.folder]);

  useEffect(() => {
    setContent('');
    if (params.file !== 'null') {
      fetch(`https://api.mdarchive.thecodeblog.net/file/content/${params.file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, [params.file]);

  useEffect(() => {
    fetch('https://api.mdarchive.thecodeblog.net/folder/list')
      .then((res) => res.json())
      .then((d: IFileData[]) => {
        setFolders(d);
        if (params.folder === 'null') {
          navigate(`/${d[0].id}/null/articles`);
        }
      });
    if (params.file !== 'null') {
      fetch(`https://api.mdarchive.thecodeblog.net/file/list/${params.folder}`)
        .then((res) => res.json())
        .then((d: IFileData[]) => setFiles(d));
    }
  }, []);

  return (
    <div className="App flex overflow-x-hidden">
      <div className={`flex-shrink-0 flex-auto toc ${navOpen ? 'w-full' : 'w-0'} !transition-all !duration-500 lg:w-[26%] py-6 h-screen overflow-y-auto overflow-x-hidden border-r-[1.6px] border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800`}>
        {params.section === 'articles' ? (
          <ArticlesExplorer
            setTheme={setTheme}
            theme={theme}
            folders={folders}
            files={files}
            setNavOpen={setNavOpen}
          />
        ) : ''}
        {params.section === 'outline' ? (
          <OutlineExplorer
            content={content}
            setTheme={setTheme}
            theme={theme}
            setNavOpen={setNavOpen}
          />
        ) : ''}
      </div>
      <div className="flex-shrink w-full lg:w-[74%] flex-auto h-screen">
        <button onClick={() => setNavOpen(!navOpen)} type="button" className="fixed bottom-0 shadow-md right-0 m-4 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
          <Icon icon="uil:layer-group" className="w-6 h-6 text-neutral-100" />
        </button>
        <ContentExplorer content={content} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/null/null/articles" />} />
      <Route path="/:folder/:file/:section" element={<Main />} />
    </Routes>
  );
}

export default App;
