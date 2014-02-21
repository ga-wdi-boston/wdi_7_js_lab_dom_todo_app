var TodoItem = function(task){
  if (task.length === 0) {
    throw new Error("Invalid description");
  }
  var todo, completeButton, deleteButton;

  self = this; // use to pass to onclicks

  completeButton = document.createElement("button");
  completeButton.type = "submit";
  completeButton.className = "complete btn btn-success";
  completeButton.innerHTML = "<span class='glyphicon glyphicon-ok'></span>";

  deleteButton = document.createElement("button");
  deleteButton.type = "submit";
  deleteButton.className = "delete btn btn-danger";
  deleteButton.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";

  this.task = task;
  this.status = "unfinished";
  this.createdAt = new Date();
  this.completedAt = null;
  this.buttons = {
    complete: completeButton,
    delete: deleteButton
  };
};

TodoItem.prototype = {
  renderSelf: function() {
    var itemNode    = document.createElement("li"),
        self        = this, // use to set innerHTML later
        buttons     = this.buttons,
        setInner;

    buttons.complete.onclick = function(event) {
      event.preventDefault();
      TodoApp.finishTodo(self);
    };

    buttons.delete.onclick = function(event) {
      event.preventDefault();
      TodoApp.deleteTodo(self);
    };

    // Create inner text from task name and date

    setInner = function(date) {
      var formattedDate = (date.getMonth() + 1) + "." + date.getDate(),
          displayText = document.createElement("p");
      displayText.innerHTML = self.task + " <span class='meta-data'>" + formattedDate +
        "</span>";
      return displayText;
    };

    // Extra button if unfinished (complete)/use appropriate date obj
    // depending on if unfinished or finished
    if (this.status === "unfinished") {
      itemNode.appendChild(setInner(this.createdAt));
      itemNode.appendChild(buttons.complete);
    } else {
      itemNode.appendChild(setInner(this.completedAt));
    }
    itemNode.appendChild(buttons.delete);

    return itemNode;
  }
};
