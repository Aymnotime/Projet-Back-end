document.getElementById('montrerFormulaireConnexion').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('conteneurConnexion').classList.add('actif');
  document.getElementById('conteneurInscription').classList.remove('actif');
});

document.getElementById('montrerFormulaireInscription').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('conteneurInscription').classList.add('actif');
  document.getElementById('conteneurConnexion').classList.remove('actif');
});

document.getElementById('formulaireConnexion').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailConnexion').value;
  const motDePasse = document.getElementById('motDePasseConnexion').value;

  if (!email || !motDePasse) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: motDePasse }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Connexion réussie ! Token : ' + data.token);
      localStorage.setItem('token', data.token);
    } else {
      alert('Échec de la connexion : ' + data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    alert('Erreur lors de la connexion');
  }
});

document.getElementById('formulaireInscription').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInscription').value;
  const motDePasse = document.getElementById('motDePasseInscription').value;

  if (!email || !motDePasse) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: motDePasse }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Inscription réussie !');
    } else {
      alert('Échec de l\'inscription : ' + data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    alert('Erreur lors de l\'inscription');
  }
});