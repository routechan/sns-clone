export interface Profile {
  id:number;
 bio:string;
 profileImageUrl:string;
 userId:number;
 user:UserType
}

export interface UserType {
    id:number;
    username :string
    email :string 
    password :string
    posts :UserType[]
profile:Profile;
  }

  export interface PostType {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: UserType;
  }