export default (req, res) => {
    try {
      const id = req.params.id;
      res.send("delete " + id);
    } catch (error) {}
  };