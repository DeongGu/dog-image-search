const END_POINT = "http://localhost:3000";

const api = {
  fetchDogs: async (keyword) => {
    try {
      const data = await fetch(`${END_POINT}/api/${keyword}`);
      return data.json();
    } catch (err) {
      console.log(err);
    }
  },
};

export default api;
