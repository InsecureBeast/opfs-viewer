import { FilesObserverNode } from "./filesObserverNodeComponent";
import { IFileObserverNode } from "./filesObserverNode";

export interface IFileObserverProps {
  items: IFileObserverNode[];
  breadcrumbs: string[];
}

export const FilesObserver: React.FC<IFileObserverProps> = (props) => {
  return (<div>
    <h3 className="text-lg font-semibold text-gray-600 m-3">My Files</h3>

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