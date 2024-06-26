import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { IOpfsEntry } from "../../opfs/opfs";
import { OpfsEntryConverter } from "../entryConverter";
import { sortByNodeType } from "../sortingTools";
import { INode } from "../INode";
import { ViewerNode } from "../components/viewerNodeComponent";

import '../../tools/arrayTools';
import { IconsRegistry } from "../iconsProvider";

export interface IViewerProps {
  parent: string;
  getChildren: (parent: string) => Promise<IOpfsEntry[]>;
  onDelete(path: string): Promise<void>;
}

let interval: NodeJS.Timeout;
export const Viewer: React.FC<IViewerProps> = (props) => {
  const [parent, setParent] = useState(() => props.parent);
  const [items, setItems] = useState([] as INode[]);
  const [breadcrumbs, setBreadcrumbs] = useState([props.parent]);
  const [isLoading, setIsLoading] = useState(false);

  function isDark(): boolean {
    return (localStorage.theme === 'dark' || (!('theme' in localStorage) && 
            window.matchMedia('(prefers-color-scheme: dark)').matches));
  }

  function onNodeClicked(node: INode): void {
    setParent(node.name);
    setBreadcrumbs([...breadcrumbs, node.name]);
  }

  async function onNodeDeleted(node: INode): Promise<void> {
    const parents = breadcrumbs.join("/");
    const path = `${parents}/${node.name}`;
    await props.onDelete(path);
    items.remove(node);
    setItems([...items]);
  }

  function onNodeRenamed(node: INode, newName: string): void {
  }

  function onBreadcrumbClicked(breadcrumb: string): void {
    if (breadcrumb === parent)
      return;
    
    setParent(breadcrumb);
    const index = breadcrumbs.indexOf(breadcrumb);
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
  }

  async function updateChildrenSilent(): Promise<void> {
    const children = await getChildren(parent)
    setItems(children);
  }

  async function getChildren(parent: string): Promise<INode[]> {
    const children = await props.getChildren(parent)
      if (!children)
        return [];

      const sortedChildren = children
        .map(child => OpfsEntryConverter.toviewerNode(child))
        .sort(sortByNodeType);
      return sortedChildren;
  }

  useEffect(() => {
    async function apiCall() {
      setItems([]);
      setIsLoading(true);
      const children = await getChildren(parent)
      setIsLoading(false);
      setItems(children);
    }
    
    apiCall();
    
    if (interval)
      clearInterval(interval);
    interval = setInterval(updateChildrenSilent, 3000);

  }, [parent]);

  return (
  <div>
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="flex flex-wrap justify-start bg-transparent text-lg font-semibold text-gray-600 mb-0 space-x-1 dark:text-gray-200">
        {
          breadcrumbs.map((bs) => (
            <li key={bs}>
              <div className="hover:hover:text-amber-600 flex items-center cursor-pointer" onClick={() => onBreadcrumbClicked(bs)}>
                <span className="ltr:mr-2">{ bs }</span>
                <i className="pt-[3px]">{ IconsRegistry.breadcrumbsSeparator }</i>
              </div>
            </li>
          ))
        }
      </ol>
    </nav>

    <table className="table-auto min-w-full ltr:text-left rtl:text-right text-sm">
      <thead className="text-gray-600 dark:text-gray-400">
        <tr>
          <th className="pr-4 py-3 font-normal text-left">Name</th>
          <th className="px-4 py-3 font-normal text-left">Date modified</th>
          <th className="px-4 py-3 font-normal text-left">Size</th>
          <th className="px-4 py-3 font-normal text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        { 
          items.map((item) => (
            <ViewerNode node={item} key={item.id} 
                             onClick={onNodeClicked} 
                             onDelete={onNodeDeleted} 
                             onRename={onNodeRenamed}/>
          ))
        }
      </tbody>
    </table>
      {
        isLoading &&
          <Skeleton count={10} 
                    height={20} 
                    className="my-3" 
                    baseColor={ isDark() ? "#202020" : "#ebebeb"} 
                    highlightColor={ isDark() ? "#444" : "#f5f5f5"}/>
      }
  </div>
  );
};