const sendData = async (formData) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/v1/users/updateMe/',
      data: formData,
    });

    if (res.status === 201) {
      alert('Your data has been updated');

      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    alert(`Error: ${err.response.data.message}`);
  }
};

document.querySelector('.form-user-data').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const photo = document.querySelector('#photo').files[0];
  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('photo', photo);
  sendData(formData);
});
