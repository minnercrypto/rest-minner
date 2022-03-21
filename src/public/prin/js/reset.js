const mailField = document.getElementById('mail');
const labels = document.getElementsByTagName('label');
const resetPassword = document.getElementById('resetPassword');

//auth.languageCode = 'DE_de';

auth.useDeviceLanguage();

const resetPasswordFunction = () => {
    const email = mailField.value;

    auth.sendPasswordResetEmail(email)
    .then(() => {
        const alertDiv = document.getElementById('alert-forgot');
        alertDiv.innerHTML = `
        <div class="alert alert-info" role="alert">
            <strong>¡Atención! -</strong> Revise su bandeja de entrada, se ha enviado un metodo de restablecimiento.
        </div>
        `;
    })
    .catch(error => {
        const alertDiv = document.getElementById('alert-forgot');
        alertDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <strong>¡Oh no! -</strong> ${error}
        </div>
        `;
    })
}


resetPassword.addEventListener('click', resetPasswordFunction);