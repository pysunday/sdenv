module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  [window.Navigation, window.navigation] = sdenv.tools.getNativeProto('Navigation', 'navigation', {
    canGoBack: false,
    canGoForward: false,
    oncurrententrychange: null,
    onnavigate: null,
    onnavigateerror: null,
    onnavigatesuccess: null,
    transition: null,
    currentEntry: {
      id: 'c72e7c89-2c22-47b6-86b8-e83db973ad22',
      index: 1,
      key: 'd6cc1590-0028-48e9-b6e7-b489d28d8481',
      ondispose: null,
      sameDocument: true,
      url: 'http://example.com',
    }
  });
}
