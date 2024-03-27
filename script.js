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
let tag__id;

$(document).ready(function () {
  $(".getStarted").click(function () {
    $(".signUp").show();
    $("#landingPage").hide();
  });

  $("#signUp").click(function () {
    if (
      userName.value == "" &&
      userSignUpEmail.value == "" &&
      userSignUpEmail.value == ""
    ) {
      $("#name").addClass("validate");
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
    } else if (
      userName.value == "" ||
      userSignUpEmail.value == "" ||
      userSignUpEmail.value == ""
    ) {
      $("#name").addClass("validate");
      $("#suEmail").addClass("validate");
      $("#suPassword").addClass("validate");
    }

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
          $(".MAIN").show();
          $(".signUp").hide();
          userName.textContent = "";
          userSignUpEmail.textContent = "";
          userSignUpPassword.textContent = "";
          localStorage.setItem("usersId", res.id);
          userId = localStorage.getItem("usersId");

          handleGetTags();
          handleGetTasks();
          $("#plus").hide();
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
    } else if (userEmail.value == "" || userPassword.value == "") {
      $("#email").addClass("validate");
      $("#password").addClass("validate");
    }

    function handleLogin() {
      let formObj = {
        email: userEmail.value,
        password: userPassword.value,
      };

      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/users/login",
        type: "post",
        data: formObj,
        success: function (res) {
          if (res.msg != "Invalid email or password") {
            userEmail.textContent = "";
            userPassword.textContent = "";
            $(".MAIN").show();
            $(".login").hide();
            localStorage.setItem("usersId", res.id);
            userId = localStorage.getItem("usersId");

            handleGetTags();
            handleGetTasks();
          } else {
            $("#email").addClass("validate");
            $("#password").addClass("validate");
            return;
          }
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
    let circleDiv = document.createElement("div");
    circleDiv.classList.add("round");

    sideBar.innerHTML = "";

    // SIDE BAR
    datas?.map((data) => {
      let circleDiv = document.createElement("div");
      circleDiv.classList.add("round");

      const circle = document.createElement("div");
      circle.classList.add("circle1");
      circle.style.marginRight = "5px";
      circle.style.backgroundColor = data.color;

      const circleText = document.createElement("div");
      circleText.innerHTML = `<p>${data?.title}</p>`;

      const deleteTag = document.createElement("button");
      deleteTag.textContent = "delete";
      // deleteTag.classList.add("deleteTag");

      circleDiv.appendChild(circle);
      circleDiv.appendChild(circleText);
      if (data.task === 0) {
        circleDiv.appendChild(deleteTag);
      } else {
        circleDiv.appendChild(deleteTag);
        deleteTag.disabled = true;
        deleteTag.style.backgroundColor = "grey";
        deleteTag.style.borderColor = "grey";
        deleteTag.classList.add("colorsDiv");
      }

      $(deleteTag).click(() => {
        $.ajax({
          url: `http://todo.reworkstaging.name.ng/v1/tags/${data.id}`,
          type: "delete",
          success: function (res) {
            handleGetTags();
            handleGetTasks();
          },
          error: function (err) {
            console.log("msg err", err);
            return;
          },
        });
      });

      const sideBarDiv = document.createElement("div");
      sideBarDiv.classList.add("hiddenAside");

      // SIDE BAR CHECKBOX
      sideBarDiv.appendChild(circleDiv);

      sideBarDiv.addEventListener("click", () => {
        $.ajax({
          url: `http://todo.reworkstaging.name.ng/v1/tags/tasks?tag_id=${data.id}`,
          type: "GET",
          success: function (res) {
            boxContainer.innerHTML = "";
            res.map((taskData) => {
              handleDisplayTasks(taskData, undefined, data.color);
            });
          },
          error: function (err) {
            console.log("msg err", err);
          },
        });
      });

      sideBar.appendChild(sideBarDiv);
    });

    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";

    Checkbox.addEventListener("change", (event) => {
      hideDone = Checkbox.checked;
      // For debugging purpose
      boxContainer.innerHTML = "";
      handleGetTasks(hideDone);
    });

    const doneTasks = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = "Hide Done Tasks";
    span.style.fontSize = "12px";
    // Checkbox.appendChild(span);

    doneTasks.appendChild(Checkbox);
    doneTasks.appendChild(span);
    sideBar.appendChild(doneTasks);
  }
  $("#addCategory").click(function () {
    handleAddCategory();

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
          console.log(res);
          console.log(res.id);
          tag__id = res.id;
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

  function handleDisplayTasks(data, toHide, tagColor) {
    $(".box").show();
    $(".add").hide();
    const boxDiv = document.createElement("div");

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
    const editBox = document.createElement("div");
    const editButton = document.createElement("button");
    const canceEdit = document.createElement("button");
    editButton.innerText = "Edit Task";
    editButton.style.backgroundColor = "rgb(240 225 176)";
    editButton.style.border = "none";
    editButton.style.padding = "3px";
    canceEdit.innerText = "Cancel";
    canceEdit.style.backgroundColor = "rgb(240 225 176)";
    canceEdit.style.border = "none";
    canceEdit.style.padding = "3px";

    editBox.appendChild(editButton);
    editBox.appendChild(canceEdit);

    editBox.style.display = "none";
    data.completed ? desDiv.classList.add("addlinethrough") : "";
    boxDiv.append(desDiv);
    boxDiv.append(editBox);

    $(editTask).click(function () {
      editBox.style.display = "flex";
      editBox.style.gap = "3px";
      taskTitle.contentEditable = true;
      desDiv.contentEditable = true;

      taskTitle.isContentEditable
        ? (taskTitle.style.border = "1px solid #ccaeae")
        : null;
      desDiv.isContentEditable
        ? (desDiv.style.border = "1px solid #ccaeae")
        : null;

      $(canceEdit).click(() => {
        taskTitle.style.border = "none";
        desDiv.style.border = "none";
        taskTitle.contentEditable = false;
        desDiv.contentEditable = false;
        editBox.style.display = "none";
      });

      $(editButton).click(() => {
        const formData = {
          title: taskTitle.textContent,
          content: desDiv.textContent,
        };
        const title = taskTitle.textContent;
        const des = desDiv.textContent;

        if (!!title && !!des) {
          $.ajax({
            url: `http://todo.reworkstaging.name.ng/v1/tasks/${data.id}`,
            type: "put",
            data: formData,
            success: function (res) {
              taskTitle.style.border = "none";
              desDiv.style.border = "none";
              taskTitle.contentEditable = false;
              desDiv.contentEditable = false;
              editBox.style.display = "none";
              handleGetTasks();
            },
            error: function (err) {
              console.log("msg err", err);
              return;
            },
          });
        } else {
          return;
        }
      });
    });

    $(deleteTask).click(() => {
      $.ajax({
        url: `http://todo.reworkstaging.name.ng/v1/tasks/${data.id}`,
        type: "delete",
        success: function (res) {
          handleGetTasks();
        },
        error: function (err) {
          console.log("msg err", err);
          return;
        },
      });
    });

    const circleContainer = document.createElement("div");
    circleContainer.classList.add("circlecontainer");
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input");
    const circletaskDiv = document.createElement("div");
    circletaskDiv.classList.add("circletask");
    const tagColorDiv1 = document.createElement("div");
    tagColorDiv1.classList.add("catDiv1");

    if (tagColor) {
      tagColorDiv1.style.backgroundColor = tagColor;
    }

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
          console.log(res);
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
      console.log(toHide);
      boxContainer.appendChild(boxDiv);
    } else return;

    $("#title").val("");
    $("#description").val("");
  }

  function handleGetTasks(toHide) {
    boxContainer.innerHTML = "";

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

        const allTagTitleText = document.querySelectorAll(".modalTagtitle");
        allTagTitleText.forEach((element) => {
          element.classList.remove("colorsDiv");
        });

        if (tagTitleText.textContent == data.title) {
          tagTitleText.classList.add("colorsDiv");
        }
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
          handleGetTasks();
        },
        error: function (err) {
          console.log("msg err", err);
          return;
        },
      });
    } else {
      return;
    }
  });

  $("#acCancelp").click(function () {
    $(".addCategory").hide();
  });

  $("#cancelp").click(function () {
    $(".add").hide();
  });
});

$("#logOut").click(() => {
  $("#suEmail").val("");
  $("#suPassword").val("");
  $("#name").val("");

  $("#email").val("");
  $("#password").val("");
  $(".MAIN").hide();
  $(".add").hide();
  $(".editTask").hide();
  $("#landingPage").show();
  $(".addCategory").hide();
  $(".addCategory").hide();
});
