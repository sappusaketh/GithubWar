import Axios from 'axios';

const id = '4f222f0a729e56486a58';
const sec = 'bcf861b19997f600bfe6c35342a4f40fa716c2d9';
const params = `?client_id=${id}&client_secret=${sec}`;
const latest = 'order=asc&sort=updated';

export function getUser(userName) {
  return Axios.get(`https://api.github.com/users/${userName}${params}`)
    .then(results => results.data)
    .catch(error => {
      console.log(error);
    });
}

export function getRepos(userName) {
  return Axios.get(
    `https://api.github.com/users/${userName}/repos${params}&${latest}`
  )
    .then(results => results.data)
    .catch(error => {
      console.log(error);
    });
}

function getLang(repo) {
  let url = repo + params;
  return Axios.get(url)
    .then(results => {
      return results.data;
    })
    .catch(err => console.log(err.message));
}

export function getUserProfile(userName) {
  return Axios.all([getUser(userName), getRepos(userName)]).then(data => {
    let user = data[0];
    let repos = data[1];
    return calculateUserScore(user, repos);
  });
}

function calculateUserScore(user, repos) {
  let userScore = 3 * user.followers + user.public_repos;
  let repoScore = repos.reduce((stars, repo) => {
    return stars + 3 * repo.stargazers_count + repo.watchers_count;
  }, 0);
  return { userName: user.login, score: userScore + repoScore, userdata: user };
}

export function githubWar(players) {
  return Axios.all([getUserProfile(players[0]), getUserProfile(players[1])])
    .then(playerScores => {
      return playerScores.sort((a, b) => {
        return b.score - a.score;
      });
    })
    .catch(err => console.log(err.message));
}

export function getPopularRepos(language) {
  let url = `https://api.github.com/search/repositories?q=stars:>1+language:${language}
        &sort=stars&order=desc&type=Repositories`;
  return Axios.get(url)
    .then(results => {
      return results.data.items;
    })
    .catch(err => console.log(err.message));
}

export async function getUserLanguage(userName) {
  let user_Repos = await getRepos(userName);
  let languages_Arr = await getLanguagesByRepoArr(user_Repos);
  let userLangObj = await getLangaugePercentage(languages_Arr);
  let data_Arr = await dataConversion(userLangObj); //for Donut chart
  return data_Arr;
}

async function getLanguagesByRepoArr(Repos) {
  if (Repos) {
    let languages = [];
    for (const Repo of Repos) {
      let Repo_lang = await getLang(Repo.languages_url);
      languages.push(Repo_lang);
    }
    return languages;
  } else {
    return null;
  }
}

function getLangaugePercentage(lang_Arr) {
  let languages = [];
  languages = lang_Arr;

  let finalLangobj = {};

  languages.forEach(lang => {
    for (let key in lang) {
      let keys = Object.keys(finalLangobj);
      let result = keys.indexOf(key);
      if (result !== -1) {
        finalLangobj[key] = finalLangobj[key] + lang[key];
      } else {
        finalLangobj[key] = lang[key];
      }
    }
  });
  let total = arraySum(Object.values(finalLangobj));
  for (let key in finalLangobj) {
    finalLangobj[key] = Math.round((finalLangobj[key] / total) * 100);
  }
  return finalLangobj;
}

function arraySum(array) {
  return array.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

function dataConversion(finalRepoObj) {
  let data_array = [];
  for (let key in finalRepoObj) {
    if (finalRepoObj[key] !== 0) {
      let newObj = {
        id: key,
        label: key,
        value: finalRepoObj[key]
      };
      data_array.push(newObj);
    }
  }
  return data_array;
}
