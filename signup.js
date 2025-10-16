
document.addEventListener('DOMContentLoaded', function() {
  const email = document.querySelector('input[type="email"]');
  const button = document.querySelector('button.linky');
  if (email && button) {
    button.textContent = '';
    email.addEventListener('input', () => {
      if (email.validity.valid) {
        button.classList.add('enabled');
        button.textContent = 'Sign Up';
      } else {
        button.classList.remove('enabled');
        button.textContent = '';
      }
    });
  }
});
