import '../styles/devtools.scss';

chrome.devtools.panels.create(
  "OPFS-Observer",
  "",
  "devtools.html",
  (/*panel*/) => {
    // Panel initialization logic here
  }
);