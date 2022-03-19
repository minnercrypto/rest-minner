function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    // Navbar
    var itemsNavbar = document.getElementById('items-nav');
    itemsNavbar.innerHTML = `
    <li class="nav-item">
    <a class="nav-link nav-link-icon" href="https://www.facebook.com/minnercrypto21/" target="_blank" data-toggle="tooltip" title="Like us on Facebook">
      <i class="fa fa-facebook-square"></i>
      <span class="nav-link-inner--text d-lg-none">Facebook</span>
    </a>
    </li>
    <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://www.instagram.com/theminnercrypto" target="_blank" data-toggle="tooltip" title="Follow us on Instagram">
        <i class="fa fa-instagram"></i>
        <span class="nav-link-inner--text d-lg-none">Instagram</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://twitter.com/theminnercrypto" target="_blank" data-toggle="tooltip" title="Follow us on Twitter">
        <i class="fa fa-twitter-square"></i>
        <span class="nav-link-inner--text d-lg-none">Twitter</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="btn btn-outline-primary" href="" onclick="logout()">
        <span class="nav-link-inner--text">Cerrar Sesión</span>
      </a>
    </li>
    <li class="nav-item d-lg-block">
      <a href="./dash/dashboard.html" class="btn btn-primary btn-icon">
        <span class="btn-inner--icon">
        </span>
        <span class="nav-link-inner--text">Volver al Tablero</span>
      </a>
    </li>
    `;
    var itemsNavbar = document.getElementById('signupModal');
    itemsNavbar.innerHTML = `
    <div></div>
    `;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user);
  } else {
    // User is signed out
    console.log('No existe usuario activo');
    // ...
  }
});
}
observador();

async function logout(){
  return await firebase.auth().signOut()
  .then(function(){
    location = '#'
    console.log('Saliendo...')
  })
  .catch(function(error){
    console.log(error)
  });
}

async function setupUI(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach(el => (el.style.display = "block"));
    }
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const html = `
      
      `;

    accountDetails.innerHTML = html;
    loggedInMenu.forEach(menu => (menu.style.display = "block"));
    loggedOutMenu.forEach(menu => (menu.style.display = "none"));
  } else {
    quotesUl.innerHTML += "<h3 class='center-align'>Please, login to enjoy our quotes!</h3>";
    loggedInMenu.forEach(menu => (menu.style.display = "none"));
    loggedOutMenu.forEach(menu => (menu.style.display = "block"));
    adminItems.forEach(el => (el.style.display = "none"));
  }
}