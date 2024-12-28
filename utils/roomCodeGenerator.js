export function generateRoomCode(length = 6) {
  const characters = "0123456789";
  let roomCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomCode += characters[randomIndex];
  }

  return roomCode;
}
