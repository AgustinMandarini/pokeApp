const { Router } = require("express");
const {
  getPokemonsController,
} = require("../controllers/getPokemonsController");

const router = Router();

router.use("/getPokemons", async (req, res) => {
  const { url } = req.query;
  try {
    const pokemons = await getPokemonsController(url);
    return res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
