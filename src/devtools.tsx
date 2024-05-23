import React from 'react';
import ReactDOM from 'react-dom/client';
import { FilesObserver, IFileObserverProps } from './observer/filesObserverComponent';
import { FileObserverNodeType, IFileObserverNode } from './observer/filesObserverNode';

import '../styles/devtools.scss';
import { sortByNodeType } from './observer/sortingTools';

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "OPFS-Observer",
    "",
    "devtools.html",
    (/*panel*/) => {
      // Panel initialization logic here
      createComponent();
    }
  );
} else {
  createComponent();
}

function createComponent(): void {
  const items: IFileObserverNode[] = [];
  for (let index = 0; index < 10; index++) {
    const item: IFileObserverNode = {
      id: randomString(),
      modified: new Date(Date.now()),
      name: Math.random().toString(),
      size: Math.random(),
      type: Math.random() >= 0.5? 1 : 0
    };
    items.push(item);
  }

  const props: IFileObserverProps = {
    items: items.sort(sortByNodeType),
    breadcrumbs: []
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
