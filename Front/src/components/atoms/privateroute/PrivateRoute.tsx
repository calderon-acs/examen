import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FullLoader from "../../organisms/fullloader/FullLoader";
import Cookies from "universal-cookie";

const PrivateRoute: React.FC<any> = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false);

  const checkUserPermissions = () => {
    const cookies = new Cookies(null, { path: "/" });
    let session = cookies.get("Session");
    

    if (session) {
      setPermission(true);
    } else {
      setPermission(false);

      navigate("/");
    }
  };

  useEffect(() => {
    checkUserPermissions();
  }, [location]);

  return (
    <>
      {permission && <Outlet />}
      {!permission && <FullLoader />}
    </>
  );
};

export default PrivateRoute;
