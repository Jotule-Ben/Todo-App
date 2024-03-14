let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let userSignUpEmail = document.getElementById("suEmail");
let userSignUpPassword = document.getElementById("suPassword");
let categoryInput = document.getElementById("categoryInput");
let title = document.getElementById("title");
let description = document.getElementById("description");
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");

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
    console.log(userSignUpPassword.value, userSignUpPassword.value.length);
    if (
      userSignUpEmail.value == "" ||
      userSignUpPassword.value == "" ||
      userName.value == ""
    ) {
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
      $("#name").addClass("validate");
    } else if (userName.value != "") {
      $("#name").addClass("unValidated");
    } else if (userSignUpEmail.value != "") {
      $("#suEmail").addClass("unValidated");
    } else if (userSignUpPassword.value != "") {
      $("#suPassword").addClass("unValidated");
    } else if (
      userSignUpEmail.value != "" &&
      userSignUpPassword.value != "" &&
      userName.value != ""
    ) {
      $("#name").addClass("unValidated");
      $("#suEmail").addClass("unValidated");
      $("#suPassword").addClass("unValidated");
      console.log(
        userSignUpEmail.value,
        userSignUpPassword.value,
        userName.value
      );
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

  $("#login").click(function () {
    if (userEmail.value == "" || userPassword.value == "") {
      $("#email").addClass("validate");
      $("#password").addClass("validate");
    } else if (
      userEmail.value == userSignUpEmail.value &&
      userPassword.value == userSignUpPassword.value
    ) {
      $("#email").addClass("unValidated");
      $("#password").addClass("unValidated");
      $(".MAIN").show();
      $(".login").hide();
    } else if (userEmail.value !== userSignUpEmail.value) {
      $(".enterEmail")
        .html("<p>" + "Enter your correct Email" + "</p>")
        .css({ color: "red", "font-size": "12px" });
    } else if (userPassword.value !== userSignUpPassword.value) {
      $(".enterPassword")
        .html("<p>" + "Enter your correct password" + "</p>")
        .css({ color: "red", "font-size": "12px" });
    } else {
      $(".enterEmail").html("");
      $(".enterPassword").html("");
    }
  });

  $("#plus").click(function () {
    // $(".hiddenAside").show();
    // $("#boxes").show();
    $(".addCategory").show();
    $("#plus").hide();
  });

  $("#acCancelp").click(function () {
    $(".addCategory").hide();
    $("#plus").show();
  });

  $("#addCategory").click(function () {
    if (categoryInput.value == "") {
      return;
    } else if (categoryInput.value == "work") {
      $(".circle1").show();
      $("#work").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $(".addCategory").hide();
      $("#plus").show();
    } else if (categoryInput.value == "study") {
      $(".circle2").show();
      $("#study").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $(".addCategory").hide();
      $("#plus").show();
    } else if (categoryInput.value == "entertainment") {
      $(".circle3").show();
      $("#entertainment").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $(".addCategory").hide();
      $("#plus").show();
    } else if (categoryInput.value == "family") {
      $(".circle4").show();
      $("#family").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $(".addCategory").hide();
      $("#plus").show();
    }
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

  $("#Task").click(function () {
    $(".add").show();
    // console.log(title.value, description.value);
  });

  $("#addTask").click(function () {
    if (title.value != "" && description.value != "") {
      $("#taskTitle").html("<p>" + title.value + "</p>");
      $("#des").html("<p>" + description.value + "</p>");
      // console.log($("#taskTitle").val());
      // console.log($("#des").val());
      $(".box1").show();
      // $(".box2").show();
      // $(".box3").show();
      $(".add").hide();
    } else if (box1) {
      $("#taskTitle2").html("<p>" + title.value + "</p>");
      $("#des2").html("<p>" + description.value + "</p>");
      $(".box1").show();
      $(".box2").show();
    } else if (box2 && box3) {
      $("#taskTitle3").html("<p>" + title.value + "</p>");
      $("#des3").html("<p>" + description.value + "</p>");
      $(".box1").show();
      $(".box2").show();
      $(".box3").show();
    } else {
      return;
    }
  });

  $("#cancelp").click(function () {
    $(".add").hide();
  });
});
