const registerService = require('../services/registerService');

const register = async (req, res) => {
  try {
    const result = await registerService.registerUser(req.body);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration Failed" });
  }
};

module.exports = { register };