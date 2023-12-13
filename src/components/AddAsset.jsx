import { useState } from "react";
import TextInput from "./TextInput";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../styles/AddAsset.module.css";
import { useCookies } from "react-cookie";
import { displayHandler, submitHandler } from "../utilities/functions";

const AddAsset = () => {
  const [information, setInformation] = useState({
    assetGroup: "",
    asset: "",
    code: "",
  });
  const [isDisplay, setIsDisplay] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { assetGroup, asset, code } = information;

  return (
    <div className={styles.container}>
      <div className={styles.addAssetContainer}>
        <div
          className={styles.addAssetTitle}
          onClick={() => displayHandler(setIsDisplay)}
        >
          <span>ایجاد دارایی‌ جدید</span>
          <IoIosArrowDown
            className={isDisplay ? styles.upArrow : styles.downArrow}
          />
        </div>
        <form
          onSubmit={(event) =>
            submitHandler({
              event,
              assetGroup,
              code,
              asset,
              setInformation,
              token: cookies.token,
            })
          }
          className={`${isDisplay ? styles.formFlex : styles.formNone}`}
        >
          <TextInput
            {...{
              value: assetGroup,
              name: "assetGroup",
              setInformation,
              type: "text",
              placeholder: "دسته دارایی را وارد کنید",
            }}
          />
          <TextInput
            {...{
              name: "asset",
              value: asset,
              setInformation,
              type: "text",
              placeholder: "نام دارایی را وارد کنید",
            }}
          />
          <TextInput
            {...{
              name: "code",
              value: code,
              setInformation,
              type: "text",
              placeholder: "کد مربوط به دارایی را وارد کنید",
            }}
          />
          <button type="submit" className={styles.submitButton}>
            افزودن
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
