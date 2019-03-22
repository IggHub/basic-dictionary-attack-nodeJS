const dictionaryList = require('./dictionary_list.json');
const user = {};

const getRandomElementFromDictionary = (arr) => {
  const length = arr.length;
  return arr[Math.floor(Math.random() * length)]
};

user.username = getRandomElementFromDictionary(dictionaryList);
user.password = getRandomElementFromDictionary(dictionaryList);

const dumbServer = (username, password) => {
    if (user.username !== username) {
        return { success: false, reason: 'Invalid username' };
    } else if (user.password !== password) {
        return { success: false, reason: 'Invalid password' };
    } else {
        return { success: true };
    }
};

const smartServer = (username, password) => {
  if(user.username === username && user.password === password) {
    return {success: true, reason: 'Awesome!'}
  } else {
    return {success: false, reason: 'something went wrong'}
  }
}

const attackOn = (server) => {
  let done = false;
  let i = 0;
  let j = 0;
  let tries = 0;
  while(!done){
    let username = dictionaryList[i];
    let password = dictionaryList[j];
    let response = server(username, password);
    tries++;
    if(response.success) {
      done = true;
    }
    else if (response.reason === 'Invalid username') {
      i++;
    }
    else if (response.reason === 'Invalid password') {
      j++;
    } else {
      j++;
      if (j === dictionaryList.length) {
        j = 0;
        i++;
      }
    }
  }
  return tries;
}

console.time('dumbServer');
const dumbAttack = attackOn(dumbServer);
console.timeEnd('dumbServer');
console.log('dumb server tries: ', dumbAttack);

console.time('smartServer');
const smartAttack = attackOn(smartServer);
console.timeEnd('smartServer');
console.log('smart server tries: ', smartAttack);
