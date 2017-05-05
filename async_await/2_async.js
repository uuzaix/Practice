const fetch = require("node-fetch");

async function getGitHubUser(name) {
  const url = `https://api.github.com/users/${name}`;
  const response = await fetch(url);
  const user = await response.json()

  console.log(user.name);
  console.log(user.location);
}

getGitHubUser("uuzaix");