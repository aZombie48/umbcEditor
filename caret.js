(function($) {
  $.fn.caret = function(method, pos) {
    var target = this[0];
    var isContentEditable = target.contentEditable === 'true';
    //get the caret position
    if (method==="get") {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        target.focus();
        var range1 = window.getSelection().getRangeAt(0), range2 = range1.cloneRange();
        range2.selectNodeContents(target);
        range2.setEnd(range1.endContainer, range1.endOffset);
        return range2.toString().length;
      }
    }
    //set the caret position
    else if(method==="set") {
      if (pos == -1)
        pos = this[isContentEditable? 'text' : 'val']().length;
      //HTML5
      if (window.getSelection) {
        //contenteditable
        target.focus();
        console.log(pos);
        window.getSelection().collapse(target, pos);
      }
      return pos;
    }
    else if (method==="text"&&pos==="after") {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        target.focus();
        var range1 = window.getSelection().getRangeAt(0), range2 = range1.cloneRange();
        range2.selectNodeContents(target);
        alert(range2.toString());
        range2.setStart(range1.endContainer, range1.endOffset);
        return range2.toString();
      }
    }
    else if (method==="text"&&pos==="before") {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        target.focus();
        var range1 = window.getSelection().getRangeAt(0), range2 = range1.cloneRange();
        range2.selectNodeContents(target);
        range2.setEnd(range1.endContainer, range1.endOffset);
        return range2.toString();
      }
    }
  }
})(jQuery)