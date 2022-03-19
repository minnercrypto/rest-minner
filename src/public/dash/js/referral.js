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
    location = '../index.html'
    console.log('Saliendo...')
  })
  .catch(function(error){
    console.log(error)
  });
}

function verificar(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    console.log('Email verification sent');
    // Email verification sent!
    // ...
  });
}

const promo = document.getElementById("enlace");
const referral = document.getElementById("referral");
const referralActive = document.getElementById("referral-active");
async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();
    
    const prom = user.uid;
    const codeProm = prom.substr(0,6);
    const html = `
    ${codeProm}
  </div>
  `;
    promo.innerHTML = html;

    const nameComplet = userCollection.name + ' ' + userCollection.lastname; 
    idUser.innerHTML = nameComplet;

    referral.innerHTML = userCollection.referral;
    referralActive.innerHTML = userCollection.referralActive;
  } else {
  }
}

auth.onAuthStateChanged(async user => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    user.uid = idTokenResult.claims.uid;
    db.collection("users").onSnapshot(setupUI(user),
      err => {
        setupUI(user);
      },
      err => {}
    );
  } else {
    setupUI();
  }
});
