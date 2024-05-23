import { FilesObserverNode } from "./filesObserverNodeComponent";
import { IFileObserverNode } from "./filesObserverNode";
import { IconsRegistry } from "./iconsProvider";

export interface IFileObserverProps {
  items: IFileObserverNode[];
  breadcrumbs: string[];
}

export const FilesObserver: React.FC<IFileObserverProps> = (props) => {
  return (
  <div>
    {/* <a href="#" className="py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
      Add new 
      { IconsRegistry.plusIcon }
    </a> */}

    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="flex flex-wrap justify-start bg-transparent text-lg font-semibold text-gray-600 mb-0 space-x-1">
        {
          props.breadcrumbs.map((bs) => (
            <li key={bs}>
              <a href="#" className="hover:text-indigo-500 flex items-center">
                <span className="ltr:mr-2">{ bs }</span>
                {/* { IconsRegistry.breadcrumbsSeparator } */}
                /
              </a>
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
          props.items.map((item) => (
            <FilesObserverNode {...item} key={item.id} />
          ))
        }
      </tbody>
    </table>
  </div>
  );
};