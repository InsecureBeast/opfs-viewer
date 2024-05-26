import React from 'react';
import ReactDOM from 'react-dom/client';
import { FilesObserver, IFileObserverProps } from './observer/filesObserverComponent';

import '../styles/devtools.scss';
import { IOpfsEntry } from './opfs/opfsReader';
import { Messages } from './data/messages';

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "OPFS-Observer",
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
  return new Promise((resolve) => {
    if (!chrome.devtools) {
      resolve([]);
      return;
    }

    chrome.tabs.sendMessage(
      chrome.devtools.inspectedWindow.tabId,
      { 
        message: Messages.GetChildren, 
        data: parent,
      },
      (response => {
        resolve(response);
      })
    );
  });
}

async function createComponent(): Promise<void> {
  const props: IFileObserverProps = {
    parent: "Root",
    getChildren
  };

  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <FilesObserver {...props}/>
    </React.StrictMode>
  );
}