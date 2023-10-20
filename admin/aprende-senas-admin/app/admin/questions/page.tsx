"use client";
import React, { useEffect, useState } from 'react';

import Modal from './components/Modal/Modal';
import dropQuestion from './utils/dropQuestion';
import getAllQuestions from './utils/getAllQuestions';

type questionRawData = {
  id: number,
  question: string,
  answer: string,
  imagename: string,
  answertype: string,
}

type allQuestionsRawData = {
  questions: questionRawData[]
}

const initialQuestionsData: allQuestionsRawData = {
  questions: [],
};

type QuestionsProps = {};

const Questions: React.FC<QuestionsProps> = () => {
  // Initial states
  const ip: String = "10.22.223.166";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to hold the raw users data
  const [rawQuestionsData, setRawQuestionsData] = useState<allQuestionsRawData>(initialQuestionsData);

  // List of all profiles
  const [formattedQuestions, setFormattedQuestions] = useState<questionRawData[]>([]);

  // Current user data selected
  const [currentQuestionData, setCurrentQuestionData] = useState<questionRawData | null>(null);

  const [searchQuestionId, setSearchQuestionId] = useState<string>("");


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
  const handleSort = (field: keyof questionRawData) => {
    // Toggle sort direction
    const nextDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';

    setFormattedQuestions(prevProfiles => {
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

  const handleAddNewQuestion = () => {
    setCurrentQuestionData(null);
    setIsModalOpen(true);
  }

  // Handler for the search user id input
  const handleSearchQuestionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Check if the input is a valid number
    if (/^\d+$/.test(input) || input === '') {
      setSearchQuestionId(input);
    }
  }

  // Search the user data and send it to the modal
  const handleSearchQuestionId = async () => {
    const questionIdToSearch = Number(searchQuestionId); // Convert the string to a number
    const question = rawQuestionsData.questions.find(question => question.id === questionIdToSearch);
    if (question) {
      setCurrentQuestionData(question);
      setIsModalOpen(true);
    }
  }

  const handleDropQuestion = async (id: number) => {
    const res = await dropQuestion(ip, id);
    if (res) {
      fetchData();
    }
  }


  // Function to fetch all users data
  const fetchData = async () => {
    const rawData = await getAllQuestions(ip);
    const transformedQuestions: questionRawData[] = rawData.questions.map((question: questionRawData) => ({
      id: question.id,
      question: question.question,
      answer: question.answer,
      imagename: question.imagename,
      answertype: question.answertype
    }));
    setRawQuestionsData(rawData)
    setFormattedQuestions(transformedQuestions);
    setCurrentQuestionData(rawData[0]);
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
          <header className="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 text-white text-center mb-4">
            <h3
              onClick={() => handleSort("id")}>
              Id {sortField === "id" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("question")}>
              Question {sortField === "question" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("answer")}>
              Answer {sortField === "answer" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("imagename")}>
              Image Name {sortField === "imagename" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3 onClick={() => handleSort("answertype")}>
              Answer type {sortField === "answertype" ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
            </h3>
            <h3>Settings</h3>
          </header>

          {/* Users Data (You can map these out from an array) */}
          <div className="overflow-y-auto max-h-[70vh]">
            {formattedQuestions.map((question) => (
              <div key={question.id} className="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 text-white text-center mb-2">
                <span>{question.id}</span>
                <span>{question.question}</span>
                <span>{question.answer}</span>
                <span>{question.imagename}</span>
                <span>{question.answertype}</span>
                <div className="flex space-x-2 justify-center">
                  <button onClick={() => {
                    setIsModalOpen(true);
                    const origUser = rawQuestionsData.questions.find(question => question.id === question.id);
                    if (origUser) {
                      setCurrentQuestionData(origUser);
                    }
                  }}>📝</button>
                  {/* You might want to add a delete functionality here */}
                  <button onClick={() => handleDropQuestion(question.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add user button */}
        <div className="mt-4 flex flex-row">
          <button className="bg-green-500 text-white py-2 px-4 mr-[10px] rounded" onClick={handleAddNewQuestion}>Add Question</button>
          {/* Search user button */}
          <section className="ml-8">
            <input className="w-16 mr-2 px-2" placeholder='ID'
              value={searchQuestionId}
              onChange={handleSearchQuestionIdChange}></input>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSearchQuestionId}>Search Question</button>
          </section>
        </div>


        {/* User data modification modal */}
        {isModalOpen && (
          <Modal setModalState={handleModalState} currentData={currentQuestionData} ip={ip} />
        )
        }
      </div>
    </div>
  );
};

export default Questions;
