import React from 'react';
import ReactDOM from 'react-dom/client';
import { FilesObserver, IFileObserverProps } from './observer/filesObserverComponent';
import { FileObserverNodeType, IFileObserverNode } from './observer/filesObserverNode';

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

function createComponent(roots: IOpfsEntry[]): void {
  const items: IFileObserverNode[] = [];
  for (let index = 0; roots.length > index; index++) {
    const root = roots[index];
    const item: IFileObserverNode = {
      id: randomString(),
      modified: new Date(Date.now()),
      name: root.name,
      size: root.kind === OpfsKind.Directory ?  0: Math.random() * 100,
      type: root.kind === OpfsKind.Directory ?  FileObserverNodeType.Directory : FileObserverNodeType.File
    };
    items.push(item);
  }

  const props: IFileObserverProps = {
    items: items.sort(sortByNodeType),
    breadcrumbs: [ "Root" ]
  };

  ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
    <React.StrictMode>
      <FilesObserver {...props}/>
    </React.StrictMode>
  );
}

function randomString(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function loadTabRoots(): void {
  chrome.tabs.sendMessage(
    chrome.devtools.inspectedWindow.tabId,
    { message: 'getRoots' },
    (response) => {
      createComponent([]);
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
  createStructure();

  const roots = await opfs.getRoots();
  createComponent(roots);
}