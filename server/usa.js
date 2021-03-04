const url = '/scrapper';

fetch(url,
  {
    method: 'POST',
    body: 'OK',
  }).then((res) => {
  if (res.status !== 200) {
    return Promise.reject();
  }
  return res.json();
}).then((data) => {
  const content = document.getElementById('content');
  Object
    .entries(data)
    .map(([, { name, bday }]) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      const divName = document.createElement('div');
      divName.textContent = name;
      const divBday = document.createElement('div');
      divBday.textContent = bday;
      wrapper.appendChild(divName);
      wrapper.appendChild(divBday);
      return wrapper;
    })
    .forEach((el) => content.appendChild(el));
}).catch((err) => {
  console.error(err);
  throw err;
});
