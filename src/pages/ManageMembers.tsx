import React from 'react';

// project
import {Header} from "../components/header";
import FormButton from "../components/FormButton.tsx";
import SearchBar from "../components/SearchBar";

// css
import { FaUser, FaUserCog, FaPlus } from "react-icons/fa";
import MemberItem from "../components/MemberItem.tsx";

function ManageMembers() {

    return (
        <>
            <Header />
            <div className="container px-48 mx-auto mt-12">
                <div className="flex flex-row w-full h-14 justify-between">
                    <div className="flex flex-row mt-2">
                        <button type="button" className="bg-background w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1">
                            <FaUser />ADMINS
                        </button>
                        <button type="button" className="bg-white w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1">
                            <FaUserCog />MEMBERS
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <SearchBar />
                        <FormButton label="ADD" icon={<FaPlus className="fill-button-text" />} />
                    </div>
                </div>

                {/* admin & member list */}
                <div className="bg-background w-full py-3 rounded-tr-normal-radius rounded-b-normal-radius">
                    <MemberItem email="crystal@gmail.com" createdAt="2024-06-17" nickname="^^" />
                </div>
            </div>
        </>
    )
}

export default ManageMembers;