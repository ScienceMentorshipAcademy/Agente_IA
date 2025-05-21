// Substitua pela sua URL do ngrok, exemplo: 'https://xxxxxx.ngrok.io/cadastrar'
const API_URL = 'https://5e84-34-72-31-212.ngrok-free.app/cadastrar';

const btnManual = document.getElementById('btnManual');
const btnNota = document.getElementById('btnNota');
const form = document.getElementById('materialForm');
const msgNota = document.getElementById('msgNota');
const msgDiv = document.getElementById('msg');
const respostaDiv = document.getElementById('resposta');

// Exibe o formulário manual e oculta a mensagem da nota fiscal
btnManual.onclick = function() {
  form.style.display = 'block';
  msgNota.style.display = 'none';
  respostaDiv.style.display = 'none';
  msgDiv.innerText = '';
  btnManual.classList.add('active');
  btnNota.classList.remove('active');
};

// Exibe mensagem para nota fiscal e oculta o formulário manual
btnNota.onclick = function() {
  form.style.display = 'none';
  respostaDiv.style.display = 'none';
  msgDiv.innerText = '';
  msgNota.innerText = 'Em breve você poderá cadastrar materiais enviando a foto da nota fiscal!';
  msgNota.style.display = 'block';
  btnNota.classList.add('active');
  btnManual.classList.remove('active');
};

// Por padrão, mostra o formulário manual ao carregar a página
window.onload = () => {
  btnManual.click();
};

form.onsubmit = async function(e) {
  e.preventDefault();
  const descricao = document.getElementById('descricao').value.trim();
  respostaDiv.style.display = 'none';
  msgDiv.innerText = 'Enviando...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao })
    });

    const data = await response.json();

    if (response.ok) {
      msgDiv.innerText = data.mensagem || 'Cadastro realizado!';
      if (data.mensagem && data.mensagem.toLowerCase().includes('sucesso')) {
        respostaDiv.innerHTML = `
          <strong>Descrição enviada:</strong><br>
          <pre>${descricao}</pre>
        `;
        respostaDiv.style.display = 'block';
      } else {
        respostaDiv.style.display = 'none';
      }
    } else {
      msgDiv.innerText = data.mensagem || 'Erro ao cadastrar.';
      respostaDiv.style.display = 'none';
    }
  } catch (error) {
    msgDiv.innerText = 'Erro de conexão com o servidor.';
    respostaDiv.style.display = 'none';
  }

  form.reset();
};