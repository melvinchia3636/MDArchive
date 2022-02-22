/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-children-prop */
import React, {
  useEffect, useState,
} from 'react';
import {
  Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import ArticlesExplorer from './components/ArticlesExplorer';
import ContentExplorer from './components/ContentExplorer';
import OutlineExplorer from './components/OutlineExplorer';

function Main() {
  const params = useParams();
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState(localStorage.theme);

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
    setContent('');
    if (params.file !== 'null') {
      fetch(`https://api.mdarchive.thecodeblog.net/file/content/${params.file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, [params.file]);

  useEffect(() => {
    setContent('');
    if (params.file !== 'null') {
      fetch(`https://api.mdarchive.thecodeblog.net/file/content/${params.file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, []);

  return (
    <div className="App flex">
      <div className="flex-shrink-0 flex-auto toc w-[26%] py-6 h-screen overflow-y-auto overflow-x-hidden border-r-[1.6px] border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
        {params.section === 'articles' ? <ArticlesExplorer setTheme={setTheme} theme={theme} /> : ''}
        {params.section === 'outline' ? <OutlineExplorer content={content} setTheme={setTheme} theme={theme} /> : ''}
      </div>
      <ContentExplorer content={content} />
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
