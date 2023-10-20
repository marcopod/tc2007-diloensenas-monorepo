type UserInput = {
    user: string;
    email: string;
    password: string;
    age: number;
    adminprivilege: boolean;
};

const updateUser = async (ip: String, id: Number, userData: UserInput) => {
    try {
        const response = await fetch(`http://${ip}:3000/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to update user');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default updateUser;