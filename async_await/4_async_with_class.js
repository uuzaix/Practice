const fetch = require("node-fetch");

class GithubApiClient {
  async fetchUser(name) {
    const url = `https://api.github.com/users/${name}`;
    const response = await fetch(url);
    return await response.json();
  }

}

(async () => {
  const client = new GithubApiClient();
  const user = await client.fetchUser("uuzaix");
  console.log(user.name)
  console.log(user.location)
})();
