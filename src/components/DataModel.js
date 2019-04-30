import Axios from 'axios';


let latest='order=asc&sort=updated';

export function getUser(userName){
   return Axios.get(`https://api.github.com/users/${userName}`)
        .then(results => results.data)
        .catch( (error) => {console.log(error);});
}


export function getRepos(userName){
   return Axios.get(`https://api.github.com/users/${userName}/repos?${latest}`)
        .then(results=> results.data)
        .catch( (error) => {console.log(error);});
}

export function getUserProfile(userName){
        return Axios.all([getUser(userName),getRepos(userName)])
                .then((data)=>{
                        let user= data[0];
                        let repos= data[1];
                        return(calculateUserScore(user,repos))
                }
        )
}

function calculateUserScore(user,repos){
        let userScore=3*user.followers+user.public_repos;
        let repoScore=repos.reduce((stars,repo)=>{
                return stars+3*repo.stargazers_count+repo.watchers_count;
        },0)
        return {userName:user.login,score:userScore+repoScore,userdata:user};
}

export function githubWar(players){
        return Axios.all([getUserProfile(players[0]),getUserProfile(players[1])])
                .then(playerScores=>{
                        return playerScores.sort((a,b)=>{return b.score-a.score})
                })
                .catch((err)=>console.log(err.message)
        )
}

// githubWar(['sappusaketh','sa']).then(data=>console.log(data))