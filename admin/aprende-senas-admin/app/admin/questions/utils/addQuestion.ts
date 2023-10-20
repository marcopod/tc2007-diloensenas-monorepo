export type questionInput = {
    question: string;
    answer: string;
    imagename: string;
    answertype: string;
};

const addQuestion = async (ip: String, questionData: questionInput) => {
    try {
        const response = await fetch(`http://${ip}:3000/multipleop/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to add question');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default addQuestion;