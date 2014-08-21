var postTmpl = [
  "<% _.each(tasks, function(element, index, list) { %>",
  "<ul data-todoid=\"<%= element._id %>\" class=\"todoList\">",
    "<li><button class=\"checkBox\"><span class=\"fa fa-check\"></span></button>",
    "<p class=\"editBox\"><%= element.task %></p>",
    "</li>",

    "<form class=\"hide\" name=\"editTask\">",
      "<input type=\"text\" class=\"editToDo\" name=\"task\" value=\"<%= element.task %>\">",
        "<button class=\"exitBox\"><i class=\"fa fa-times\"></i></button>",
    "</form>",
  "</ul>",
  "<% }); %>"

].join("");
