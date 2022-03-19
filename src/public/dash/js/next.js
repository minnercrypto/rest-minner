function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    const uid = user.uid;
    console.log(user);
    let editStatus = false;

const saveTask = (phone, name, lastname) =>
  db.collection("users").doc().set({phone, name, lastname});

const updateTask = (updatedTask) => db.collection('users').doc(uid).update(updatedTask);

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = profileForm["input-phone"];
  const name = profileForm["input-first-name"];
  const lastname = profileForm["input-last-name"];
  try {
    if (editStatus) {
      await saveTask(phone.value, name.value, lastname.value);
    } else {
      await updateTask({
        phone: phone.value,
        name: name.value,
        lastname: lastname.value,
      });
      location = './dashboard.html';
    }
    
    editStatus = true;
    profileForm.reset();
    name.focus();
  } catch (error) {
    console.log(error);
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
