let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");

let userDetails = {
  email: "matthewbenedicta2007@gmail.com",
  password: 6270,
};

// console.log(userDetails.email, userDetails.password);

$(document).ready(function () {
  $("#name").addClass("unValidated");
  $("#suPassword").addClass("unValidated");
  $("#suEmail").addClass("unValidated");
  $("#email").addClass("unValidated");
  $("#password").addClass("unValidated");
  $(".getStarted").click(function () {
    $(".signUp").show();
    $("#landingPage").hide();
  });

  $("#signUp").click(function () {
    if (
      userEmail.value == "" ||
      userPassword.value == "" ||
      userName.value == ""
    ) {
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
      $("#name").addClass("validate");
      console.log(userEmail.value, userPassword.value, "Wrong!");
      return;
    } else {
      $("#name").addClass("unValidated");
      $("#suEmail").addClass("unValidated");
      $("#suPassword").addClass("unValidated");
      $(".login").show();
      $(".signUp").hide();
    }
  });

  // $("#login").click(function (e) {
  //   e.preventDefault();

  //   let email = $("#email").val();
  //   let password = $("#password").val();

  //   let formData = {
  //     email: email,
  //     password: password,
  //   };

  //   localStorage.setItem("formData", JSON.stringify(formData));

  //   console.log(localStorage);

  //   $("#password").val("");
  //   $("#email").val("");
  // });

  

  $("#plus").click(function () {
    $(".hiddenAside").show();
    $("#boxes").show();
    $("#plus").hide();
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
  });

  $("#cancelp").click(function () {
    $(".add").hide();
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
