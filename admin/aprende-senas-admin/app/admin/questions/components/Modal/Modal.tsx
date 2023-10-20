import React, { useState } from 'react';

import addQuestion from "../../utils/addQuestion"
import { questionInput } from '../../utils/addQuestion';
import updateQuestion from '../../utils/updateQuestion';

// Adjusting the userProfile type to represent the full user data
type questionData = {
  id: number;
  question: string;
  answer: string;
  imagename: string;
  answertype: string;
};

type Props = {
  setModalState: (isOpen: boolean) => void,
  currentData: questionData | null, // if it is modifying an existing user, or creating a new one
  ip: String
};

const fieldLabels: Record<string, keyof questionData> = {
  "Id": "id",
  "Question": "question",
  "Answer": "answer",
  "Image name": "imagename",
  "Answer type": "answertype",
};

const Modal: React.FC<Props> = ({ setModalState, currentData, ip }) => {
  // Initial state setup for newUserData
  const [newQuestionData, setNewUserData] = useState<questionData>({
    id: currentData?.id || 0,
    question: currentData?.question || '',
    answer: currentData?.answer || '',
    imagename: currentData?.imagename || '',
    answertype: currentData?.answertype || '',
  });
  // Update newUserData based on user inputs
  const handleInputChange = (field: keyof questionData, value: string | number | boolean) => {
    setNewUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Handler to modify or create a new user, depending on the existing currentData
  const handleUpdateUser = () => {
    console.log("update test");
    if (currentData) {
      const res = updateQuestion(ip, currentData.id, newQuestionData);
    } else {
      console.log(`Error updating the user, no existing data provided`)
    }
  }

  const handleAddQuestion = async () => {
    // Extract the necessary fields from newUserData
    const { id, question, answer, imagename, answertype } = newQuestionData;

    const questionData: questionInput = {
        question,
        answer,
        imagename,
        answertype
    };

    try {
        const result = await addQuestion(ip, questionData);
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
          {currentData ? <h2>Modify question</h2> : <h2>Add question</h2>}
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
                  <div>{newQuestionData.id}</div> :                    
                    <input
                      className="rounded bg-white text-black p-2"
                      placeholder={`Enter ${field}`}
                      value={newQuestionData[fieldLabels[field]] as string}
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
        onClick={currentData ? handleUpdateUser : handleAddQuestion}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Modal;
