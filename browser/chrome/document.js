const getDocumentAll = require('@bin/documentAll').getDocumentAll;
const sdenv = require('sdenv-extend').sdenv();
const window = sdenv.memory.sdWindow;

window.document.all = getDocumentAll({ length: 3 });
