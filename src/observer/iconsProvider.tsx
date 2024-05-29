import {
  BsCardImage,
  BsChevronRight,
  BsDatabaseFill,
  BsFile,
  BsFileEarmarkImage,
  BsFilePdf,
  BsFileText,
  BsFileTextFill,
  BsFileWordFill,
  BsFileZip,
  BsFileZipFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypeSvg,
  BsFiletypeTxt,
  BsFillFileEarmarkPptFill,
  BsFillFileEarmarkWordFill,
  BsFillFolderFill,
  BsFillPlayBtnFill,
  BsMusicNoteBeamed,
  BsPencilSquare,
  BsPlus,
  BsTable,
  BsTrash,
} from 'react-icons/bs';
import { NodeType } from './INode';
import { IconContext } from 'react-icons';

export class IconsRegistry {
  private static _iconsRegistry = new Map<string, JSX.Element>([
    ['pdf', this.wrapIcon(<BsFilePdf />, 'text-red-500')],
    ['doc', this.wrapIcon(<BsFillFileEarmarkWordFill />, 'text-indigo-600')],
    ['docx', this.wrapIcon(<BsFillFileEarmarkWordFill />, 'text-indigo-600')],
    ['img', this.wrapIcon(<BsFileEarmarkImage />, 'text-violet-500')],
    ['zip', this.wrapIcon(<BsFileZipFill />, 'text-amber-400')],
    ['csv', this.wrapIcon(<BsTable />, 'text-green-600')],
    ['xls', this.wrapIcon(<BsTable />, 'text-green-600')],
    ['xlsx', this.wrapIcon(<BsTable />, 'text-green-600')],
    ['ppt', this.wrapIcon(<BsFillFileEarmarkPptFill />, 'text-rose-600')],
    ['pptx', this.wrapIcon(<BsFillFileEarmarkPptFill />, 'text-rose-600')],
    ['txt', this.wrapIcon(<BsFileTextFill />)],
    ['mp3', this.wrapIcon(<BsMusicNoteBeamed />, 'text-orange-300')],
    ['mp4', this.wrapIcon(<BsFillPlayBtnFill />, 'text-rose-500')],
    ['svg', this.wrapIcon(<BsFiletypeSvg />, 'text-violet-500')],
    ['db', this.wrapIcon(<BsDatabaseFill />, 'text-amber-400')],
    ['bm', this.wrapIcon(<BsDatabaseFill />, 'text-amber-400')],
    ['dbp', this.wrapIcon(<BsDatabaseFill />, 'text-amber-400')],

    /**
     * fill other files format
     */
  ]);

  static folderIcon = this.wrapIcon(<BsFillFolderFill />, 'text-amber-600');
  static fileIcon = this.wrapIcon(<BsFileText />, 'text-gray-500 dark:text-gray-400');
  static deleteIcon = this.wrapIcon(<BsTrash />);
  static editIcon = this.wrapIcon(<BsPencilSquare />);
  static plusIcon = this.wrapIcon(<BsPlus />);
  static breadcrumbsSeparator = this.wrapIcon(<BsChevronRight/>);

  static getIcon(type: NodeType, name: string): JSX.Element {
    return type === NodeType.Directory 
      ? this.folderIcon
      : this.getIconByExt(name);
  }

  private static getIconByExt(name: string): JSX.Element {
    let ext = name.split('.').pop();
    if (!ext) 
      return this.fileIcon;

    if (this.isImageFile(ext))
      ext = 'img';

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

  private static isImageFile(filename: string): boolean {
    return filename.match(/(jpg|jpeg|png|gif|ico)$/i) !== null;
  }
}
