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

}

export default new RoomService();