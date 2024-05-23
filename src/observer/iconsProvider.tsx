import {
  BsFile,
  BsFilePdf,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFillFolderFill,
  BsPencilSquare,
  BsTrash,
} from 'react-icons/bs';
import { FileObserverNodeType } from './filesObserverNode';
import { IconContext } from 'react-icons';

export class IconsRegistry {
  private static _iconsRegistry = new Map<string, JSX.Element>([
    ['pdf', this.wrapIcon(<BsFilePdf />, 'text-red-500')],
    ['doc', this.wrapIcon(<BsFiletypeDoc />, 'text-indigo-400')],
    ['docx', this.wrapIcon(<BsFiletypeDocx />, 'text-indigo-400')],
    /**
     * fill other files format
     */
  ]);

  static folderIcon = this.wrapIcon(<BsFillFolderFill />, 'text-indigo-500');
  static fileIcon = this.wrapIcon(<BsFile />, 'text-gray-500');
  static deleteIcon = this.wrapIcon(<BsTrash />);
  static editIcon = this.wrapIcon(<BsPencilSquare />);

  static getIcon(type: FileObserverNodeType, name: string): JSX.Element {
    if (type === FileObserverNodeType.Directory) return this.folderIcon;
    else return this.getIconByExt(name);
  }

  private static getIconByExt(name: string): JSX.Element {
    const ext = name.split('.').pop();
    if (!ext) return this.fileIcon;

    const icon = this._iconsRegistry.get(ext);
    return icon ?? this.fileIcon;
  }

  private static wrapIcon(
    icon: JSX.Element,
    colorClassName?: string,
  ): JSX.Element {
    return (
      <IconContext.Provider value={{ className: `fo-icons ${colorClassName}` }}>
        {icon}
      </IconContext.Provider>
    );
  }
}
