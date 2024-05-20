
import {useRef, ChangeEventHandler, useState} from "react";
import styles from "./Cover.module.css";
import { FileImage } from "../Components/FileImage";
import { uploadImage } from "../Utils/uploadImage";
import { supabase } from "../supabaseClient";

type CoverProps={
    filePath?: string,
    changePageCover: (filePath: string)=> void
};

export const Cover=({filePath, changePageCover}: CoverProps)=>{
    const [imageToDelete, setImageToDelete]=useState("")

    const deleteImageFromStorage=async(image: string)=>{
        await supabase.storage.from('images').remove([image]);
    }

    const fileInputRef=useRef<HTMLInputElement>(null);

    const onChangeCoverImage=()=>{
        fileInputRef.current?.click();
    };

    const onCoverImageUpload: ChangeEventHandler<HTMLInputElement>=async(event)=>{
        const target=event.target;
        const result=await uploadImage(target?.files?.[0]);

        if(result?.filePath){
            if(imageToDelete.length){
                deleteImageFromStorage(imageToDelete)
            }
            setImageToDelete(result.filePath);
            changePageCover(result.filePath);
        };
    };

    return (
        <div className={styles.cover}>
            {filePath ? (<FileImage className={styles.image} filePath={filePath} />) 
                : ( <img src="/ztm-notes.png" alt="Cover" className={styles.image} />)
            }
            <button className={styles.button} onClick={onChangeCoverImage}>Change Cover</button>
            <input onChange={onCoverImageUpload} style={{display: "none"}} ref={fileInputRef} type="file"/>
        </div>
    );
};