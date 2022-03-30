import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';

function SearchBox({ searchBoxOpen, setSearchBoxOpen }) {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setSearchBoxOpen(false);
      }
    });
    fetch("http://localhost:3001/file/list")
  }, []);

  useEffect(() => {
    if (searchBoxOpen) {
      setTimeout(() => {
        document.getElementById('search-input').focus();
      }, 300);
    }
  }, [searchBoxOpen])

  return (
    <>
      {searchBoxOpen && <div onClick={() => setSearchBoxOpen(false)} className="w-full h-screen absolute top-0 left-0 flex items-center justify-center" />}
      <div className={`bg-white rounded-md shadow-xl !transition-all !duration-500 p-4 w-1/2 absolute top-8 left-1/2 -translate-x-1/2 ${searchBoxOpen ? "translate-y-0" : "-translate-y-[300%]"}`}>
        <div className="w-full border-2 border-neutral-200 flex items-center px-3 py-1">
          <Icon icon="uil:search" className="text-neutral-300 w-5 h-5" />
          <input type="text" id="search-input" className="w-full font-medium border-0 p-2 placeholder-neutral-300 focus:outline-none" placeholder="Search files by name" autoFocus />
        </div>
      </div>
    </>
  )
}

export default SearchBox;