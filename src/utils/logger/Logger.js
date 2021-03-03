import log from 'loglevel';

const logger = (internalLog = log, level) => {
  function getDefaultLevel() {
    return process.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG';
  }
  if (level === 'VERBOSE') {
    internalLog.setLevel('DEBUG');
  } else {
    internalLog.setLevel(level || getDefaultLevel());
  }
  function getFormattedMessage(message, lvl = '') {
    const lvlOutput = lvl ? ` ${lvl.toLowerCase()} |` : '';
    return internalLog.name
      ? `${internalLog.name} |${lvlOutput} ${message}`
      : message;
  }
  return {
    internalLog,
    setDefaultLevel: (lvl) => internalLog.setDefaultLevel(lvl),
    setLevel: (lvl, persist = false) => internalLog.setLevel(lvl, persist),
    enableAll: () => internalLog.enableAll(),
    disableAll: () => internalLog.disableAll(),
    getLevel: () => internalLog.getLevel(),
    log: (msg, lvl) => {
      if ((!lvl || lvl) === 'TRACE') {
        internalLog.trace(getFormattedMessage(msg, lvl));
      } else if (lvl === 'VERBOSE' && level === 'VERBOSE') {
        internalLog.debug(getFormattedMessage(msg, lvl));
      } else if (lvl === 'DEBUG') {
        internalLog.debug(getFormattedMessage(msg, lvl));
      } else if (lvl === 'INFO') {
        internalLog.info(getFormattedMessage(msg, lvl));
      } else if (lvl === 'WARN') {
        internalLog.warn(getFormattedMessage(msg, lvl));
      } else if (lvl === 'ERROR') {
        internalLog.error(getFormattedMessage(msg, lvl));
      }
    },
    trace(msg) {
      this.log(msg, 'TRACE');
    },
    verbose(msg) {
      this.log(msg, 'VERBOSE');
    },
    debug(msg) {
      this.log(msg, 'DEBUG');
    },
    info(msg) {
      this.log(msg, 'INFO');
    },
    warn(msg) {
      this.log(msg, 'WARN');
    },
    error(msg) {
      this.log(msg, 'ERROR');
      // logMessageToServer(msg);
    },
  };
};

export default function createLogger(name, level) {
  let internalLogger;
  if (name) {
    internalLogger = log.getLogger(name);
  }
  return logger(internalLogger, level);
}
