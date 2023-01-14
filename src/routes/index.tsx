import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../context/hooks/useAuth";
import { AppRoutes } from "./app.routes";

interface RoutesProps {}

export function Routes({}: RoutesProps) {
  const { user } = useAuth();
  const isAuthorized = !!user;

  return isAuthorized ? <AppRoutes /> : <AuthRoutes />;
}
