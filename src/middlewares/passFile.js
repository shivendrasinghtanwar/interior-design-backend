const formidable = require('formidable');
const errors = require('../utils/errors');

const { resMsg, supportedFileFormats, documentNames } = require('../../config/constants/reportUploader');

const fileOp = {
  parseFiles(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return next(new errors.OperationalError(resMsg.ERROR_FILE_UPLOADING));
      if (Object.keys(files).length !== 1) {
        return next(new errors.OperationalError(resMsg.ONE_FILE));
      }
      const [file] = Object.values(files);
      if (supportedFileFormats.indexOf(file.type) < 0) {
        return next(new errors.OperationalError(resMsg.UNSUPPORTED_FILE));
      }
      const [fileName] = Object.keys(files);
      const supportedNames = Object.values(documentNames);
      if (supportedNames.indexOf(fileName) < 0) {
        return next(new errors.OperationalError(resMsg.INVALID_DOC));
      }
      req._fileData = { files, fields, fileName };
      return next();
    });
  }
};

module.exports = fileOp;
