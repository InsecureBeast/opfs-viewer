import React from "react";
import { IFileObserverNode } from "./filesObserverNode";
import { IconsRegistry } from "./iconsProvider";

export const FilesObserverNode: React.FC<IFileObserverNode> = (item) => {
  return (
    <tr className="border-b border-gray-200 font-normal" >
      <td className="px-4 py-3">
        <a href="javascript:;" className="flex">
          <span className="mr-1 flex items-center">
            { IconsRegistry.getIcon(item.type, item.name) }
          </span>
          <span className=" hover:text-violet-400">{ item.name }</span>
        </a>
      </td>
      <td className="px-4 py-3">{ item.modified.toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' }) }</td>
      <td className="px-4 py-3">{ item.size } Gb</td>
      <td className="px-4 py-3 text-center">
        <a href="javascript:;" className="inline-block ltr:mr-2 rtl:ml-2 hover:text-red-500" title="Delete">
          { IconsRegistry.deleteIcon }
        </a>
        <a href="javascript:;" className="inline-block ltr:mr-2 rtl:ml-2 hover:text-green-500" title="Rename">
          { IconsRegistry.editIcon }
        </a>
      </td>
    </tr>
  );
};