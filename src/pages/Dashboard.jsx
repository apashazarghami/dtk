import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthenticate } from "../context/AuthenticateProvider";
import styles from "../styles/Dashboard.module.css";
import { useEffect } from "react";
import AddAsset from "../components/AddAsset";
import { useAssets } from "../context/AssetsProvider";
import AssetsGroups from "../components/AssetsGroups";
import Loader from "../components/Loader";
import { fetchAssetsGroups, logoutHandler } from "../utilities/functions";

const Dashboard = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const { dispatch } = useAuthenticate();
  const navigate = useNavigate();
  const { dispatch: dispatchAssets, state } = useAssets();

  useEffect(() => {
    fetchAssetsGroups({ dispatchAssets, token: cookies.token });
  }, []);

  if (state.isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.logoutButton}
          onClick={() => logoutHandler({ removeCookie, dispatch, navigate })}
        >
          خروج
        </button>
      </div>
      <AddAsset />
      <AssetsGroups />
    </div>
  );
};

export default Dashboard;
