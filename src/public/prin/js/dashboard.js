function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    var uid = user.uid;
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

const idUser = document.getElementById('idUser');
const messageForm = document.getElementById("message-form");
const messageContainer = document.getElementById("message-container");
const usersContainer = document.getElementById("users-container");
const adminActive = "admin";
const clientNative = "native";
const clientActive = "active";
const clientInactivo = "inactivo";
const native = document.getElementById('native');
const active = document.getElementById('active');
const inactivo = document.getElementById('inactivo');

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const nameComplet = userCollection.name + ' ' + userCollection.lastname; 
    idUser.innerHTML = 'Bienvenid@ Cliente ' + nameComplet;
    const role = userCollection.role;
    if (role==clientActive) {
      active.style.display = "block";
      native.style.display = "none";
      console.log('Cliente Activo');
    } else {
      console.log('Cliente Nativo, por favor proceda a la activación de su cuenta.');
    }
    if (role==clientInactivo) {
      inactivo.style.display = "block";
      native.style.display = "none";
      console.log('Cliente Inactivo');
    } else {
      console.log('Cliente Nativo, por favor proceda a la activación de su cuenta.');
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