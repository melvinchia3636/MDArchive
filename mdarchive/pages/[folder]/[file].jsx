import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

import OutlineExplorer from "../../components/OutlineExplorer.jsx";
import ArticlesExplorer from "../../components/ArticlesExplorer.jsx";
import ContentExplorer from "../../components/ContentExplorer.jsx";
import Head from 'next/head';
import SearchBox from '../../components/SearchBox.jsx';

import { MongoClient } from 'mongodb';

export const getStaticPaths = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking', // indicates the type of fallback
});

export async function getStaticProps(context) {
  const { folder, file } = context.params;
  const db = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });;
  const notes = await db.db("notes")
  const folders = await notes.listCollections().toArray();
  let files = []
  if (folder !== "null") files = await notes.collection(folder).find({}).toArray();
  db.close();
  return { props: { folder, file, folders: folders.map(e => e.name), files: files.map(e => ({...e, _id: e._id.toString(), content: null})) } };
}

function Articles({ folder, file, folders, files }) {
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
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
      fetch(`http://localhost:3000/api/content/${folder}/${file}`)
        .then((res) => res.text())
        .then((d) => setContent(d));
    }
  }, [file]);


  useEffect(() => {
    if (folder === 'null') {
      router.replace(`/${encodeURIComponent(folders[0])}/null`);
    }
    
    document.addEventListener('keydown', (e) => {
      if (navigator.oscpu.includes('Mac')) {
        if (e.metaKey && e.key === 'p') {
          e.preventDefault()
          setSearchBoxOpen(true)
        }
      } else {
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault()
          setSearchBoxOpen(true)
        }
      }
    })
  }, []);

  return (
    <div className="App flex overflow-x-hidden">
      <Head>
        <title>{file !== "null" ? files.filter(e => e._id === file)[0].name+" - " : ""}MDArchive</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <SearchBox searchBoxOpen={searchBoxOpen} setSearchBoxOpen={setSearchBoxOpen} />
    </div>
  )
}

export default Articles