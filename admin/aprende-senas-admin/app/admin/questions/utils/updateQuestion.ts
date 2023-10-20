type UserInput = {
    question: string;
    answer: string;
    imagename: string;
    answertype: string;
  };

const updateQuestion = async (ip: String, id: Number, userData: UserInput) => {
    try {
        const response = await fetch(`http://${ip}:3000/multipleop/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to update question');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default updateQuestion;