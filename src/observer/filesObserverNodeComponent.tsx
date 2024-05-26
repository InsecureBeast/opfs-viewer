import React from "react";
import { FileObserverNodeType, IFileObserverNode } from "./filesObserverNode";
import { IconsRegistry } from "./iconsProvider";

export interface FilesObserverNodeProps {
  node: IFileObserverNode;
  onClick: (node: IFileObserverNode) => void;
}

export const FilesObserverNode: React.FC<FilesObserverNodeProps> = (props) => {

  function handleClick(node: IFileObserverNode): void {
    if (node.type === FileObserverNodeType.Directory)
      props.onClick(node);
  }

  return (
    <tr className="border-b border-gray-200 dark:border-neutral-800 font-normal" >
      <td className="px-4 py-3">
        <div onClick={() => handleClick(props.node)} className="flex cursor-pointer">
          <span className="mr-1 flex items-center">
            { IconsRegistry.getIcon(props.node.type, props.node.name) }
          </span>
          <span className=" hover:text-indigo-500">{ props.node.name }</span>
        </div>
      </td>
      <td className="px-4 py-3">{ props.node.modified }</td>
      <td className="px-4 py-3">{ props.node.size }</td>
      <td className="px-4 py-3 text-center">
        <a href="#" className="inline-block ltr:mr-2 rtl:ml-2 hover:text-red-500" title="Delete">
          { IconsRegistry.deleteIcon }
        </a>
        <a href="#" className="inline-block ltr:mr-2 rtl:ml-2 hover:text-green-500" title="Rename">
          { IconsRegistry.editIcon }
        </a>
      </td>
    </tr>
  );
};