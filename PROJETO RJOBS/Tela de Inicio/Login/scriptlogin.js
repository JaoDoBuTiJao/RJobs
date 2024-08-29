document.getElementById('login-button').addEventListener('click', function() {
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;

    
    var usuariosCadastrados = ['usuario1', 'usuario2']; 

    if (!usuariosCadastrados.includes(usuario)) {
        document.getElementById('error-message').style.display = 'block';
    } else {
        document.getElementById('error-message').style.display = 'none';
        
        alert('Login bem-sucedido');
    }
});
