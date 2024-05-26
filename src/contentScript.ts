import { MessageRequest, Messages } from "./data/messages";
import { Opfs } from "./opfs/opfsReader";

const opfs = new Opfs();
opfs.init();

async function asyncFunctionWithAwait(request: MessageRequest, sender: unknown, sendResponse: (response?: unknown) => void): Promise<void> {
  if (request.message === Messages.Init) {
    await opfs.init();
    console.log("init")
    return;
  }
  if (request.message === Messages.GetChildren) {
    const children = await opfs.getChildren(request.data as string);
    sendResponse(children); 
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // https://stackoverflow.com/a/65405319/6255000
  asyncFunctionWithAwait(request, sender, sendResponse);
  return true;
});

async function createStructure(): Promise<void> {
  const opfs = new Opfs();
  const root = await opfs.getRoot();
  await opfs.createDirectory(root.name, "Folder 1");
  await opfs.createDirectory(root.name, "Folder 2");
  const folder3 = await opfs.createDirectory(root.name, "Folder 3");
  opfs.createDirectory(folder3.name, "Folder 3.1");
  opfs.createFile(root.name, "file 1");
} 