interface User {
  _id: string;
  email: string;
  username: string;
  picture: string;
  image: string;
}

interface Session {
  user: {
    email: string;
    id: string;
  };
}
