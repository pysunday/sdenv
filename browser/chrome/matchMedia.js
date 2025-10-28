module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;
  const { setFuncNative } = sdenv.tools;

  setFuncNative(window.MediaQueryList = function MediaQueryList() {
    throw new TypeError("Illegal constructor");
  });
  setFuncNative(window.matchMedia = function matchMedia(mediaQueryString) {
    const media = mediaQueryString.replace('/\s/g', '');
    return {
      __proto__: window.MediaQueryList.prototype,
      matches: [
        "(any-pointer:fine)",
        "(any-pointer)",
        "(any-hover:hover)",
        "(any-hover)",
        "(color-gamut:srgb)",
        "(color-gamut:p3)",
        "(color-gamut)",
      ].includes(media),
      media: media.replace(':', ': '),
      onchange: null
    }
  });
}
