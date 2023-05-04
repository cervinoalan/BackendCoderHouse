const winston = require("winston");

const OptionWinston = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "grey",
  },
};

const loggerDevelop = winston.createLogger({
  levels: OptionWinston.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: OptionWinston.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "./errors.log",
      format: winston.format.simple(),
    }),
  ],
});

const loggerProduction = winston.createLogger({
  levels: OptionWinston.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: OptionWinston.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "./errors.log",
      format: winston.format.simple(),
    }),
  ],
});

const mdwLogger = (req, res, next) => {
  req.logger = loggerDevelop;
  req.logger.http(`${req.method} en ${req.url} - Testeo`);
  next();
};

module.exports = mdwLogger;
