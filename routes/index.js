// import all routes here

module.exports = router => {
  // all routes are passed into router
  router.get("/hello", (req, res) => {
    res.send("hello world!!!");
  });
  return router;
};
