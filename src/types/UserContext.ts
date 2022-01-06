import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export default interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<any>>;
}
