function getLoginFormInfo() {
  const email = loginForm["login-email"].value;
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
    location = '../dash/dashboard.html';
  } catch (ex) {
    const alertCatch = document.getElementById('alertLogin');
    const html = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <span class="alert-icon"><i class="ni ni-support-16"></i></span>
      <span class="alert-text"><strong>¡Oh no! -</strong> ${ex.message}</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    alertCatch.innerHTML = html;
  } finally {
  }
});