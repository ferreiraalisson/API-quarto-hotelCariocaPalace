import { Router } from "express";
import roomController from "../controllers/roomController.js";

const router = Router();

// GET
router.get("/api/quarto", (req, res) => roomController.listRooms(req, res));

// GET ID
router.get("/api/quarto/:id", (req, res) =>
  roomController.showRoomId(req, res)
);

// PUT
router.put("/api/quarto/:id", (req, res) =>
  roomController.updateRoom(req, res)
);

export default router;
