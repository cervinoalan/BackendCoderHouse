const loggerTest = (req, res) => {
  console.log("asd")
  req.logger.fatal("Logger fatal");
  req.logger.error("Logger error ");
  req.logger.warning("Logger warning ");
  req.logger.info("Logger info");
  req.logger.http("Logger http");
  req.logger.debug("Logger debug");
  res.json({message:"Logger test"});
};

module.exports = loggerTest
