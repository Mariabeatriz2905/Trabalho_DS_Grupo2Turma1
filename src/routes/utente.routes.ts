import { Router } from "express";
import { UtenteController } from "../controllers/utente.controller";

const router = Router();
const controller = new UtenteController();

router.get("/", (req, res) => controller.listar(req, res));
router.get("/:id", (req, res) => controller.buscarPorId(req, res));
router.post("/", (req, res) => controller.criar(req, res));
router.patch("/:id", (req, res) => controller.atualizar(req, res));
router.delete("/:id", (req, res) => controller.desativar(req, res));

export default router;