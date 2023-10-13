namespace models {
  interface IData {
    posts: Ipost[];
  }

  interface IPost {
    creator: userId;
    title: string;
    text: string;
    tag: string;
    _id: string;
  }
}
