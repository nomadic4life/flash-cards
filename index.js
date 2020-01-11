const app = require("./api-server");

app.listen(app.locals.port, () => {
  console.log(`listening on port ${app.locals.port}`);
});
