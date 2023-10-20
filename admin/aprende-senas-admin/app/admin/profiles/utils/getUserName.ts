const getUserName = async (ip: String, id: number) => {
    console.log("getUserName");
    try {
      const response = await fetch(`http://${ip}:3000/users/getUserName/${id}`);
  
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
  export default getUserName;
  