import React from "react";
import { IObserverNode } from "./observerNode";

export interface IFileItem extends IObserverNode {
  size: number;
}

export const FileItem: React.FC<IFileItem> = (item) => {
  return (
    <tr>
      <td className="text-truncate">{ item.name }</td>
      <td className="text-truncate">{ item.modified.toLocaleDateString() }</td>
      <td className="text-truncate">{ item.type }</td>
      <td className="text-truncate">{ item.size }</td>
    </tr>
  );
};