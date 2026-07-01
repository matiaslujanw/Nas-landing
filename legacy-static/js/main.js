// Menú mobile
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Botones "Quiero este servicio" -> pre-cargan el select del formulario
document.querySelectorAll('[data-service]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const service = btn.getAttribute('data-service');
    const select = document.getElementById('service');
    select.value = service;
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('name').focus({ preventScroll: true });
  });
});

// Formulario de contacto -> envía por mail a digitalamenitiessas@gmail.com
const CONTACT_EMAIL = 'digitalamenitiessas@gmail.com';
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const subject = `Consulta NAS Fitness Lab — ${service}`;
  const body =
    `Nombre: ${name}\n` +
    `Email: ${email}\n` +
    `WhatsApp/Teléfono: ${phone || '-'}\n` +
    `Servicio de interés: ${service}\n\n` +
    `Mensaje:\n${message || '-'}`;

  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  formNote.textContent = 'Se abrió tu app de mail con la consulta cargada. Si no se abrió, escribinos directo a ' + CONTACT_EMAIL;
  formNote.style.color = '#7D234A';
});
