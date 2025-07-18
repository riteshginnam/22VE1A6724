const loggerMiddleware = {
  log: (message, data) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data
    };
    localStorage.setItem(`log-${Date.now()}`, JSON.stringify(logEntry));
  }
};

export default loggerMiddleware;
