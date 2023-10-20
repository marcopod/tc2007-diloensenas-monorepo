"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import Modal from './components/Modal/Modal';
import dropUser from './utils/dropUser';

// API endpoints
import getAllUsers from './utils/getAllUsers';

type OriginalUser = {
  id: number;
  user: string;
  email: string;
  password: string;
  age: number;
  adminprivilege: boolean;
};

type AllUsersRawData = {
  users: OriginalUser[]
}

type formattedUserProfile = {
  id: number,
  name: String,
  email: String,
  status: String
}

const initialUsersData: AllUsersRawData = {
  users: [],
};

type ProfilesProps = {};

const Profiles: React.FC<ProfilesProps> = () => {

  const { data: session, status } = useSession();

  const router = useRouter();

  // Initial states
  const ip: String = "10.22.223.166";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to hold the raw users data
  const [rawUsersData, setRawUsersData] = useState<AllUsersRawData>(initialUsersData);

  // List of all profiles
  const [formattedProfiles, setFormattedProfiles] = useState<formattedUserProfile[]>([]);
  // Current user data selected
  const [currentProfileData, setCurrentProfileData] = useState<OriginalUser | null>(null);

  const [searchUserId, setSearchUserId] = useState<string>("");


  // Profile field to be sorted ascending or descending
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Set the modal state
  const handleModalState = (state: boolean) => {
    setIsModalOpen(state);
    if (state == false) {
      fetchData();
    }
  }

  // Sort all the users data ascending or descending
  const handleSort = (field: keyof formattedUserProfile) => {
    // Toggle sort direction
    const nextDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';

    setFormattedProfiles(prevProfiles => {
      return [...prevProfiles].sort((a, b) => {
        // Check if the field being sorted is the ID
        // If it is, sort as number instead of string
        const valA = field === "id" ? Number(a[field]) as number : a[field] as String
        const valB = field === "id" ? Number(b[field]) as number : b[field] as String

        if (valA > valB) return nextDirection === 'asc' ? 1 : -1;
        if (valA < valB) return nextDirection === 'asc' ? -1 : 1;
        return 0;
      });
    });

    setSortField(field);
    setSortDirection(nextDirection);
  };

  const handleAddNewUser = () => {
    setCurrentProfileData(null);
    setIsModalOpen(true);
  }


  // Handler for the search user id input
  const handleSearchUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Check if the input is a valid number
    if (/^\d+$/.test(input) || input === '') {
      setSearchUserId(input);
    }
  }

  // Search the user data and send it to the modal
  const handleSearchUserId = async () => {
    const userIdToSearch = Number(searchUserId); // Convert the string to a number
    const user = rawUsersData.users.find(user => user.id === userIdToSearch);
    if (user) {
      setCurrentProfileData(user);
      setIsModalOpen(true);
    }
  }

  const handleDropUser = async (id: number) => {
    const res = await dropUser(ip, id);
    if (res) {
      fetchData();
    }
  }


  // Function to fetch all users data
  const fetchData = async () => {
    const rawData = await getAllUsers(ip);
    const transformedProfiles: formattedUserProfile[] = rawData.users.map((user: OriginalUser) => ({
      id: user.id,
      name: user.user,
      email: user.email,
      status: user.adminprivilege ? "Admin" : "User"
    }));
    setRawUsersData(rawData)
    setFormattedProfiles(transformedProfiles);
    setCurrentProfileData(rawData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="w-full h-screen bg-[#1E1F1F] flex justify-center items-center">
      <div className="flex flex-col items-start w-11/12 md:w-2/3 lg:w-[1100px]">

        {/* Centered Panel */}
        <div className="w-full bg-[#282A2A] rounded-xl p-8 max-h-[80vh]">
          {/* Header */}
          <header className="grid grid-cols-[1fr,1fr,1fr,1fr,0.5fr] gap-4 text-white text-center mb-4">
            <h3
              onClick={() => handleSort("id")}>
              Id {sortField === "id" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("name")}>
              Name {sortField === "name" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("email")}>
              Email {sortField === "email" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("status")}>
              Privilege {sortField === "status" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3>Settings</h3>
          </header>

          {/* Users Data (You can map these out from an array) */}
          <div className="overflow-y-auto max-h-[70vh]">
            {formattedProfiles.map((profile) => (
              <div key={profile.id} className="grid grid-cols-[1fr,1fr,1fr,1fr,0.5fr] gap-4 text-white text-center mb-2">
                <span>{profile.id}</span>
                <span>{profile.name}</span>
                <span>{profile.email}</span>
                <span>{profile.status}</span>
                <div className="flex space-x-2 justify-center">
                  <button onClick={() => {
                    setIsModalOpen(true);
                    const origUser = rawUsersData.users.find(user => user.id === profile.id);
                    if (origUser) {
                      setCurrentProfileData(origUser);
                    }
                  }}>📝</button>
                  {/* You might want to add a delete functionality here */}
                  <button onClick={() => handleDropUser(profile.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add user button */}
        <div className="mt-4 flex flex-row">
          <button className="bg-green-500 text-white py-2 px-4 mr-[10px] rounded" onClick={handleAddNewUser}>Add user</button>
          {/* Search user button */}
          <section className="ml-8">
            <input className="w-16 mr-2 px-2" placeholder='ID'
              value={searchUserId}
              onChange={handleSearchUserIdChange}></input>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSearchUserId}>Search user</button>
          </section>
        </div>


        {/* User data modification modal */}
        {isModalOpen && (
          <Modal setModalState={handleModalState} currentData={currentProfileData} ip={ip} />
        )
        }
      </div>
    </div>
  );
};

export default Profiles;
