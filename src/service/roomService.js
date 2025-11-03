import roomRepository from "../repository/roomRepository.js";

class RoomService{

  async getRooms() {
    const rooms = await roomRepository.getAllRooms();

    return await Promise.all(rooms.map(async (room) => {
      const features = await roomRepository.getRoomFeatures(room.id);
      const image = await roomRepository.getRoomImage(room.id);
    
      let type = room.type.toLowerCase();
      if (!['dorm', 'private', 'suite'].includes(type)){
        type = 'indefinido';
      } 
      
      return{
        ...room,
        priceDisplay: `${room.price}`,
        type,
        features,
        image
      };

    }));
  }

  async getRoomId(id){
    const room = await roomRepository.getRoomId(id);

    if(!room) return null;

    const features = await roomRepository.getRoomFeatures(room.id);
    const imagem = await roomRepository.getRoomImage(room.id);

    let type = room.type.toLowerCase();
    if (!['dorm', 'private', 'suite'].includes(type)){
      type = 'indefinido';
    }

    return{
      ...room,
      priceDisplay: `${room.price}`,
      type,
      features,
      imagem
    }
  }

  async updateIdRoom(id, alteracao){
    const result = await roomRepository.updateRoom(id, alteracao);

    if(result.affectedRows === 0){
      return null;
    } 

    const room = await roomRepository.getRoomId(id);
    
    if (!room) return null;

    const features = await roomRepository.getRoomFeatures(room.id);
    const imagem = await roomRepository.getRoomImage(room.id);
    let type = room.type

    return{
      ...room,
      priceDisplay: `${room.price}`,
      type,
      features,
      imagem
    }
  }

  async postRoom(body) {
    // Validações mínimas
    if (!body?.titulo) throw new Error("titulo é obrigatório");
    if (typeof body.preco !== "number") throw new Error("preco (number) é obrigatório");
    if (typeof body.capacidade !== "number") throw new Error("capacidade (number) é obrigatória");
    if (typeof body.status !== "number") throw new Error("status (number) é obrigatório");
    if (!body?.tipo) throw new Error("tipo é obrigatório");

    const tipo = String(body.tipo || "").toLowerCase();
    body.tipo = ["dorm", "private", "suite", "indefinido"].includes(tipo) ? tipo : "indefinido";

    // Cria quarto (e imagem principal se vier)
    const newId = await roomRepository.createRoomWithOptionalImage(body);

    // Retorna o recurso recém-criado enriquecido (reuso dos seus getters)
    const room = await roomRepository.getRoomId(newId);
    const features = await roomRepository.getRoomFeatures(newId);
    const image = await roomRepository.getRoomImage(newId);

    return {
      ...room,
      priceDisplay: `$${room.price}`,
      type: (room.type || "").toLowerCase(),
      features,
      image
    };
  }

  // === POST /rooms/:id/images ===
  async addRoomImages(roomId, imagens) {
    if (!roomId) throw new Error("id do quarto é obrigatório");
    if (!imagens) throw new Error("payload de imagem é obrigatório");

    // Opcional: validar existência do quarto
    const exists = await roomRepository.getRoomId(roomId);
    if (!exists) throw new Error("Quarto não encontrado");

    await roomRepository.addImages(roomId, imagens);

   // Retorna somente as imagens principais/primeira, ou nada.
    // Aqui vou só confirmar que não deu erro; se quiser, busque e retorne a lista completa.
    return { ok: true };
  }

}

export default new RoomService();