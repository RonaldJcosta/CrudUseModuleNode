const users = require('../mocks/users');


module.exports = {
  listUsers(request, response) {
    const {order} = request.query
    const sortedUsers = users.sort((a, b) => {
      if(order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },
  getUserById(request, response) {
    
    const {id} = request.params;

    const user = users.find((user) => user.id === Number(id));
    if(!user) {
      return response.send(400, {error: 'User Not Found !'});
    } 

    return response.send(200, user);
  },
  createUser(request, response) {
    const {body} = request;
    const lasUserId = users[users.length - 1].id;
    const newUser = {
      id: lasUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);

  }
}
