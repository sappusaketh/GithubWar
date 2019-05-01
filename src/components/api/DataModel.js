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

export function getPopularRepos(language){
        let url=`https://api.github.com/search/repositories?q=stars:>1+language:${language}
        &sort=stars&order=desc&type=Repositories`
        return Axios.get(url)
           .then((results)=>{return results.data.items} )
           .catch((err)=>console.log(err.message))
}

export function getUserLanguage(userName){
        getRepos(userName).then((data)=>{
                getLanguagesbyrepo(data)
        })
        
                
}

export async function getLanguagesbyrepo(languages){
        
        let promise= new Promise(function(resolve,reject){
                let language=[];
                languages.forEach((lang,i)=>{
                        Axios.get(lang.languages_url)
                          .then((res)=>{
                                language.push(res.data)
                                if(i===languages.length-1){
                                        resolve(language)
                                }
                          })
                })
        })
        let result=await promise
        return getLangaugePercentage(result)
}

function getLangaugePercentage(langs){
        let languages=[];
        languages=langs;
        // console.log(languages)
        let finalLangobj= {};
       
       languages.forEach((lang)=>{
                for(let key in lang){
                        let keys = Object.keys(finalLangobj)
                        let result=keys.indexOf(key)
                        if(result!==-1){
                                finalLangobj[key]=finalLangobj[key]+lang[key]      
                        }else{
                                finalLangobj[key]=lang[key]
                        }
                }
        // console.log(finalLangobj)
                
        })
        let total=arraySum(Object.values(finalLangobj))
        for(let key in finalLangobj){
                finalLangobj[key]=(finalLangobj[key]/total)*100;
        }
        console.log(finalLangobj)
        return finalLangobj;
        // console.log(c)
}
function arraySum(array){
        return array.reduce((acc,curr)=>{
                return acc+curr
        },0)
}
// getUserLanguage('sappusaketh')
// githubWar(['sappusaketh','sa']).then(data=>console.log(data))