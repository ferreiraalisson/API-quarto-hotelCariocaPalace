import roomService from "../service/roomService.js";

class roomController {
  async listRooms(req, res, next) {
    try {
      const rooms = await roomService.getRooms();
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Erro ao buscar quartos" });
      next(error);
    }
  }

  async showRoomId(req, res, next) {
    let id = req.params.id;

    try {
      const isUuid = await roomService.getRoomId(id);

      if (!isUuid) {
        return res.status(404).json({ mensagem: "Quarto não encontrado" });
      } else {
        return res.status(200).json(isUuid);
      }
    } catch (error) {
      console.error("Erro ao buscar esse quarto em específico:", error);
      // res
      //   .status(500)
      //   .json({ erro: "Erro ao buscar esse quarto em específico" });
      next(error);
    }
  }

  async updateRoom(req, res, next) {
    let id = req.params.id;
    const atualizacao = req.body;

    try {
      const roomEdited = await roomService.updateIdRoom(id, atualizacao);

      if (!roomEdited) {
        return res.status(404).json({ erro: "Quarto não encontrado" });
      }
      res
        .status(200)
        .json({
          mensagem: "Quarto atualizado com sucesso",
          quarto: roomEdited,
        });
    } catch (error) {
      console.log(error);
      // res.status(500).json({ erro: "Erro ao atualizar quarto." });
      next(error);
    }
  }
}

export default new roomController();
