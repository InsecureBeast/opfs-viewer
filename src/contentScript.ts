import { IMessageRequest, IRenameMessageData, Messages } from "./data/messages";
import { Opfs } from "./opfs/opfs";

const opfs = new Opfs();
opfs.init();

async function asyncFunctionWithAwait(request: IMessageRequest, sender: unknown, sendResponse: (response?: unknown) => void): Promise<void> {
  if (request.message === Messages.CheckSecureContext){
    sendResponse(self.isSecureContext);
    return;
  }

  if (request.message === Messages.Init) {
    await opfs.init();
    return;
  }
  if (request.message === Messages.GetChildren) {
    const children = await opfs.getChildren(request.data as string);
    sendResponse(children); 
    return;
  }

  if (request.message === Messages.Delete) {
    await opfs.delete(request.data as string)
    sendResponse();
    return;
  }

  if (request.message === Messages.Rename) {
    await opfs.rename(request.data as IRenameMessageData)
    sendResponse();
    return;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // https://stackoverflow.com/a/65405319/6255000
  asyncFunctionWithAwait(request, sender, sendResponse);
  return true;
});