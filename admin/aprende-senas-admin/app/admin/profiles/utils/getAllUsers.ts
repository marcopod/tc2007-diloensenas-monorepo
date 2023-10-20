const getAllUsers = async (ip: String) => {
  console.log("getAllUsers");
  try {
    const response = await fetch(`http://${ip}:3000/users`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] };
  }
};
export default getAllUsers;
