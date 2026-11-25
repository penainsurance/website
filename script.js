// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', open);
  });
  // Close the menu after tapping a link
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', false);
    })
  );
}

// Quote form: submit to Formspree without leaving the page
const form = document.querySelector('.quote-form');
if (form) {
  const btn = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const btnText = btn.textContent;

  // Texting requires the separate (optional) SMS consent box
  const method = form.querySelector('#contactMethod');
  const sms = form.querySelector('#smsConsent');
  const hint = form.querySelector('.consent-hint');
  const syncSms = () => {
    sms.required = method.value === 'Text';
    if (!sms.required || sms.checked) hint.hidden = true;
  };
  method.addEventListener('change', syncSms);
  sms.addEventListener('change', syncSms);
  sms.addEventListener('invalid', () => { hint.hidden = false; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      status.textContent = "Thank you! Your request was sent. I'll be in touch within one business day.";
      status.classList.add('success');
    } catch (err) {
      status.textContent = 'Sorry, something went wrong. Please call (303) 996-6509 or email epena2@farmersagent.com.';
      status.classList.add('error');
    } finally {
      btn.textContent = btnText;
      btn.disabled = false;
    }
  });
}
