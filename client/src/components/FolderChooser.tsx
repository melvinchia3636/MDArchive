/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IFileData } from '../interfaces';

function FolderChooser({ data }: { data: IFileData[] }) {
  const [isExpand, setExpand] = useState(false);
  const params = useParams();

  return (
    <div className={`${isExpand ? 'max-h-screen' : 'max-h-9'} w-full duration-700 overflow-hidden transition-all -mt-2 pb-1 border-b dark:border-neutral-700`}>
      <div className="flex justify-center items-center">
        <button type="button" onClick={() => setExpand(!isExpand)} className="uppercase font-medium text-xs flex items-center gap-1 -mr-1">
          {data.filter((e) => e.id === params.folder)[0]?.name.replace(/-/g, ' ')}
          <span className="mt-[1.6px]">
            <Icon icon="uil:angle-down" />
          </span>
        </button>
      </div>
      <div className="flex flex-col mt-4 px-4 divide-y dark:divide-neutral-700">
        {data.map(({ id, name }) => (
          <Link
            onClick={() => setExpand(false)}
            key={name}
            className={`text-neutral-700 dark:text-neutral-100 py-4 uppercase text-xs font-medium no-underline ${
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

export default FolderChooser;
