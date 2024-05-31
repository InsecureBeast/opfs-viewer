import React from 'react';
import ReactDOM from 'react-dom/client';

import '../styles/devtools.scss';
import { IOpfsEntry } from './opfs/opfs';
import { Messages } from './data/messages';
import { Viewer, IViewerProps } from './viewer/components/viewerComponent';
import { sendMessage } from './data/messageSender';

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "OPFS Viewer",
    "",
    "devtools.html",
    async (/*panel*/) => {
      const inSecureContext = await sendMessage(Messages.CheckSecureContext);
      if (!inSecureContext) {
        createNotSupportedComponent();
        return;
      }
      await createComponent();
    }
  );
} else {
  createComponent();
}

async function getChildren(parent: string): Promise<IOpfsEntry[]> {
  return sendMessage(Messages.GetChildren, parent);
}

function onDelete(path:string): Promise<void> {
  return sendMessage(Messages.Delete, path);
}

async function createComponent(): Promise<void> {
  const props: IViewerProps = {
    parent: "Root",
    getChildren,
    onDelete
  };

  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <Viewer {...props}/>
    </React.StrictMode>
  );
}

function createNotSupportedComponent(): void {
  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <div>OPFS is not supported in an insecure context.</div>
    </React.StrictMode>
  );
}