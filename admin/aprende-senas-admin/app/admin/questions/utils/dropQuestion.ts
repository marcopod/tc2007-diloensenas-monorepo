const dropQuestion = async (ip: String, id: number) => {
    try {
        const response = await fetch(`http://${ip}:3000/multipleop/drop/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete question');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default dropQuestion;