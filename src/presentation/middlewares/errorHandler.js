const errorHandler = (err, req, res, next) => {
  if (err?.message.includes('Not Found')) {
    req.logger.error(err.stack);
    return res.status(400).json({ message: err.message });
  }
  else if (err.message.includes('Already Exists')) {
    req.logger.warning(err.stack);
    return res.status(400).json({ message: err.message });
  }
  else if (err.message.includes('invalid')) {
    req.logger.warning(err.stack);
    return res.status(400).json({ message: err.message });
  }
  else if (err?.name.includes('Zodwarning')) {
    req.logger.warning(err.stack);
    return res.status(400).json({ message: err.issues });
  }

  req.logger.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;