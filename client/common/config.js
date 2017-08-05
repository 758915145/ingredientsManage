window.PATH = process.env.NODE_ENV==='development'?process.cwd():eval('__dirname');
window.FS = require('fs');
