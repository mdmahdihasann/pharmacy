import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
};

export default useUser;
