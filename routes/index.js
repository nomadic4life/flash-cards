module.exports = router => {
  router.get("/hello", (req, res) => {
    res.send("hello world!!!");
  });
  return router;
};
