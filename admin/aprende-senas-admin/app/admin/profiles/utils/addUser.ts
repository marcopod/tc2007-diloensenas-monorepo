export type UserInput = {
    user: string;
    email: string;
    password: string;
    age: number;
    adminprivilege: boolean;
};

const addUser = async (ip: String, userData: UserInput) => {
    try {
        const response = await fetch(`http://${ip}:3000/users/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to add user');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export default addUser;