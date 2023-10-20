const getUserPassword = async (ip: String, id: number) => {
  console.log("getUserPassword");
  try {
    const response = await fetch(`http://${ip}:3000/users/getUserPassword/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  }
};
export default getUserPassword;
