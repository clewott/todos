$(document).ready(function(){

  myToDo.init();


});

var myToDo = {
  init: function() {
    this.initStyling();
    this.initEvents();
  },
  initStyling: function() {
    myToDo.getTask();
  },
  initEvents: function() {

    $("form").on("submit", function(event){

      event.preventDefault();
      var newPost = {

        task: $(".addTodo").val(),
      };

      myToDo.createTask(newPost);
    });

    $(".items").on("click", ".exitBox", function(event){

      event.preventDefault();
      var postId = $(this).closest("ul").data("todoid");
      myToDo.deleteTask(postId);
      console.log(postId);
    });

    $(".items").on("dblclick", ".editBox", function(){

      event.preventDefault();
      $(this).closest("ul").find("form").toggleClass("hide");
      $(this).toggleClass("hidden");

    });

    $(".items").on("click", ".update", function(){

      event.preventDefault();
      var postId = $(this).closest("ul").data("todoid");
      var updatedPost = {
        task:$(this).closest("form").find(".editToDo").val(),
      };
      console.log(updatedPost);
      myToDo.updateTask(postId, updatedPost);

    });


    $(".items").on("click", "button", function(event){

      event.preventDefault();
      $(this).find("span").css("color","green");
      // $(this).find("span").toggleClass(".green");
      $(this).siblings("p").toggleClass("strike");
    });


  },


  render: function (template, data, $el) {
    var markup = _.template(template, data);

    $el.html(markup);
  },
  url: "http://tiy-fee-rest.herokuapp.com/collections/crotten-todo",

  // Creating Get Task Function
  getTask: function(){

    $.ajax({
      url: myToDo.url,
      type: 'GET',
      success: function(response) {
        var tasks = window.tasks = response;

        myToDo.render(postTmpl, tasks, $(".items"));
      }

    });
  },

  // Creating Create Task Function
  createTask: function(newTask){

    $.ajax({
      url: myToDo.url,
      data: newTask,
      type: 'POST',
      success: function(create) {
        myToDo.getTask();
      }
    });

  },

  // Creating Delete Task Function
  deleteTask: function(postId){

    $.ajax({
      url: myToDo.url + "/" + postId,
      type: 'DELETE',
      success: function() {
        myToDo.getTask();
      }
    });

  },

  // Creating Update Task Function
  updateTask: function(postId, updatedPost){

    $.ajax({
      url: myToDo.url + "/" + postId,
      type: 'PUT',
      data: updatedPost,
      success: function(response) {
        console.log(response);
        myToDo.getTask();
      }
    });

  },
}
