function observador() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Existe usuario activo");
      const uid = user.uid;
      console.log(user);
      let editStatus = false;

      const formulario = document.getElementById("formulario");
      const inputs = document.querySelectorAll("#formulario input");

      const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
      };

      const campos = {
        usuario: false,
        nombre: false,
        password: false,
        correo: false,
        telefono: false,
      };

      const validarFormulario = (e) => {
        switch (e.target.name) {
          case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
            break;
          case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
          case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
            break;
          case "password2":
            validarPassword2();
            break;
          case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
          case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
            break;
        }
      };

      const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
          document
            .getElementById(`grupo__${campo}`)
            .classList.remove("formulario__grupo-incorrecto");
          document
            .getElementById(`grupo__${campo}`)
            .classList.add("formulario__grupo-correcto");
          document
            .querySelector(`#grupo__${campo} i`)
            .classList.add("fa-check-circle");
          document
            .querySelector(`#grupo__${campo} i`)
            .classList.remove("fa-times-circle");
          document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.remove("formulario__input-error-activo");
          campos[campo] = true;
        } else {
          document
            .getElementById(`grupo__${campo}`)
            .classList.add("formulario__grupo-incorrecto");
          document
            .getElementById(`grupo__${campo}`)
            .classList.remove("formulario__grupo-correcto");
          document
            .querySelector(`#grupo__${campo} i`)
            .classList.add("fa-times-circle");
          document
            .querySelector(`#grupo__${campo} i`)
            .classList.remove("fa-check-circle");
          document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.add("formulario__input-error-activo");
          campos[campo] = false;
        }
      };

      inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
      });

      formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        if (
          campos.usuario &&
          campos.nombre &&
          campos.password &&
          campos.correo &&
          campos.telefono &&
        ) {
          formulario.reset();

          document
            .getElementById("formulario__mensaje-exito")
            .classList.add("formulario__mensaje-exito-activo");
          setTimeout(() => {
            document
              .getElementById("formulario__mensaje-exito")
              .classList.remove("formulario__mensaje-exito-activo");
          }, 5000);

          document
            .querySelectorAll(".formulario__grupo-correcto")
            .forEach((icono) => {
              icono.classList.remove("formulario__grupo-correcto");
            });
        } else {
          document
            .getElementById("formulario__mensaje")
            .classList.add("formulario__mensaje-activo");
        }
      });

      const updateTask = (updatedTask) =>
        db.collection("users").doc(uid).update(updatedTask);

      profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = profileForm["signup-username"];
        const phone = profileForm["signup-phone"];
        const name = profileForm["signup-name"];
        const lastname = profileForm["signup-lastname"];
        const address = profileForm["signup-address"];
        const city = profileForm["signup-city"];
        const country = profileForm["signup-country"];
        const postalCode = profileForm["signup-postalCode"];
        const wallet = profileForm["signup-wallet"];
        const walletId = profileForm["signup-walletId"];

        try {
          if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono &&) {
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
            });
            const alertProfile = `<div class="alert alert-success">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> Enhorabuena - </b> ¡Se ha actualizado su perfil con éxito!</span>
    </div>`;

            divProfile.innerHTML = alertProfile;
          } else {
          }

          editStatus = true;
          profileForm.reset();
          username.focus();
        } catch (error) {
          const alertProfile = `<div class="alert alert-danger">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> ¡Oh no! - </b> ${error}</span>
  </div>`;
          divProfile.innerHTML = alertProfile;
        }
      });
      // ...
    } else {
      location = "../com/login.html";
      // ...
    }
  });
}
observador();

async function logout() {
  return await firebase
    .auth()
    .signOut()
    .then(function () {
      location = "../index.html";
      console.log("Saliendo...");
    })
    .catch(function (error) {
      console.log(error);
    });
}

const divProfile = document.getElementById("profile-alert");
const divAlert = document.getElementById("div-alert");

function verificar() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      const alertProfile = `<div class="alert alert-success">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> Enhorabuena - </b> Se ha enviado con éxito, revise su correo electrónico por favor.</span>
  </div>`;

      divAlert.innerHTML = alertProfile;
      console.log("Email verification sent");
      // Email verification sent!
      // ...
    })
    .catch((error) => {
      const alertProfileD = `
    <div class="alert alert-danger">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> ¡Ups! - </b> ${error} </span>
  </div>
  `;

      divAlert.innerHTML = alertProfileD;
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

async function setupUI(user) {
  if (user) {
    const userCollection = (
      await db.collection("users").doc(user.uid).get()
    ).data();

    const checkEmail = user.emailVerified;
    const cardAuthor = document.getElementById("card-author");
    const profile = document.getElementById("form-perfil");
    const html = `
    <form>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <div class="form-group">
          <label>Correo Electrónico</label>
          <input type="text" class="form-control" disabled="" placeholder="Email..." value="${user.email}">
        </div>
      </div>
      <div class="col-md-3 px-md-1">
        <div class="form-group">
          <label>Usuario</label>
          <input type="text" class="form-control" disabled="" placeholder="Usuario..." value="${userCollection.username}">
        </div>
      </div>
      <div class="col-md-4 pl-md-1">
        <div class="form-group">
          <label for="exampleInputEmail1">Número de Teléfono</label>
          <input type="email" class="form-control" disabled="" placeholder="Número de Teléfono..." value="${userCollection.phone}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <div class="form-group">
          <label>Nombres</label>
          <input type="text" class="form-control" disabled="" placeholder="Nombres..." value="${userCollection.name}">
        </div>
      </div>
      <div class="col-md-6 pl-md-1">
        <div class="form-group">
          <label>Apellidos</label>
          <input type="text" class="form-control" disabled="" placeholder="Apellidos..." value="${userCollection.lastname}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label>Dirección Físcal</label>
          <input type="text" class="form-control" disabled="" placeholder="Dirección..." value="${userCollection.address}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <div class="form-group">
          <label>Ciudad</label>
          <input type="text" class="form-control" disabled="" placeholder="Ciudad..." value="${userCollection.city}">
        </div>
      </div>
      <div class="col-md-4 px-md-1">
        <div class="form-group">
          <label>País</label>
          <input type="text" class="form-control" disabled="" placeholder="País..." value="${userCollection.country}">
        </div>
      </div>
      <div class="col-md-4 pl-md-1">
        <div class="form-group">
          <label>Código Postal</label>
          <input type="text" class="form-control" disabled="" placeholder="Código Postal..." value="${userCollection.postalCode}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <div class="form-group">
          <label>Nombre de Wallet</label>
          <input type="text" class="form-control" disabled="" placeholder="Nombre de Wallet..." value="${userCollection.wallet}">
      </div>
      </div>
      <div class="col-md-8 pl-md-1">
        <div class="form-group">
          <label>Identificador de Wallet</label>
          <input type="text" class="form-control" disabled="" placeholder="Identificador de Wallet..." value="${userCollection.walletId}">
        </div>
      </div>
    </div>
  </form>
      `;

    profile.innerHTML = html;

    if (checkEmail == false) {
      const html = `
      <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="../assets/img/default-avatar.png" alt="...">
        <h5 class="title">${userCollection.name} ${userCollection.lastname}</h5>
      </a>
      <p class="description">
      ${userCollection.username}
      </p>
      </br>
      <p class="text-center">Verifique su correo electrónico:</p>
          <a class="btn btn-primary btn-block" href="#checkEmail">¡Verificame Ahora!</a>
    </div>
      `;
      cardAuthor.innerHTML = html;
    } else {
      const html = `
      <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="../assets/img/default-avatar.png" alt="...">
        <h5 class="title">${userCollection.name} ${userCollection.lastname}</h5>
      </a>
      <p class="description">
      ${userCollection.username}
      </p>
      </br>
      <h4>
      <i class="tim-icons icon-check-2"></i>
      Esta cuenta está verificada.
      </h4>
    </div>
      `;
      cardAuthor.innerHTML = html;
    }
  }
}

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    user.uid = idTokenResult.claims.uid;
    db.collection("users").onSnapshot(
      setupUI(user),
      (err) => {
        setupUI(user);
      },
      (err) => {}
    );
  } else {
    setupUI();
  }
});
