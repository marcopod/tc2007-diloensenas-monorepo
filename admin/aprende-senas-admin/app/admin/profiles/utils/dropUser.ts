const dropUser = async (ip: String, id: number) => {
    try {
        const response = await fetch(`http://${ip}:3000/users/drop/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default dropUser;