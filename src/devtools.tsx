import React from 'react';
import ReactDOM from 'react-dom/client';
import { FilesObserver, IFileObserverProps } from './observer/filesObserverComponent';

import '../styles/devtools.scss';
import { sortByNodeType } from './observer/sortingTools';
import { IOpfsEntry, Opfs, OpfsKind } from './opfs/opfsReader';

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "OPFS-Observer",
    "",
    "devtools.html",
    (/*panel*/) => {
      // Panel initialization logic here
      //createComponent();
      //loadTabRoots();
      loadRoots();
    }
  );
} else {
  loadRoots();
}

// TODO:  move to conten script
async function createComponent(opfs: Opfs): Promise<void> {
  const props: IFileObserverProps = {
    items: [],
    breadcrumbs: [ "Root" ],
    parent: "Root",
    opfs: opfs
  };

  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <FilesObserver {...props}/>
    </React.StrictMode>
  );
}

function loadTabRoots(): void {
  chrome.tabs.sendMessage(
    chrome.devtools.inspectedWindow.tabId,
    { message: 'getRoots' },
    async (response) => {
      const opfs = new Opfs();
      await opfs.init();
      await createComponent(opfs);
    });
}

async function createStructure(): Promise<void> {
  const opfs = new Opfs();
  const root = await opfs.getRoot();
  await opfs.createDirectory(root, "Folder 1");
  await opfs.createDirectory(root, "Folder 2");
  const folder3 = await opfs.createDirectory(root, "Folder 3");
  opfs.createDirectory(folder3, "Folder 3.1");
}


async function loadRoots(): Promise<void> {
  const opfs = new Opfs();
  await opfs.init();
  createStructure();
  await createComponent(opfs);
}