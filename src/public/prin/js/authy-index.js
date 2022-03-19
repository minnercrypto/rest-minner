signupForm.addEventListener("submit", async event => {
  event.preventDefault();

  try {
    const { email, password } = getSignupFormInfo();
    await signup(email, password);
    location = "./dash/next.html";
  } catch (ex) {
    alert("An error ocurred trying to signup: " + ex.message);
  } finally {
  }
});

function getSignupFormInfo() {
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  return { email, password };
}

async function signup(email, password) {
  const creds = await auth.createUserWithEmailAndPassword(email, password);
  return db
    .collection("users")
    .doc(creds.user.uid)
    .set({
      username: signupForm["signup-username"].value,
      email: signupForm["signup-email"].value,
      password: signupForm["signup-password"].value,
      referralCode: signupForm["signup-referral"].value,
      role: "native",
      balance: 0.00,
      investment: 0.00,
      referral: 0,
      referralActive: 0,
      numberPlan: 0,
      day: "0",
      date: 00/00/00,
      plan: "Sin Planes"
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