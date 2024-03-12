let userEmail = document.getElementById("#email");
let userPassword = document.getElementById("#password");

$(document).ready(function () {
  $(".getStarted").click(function () {
    $(".login").show();
    $("#landingPage").hide();
  });

  $("#login").click(function (e) {
    e.preventDefault();

    let email = $("#email").val();
    let password = $("#password").val();

    let formData = {
      email: email,
      password: password,
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    console.log(localStorage);

    $("#password").val("");
    $("#email").val("");
  });

  $("#login").click(function () {
    $(".MAIN").show();
    $(".login").hide();
  });

  $("#checkbox").click(function () {
    $("#taskTitle").toggleClass("linethrough");
  });

  $("#checkbox2").click(function () {
    $("#taskTitle2").toggleClass("linethrough");
  });

  $("#checkbox3").click(function () {
    $("#taskTitle3").toggleClass("linethrough");
  });

  document.getElementById("add").addEventListener("click", function () {
    $(".add").show();
    $(".MAIN").hide();
  });

  $("#cancelp").click(function () {
    $(".add").hide();
    $(".MAIN").show();
  });
});

// document.getElementById("login").addEventListener("click", function () {
//   let input = userEmail.value;
//   let inputs = userPassword.value;
//   if (inputs == "" && input == "") {
//     userEmail.style.borderColor = "red";
//     userPassword.style.borderColor = "red";
//   }
// });
