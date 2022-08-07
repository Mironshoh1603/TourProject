document
  .querySelector('.nav__el--logout')
  .addEventListener('click', async (e) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/logout',
        data: {},
      });
      console.log(res);

      if (res.status === 200) {
        alert('you have logout');
        window.setTimeout(() => {
          location.assign('/login');
        }, 500);
      }
    } catch (err) {
      console.log(err.response.data.message);
      alert(`Error: ${err.response.data.message}`);
    }
  });
