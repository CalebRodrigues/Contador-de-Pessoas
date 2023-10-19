
const firebaseConfig = {
  apiKey: "AIzaSyDltlxkxZUwdjCirA1JbJ8muDkCcSKOKZU",
  authDomain: "contador-f93ac.firebaseapp.com",
  projectId: "contador-f93ac",
  storageBucket: "contador-f93ac.appspot.com",
  messagingSenderId: "392718271466",
  appId: "1:392718271466:web:ef4e93f7fa8cc3bd072893"
};

firebase.initializeApp(firebaseConfig);

const totalPessoas = document.getElementById('totalPessoas');
const incrementarButton = document.getElementById('incrementar');

const totalRef = firebase.database().ref('total');

totalRef.on('value', (snapshot) => {
  const valorAtual = snapshot.val();
  totalPessoas.innerText = valorAtual; // Atualizar o valor exibido no HTML
});

incrementarButton.addEventListener('click', function() {
  totalRef.transaction(function(currentValue) {
    if (currentValue === null) {
      // O campo "total" não existe, então define com o valor inicial
      return 1;
    } else {
      // O campo "total" já existe, incrementa o valor atual
      return currentValue + 1;
    }
  }, function(error, committed, snapshot) {
    if (error) {
      console.error('Erro ao criar/atualizar o valor:', error);
    } else if (committed) {
      console.log('Valor criado/atualizado com sucesso:', snapshot.val());
    }
  });
});



