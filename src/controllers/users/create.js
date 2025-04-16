export default (req, res) => {
    try {
      const body = req.body;
      console.log(req.json);
      res.send("create " + JSON.stringify(body));
    } catch (error) {
      console.log(error);
    }
  };