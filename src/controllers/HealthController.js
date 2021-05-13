exports.index = (_, res) => {
  return res.status(200).json({
    message: 'API is running',
  });
}
