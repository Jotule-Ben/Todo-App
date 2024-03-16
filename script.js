let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let userSignUpEmail = document.getElementById("suEmail");
let userSignUpPassword = document.getElementById("suPassword");
let categoryInput = document.getElementById("categoryInput");
let title = document.getElementById("title");
let description = document.getElementById("description");
let box1 = document.getElementsByClassName("box1");
let box2 = document.getElementsByClassName("box2");

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
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt1").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "study") {
      $(".circle2").show();
      $("#study").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt2").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "entertainment") {
      $(".circle3").show();
      $("#entertainment").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt3").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "family") {
      $(".circle4").show();
      $("#family").show();
      $("#hideDoneTasks").show();
      $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt4").show();
      $("#categoryInput").val("");
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

  ////////////// hide and show tasks
  // $("#hideDoneTasks").click(function () {
  //   if ($("#taskTitle").toggleClass("linethrough")) {
  //     $(".box1").hide();
  //     $(".box1").show();
  //   }else if (!$("#taskTitle").toggleClass("linethrough")){
  //        $(".box1").show();
  //   }
  //   // if ($("#taskTitle2").toggleClass("linethrough")) {
  //   //   $(".box2").addClass("hide");
  //   // }
  //   // if ($("#taskTitle3").toggleClass("linethrough")) {
  //   //   $(".box3").addClass("hide");
  //   // }
  // });

  $("#Task").click(function () {
    $(".add").show();
  });

  $("#addTask").click(function () {
    let addTitle = $("#title").val();
    let addDescription = $("#description").val();

    let existingModalDetails =
      JSON.parse(localStorage.getItem("myFormData")) || [];

    let modalData = {
      title: addTitle,
      description: addDescription,
    };

    existingModalDetails.push(modalData);

    localStorage.setItem("myFormData", JSON.stringify(existingModalDetails));
    if (title.value != "" && description.value != "") {
      if (title.value != "" && description.value != "") {
        $("#taskTitle").html("<p>" + existingModalDetails[0].title + "</p>");
        $("#des").html("<p>" + existingModalDetails[0].description + "</p>");
        $(".box1").show();
        // $(".box2").show();
        // $(".box3").show();
        $(".add").hide();
        $("#title").val("");
        $("#description").val("");
        $(".bt1").click(function () {
          $("#catDiv1").show().addClass("bt1");
        });
      }
      if (box1) {
        $("#taskTitle2").html("<p>" + existingModalDetails[1].title + "</p>");
        $("#des2").html("<p>" + existingModalDetails[1].description + "</p>");
        $(".box1").show();
        $(".box2").show();
        $("#title").val("");
        $("#description").val("");
      }
      if (box1 && box2) {
        $("#taskTitle3").html("<p>" + existingModalDetails[2].title + "</p>");
        $("#des3").html("<p>" + existingModalDetails[2].description + "</p>");
        $(".box1").show();
        $(".box2").show();
        $(".box3").show();
        $("#title").val("");
        $("#description").val("");
      }
    } else {
      return;
    }
  });

  $("#cancelp").click(function () {
    $(".add").hide();
  });
});
