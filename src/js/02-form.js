import isEmail from 'validator/lib/isEmail';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

let formValues = {
  email: '',
  message: '',
};

try {
  const rawData = localStorage.getItem(STORAGE_KEY);
  
  if (rawData) {
    const savedForm = JSON.parse(rawData);
    
    // Verileri inputlara doldur
    email.value = savedForm.email?.trim() || '';
    textarea.value = savedForm.message?.trim() || '';
    
    formValues = {
      email: email.value,
      message: textarea.value,
    };
  }
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

  const currentEmail = email.value.trim();
  const currentMessage = textarea.value.trim();

  if (isEmail(currentEmail) && currentMessage !== '') {
    console.log({ email: currentEmail, message: currentMessage });
    
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formValues = { email: '', message: '' }; // Objeyi de sıfırla
    email.focus();
  } else if (!isEmail(currentEmail)) {
    alert('Please enter a valid email address.');
    email.focus();
  } else if (currentMessage === '') {
    alert('Please enter your message.');
    textarea.focus();
  }
}
