import { useContext } from "react";
import { authContext } from "../provider/AuthProvider";

export function useAuth() {
  return useContext(authContext);
}
