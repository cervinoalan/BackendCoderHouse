class UserDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.cart = user.cart;
    this.rol = user.rol;
    this.documents = user.documents
    this.last_connection = user.last_connection
  }
}

module.exports = UserDto;
