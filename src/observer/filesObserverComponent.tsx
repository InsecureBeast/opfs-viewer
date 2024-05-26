import { FilesObserverNode } from "./filesObserverNodeComponent";
import { IFileObserverNode } from "./filesObserverNode";
import React, { useEffect, useState } from "react";
import { IOpfsEntry } from "../opfs/opfsReader";
import { OpfsEntryConverter } from "./entryConverter";
import { sortByNodeType } from "./sortingTools";

export interface IFileObserverProps {
  parent: string;
  getChildren: (parent: string) => Promise<IOpfsEntry[]>;
}

export const FilesObserver: React.FC<IFileObserverProps> = (props) => {
  const [parent, setParent] = useState(() => props.parent);
  const [items, setItems] = useState([] as IFileObserverNode[]);
  const [breadcrumbs, setBreadcrumbs] = useState([props.parent]);

  function onNodeClicked(node: IFileObserverNode): void {
    setParent(node.name);
    setBreadcrumbs([...breadcrumbs, node.name]);
  }

  function onBreadcrumbClicked(breadcrumb: string): void {
    if (breadcrumb === parent)
      return;
    
    setParent(breadcrumb);
    const index = breadcrumbs.indexOf(breadcrumb);
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
  }

  useEffect(() => {
    async function apiCall() {
      const children = await props.getChildren(parent)
      if (!children)
        return;
      setItems(children.map(child => OpfsEntryConverter.toObserverNode(child)).sort(sortByNodeType));
    }
    apiCall();
  }, [parent]);

  return (
  <div>
    {/* <a href="#" className="py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
      Add new 
      { IconsRegistry.plusIcon }
    </a> */}

    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="flex flex-wrap justify-start bg-transparent text-lg font-semibold text-gray-600 mb-0 space-x-1">
        {
          breadcrumbs.map((bs) => (
            <li key={bs}>
              <div className="hover:text-indigo-500 flex items-center cursor-pointer" onClick={() => onBreadcrumbClicked(bs)}>
                <span className="ltr:mr-2">{ bs }</span>
                {/* { IconsRegistry.breadcrumbsSeparator } */}
                /
              </div>
            </li>
          ))
        }
      </ol>
    </nav>

    <table className="table-auto min-w-full ltr:text-left rtl:text-right text-sm">
      <thead className="bg-violet-50">
        <tr>
          <th className="px-4 py-3 font-normal text-left">File name</th>
          <th className="px-4 py-3 font-normal text-left">Last modified</th>
          <th className="px-4 py-3 font-normal text-left">File size</th>
          <th className="px-4 py-3 font-normal text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        { 
          items.map((item) => (
            <FilesObserverNode node={item} key={item.id} onClick={onNodeClicked} />
          ))
        }
      </tbody>
    </table>
  </div>
  );
};