function getLoginFormInfo() {
  const email = "thecryptominner@gmail.com";
  const password = loginForm["login-password"].value;

  return { email, password };
}

async function login(email, password) {
  return await auth.signInWithEmailAndPassword(email, password);
}

async function logout() {
  return await auth.signOut();
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const { email, password } = getLoginFormInfo();
    await login(email, password);
    location = "./admin.html";
  } catch (ex) {
    alert("¡Oh no! Ha ocurrido un error: " + ex.message);
  } finally {
  }
});

function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Redirect to Dashboard
    location = './admin.html'
    // ...
  } else {
    // User is signed out
    console.log('No existe usuario activo');
    // ...
  }
});
}
observador();