//when a non-focused paragraph is clicked
$(document).on('click', "p[contenteditable='false']", function(event){
      
  //make all paragraphs uneditable and remove the focus class
  $("p").attr("contenteditable", false);
  $(".focus").removeClass("focus");
        
  //Make the selected paragraph editable and give it the focus
  $(this).attr("contenteditable", true)
  .addClass("focus");
  $(this).focus();
});
      
//when a keydown is pressed in a paragraph
$(document).on('keydown', 'p[contenteditable="true"]',function(event){

//if the enter key is pressed
if(event.which === 13){

  event.preventDefault();

  //remove the focus class and create a new paragraph
  $(".focus").removeClass("focus");
  var $paragraph = $("<p>")
  .addClass("widget paragraph focus")
  .html("A new paragraph!");
        
  //put the new paragraph after this one and give it the focus  
  $(this).after($paragraph);
  $("p").attr("contenteditable", false);
  $(this).next("p").attr("contenteditable", true).focus();
 }

//if the backspace is pressed and we're on the first character
else if(event.which === 8 && $(this).caret("get", "before") == 0){
  event.preventDefault();

  //if there is no text in this block
  if($(this).text().length === 0){

    //shift focus to the previous element, then remove this one
    $prev = $(this).prev();
    $prev.attr("contenteditable", true)
    .addClass("focus");
    $prev.focus().caret("set", $prev.text().length);
    $(this).remove();
  }

  //otherwise
  else{

    //get the last paragraph if one exists
    var $prev = $(this).prev();
    while($prev.length != 0 && $prev[0].tagName != "P"){
      $prev = $prev.prev();
    }
    if($prev.length != 0){
  
      //concat the text in the 2 paragraphs
      var position = $prev.text().length;
    
      //give the last one focus
      $prev.attr("contenteditable", true);
      $prev.caret("set",position);
      $prev.append($(this).html());
      $prev.addClass("focus");
    
      //remove this one
      $(this).remove();
    }
  }
}
});