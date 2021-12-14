const router = require("express").Router();

const ActivityModel = require("../models/Activity.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

<<<<<<< HEAD
const uploader = require("../config/cloudinary.config");

const salt_rounds = 10;

router.post("/upload", uploader.single("photo"));

=======
>>>>>>> 8b21ac41dd4f69993d1a4bce2dad569ee6691ea1
// cRud (READ) - HTTP GET
// Buscar todas as atividades
router.get(
  "/activities",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    console.log(req.headers);

    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const loggedInUser = req.currentUser;

      if (loggedInUser) {
        // Responder o cliente com os dados do usuário. O status 200 significa OK
        return res.status(200).json(await ActivityModel.find());
      } else {
        return res.status(404).json({ msg: "Atividades não encontradas." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// Pega os dados de uma atividade específica
router.get(
  "/activities/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    console.log(req.headers);

    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const loggedInUser = req.currentUser;

      if (loggedInUser) {
        // Responder o cliente com os dados da atividade. O status 200 significa OK
        return res
          .status(200)
          .json(await ActivityModel.findOne({ _id: req.params.id }));
      } else {
        return res.status(404).json({ msg: "Activity not found." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// Cria uma atividade nova
router.post("/activities", isAuthenticated, async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição

    console.log(req.body);

    // Inserir no banco
    const result = await ActivityModel.create(req.body);

    // Responder a requisição
    // Pela regra do REST, a resposta de uma inserção deve contar o registro recém-inserido com status 201
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edita uma atividade específica
router.patch(
  "/activities/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    console.log(req.headers);

    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const loggedInUser = req.currentUser;

      const result = await ActivityModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!result) {
        res.status(404).json({ msg: "Activity not found." });
      }

      // Responder o cliente com os dados da atividade. O status 200 significa OK
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// Deleta uma atividade específica
router.delete("/activities/:id", async (req, res) => {
  try {
    const result = await ActivityModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Activity not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
