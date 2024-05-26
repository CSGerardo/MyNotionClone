
import {NodeData} from "../Utils/types";
import {useRef, useEffect} from "react";
import styles from "./Title.module.css";
import { nanoid } from "nanoid";

type TitleProps = {
    title: string,
    changePageTitle(title: string): void ,
    addNode(node: NodeData, index: number): void
};

export const Title=({title, changePageTitle, addNode}: TitleProps)=>{
    const headerRef=useRef<HTMLHeadingElement>(null);

    useEffect(()=>{
        const isFocused=document.activeElement==headerRef.current;
        if(!isFocused && headerRef.current){
            headerRef.current.textContent=title;
        }
    }, [title]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}
                contentEditable
                ref={headerRef}
                suppressContentEditableWarning
                onInput={(event)=> changePageTitle(event.currentTarget.textContent || "")}
                onKeyDown={(event)=>{
                    if(event.key==="Enter"){
                        event.preventDefault();
                        addNode({id: nanoid(), type: "text", value: ""}, 0)
                    }
                }} 
            />
        </div>
    );
};