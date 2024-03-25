let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let userSignUpEmail = document.getElementById("suEmail");
let userSignUpPassword = document.getElementById("suPassword");
let categoryInput = document.getElementById("categoryInput");
let title = document.getElementById("title");
let description = document.getElementById("description");
let sideBar = document.getElementById("sideBar");
let belowtag = document.getElementById("belowtag");
const boxContainer = document.getElementById("boxes");
let userId;
let categoryData;
let getColorsData;
let createTaskTagId;
let hideDone;

$(document).ready(function () {
  $(".getStarted").click(function () {
    $(".signUp").show();
    $("#landingPage").hide();
  });

  $("#signUp").click(function () {
    // if (
    //   userSignUpEmail.value == "" ||
    //   userSignUpPassword.value == "" ||
    //   userName.value == ""
    // ) {
    //   $("#suEmail").addClass("validate");
    //   $("#suPassword").addClass("validate");
    //   $("#name").addClass("validate");
    // } else if (
    //   userSignUpEmail.value != "" &&
    //   userSignUpPassword.value != "" &&
    //   userName.value != ""
    // ) {
    //   $(".MAIN").show();
    //   $(".signUp").hide();
    // }

    if (
      userName.value == "" &&
      userSignUpEmail.value == "" &&
      userSignUpEmail.value == ""
    ) {
      $("#name").addClass("validate");
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
      //  return;
    } else if (
      userName.value == "" ||
      userSignUpEmail.value == "" ||
      userSignUpEmail.value == ""
    ) {
      $("#name").addClass("validate");
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
      //  return;
    }
    // else if (
    //   userName.value != "" &&
    //   userSignUpEmail.value != "" &&
    //   userSignUpEmail.value != ""
    // ) {
    //   $(".MAIN").show();
    //   $(".signUp").hide();
    //   //  return;
    // }

    function handleSignUp() {
      let formObj = {
        name: userName.value,
        email: userSignUpEmail.value,
        password: userSignUpPassword.value,
      };

      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/users",
        type: "post",
        data: formObj,
        success: function (res) {
          console.log(res, "success");
          console.log(res.id);
          if (
            !userSignUpEmail.value &&
            !userName.value &&
            !userSignUpPassword.value
          ) {
            return;
          } else {
            $(".MAIN").show();
            $(".signUp").hide();
          }
          userName.textContent = "";
          userSignUpEmail.textContent = "";
          userSignUpPassword.textContent = "";
          localStorage.setItem("usersId", res.id);
          localStorage.getItem("usersId");
          console.log(localStorage);
        },
        error: function (err) {
          console.log(err);
          console.log("msg err", err);
          $("#suEmail").addClass("validate");
          $("#suPassword").addClass("validate");
          $("#name").addClass("validate");
        },
      });
    }

    handleSignUp();
    console.log(userId);
  });

  $("#existingAcc").click(function () {
    $(".signUp").hide();
    $(".login").show();
  });

  $("#registerAcc").click(function () {
    $(".signUp").show();
    $(".login").hide();
  });

  $("#login").click(function () {
    if (userEmail.value == "" && userPassword.value == "") {
      $("#email").addClass("validate");
      $("#password").addClass("validate");
      // return;
    } else if (userEmail.value == "" || userPassword.value == "") {
      $("#email").addClass("validate");
      $("#password").addClass("validate");
      // return;
    }
    // else if (userEmail.value != "" && userPassword.value != "") {
    //   $(".MAIN").show();
    //   $(".login").hide();
    //   //  return;
    // }

    function handleLogin() {
      let formObj = {
        email: userEmail.value,
        password: userPassword.value,
      };

      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/users/login",
        type: "post",
        data: formObj,
        // data: JSON.stringify(formObj),
        success: function (res) {
          // console.log(res);
          userEmail.textContent = "";
          userPassword.textContent = "";
          // console.log(res.msg);
          if (res.msg != "Invalid email or password") {
            $(".MAIN").show();
            $(".login").hide();
          }
          localStorage.setItem("usersId", res.id);
          userId = localStorage.getItem("usersId");

          handleGetTags();
          handleGetTasks();
        },
        error: function (err) {
          console.log("msg err", err);
          $("#email").addClass("validate");
          $("#password").addClass("validate");
        },
      });
    }

    handleLogin();
  });

  $("#plus").click(function () {
    5;
    $(".addCategory").show();
    $("#plus").hide();
  });

  $("#acCancelp").click(function () {
    $(".addCategory").hide();
    $("#plus").show();
  });

  function handleAddCategory(datas) {
    function getRandomColor() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      let rHex = r.toString(16).padStart(2, "0");
      let gHex = g.toString(16).padStart(2, "0");
      let bHex = b.toString(16).padStart(2, "0");

      let hexColor = "#" + rHex + gHex + bHex;

      return hexColor;
    }

    // SIDE BAR

    datas?.map((data) => {
      const circleDiv = document.createElement("div");
      circleDiv.classList.add("round");

      const circle = document.createElement("div");
      circle.classList.add("circle1");
      circle.style.backgroundColor = data.color;

      const circleText = document.createElement("div");
      circleText.innerHTML = `<p>${data?.title}</p>`;

      circleDiv.appendChild(circle);
      circleDiv.appendChild(circleText);

      const sideBarDiv = document.createElement("div");
      sideBarDiv.classList.add("hiddenAside");

      // SIDE BAR CHECKBOX

      sideBarDiv.appendChild(circleDiv);

      sideBar.appendChild(sideBarDiv);
    });

    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";

    Checkbox.addEventListener("change", (event) => {
      hideDone = Checkbox.checked;
      boxContainer.innerHTML = "";
      handleGetTasks(hideDone);
    });

    const doneTasks = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = "Hide Done Tasks";
    span.style.fontSize = "12px";

    doneTasks.appendChild(Checkbox);
    doneTasks.appendChild(span);
    sideBar.appendChild(doneTasks);
  }

  $("#addCategory").click(function () {
    handleAddCategory();

    function handleCategory() {
      const formData = {
        user_id: userId,
        title: categoryInput.value,
        color: getRandomColor(),
      };

      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/tags",
        type: "post",
        data: formData,
        success: function (res) {
          handleGetTags();
          if (categoryInput.value != "") {
            $(".circle1").show();
            $("#work").show();
            $("#categoryInput").val("");
            $(".addCategory").hide();
          }
          $("#categoryInput").textContent = "";
          $(".addCategory").hide();
        },
        error: function (err) {
          console.log("msg err", err);
          return;
        },
      });
    }

    handleCategory();
  });

  function handleGetTags() {
    $.ajax({
      url: `http://todo.reworkstaging.name.ng/v1/tags?user_id=${userId}`,
      type: "GET",
      success: function (res) {
        getColorsData = res;
        handleAddCategory(res);
        $(".circle1").show();
        $("#work").show();
        $("#img").show();
        $(".addCategory").hide();
        $("#plus").show();
        $("#tagheading").show();
      },
      error: function (err) {
        console.log("msg err", err);
        return;
      },
    });
  }

  function handleDisplayTasks(data, toHide) {
    $(".box").show();
    $(".add").hide();
    const boxDiv = document.createElement("div");

    // boxContainer.innerHTML = "";

    boxDiv.classList.add("box");
    const editDiv = document.createElement("div");
    editDiv.classList.add("edit");
    const taskTitle = document.createElement("h1");
    taskTitle.classList.add("tt");
    taskTitle.textContent = data.title;
    data.completed ? taskTitle.classList.add("addlinethrough") : "";
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
    desDiv.textContent = data.content;
    data.completed ? desDiv.classList.add("addlinethrough") : "";
    boxDiv.append(desDiv);

    const circleContainer = document.createElement("div");
    circleContainer.classList.add("circlecontainer");
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input");
    const circletaskDiv = document.createElement("div");
    circletaskDiv.classList.add("circletask");
    const tagColorDiv1 = document.createElement("div");
    tagColorDiv1.classList.add("catDiv1");

    getColorsData?.map((colorData) => {
      if (data.tag == colorData.title) {
        tagColorDiv1.style.backgroundColor = colorData.color;
      }
    });

    circletaskDiv.appendChild(tagColorDiv1);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = data.completed;
    input.classList.add("checkbox");

    if (input.checked) {
      taskTitle.classList.add("addlinethrough");
    } else {
      taskTitle.classList.remove("addlinethrough");
    }

    input.addEventListener("change", () => {
      if (input.checked) {
        taskTitle.classList.add("addlinethrough");
        desDiv.classList.add("addlinethrough");
      } else {
        taskTitle.classList.remove("addlinethrough");
        desDiv.classList.remove("addlinethrough");
      }
      const formData = {
        completed: data.completed ? false : true,
      };

      $.ajax({
        url: `http://todo.reworkstaging.name.ng/v1/tasks/${data.id}/set-completed`,
        type: "put",
        data: formData,
        success: function (res) {
          // data.completed
          //   ? taskTitle.classList.add("addlinethrough")
          //   : taskTitle.classList.remove("addlinethrough");
        },
        error: function (err) {
          console.log("msg err", err);
          return;
        },
      });
    });

    const inputLabel = document.createElement("label");
    inputLabel.classList.add("inputLabel");
    inputLabel.textContent = "Done";
    inputDiv.appendChild(input);
    inputDiv.appendChild(inputLabel);
    circleContainer.appendChild(circletaskDiv);
    circleContainer.appendChild(inputDiv);
    boxDiv.appendChild(circleContainer);

    if (toHide == undefined) {
      boxContainer.appendChild(boxDiv);
    } else if (toHide && !data.completed) {
      boxContainer.appendChild(boxDiv);
    } else if (!toHide) {
      boxContainer.appendChild(boxDiv);
    } else return;

    $("#title").val("");
    $("#description").val("");
  }

  function handleGetTasks(toHide) {
    $.ajax({
      url: `http://todo.reworkstaging.name.ng/v1/tasks?user_id=${userId}`,
      type: "GET",
      success: function (res) {
        res.map((data) => handleDisplayTasks(data, toHide));
      },
      error: function (err) {
        console.log("msg err", err);
        return;
      },
    });
  }

  $("#checkbox").click(function () {
    $("#taskTitle").toggleClass("linethrough");
  });

  $("#Task").click(function () {
    getColorsData.map((data) => {
      const colors = document.getElementById("belowtag");
      const tagdiv = document.createElement("div");
      tagdiv.classList.add("tagsCircle");
      tagdiv.textContent = "";
      tagdiv.style.backgroundColor = data.color;
      tagdiv.style.cursor = "pointer";

      const tagTitleText = document.createElement("p");
      tagTitleText.classList.add("modalTagtitle");
      tagTitleText.style.cursor = "pointer";
      tagTitleText.textContent = data.title;

      colors.appendChild(tagdiv);
      colors.appendChild(tagTitleText);

      tagTitleText.addEventListener("click", () => {
        createTaskTagId = data.id;
      });
    });

    $(".add").show();
  });

  $("#addTask").click(function () {
    if (title.value != "" && description.value != "") {
      const formData = {
        tag_id: createTaskTagId,
        title: title.value,
        content: description.value,
      };

      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/tasks",
        type: "post",
        data: formData,
        success: function (res) {
          handleDisplayTasks(res);
        },
        error: function (err) {
          console.log("msg err", err);
          return;
        },
      });
    } else {
      return;
    }

    $(".editTask1").click(function () {
      $(".add").show();
    });

    $(".delete1").click(function e() {
      e.target = e.target.parentElement;
      e.target.hide();
      // $(".box").hide();
    });
  });

  $("#acCancelp").click(function () {
    $(".addCategory").hide();
  });

  $("#cancelp").click(function () {
    $(".add").hide();
  });
});
