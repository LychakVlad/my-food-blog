interface User {
  id: string;
  email: string;
  username: string;
  image: string;
}

interface Session {
  user: {
    email: string;
    id: string;
  };
}
