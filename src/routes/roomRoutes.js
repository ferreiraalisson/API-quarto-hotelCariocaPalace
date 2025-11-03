import { Router } from "express";
import roomController from "../controllers/roomController.js";

const router = Router();

// GET
router.get("/api/quarto", (req, res, next) => 
  roomController.listRooms(req, res, next)
);

// GET ID
router.get("/api/quarto/:id", (req, res, next) =>
  roomController.showRoomId(req, res, next)
);

// UPDATED
router.patch("/api/quarto/update/:id", (req, res, next) =>
  roomController.updateRoom(req, res, next)
);

// POST
router.post("/api/quarto/create", (req, res, next) =>
  roomController.createRoom(req, res, next)
)

router.post('/rooms/:id/images', (req, res, next) => 
  roomController.addImages(req, res, next)
);

// DELETE 
router.delete("/api/quarto/delete/:id", (req, res, next) =>
  roomController.deleteRoom(req, res, next)
)

export default router;
