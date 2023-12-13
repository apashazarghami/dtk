import { useState } from "react";
import TextInput from "./TextInput";
import { IoIosArrowDown } from "react-icons/io";
import styles from './AddAsset.module.css'
import { v4 } from 'uuid';
import axios from "axios";
import { useCookies } from "react-cookie";
import { notify } from "../pages/Login";

const AddAsset = () => {
    const [information, setInformation] = useState({
        assetGroup: '',
        asset: '',
        code: ''
    })
    const [isDisplay, setIsDisplay] = useState(false);
    const [cookies] = useCookies(['token']);
    const { assetGroup, asset, code } = information;

    const displayHandler = () => setIsDisplay(is => !is);

    const submitHandler = async (event) => {
        event.preventDefault();
        const id = v4();
        const assetGroupData = {
            id,
            name: assetGroup,
            parentId: id,
            code,
            isDeleted: false,
            children: [asset]
        }

        const assetData = {
            id,
            name: asset,
            groupId: id,
            code,
            isDeleted: false
        }
        
        try {
            if(assetGroup.trim().length || asset.trim().length || code.trim().length) return notify('پر کردن تمام فیلدها الزامی است')
            const response1 = await axios.post('http://dtk.edlant.ir/api/AssetGroups/Add', assetGroupData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            const response2 = await axios.post('http://dtk.edlant.ir/api/Assets/Add', assetData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            

            console.log({ response1, response2 })
        } catch(err) {
            console.log(err)
        } finally {
            setInformation({ assetGroup: '', asset: '', code: ''})
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.addAssetContainer}>
                <div className={styles.addAssetTitle} onClick={displayHandler}>
                    <span>ایجاد دارایی‌ جدید</span>
                    <IoIosArrowDown className={isDisplay ? styles.upArrow : styles.downArrow} />
                </div>
                <form onSubmit={submitHandler} className={`${isDisplay ? styles.formFlex : styles.formNone}`}>
                    <TextInput {...{ value: assetGroup, name: 'assetGroup', setInformation, type: 'text', placeholder: 'دسته دارایی را وارد کنید' }} />
                    <TextInput {...{ name: 'asset', value: asset, setInformation, type: 'text', placeholder: 'نام دارایی را وارد کنید' }} />
                    <TextInput {...{ name: 'code', value: code, setInformation, type: 'text', placeholder: 'کد مربوط به دارایی را وارد کنید' }} />
                    <button type="submit" className={styles.submitButton}>افزودن</button>
                </form>
            </div>
        </div>
    )
}

export default AddAsset;