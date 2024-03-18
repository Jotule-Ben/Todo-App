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
let box3 = document.getElementsByClassName("box3");

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
    // console.log(userSignUpPassword.value, userSignUpPassword.value.length);
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
      // console.log(
      //   userSignUpEmail.value,
      //   userSignUpPassword.value,
      //   userName.value
      // );
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
      // $("#hideDoneTasks").show();
      // $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt1").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "study") {
      $(".circle2").show();
      $("#study").show();
      // $("#hideDoneTasks").show();
      // $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt2").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "entertainment") {
      $(".circle3").show();
      $("#entertainment").show();
      // $("#hideDoneTasks").show();
      // $("#hideDoneTasksSpan").show();
      $("#img").show();
      $(".addCategory").hide();
      $("#plus").show();
      $("#tagheading").show();
      $(".bt3").show();
      $("#categoryInput").val("");
    } else if (categoryInput.value == "family") {
      $(".circle4").show();
      $("#family").show();
      // $("#hideDoneTasks").show();
      // $("#hideDoneTasksSpan").show();
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

  $("#checkbox4").click(function () {
    $("#taskTitle4").toggleClass("linethrough");
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
      $(".box").show();
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");

      const editDiv = document.createElement("div");
      editDiv.classList.add("edit");
      const taskTitle = document.createElement("h1");
      taskTitle.classList.add("tt");
      taskTitle.textContent = "This is title";
      const dropDownDiv = document.createElement("div");
      dropDownDiv.classList.add("dropdown");
      const editIcon = document.createElement("p");
      editIcon.classList.add("edit1");
      editIcon.textContent = "...";

      const dropDownContent = document.createElement("div");
      dropDownContent.classList.add("dropdown-content");

      const editTask = document.createElement("span");
      editTask.classList.add("editTask1");
      editTask.textContent = "Edit";
      const deleteTask = document.createElement("span");
      deleteTask.classList.add("delete1");
      deleteTask.textContent = "Delete";

      dropDownContent.appendChild(editTask);
      dropDownContent.appendChild(deleteTask);
      dropDownDiv.appendChild(editIcon);
      dropDownDiv.appendChild(dropDownContent);
      editDiv.appendChild(taskTitle);
      editDiv.appendChild(dropDownDiv);
      boxDiv.appendChild(editDiv);

      const desDiv = document.createElement("p");
      desDiv.classList.add("dcn");
      desDiv.textContent = "description goes here";
      boxDiv.appendChild(desDiv);

      const circleContainer = document.createElement("div");
      circleContainer.classList.add("circlecontainer");

      const inputDiv = document.createElement("div");
      inputDiv.classList.add("input");

      const input = document.createElement("input");
       input.type = "checkbox";
      input.classList.add("checkbox");

      const inputLabel = document.createElement("label");
      inputLabel.classList.add("inputLabel");
      inputLabel.textContent = 'Done'

      inputDiv.appendChild(input);
      inputDiv.appendChild(inputLabel);
      circleContainer.appendChild(inputDiv);
      boxDiv.appendChild(circleContainer);

      const boxContainer = document.getElementById("boxes");
      boxContainer.appendChild(boxDiv);

      $("#title").val("");
      $("#description").val("");
      $(".add").hide();
    } else {
      return;
    }

    $(".editTask1").click(function () {
      $(".add").show();
    });

    let deleteParent = $(".delete1").parentElement;
    console.log(deleteParent);

    $(".delete1").click(function () {
      $(".deleteParent").hide();
    });

  });

  $("#cancelp").click(function () {
    $(".add").hide();
  });
});
