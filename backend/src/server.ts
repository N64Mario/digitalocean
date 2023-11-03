import api from "./api";
const port = 8080;
// welcome here 
api.listen(port, () => {
  console.log(`App running on this port ${port}`);
});
