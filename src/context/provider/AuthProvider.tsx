import { ReactNode, createContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContext {
  user: User | null;
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

export const authContext = createContext({} as AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const userStorageKey = "@gofinances:user";

  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const res = await AuthSession.startAsync({
        authUrl,
      });

      if (res.type === "success") {
        const data = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.params["access_token"]}`
        );

        const userInfo = await data.json();

        let _name = String(userInfo.name);

        if (/ /g.test(_name)) {
          const [_firstName, _secondName] = _name.split(" ");
          _name = _firstName + " " + _secondName;
        }

        const name = _name;
        const _user = {
          email: userInfo.email,
          id: userInfo.id,
          name,
          photo: userInfo.picture,
        };

        setUser(_user);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(_user));
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        let _name = credentials.fullName!.givenName!;

        if (/ /g.test(_name)) {
          const [_firstName, _secondName] = _name.split(" ");
          _name = _firstName + " " + _secondName;
        }

        const name = _name;
        const _user = {
          email: credentials.email!,
          id: String(credentials.user),
          name,
          photo: `https://ui-avatars.com/api/?name=${_name}&length=2`,
        };

        setUser(_user);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(_user));
      }

      setUserStorageLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const data = await AsyncStorage.getItem(userStorageKey);

      if (data) {
        try {
          const userLogged = JSON.parse(data) as User;
          setUser(userLogged);
        } catch (error) {
          setUser(null);
        }
      }
    }

    setUserStorageLoading(true);
    loadUserStorageData();
  }, []);

  return (
    <authContext.Provider
      value={{ userStorageLoading, user, signOut, signInWithGoogle, signInWithApple }}
    >
      {children}
    </authContext.Provider>
  );
}
