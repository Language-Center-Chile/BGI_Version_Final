/* ============================================================
   CONTACT FORM MODULE (n8n Webhook connection & validation)
   ============================================================ */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Reemplaza esta URL con tu webhook de n8n
  const N8N_WEBHOOK_URL = 'https://n8n-es8k0oos8kks4s8gc0gsw08w.72.62.165.86.sslip.io/webhook/69ad6d33-9216-4e35-a7c8-74c617904c42';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Capturar TODOS los inputs del formulario para enviar a n8n
    const formData = new FormData(form);
    const nombre = formData.get('nombre').trim();
    const email = formData.get('email').trim();
    const telefono = formData.get('telefono')?.trim() || ''; // Campo teléfono (si existe)
    const asunto = formData.get('asunto')?.trim() || ''; // Campo asunto (si existe)
    const mensaje = formData.get('mensaje').trim();
    
    const msgBox = document.getElementById('formMessage');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const submitBtn = document.getElementById('submitBtn');

    // Validaciones
    if (!nombre || !email || !mensaje) {
      showFormMessage(msgBox, 'Por favor, completa los campos obligatorios (nombre, correo y mensaje).', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormMessage(msgBox, 'Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }
    if (!isValidRealEmailDomain(email)) {
      showFormMessage(msgBox, 'Por favor, usa un correo electrónico de un proveedor válido. Ej: gmail.com, outlook.com, yahoo.com, etc.', 'error');
      return;
    }
    if (telefono && !isValidPhone(telefono)) {
      showFormMessage(msgBox, 'Por favor, ingresa un número de teléfono válido (9 dígitos).', 'error');
      return;
    }

    // Preparar payload completo para enviar a n8n
    const payload = {
      nombre,
      email,
      telefono,
      asunto: "Gracias por contactarte",
      mensaje,
      timestamp: new Date().toISOString(),
      origen: window.location.href
    };

    // Cambiar estado del botón mientras se envía
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    hideFormMessage(msgBox);

    try {
      // Enviar datos al webhook de n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al enviar el formulario');

      // Éxito: mostrar mensaje y resetear formulario
      btnText.textContent = 'Enviado';
      btnIcon.className = 'fa-solid fa-check';
      showFormMessage(msgBox, 'Gracias por escribirnos. Te contactaremos pronto.', 'success');
      form.reset();

    } catch (error) {
      // Error: mostrar mensaje de error
      btnText.textContent = 'Error';
      btnIcon.className = 'fa-solid fa-exclamation-triangle';
      showFormMessage(msgBox, 'Hubo un error al enviar tu mensaje. Inténtalo nuevamente o contáctanos por WhatsApp.', 'error');
    } finally {
      // Resetear botón después de 3 segundos
      setTimeout(function () {
        resetBtn(submitBtn, btnText, btnIcon);
      }, 3000);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate that email uses one of the allowed real provider domains
function isValidRealEmailDomain(email) {
  const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'proton.me'];
  const emailDomain = email.split('@')[1].toLowerCase();
  return allowedDomains.includes(emailDomain);
}

function isValidPhone(phone) {
  return /^\d{9}$/.test(phone);
}

function showFormMessage(el, text, type) {
  el.textContent = text;
  el.className = 'form-message ' + type;
}

function hideFormMessage(el) {
  el.className = 'form-message';
  el.textContent = '';
}

function resetBtn(btn, textEl, iconEl) {
  btn.disabled = false;
  textEl.textContent = 'Enviar mensaje';
  iconEl.className = 'fa-solid fa-paper-plane';
}
