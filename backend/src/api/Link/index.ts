export default (app: any) => {
  app.put("/update", require("./Update").default);
  app.get("/get/:id", require("./linkList").default);
  app.post("/save", require("./Create").default);
  app.delete("/delete/:id", require("./linkDelete").default);
};
