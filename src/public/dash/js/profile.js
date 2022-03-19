function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    var uid = user.uid;

const updateTask = (updatedTask) => db.collection('users').doc(uid).update(updatedTask);

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = profileForm["input-username"];
  const phone = profileForm["input-phone"];
  const name = profileForm["input-first-name"];
  const lastname = profileForm["input-last-name"];
  const address = profileForm["input-address"];
  const city = profileForm["input-city"];
  const country = profileForm["input-country"];
  const postalCode = profileForm["input-postal-code"];
  const wallet = profileForm["input-wallet"];
  const walletId = profileForm["input-address-wallet"];
  const my = profileForm["input-my"];

  try {
    if (username.value.length==0 || phone.value.length==0 || name.value.length==0 || lastname.value.length==0 || address.value.length==0 || city.value.length==0 || postalCode.value.length==0 || walletId.value.length==0 || my.value.length==0) {
      profileForm.reset();
      const alertProfile = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <span class="alert-icon"><i class="fas fa-exclamation-triangle"></i></span>
      <span class="alert-text"><strong> ¡Hey! -</strong> Debe de rellenar todos los campos requeridos.</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </div>`;
    
      divProfile.innerHTML = alertProfile;
    } else {
      await updateTask({
        username: username.value,
        phone: phone.value,
        name: name.value,
        lastname: lastname.value,
        address: address.value,
        city: city.value,
        country: country.value,
        postalCode: postalCode.value,
        wallet: wallet.value,
        walletId: walletId.value,
        my: my.value,
      });

      const alertProfile = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <span class="alert-icon"><i class="ni ni-like-2"></i></span>
    <span class="alert-text"><strong> ¡Enhorabuena! -</strong> Se ha actualizado su perfil con éxito.</span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
  </div>`;
  
    divProfile.innerHTML = alertProfile;
    }
    
    profileForm.reset();
    username.focus();
  } catch (error) {
    console.log(error);
    const alertProfile = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <span class="alert-icon"><i class="ni ni-like-2"></i></span>
    <span class="alert-text"><strong> ¡Oh no! -</strong> ${error}</span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
  </div>`;
    
      divProfile.innerHTML = alertProfile;
  }
});
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

const divProfile = document.getElementById('profile-alert');
const divAlert = document.getElementById('div-alert');

function verificar(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    const alertProfile = `<div class="alert alert-success">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> Enhorabuena - </b> Se ha enviado con éxito, revise su correo electrónico por favor.</span>
  </div>`;
  
    divAlert.innerHTML = alertProfile;
    console.log('Email verification sent');
    // Email verification sent!
    // ...
  })
  .catch((error) => {
    const alertProfileD = `
    <div class="alert alert-danger">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> ¡Oh no! - </b> ${error} </span>
  </div>
  `;
  
    divAlert.innerHTML = alertProfileD;
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
}

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();
    
      var inUsername = document.querySelector('#input-username');
      var inName = document.querySelector('#input-first-name');
      var inLastName = document.querySelector('#input-last-name');
      var inPhone = document.querySelector('#input-phone');
      var inAddress = document.querySelector('#input-address');
      var inCity = document.querySelector('#input-city');
      var inCountry = document.querySelector('#input-country');
      var inPostalCode = document.querySelector('#input-postal-code');
      var inWallet = document.querySelector('#input-wallet');
      var inAddressWallet = document.querySelector('#input-address-wallet');
      var InMy = document.querySelector('#input-my');

      inUsername.setAttribute("placeholder", userCollection.username);
      inName.setAttribute("placeholder", userCollection.name);
      inLastName.setAttribute("placeholder", userCollection.lastname);
      inPhone.setAttribute("placeholder", userCollection.phone);
      inAddress.setAttribute("placeholder", userCollection.address);
      inCity.setAttribute("placeholder", userCollection.city);
      inCountry.setAttribute("placeholder", userCollection.country);
      inPostalCode.setAttribute("placeholder", userCollection.postalCode);
      inWallet.setAttribute("placeholder", userCollection.wallet);
      inAddressWallet.setAttribute("placeholder", userCollection.walletId);
      InMy.innerHTML = userCollection.my;

    const nameComplet = userCollection.name + ' ' + userCollection.lastname; 
    idUser.innerHTML = nameComplet;

    const nameProfile = document.getElementById('name-complet');
    nameProfile.innerHTML = nameComplet;

    const locationComplet = userCollection.city + ', ' + userCollection.country; 
    const locationProfile = document.getElementById('location-profile');
    locationProfile.innerHTML = locationComplet;

    const myProfile = document.getElementById('my-profile');
    myProfile.innerHTML = userCollection.my;

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


