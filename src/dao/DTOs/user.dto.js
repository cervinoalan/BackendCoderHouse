class UserDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.rol = user.rol;
    this.documents = user.documents
  }
}

module.exports = UserDto;
