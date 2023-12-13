import toast from "react-hot-toast";
import axios from "axios";
import { v4 } from "uuid";

const notify = (message, isSuccess) =>
  isSuccess ? toast.success(message) : toast.error(message);

const displayHandler = (setIsDisplay) => setIsDisplay((is) => !is);

const submitHandler = async ({
  event,
  assetGroup,
  code,
  asset,
  setInformation,
  token,
}) => {
  event.preventDefault();
  const id = v4();
  const assetGroupData = {
    id,
    name: assetGroup,
    parentId: id,
    code,
    isDeleted: false,
    children: [asset],
  };
  const assetData = {
    id,
    name: asset,
    groupId: id,
    code,
    isDeleted: false,
  };

  try {
    if (
      !assetGroup.trim().length ||
      !asset.trim().length ||
      !code.trim().length
    )
      return notify("پر کردن تمام فیلدها الزامی است");
    const response1 = await axios.post(
      "http://dtk.edlant.ir/api/AssetGroups/Add",
      assetGroupData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response2 = await axios.post(
      "http://dtk.edlant.ir/api/Assets/Add",
      assetData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ response1, response2 });
  } catch (err) {
    console.log(err);
  } finally {
    setInformation({ assetGroup: "", asset: "", code: "" });
  }
};

const fetchAssetsGroups = async ({ dispatchAssets, token }) => {
  dispatchAssets({ type: "PENDING" });
  try {
    const { data: assetGroupData } = await axios.get(
      "http://dtk.edlant.ir/api/AssetGroups/GetAll",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data: assetData } = await axios.get(
      "http://dtk.edlant.ir/api/Assets/GetAll",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatchAssets({
      type: "FULFILLED",
      payload: {
        assetsGroupsData: assetGroupData.data,
        assetsData: assetData.data,
      },
    });
  } catch (err) {
    dispatchAssets({ type: "REJECTED", payload: err.message });
    notify("خطا در داده‌های دریافتی");
  }
};

const logoutHandler = ({ removeCookie, dispatch, navigate }) => {
  removeCookie("token", { path: "/" });
  dispatch({ type: "AUTHENTICATE", payload: false });
  notify("با موفقیت خارج شدید", true);
  navigate("/", {
    replace: true,
  });
};

const loginHandler = async ({
  event,
  setCookies,
  navigate,
  setInformation,
  username,
  password,
  dispatch,
}) => {
  event.preventDefault();
  try {
    const { data } = await axios.get(
      `http://dtk.edlant.ir/api/Token/GetToken/${username}/${password}`
    );
    const { isAuthenticated, token } = data;
    if (!isAuthenticated) return notify("ورود شما با خطا مواجه شد");
    dispatch({ type: "AUTHENTICATE", payload: isAuthenticated });
    setCookies("token", token, { path: "/", maxAge: 3600 });
    navigate("dashboard", {
      replace: true,
    });
    return notify("با موفقیت وارد شدید", true);
  } catch (err) {
    console.log(err);
    notify("ورود شما با خطا مواجه شد");
  } finally {
    setInformation({ username: "", password: "" });
  }
};

export {
  displayHandler,
  submitHandler,
  fetchAssetsGroups,
  logoutHandler,
  loginHandler,
};
