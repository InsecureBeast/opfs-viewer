import { BsFile, BsFillFolderFill, BsPencilSquare, BsRecycle, BsTrash } from "react-icons/bs";
import { FileObserverNodeType } from "./filesObserverNode";
import { IconContext } from "react-icons";

export class IconsRegistry {

  private static _iconsRegistry = new Map<string, JSX.Element>([
    [".pdf", <BsFillFolderFill /> ],
    [".doc", <BsFillFolderFill /> ],
    [".docx", <BsFillFolderFill /> ],
    [".jpg", <BsFillFolderFill /> ],
    [".jpeg", <BsFillFolderFill /> ],
    [".png", <BsFillFolderFill /> ],
    [".gif", <BsFillFolderFill /> ],
    [".html", <BsFillFolderFill /> ],
    [".htm", <BsFillFolderFill /> ],
    [".css", <BsFillFolderFill /> ],
    [".scss", <BsFillFolderFill /> ],
    [".ts", <BsFillFolderFill /> ],
    [".js", <BsFillFolderFill /> ],
  ]);


  static folderIcon = this.wrapIcon(<BsFillFolderFill />);
  static fileIcon = this.wrapIcon(<BsFile />);
  static deleteIcon = this.wrapIcon(<BsTrash/>);
  static editIcon = this.wrapIcon(<BsPencilSquare/>);

  static getIcon(type: FileObserverNodeType, name: string): JSX.Element {
    if (type === FileObserverNodeType.Directory)
      return this.folderIcon;
    else
      return this.fileIcon
  }

  private static wrapIcon(icon: JSX.Element): JSX.Element {
    return <IconContext.Provider value={{ className: "fo-icons" }}>
    {
      icon
    }
    </IconContext.Provider>;
  }
}