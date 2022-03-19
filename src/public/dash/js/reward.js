function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    var uid = user.uid;
    console.log(user);
    // ...
  } else {
    location = '../com/login.html'
    // ...
  }
});
}
observador();

async function logout(){
  return await firebase.auth().signOut()
  .then(function(){
    location = '../com/login.html'
    console.log('Saliendo...')
  })
  .catch(function(error){
    console.log(error)
  });
}

const adminActive = "admin";
const clientNative = "native";
const ximeCode = "";
const franCode = "";
const rewardONE = document.getElementById('reward-one');

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const nameComplet = userCollection.name + ' ' + userCollection.lastname; 
    idUser.innerHTML = nameComplet;
    const refCode = userCollection.referralCode;
    if (refCode==franCode || refCode==ximeCode) {
      rewardONE.style.display = "block";
    } else {
      console.log('Usted no forma parte del sorteo.');
    }
}
}
  
  auth.onAuthStateChanged(async user => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      user.uid = idTokenResult.claims.uid;
      db.collection("users").onSnapshot(setupUI(user),
        err => {}
      );
    } else {
      setupUI();
    }
  });