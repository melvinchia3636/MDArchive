import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

import OutlineExplorer from "../../components/OutlineExplorer.jsx";
import ArticlesExplorer from "../../components/ArticlesExplorer.jsx";
import ContentExplorer from "../../components/ContentExplorer.jsx";
import Head from 'next/head';

export const getStaticPaths = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking', // indicates the type of fallback
});

export async function getStaticProps(context) {
  const { folder, file } = context.params;
  
  const folders = await fetch('https://api.mdarchive.thecodeblog.net/folder/list').then((res) => res.json())
  let files = []
  if (folder !== "null") files = await fetch(`https://api.mdarchive.thecodeblog.net/file/list/${folder}`).then((res) => res.json())
  console.log(folder, file)
  return { props: { folder, file, folders, files } };
}

function Articles({ folder, file, folders, files }) {
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);
  const [section, setSection] = useState("articles");

  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("no");

  useEffect(() => {
    setTheme(localStorage.theme);
    if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme !== "no") {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    setContent('');
    if (file !== 'null') {
      fetch(`https://api.mdarchive.thecodeblog.net/file/content/${file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, [file]);


  useEffect(() => {
    if (folder === 'null') {
      router.push(`/${folders[0].id}/null`);
    }
  }, []);

  return (
    <div className="App flex overflow-x-hidden">
      <Head>
        <title>{file !== "null" ? files.filter(e => e.id === file)[0].name+" - " : ""}MDArchive</title>
      </Head>
      <div className={`flex-shrink-0 flex-auto toc ${navOpen ? 'w-full' : 'w-0'} !transition-all !duration-500 lg:w-[26%] py-6 h-screen overflow-y-auto overflow-x-hidden border-r-[1.6px] border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800`}>
        {section === 'articles' ? (
          <ArticlesExplorer
            setTheme={setTheme}
            theme={theme}
            folders={folders}
            files={files}
            setNavOpen={setNavOpen}
            file={file}
            folder={folder}
            setSection={setSection}
          />
        ) : ''}
        {section === 'outline' ? (
          <OutlineExplorer
            content={content}
            setTheme={setTheme}
            theme={theme}
            setNavOpen={setNavOpen}
            folder={folder}
            file={file}
            setSection={setSection}
          />
        ) : ''}
      </div>
      <div className="flex-shrink w-full lg:w-[74%] flex-auto h-screen">
        <button onClick={() => setNavOpen(!navOpen)} type="button" className="fixed bottom-0 z-[9999] flex lg:hidden shadow-md right-0 m-4 w-16 h-16 bg-amber-500 rounded-full items-center justify-center">
          <Icon icon="uil:layer-group" className="w-6 h-6 text-neutral-100" />
        </button>
        <ContentExplorer content={content} file={file} />
      </div>
    </div>
  )
}

export default Articles