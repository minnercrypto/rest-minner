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

const movining = document.getElementById('movin');
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
const planActive = document.getElementById('plan-active');

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const nameComplet = userCollection.name + ' ' + userCollection.lastname; 
    idUser.innerHTML = nameComplet;
    const role = userCollection.role;
    if (role==clientActive) {
      movining.style.display = "block";
      active.style.display = "block";
      native.style.display = "none";
      planActive.innerHTML = `
      <div class="col-xl-12 col-md-6">
      <div class="card card-stats">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0">Planes Activos:</h5>
              <span class="h2 font-weight-bold mb-0">${userCollection.plan}</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-gradient-yellow text-white rounded-circle shadow">
                <i class="fab fa-btc fach"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
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