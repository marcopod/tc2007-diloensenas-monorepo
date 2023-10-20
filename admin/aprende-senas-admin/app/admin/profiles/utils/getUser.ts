type formattedUserProfile = {
  id: number,
  name: String,
  email: String,
  status: String
}

const getUser = async (ip: String, id: number): Promise<formattedUserProfile | null> => {
  console.log("getUser");
  try {
    const response = await fetch(`http://${ip}:3000/users/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: formattedUserProfile = await response.json();
    return data;
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
    return null;
  }
};

export default getUser;