$(document).ready(function() {

  function formatarCPF(cpf) {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
  }

  $("#telefone").inputmask("(99) 99999-9999", {
    greedy: false,
    definitions: {
      '9': {
        validator: "[0-9]",
        cardinality: 1
      }
    },
    onBeforePaste: function(pastedValue, options) {
      return pastedValue.replace(/[^0-9]/g, "");
    }
  });

  $("#telefone").on("change", function() {
    var phoneLength = $(this).val().replace(/[^0-9]/g, "").length;
    $(this).toggleClass("error", phoneLength !== 11);
    $("#telefone-error").text(phoneLength !== 11 ? "Número de telefone inválido (11 dígitos)" : "");
  });

  $("#senha, #confirmarsenha").on("keyup", function() {
    var senha = $("#senha").val();
    var confirmarsenha = $("#confirmarsenha").val();

    var senhaError = senha.length < 8 ? "Senha deve ter no mínimo 8 caracteres" : "";
    var confirmarSenhaError = senha !== confirmarsenha ? "Senhas não coincidem" : "";

    $("#senha-error").text(senhaError);
    $("#confirmarsenha-error").text(confirmarSenhaError);
    $("#senha, #confirmarsenha").toggleClass("error", senha.length < 8 || senha !== confirmarsenha);
  });


  $("#email").on("change", function() {
    var email = $(this).val().trim();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var domains = ['gmail.com', 'hotmail.com', 'outlook.com'];
    var emailDomain = email.split('@')[1];

    var emailError = !regex.test(email) || !domains.includes(emailDomain) ? "Email inválido" : "";

    $(this).toggleClass("error", emailError !== "");
    $("#email-error").text(emailError);
  });


  $("#telefone").on("change", function() {
    var phone = $(this).val().replace(/\D/g, "");
    var validDDD = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32,
      33, 34, 35, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53,
      54, 55, 56, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75,
      77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99
    ];
    var dddError = phone.length !== 11 ? "Número de telefone inválido" :
      !validDDD.includes(parseInt(phone.substr(0, 2))) ? "Digite um DDD válido" : "";

    $(this).toggleClass("error", phone.length !== 11 || !validDDD.includes(parseInt(phone.substr(0, 2))));
    $("#telefone-error").text(dddError);
  });

  $("#cpf").on("blur", function() {
    var cpf = $(this).val().trim();
    $(this).val(formatarCPF(cpf));
  });

  $("#data-nascimento").on("change", function() {
    var dataNascimento = new Date($(this).val());
    var hoje = new Date();
    var idadeMinima = 14;

    hoje.setFullYear(hoje.getFullYear() - idadeMinima);
    var dataMinima = hoje.toISOString().split('T')[0];

    var nascimentoError = dataNascimento > hoje ? "Idade mínima é 14 anos" : "";

    $(this).toggleClass("error", nascimentoError !== "");
    $("#data-nascimento-error").text(nascimentoError);
  });

  $("#termos").on("change", function() {
    var termosError = $(this).is(":checked") ? "" : "Você deve aceitar os termos e condições para prosseguir";
    $("#termos-alert").toggleClass("show", !$(this).is(":checked"));
  });

    $("#name").on("keyup", function() {
    var name = $(this).val().trim();
    var nameLength = name.length;

    if (nameLength < 2 || nameLength > 60) {
      $("#name-error").text("O nome deve ter entre 2 e 60 caracteres");
      $(this).addClass("error");
    } else {
      $("#name-error").text("");
      $(this).removeClass("error");
    }
  });

  $("#registrar").on("click", function(event) {
    event.preventDefault();

    var email = $("#email").val().trim();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var domains = ['gmail.com', 'hotmail.com', 'outlook.com'];
    var emailDomain = email.split('@')[1];
    var emailError = !regex.test(email) || !domains.includes(emailDomain) ? "Email inválido" : "";

    var senha = $("#senha").val();
    var confirmarsenha = $("#confirmarsenha").val();
    var senhaError = senha.length < 8 ? "Senha deve ter no mínimo 8 caracteres" : "";
    var confirmarSenhaError = senha !== confirmarsenha ? "Senhas não coincidem" : "";

    var phone = $("#telefone").val().replace(/\D/g, "");
    var validDDD = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32,
      33, 34, 35, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53,
      54, 55, 56, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75,
      77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99
    ];
    var dddError = phone.length !== 11 ? "Número de telefone inválido" :
      !validDDD.includes(parseInt(phone.substr(0, 2))) ? "Digite um DDD válido" : "";

    var cpf = $("#cpf").val().trim();
    var cpfError = cpf.length !== 14 ? "CPF inválido" : "";

    var dataNascimento = new Date($("#data-nascimento").val());
    var hoje = new Date();
    var idadeMinima = 14;
    hoje.setFullYear(hoje.getFullYear() - idadeMinima);
    var nascimentoError = dataNascimento > hoje ? "Idade mínima é 14 anos" : "";

    var termosError = $("#termos").is(":checked") ? "" : "Você deve aceitar os termos e condições para prosseguir";

    var name = $("#name").val().trim();
    var nameError = (name.length < 2 || name.length > 60) ? "Nome deve ter entre 2 e 60 caracteres" : "";

    // Exibe erros
    $("#name").toggleClass("error", nameError !== "");
    $("#name-error").text(nameError);
    $("#email").toggleClass("error", emailError !== "");
    $("#email-error").text(emailError);
    $("#senha, #confirmarsenha").toggleClass("error", senha.length < 8 || senha !== confirmarsenha);
    $("#senha-error").text(senhaError);
    $("#confirmarsenha-error").text(confirmarSenhaError);
    $("#telefone").toggleClass("error", phone.length !== 11 || !validDDD.includes(parseInt(phone.substr(0, 2))));
    $("#telefone-error").text(dddError);
    $("#cpf").toggleClass("error", cpf.length !== 14);
    $("#cpf-error").text(cpfError);
    $("#data-nascimento").toggleClass("error", nascimentoError !== "");
    $("#data-nascimento-error").text(nascimentoError);
    $("#termos-alert").toggleClass("show", !$("#termos").is(":checked"));

    // Verifica se há algum erro
    var hasError = (
      nameError !== "" ||
      emailError !== "" ||
      senhaError !== "" ||
      confirmarSenhaError !== "" ||
      dddError !== "" ||
      cpfError !== "" ||
      nascimentoError !== "" ||
      !$("#termos").is(":checked")
    );

    if (!hasError) {
      // Simula o envio bem-sucedido (substitua por sua lógica de envio real)
      setTimeout(function() {
        $("#registrar-form").submit();
        // Exibe mensagem de confirmação
        $("#confirmacao-container").fadeIn();
      }, 1000); // Tempo simulado de envio (1 segundo)
    }
  });

  // Fechar o container de confirmação ao clicar no botão "x"
  $("#fechar-confirmacao").on("click", function() {
    $("#confirmacao-container").fadeOut();
    // Reiniciar o formulário (opcional)
    $("#registrar-form")[0].reset();
  });

});