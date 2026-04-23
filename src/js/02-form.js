import isEmail from 'validator/lib/isEmail';
//**
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

let formValues = {};

try {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  email.value = savedForm.email?.trim() || '';
  textarea.value = savedForm.message?.trim() || '';
} catch (err) {
  console.log('Storage parse error name    : ', err.name);
  console.log('Storage parse error message : ', err.message);
}

form.addEventListener('input', () => {
  formValues = {
    email: email.value.trim(),
    message: textarea.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  formValues = {
    email: email.value.trim(),
    message: textarea.value.trim(),
  };

  if (isEmail(email.value) && textarea.value !== '') {
    console.log(formValues);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    email.focus();
  } else if (!isEmail(email.value)) {
    alert('Please enter a valid email address.');
    return email.focus();
  } else if (textarea.value === '') {
    alert('Please enter your message.');
    return textarea.focus();
  }
}
