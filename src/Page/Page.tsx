
import { useFocusedNodeIndex } from "./useFocusNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../Node/NodeContainer";
import { Title } from "./Title" ;
import { nanoid } from "nanoid";
import { UseAppState } from "../State/AppStateContext";
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import styles from "../Utils/utils.module.css";

export const Page=()=>{
    const {title, nodes, addNode, cover, setCoverImage, reorderNodes, setTitle}=UseAppState();

    const [focusedNodeIndex, setFocusedNodeIndex]=useFocusedNodeIndex({
        nodes
    });

    const handleDragEvent=(event: DragEndEvent)=>{
        const { active, over }=event;
        if(over?.id && active.id !==over?.id){
            reorderNodes(active.id as string, over.id as string);
        }
    };

    return(
        <>
            <div className={styles.centeredFlex} style={{ width: "90vw"}}>
                <div>
                    <Cover filePath={cover} changePageCover={setCoverImage}/>
                </div>
            </div>
            <div>
                <Title addNode={addNode} title={title} changePageTitle={setTitle}/>
                    <DndContext onDragEnd={handleDragEvent}>
                    <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
                    {nodes.map((node, index)=>(
                        <NodeContainer
                            key={node.id}
                            node={node}
                            isFocused={focusedNodeIndex===index}
                            updateFocusedIndex={setFocusedNodeIndex}
                            index={index}
                        />
                    ))}
                    </SortableContext>
                    <DragOverlay/>
                    </DndContext>
                <div className={styles.centeredFlex} style={{ width: "90vw"}}>
                    <div>
                        <Spacer
                            handleClick={()=>{
                                addNode({id: nanoid(), type: "text", value:""}, nodes.length);
                            }}
                            showHint={!nodes.length}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};