import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    query: string;
}

function SearchBar(): React.JSX.Element {
    const { register, handleSubmit } = useForm<SearchBarProps>();
    const onSubmit = (data: SearchBarProps) => {
        console.log(data.query);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center w-full shadow-md px-6 py-1.5 rounded-chips-radius">
            <input type="text"
                   placeholder="검색어를 입력하세요"
                   className="w-[500px] focus:outline-none"
                   {...register('query', {required: true})}
            />
            <button type="submit" className="bg-white hover:border-white">
                <FaSearch className="outline-none focus:ring-0 focus:outline-none hover:outline-none active:outline-none"/>
            </button>
        </form>
    )
}

export default SearchBar;