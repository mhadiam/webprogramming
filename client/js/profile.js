const container = document.querySelector('.container');
login = document.getElementById('login');
signup = document.getElementById('signup');

signup.addEventListener('click', () => {
  container.classList.add('active');
});

login.addEventListener('click', () => {
  container.classList.remove('active');
});
