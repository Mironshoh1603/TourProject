const form = async (oldPassword, newPassword, newPasswordConfirm) => {
  try {
    const data = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/updatePassword',
      data: {
        password: oldPassword,
        newPassword: newPassword,
        passwordConfirm: newPasswordConfirm,
      },
    });
    if (data.status == 200) {
      alert('Parolingiz yangilandi!');
    }
  } catch (err) {
    console.log(err);
  }
};

document
  .querySelector('.form-user-settings')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const oldPass = document.querySelector('#password-current').value;
    const newPass = document.querySelector('#password').value;
    const newPassConfirm = document.querySelector('#password-confirm').value;
    form(oldPass, newPass, newPassConfirm);
  });
