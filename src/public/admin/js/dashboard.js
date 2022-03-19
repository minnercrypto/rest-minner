function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
  }
});
}
observador();

      // First Command
      const credentialForm = document.getElementById('credential-form');
      const statusForm = document.getElementById('status-form');
      const emailCredential = credentialForm["input-credential-email"];
      const statusAcount = statusForm["input-status"];
      const balance = statusForm["input-balance"];
      const investment = statusForm["input-investment"];
      const date = statusForm["input-date"];
      const day = statusForm["input-day"];
      const ref = statusForm["input-ref"];
      const refActive = statusForm["input-ref-active"];
      const basic = statusForm["input-basic"];
      const basiCont = statusForm["input-basic-cont"];
      const standard = statusForm["input-standard"];
      const standardCont = statusForm["input-standard-cont"];
      const premium = statusForm["input-premium"];
      const premiumCont = statusForm["input-premium-cont"];
      const pro = statusForm["input-pro"];
      const proCont = statusForm["input-pro-cont"];
      const ultra = statusForm["input-ultra"];
      const ultraCont = statusForm["input-ultra-cont"];
      const mega = statusForm["input-mega"];
      const megaCont = statusForm["input-mega-cont"];
      let editStatus = false;

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

function showDateUser() {
  const nameProfile = document.getElementById('name-complet');
  nameProfile.innerHTML = nameComplet;

  const locationComplet = userCollection.city + ', ' + userCollection.country; 
  const locationProfile = document.getElementById('location-profile');
  locationProfile.innerHTML = locationComplet;

  const myProfile = document.getElementById('my-profile');
  myProfile.innerHTML = userCollection.my;
}

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    credentialForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        if (editStatus) {
          alert('No se ha realizado la acción.');
        } else {
          await showDateUser();
          alert('Se ha realizado la acción correctamente.');
        }
      } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error", error);
      }
    });
    // ...

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