

  let MARGIN = 5;

var box1 = document.getElementById('box1');

box1.addEventListener("mousedown", onMouseDown);
box1.addEventListener("mousemove", onMouseMove);

var box2 = document.getElementById('box2');

box2.addEventListener("mousedown", onMouseDown);
box2.addEventListener("mousemove", onMouseMove);

var box3 = document.getElementById('box3');

box3.addEventListener("mousedown", onMouseDown);
box3.addEventListener("mousemove", onMouseMove);

function onMouseDown(event) {
    var box = event.target

    // store the attributes of the WebBox at the time of the mousedown event.
    var b = box.getBoundingClientRect();

    // store x and y as the distance between the cursor and the box's left and top.
    var x = event.clientX - b.left;
    var y = event.clientY - b.top;

    // the cursor position during mousedown
    let initialClientX = event.clientX;
    let initialClientY = event.clientY;

    // detect if the cursor is within marginal distance of the box's edges
    var onTopEdge = y < MARGIN;
    var onLeftEdge = x < MARGIN;
    var onRightEdge = x >= b.width - MARGIN;
    var onBottomEdge = y >= b.height - MARGIN;

    // determine whether we shift or resize
    var isResizing = onRightEdge || onLeftEdge || onTopEdge || onBottomEdge;

    // Highlighted the currently selected WebBox.
    //highlightWebBox(event.target);

    // Make the WebBox moveable from the stack
    //box.style.position = 'absolute';

    if(isResizing) {

        function onMouseMoveResize(event) {
            if(onRightEdge) {
                box.style.width = (event.clientX - b.left) + 'px';
            }
            if(onBottomEdge) {
                box.style.height = (event.clientY - b.top) + 'px'; 
            }
            if(onLeftEdge) {
                console.log('box right: ' + b.right);
                box.style.left = event.clientX + 'px';
                box.style.width = (initialClientX - event.clientX + b.width) + 'px';
            }
            if(onTopEdge) {
                box.style.top = event.clientY + 'px';
                box.style.height = (initialClientY - event.clientY + b.height) + 'px';
            }
        }

        function onMouseUpResize() {
            document.removeEventListener('mousemove', onMouseMoveResize);
            document.removeEventListener('mouseup', onMouseUpResize);
        }

        document.addEventListener('mousemove', onMouseMoveResize);
        document.addEventListener('mouseup', onMouseUpResize);

    }

}


function onMouseMove(event) {

    var box = event.target;
    var b = box.getBoundingClientRect();
    var x = event.clientX - b.left;
    var y = event.clientY - b.top;

    var onTopEdge = y < MARGIN;
    var onLeftEdge = x < MARGIN;
    var onRightEdge = x >= b.width - MARGIN;
    var onBottomEdge = y >= b.height - MARGIN;

    if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
        box.style.cursor = 'nwse-resize';
    } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
        box.style.cursor = 'nesw-resize';
    } else if (onRightEdge || onLeftEdge) {
        box.style.cursor = 'ew-resize';
    } else if (onBottomEdge || onTopEdge) {
        box.style.cursor = 'ns-resize';
    } else {
        box.style.cursor = 'move';
    }

}




