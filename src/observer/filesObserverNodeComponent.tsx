import React from "react";
import { IFileObserverNode } from "./filesObserverNode";
import { IconsRegistry } from "./iconsProvider";

export interface FilesObserverNodeProps {
  node: IFileObserverNode;
  onClick: (node: IFileObserverNode) => void;
}

export const FilesObserverNode: React.FC<FilesObserverNodeProps> = (props) => {

  function handleClick(node: IFileObserverNode): void {
    props.onClick(node);
  }

  return (
    <tr className="border-b border-gray-200 font-normal" >
      <td className="px-4 py-3">
        <div onClick={() => handleClick(props.node)} className="flex cursor-pointer">
          <span className="mr-1 flex items-center">
            { IconsRegistry.getIcon(props.node.type, props.node.name) }
          </span>
          <span className=" hover:text-indigo-500">{ props.node.name }</span>
        </div>
      </td>
      <td className="px-4 py-3">{ props.node.modified.toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' }) }</td>
      <td className="px-4 py-3">{ props.node.size.toFixed(2) } Gb</td>
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