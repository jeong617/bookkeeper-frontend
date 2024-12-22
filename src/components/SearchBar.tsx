import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  defaultQuery?: string;
}

function SearchBar({defaultQuery = ''}: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState<string>(defaultQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className='flex items-center justify-center w-full shadow-md px-6 py-1.5 rounded-chips-radius bg-white'>
      <input type='text'
             placeholder='검색어를 입력하세요'
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
             className='w-full border-none focus:outline-none focus:ring-0'
      />
      <button className='bg-white hover:border-white'
              type='button'
      >
        <FaSearch className='outline-none focus:ring-0 focus:outline-none hover:outline-none active:outline-none' />
      </button>
    </div>
  );
}

export default SearchBar;