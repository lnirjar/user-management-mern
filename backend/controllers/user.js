export const getUser = async (req, res) => {
  const user = req.user;
  res.json({ user });
};
