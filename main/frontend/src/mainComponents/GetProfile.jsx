import axios from "axios";

const getProfile = async (role,data) => {
    try {
      const userData = {
        role: role, email: data.email, address: data.address
      }
      console.log("data",userData);
   
      const response = await axios.post(`http://localhost:5000/auth/profile`, userData);

      if (response.status === 200) {
        console.log(response.data.message);

        return({ name: response.data.name, roleid: response.data.roleid })

      }
    } catch (error) {
      console.error("error getting profile", error.response.data.message);

    }
  }
  export{getProfile};