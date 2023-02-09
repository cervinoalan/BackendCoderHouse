const socket = io();

const listChatsElement = document.getElementById("list-chats");

socket.on("init-chats", ({ chats }) => {
  console.log(chats);
  chats.forEach((chat) => {
    listChatsElement.innerHTML += `
		<li>${chat.username} - ${chat.message}</li>
		`;
  });
});

socket.on("add-message", (newMessage) => {
  listChatsElement.innerHTML += `<li>${newMessage.username} - ${newMessage.message}</li>`;
});
