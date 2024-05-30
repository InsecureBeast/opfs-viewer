import React, { useState } from "react";
import { IconsRegistry } from "./iconsProvider";
import { NodeType, INode } from "./INode";

export interface FilesViewerNodeProps {
  node: INode;
  onClick: (node: INode) => void;
  onDelete: (node: INode) => void;
  onRename: (node: INode, newName: string) => void;
}

export const FilesViewerNode: React.FC<FilesViewerNodeProps> = (props) => {
  const [isDeleting, setIsDeletenig]  = useState(false);

  function handleClick(node: INode): void {
    if (node.type === NodeType.Directory)
      props.onClick(node);
  }

  function handleDelete(node: INode): void {
    setIsDeletenig(true);
    props.onDelete(node);
  }

  function handleRename(node: INode, newName: string): void {
    props.onRename(node, newName);
  }

  return (
    <tr className="border-b border-gray-200 dark:border-neutral-800 font-normal" >
      <td className="pr-4 py-3 relative">
        <div onClick={() => handleClick(props.node)} 
             className="flex cursor-pointer">
          <span className="mr-1 flex">
            { IconsRegistry.getIcon(props.node.type, props.node.name) }
          </span>
          <span className="hover:text-amber-600">{ props.node.name }</span>
        </div>
        {
          isDeleting &&
          <div className='w-full absolute'>
            <div className='h-1 w-full dark:bg-neutral-800 overflow-hidden'>
              <div className='progress w-full h-full bg-amber-600 left-right'></div>
            </div>
          </div>
        }
        
      </td>
      <td className="px-4 py-3">{ props.node.modified }</td>
      <td className="px-4 py-3">{ props.node.size }</td>
      <td className="px-4 py-3 text-center">
        <button className="inline-block ltr:mr-2 rtl:ml-2 hover:text-red-500 cursor-pointer" 
              title="Delete"
              onClick={() => handleDelete(props.node)}
              disabled={isDeleting}>
          { IconsRegistry.deleteIcon }
        </button>
        {/* <span className="inline-block ltr:mr-2 rtl:ml-2 hover:text-green-500 cursor-pointer" 
              title="Rename"
              onClick={() => handleRename(props.node, "")}>
          { IconsRegistry.editIcon }
        </span> */}
      </td>
    </tr>
  );
};