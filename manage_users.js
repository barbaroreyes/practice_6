const fs = require("fs");
const path = require("path");

const USERS_FILE_PATH = path.resolve(__dirname, "usuarios.json");
const [,, command, userName] = process.argv;

class UserManager {
  static readUsers() {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  static writeUsers(users) {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  }

  static addUser(userName) {
    if (!userName) {
      console.error("Error: Please provide a username.");
      return;
    }
    const users = this.readUsers();
    users.push({ name: userName });
    this.writeUsers(users);
    console.log(`User '${userName}' added.`);
  }

  static listUsers() {
    const users = this.readUsers();
    if (users.length === 0) {
      console.log("No users found.");
      return;
    }
    console.log("User list:");
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
    });
  }

  static removeUser(userName) {
    if (!userName) {
      console.error("Error: Please provide a username.");
      return;
    }
    const users = this.readUsers();
    const updatedUsers = users.filter(user => user.name !== userName);
    if (updatedUsers.length === users.length) {
      console.error(`Error: User '${userName}' not found.`);
      return;
    }
    this.writeUsers(updatedUsers);
    console.log(`User '${userName}' removed.`);
  }

  static resetUsers() {
    this.writeUsers([]);
    console.log("All users have been removed.");
  }

  static executeCommand(command, userName) {
    switch (command) {
      case "add":
        this.addUser(userName);
        break;
      case "ls":
        this.listUsers();
        break;
      case "rm":
        this.removeUser(userName);
        break;
      case "reset":
        this.resetUsers();
        break;
      default:
        console.error('Error: Unrecognized command. Use "add", "ls", "rm", or "reset".');
    }
  }
}

UserManager.executeCommand(command, userName);







