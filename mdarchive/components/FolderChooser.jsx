import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';

function FolderChooser({ data, folder, file }) {
  const [isExpand, setExpand] = useState(false);

  return (
    <div className={`${isExpand ? 'max-h-screen' : 'max-h-9'} w-full !duration-700 overflow-hidden !transition-all -mt-2 pb-1 border-b dark:border-neutral-700`}>
      <div className="flex justify-center items-center">
        <button type="button" onClick={() => setExpand(!isExpand)} className="uppercase font-medium text-xs flex items-center gap-1 -mr-1">
          {data.filter((e) => e.id === folder)[0]?.name.replace(/-/g, ' ')}
          <span className="mt-[1.6px]">
            <Icon icon="uil:angle-down" />
          </span>
        </button>
      </div>
      <div className="flex flex-col mt-4 divide-y dark:divide-neutral-700">
        {data.map(({ id, name }) => (
          <Link
            key={name}
            href={`/${id}/null`}
          >
            <div onClick={() => setExpand(false)} className={`cursor-pointer text-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-300 px-4 dark:text-neutral-100 py-4 uppercase text-xs font-medium no-underline ${
              name === folder ? 'font-semibold text-neutral-800' : ''
            }`}>
              {name.replace(/-/g, ' ')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FolderChooser;
