import { useState } from "react";
import { Search } from "../../components/Search/search";
import { UserProps } from "../../types/user";
import { User } from "../../components/User/user";
import { Error } from "../../components/Error/error";

export const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  const loadUser = async (userName: string) => {
    const response = await fetch(`https://api.github.com/users/${userName}`);

    const data = await response.json();

    if (response.status === 404) {
      setError(true);
      setUser(null);
      return;
    }

    setError(false);

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };

    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />

      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};
