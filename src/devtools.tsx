import React from 'react';
import {FilesObserver} from './observer/filesObserverComponent';
import ReactDOM from 'react-dom/client';

import '../styles/devtools.scss';

// chrome.devtools.panels.create(
//   "OPFS-Observer",
//   "",
//   "devtools.html",
//   (/*panel*/) => {
//     // Panel initialization logic here
//     const props: string[] = [];

//     ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
//       <React.StrictMode>
//         <FilesObserver items={props}/>
//       </React.StrictMode>
//     );
//   }
// );

const props: string[] = [];

    ReactDOM.createRoot(document.getElementById('react-container') as HTMLElement).render(
      <React.StrictMode>
        <FilesObserver items={props}/>
      </React.StrictMode>
    );