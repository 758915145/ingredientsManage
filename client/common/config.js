window.PATH = process.env.NODE_ENV==='development'?process.cwd():__dirname;
window.FS = require('fs');
