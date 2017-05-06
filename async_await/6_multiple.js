const fetch = require("node-fetch");

async function fetchFromGitHubUser(endpoint) {
  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}

// one after another
// async function showUserAndRepos(handle) {
//   const user = await fetchFromGitHubUser(`/users/${handle}`);
//   const repos = await fetchFromGitHubUser(`/users/${handle}/repos`);

//   console.log(user.name)
//   console.log(`${repos.length} repos`)
// }

// in nparallel
async function showUserAndRepos(handle) {
  const [user, repos] = await Promise.all([
    fetchFromGitHubUser(`/users/${handle}`),
    fetchFromGitHubUser(`/users/${handle}/repos`)
  ])

  console.log(user.name)
  console.log(`${repos.length} repos`)
}

showUserAndRepos("uuzaix");