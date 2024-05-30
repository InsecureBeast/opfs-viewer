import React from 'react';
import ReactDOM from 'react-dom/client';

import '../styles/devtools.scss';
import { IOpfsEntry } from './opfs/opfsReader';
import { Messages } from './data/messages';
import { Filesviewer, IFileViewerProps } from './observer/filesViewerComponent';
import { sendMessage } from './data/messageSender';

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "OPFS-Viewer",
    "",
    "devtools.html",
    async (/*panel*/) => {
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
  const props: IFileViewerProps = {
    parent: "Root",
    getChildren,
    onDelete
  };

  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <Filesviewer {...props}/>
    </React.StrictMode>
  );
}