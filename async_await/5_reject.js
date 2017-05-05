const fetch = require("node-fetch");

async function getGitHubUser(name) {
  const url = `https://api.github.com/users/${name}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

// getGitHubUser("uuzaixx")
//   .then(user => {
//     console.log(user.name)
//     console.log(user.location)
//   })
//   .catch(error => {
//     console.error(`Error: ${error.message}`)
//   });

async function showGitHubUser(name) {
  try {
    const user = await getGitHubUser(name);
    console.log(user.name)
    console.log(user.location)
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

showGitHubUser("uuzaixx")