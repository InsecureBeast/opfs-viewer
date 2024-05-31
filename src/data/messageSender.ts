
export function sendMessage<Data, ResponseData>(name: string, data?: Data): Promise<ResponseData> {
  return new Promise<ResponseData>((resolve) => {
    if (!chrome.devtools) {
      throw new Error("Chrome devtools is not available.");
    }

    chrome.tabs.sendMessage(
      chrome.devtools.inspectedWindow.tabId,
      { 
        message: name, 
        data: data,
      },
      ((response: ResponseData) => {
        resolve(response);
      })
    );
  });
}