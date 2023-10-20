import React, { useState } from 'react';

import updateUser from "../../utils/updateUser"
import addUser from '../../utils/addUser';
import { UserInput } from '../../utils/addUser';

// Adjusting the userProfile type to represent the full user data
type userProfile = {
  id: number;
  user: string;
  email: string;
  password: string;
  age: number;
  adminprivilege: boolean;
};

type Props = {
  setModalState: (isOpen: boolean) => void,
  currentData: userProfile | null, // if it is modifying an existing user, or creating a new one
  ip: String
};

const fieldLabels: Record<string, keyof userProfile> = {
  "Id": "id",
  "Name": "user",
  "Email": "email",
  "Password": "password",
  "Age": "age",
  "Privilege": "adminprivilege"
};

const Modal: React.FC<Props> = ({ setModalState, currentData, ip }) => {
  // Initial state setup for newUserData
  const [newUserData, setNewUserData] = useState<userProfile>({
    id: currentData?.id || 0,
    user: currentData?.user || '',
    email: currentData?.email || '',
    password: currentData?.password || '',
    age: currentData?.age || 0,
    adminprivilege: currentData?.adminprivilege || false
  });
  // Update newUserData based on user inputs
  const handleInputChange = (field: keyof userProfile, value: string | number | boolean) => {
    setNewUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Handler to modify or create a new user, depending on the existing currentData
  const handleUpdateUser = () => {
    console.log("update test");
    if (currentData) {
      const res = updateUser(ip, currentData.id, newUserData);
    } else {
      console.log(`Error updating the user, no existing data provided`)
    }
  }

  const handleAddUser = async () => {
    // Extract the necessary fields from newUserData
    const { user, email, password, age, adminprivilege } = newUserData;

    const userData: UserInput = {
        user,
        email,
        password,
        age,
        adminprivilege
    };

    try {
        const result = await addUser(ip, userData);
        console.log("User added successfully:", result);
        // Close the modal after successful addition
        setModalState(false);
    } catch (error) {
        console.error("Error adding user:", error);
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalState(false)}></div>
      <div className="bg-[#282A2A] p-6 rounded-xl z-10">
        <div className="w-full flex flex-row justify-center items-center text-[22px] text-white mb-4">
          {currentData ? <h2>Modify user</h2> : <h2>Add user</h2>}
        </div>
        <div className={`${currentData ? "grid-cols-3" : "grid-cols-2"}
        grid gap-4 text-white`}>
          {currentData ? <div></div> : null}
          {currentData ? <div>Current</div> : <div>Data</div>}
          <div>Modified</div>

          {Object.keys(fieldLabels).map(field => (
            <React.Fragment key={field}>
              <div>{field}</div>
              {
                currentData ?
                  <div>
                    {field === "Privilege" ? (currentData[fieldLabels[field]] ? "Admin" : "User") : currentData[fieldLabels[field]]}
                  </div>
                  : null
              }
              {
                field === "Id" ?
                  <div>{newUserData.id}</div> :
                  field === "Privilege" ?
                    <select name="status" className="rounded bg-white text-black p-2"
                      value={newUserData.adminprivilege ? "true" : "false"}
                      onChange={(e) => handleInputChange('adminprivilege', e.target.value === "true")}
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </select>
                    :
                    <input
                      className="rounded bg-white text-black p-2"
                      placeholder={`Enter ${field}`}
                      value={newUserData[fieldLabels[field]] as string}
                      onChange={(e) => handleInputChange(fieldLabels[field], e.target.value)}
                    />
              }
            </React.Fragment>
          ))}
        </div>
        <button className="bg-pink-700 hover:bg-pink-500 text-white py-2 px-4 mr-[10px] rounded mt-4" onClick={() => setModalState(false)}>
          Cancel
        </button>
        <button className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded mt-4" 
        onClick={currentData ? handleUpdateUser : handleAddUser}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Modal;
