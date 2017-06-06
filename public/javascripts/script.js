var red = document.querySelector('.red')
var yellow = document.querySelector('.yellow')
var green = document.querySelector('.green')
var priorityValue = document.querySelector('.priorityValue')
var save = document.querySelector('.save')
var note = document.querySelector('.note')
var mainBox = document.querySelector('.mainBox')
var sort = document.querySelector('.sort');
var listHolder = document.querySelector('.listHolder');
var saveEdit = document.querySelector('.saveEdit')

red.onclick = function() {
    priorityValue.value = 3;
}
yellow.onclick = function() {
    priorityValue.value = 2;
}
green.onclick = function() {
    priorityValue.value = 1;
}
var tabHeads = document.getElementsByClassName('tabHead')
for (var i = 0; i < tabHeads.length; i++) {
    var tabHeads = document.getElementsByClassName('tabHead')
    var tabHead = tabHeads[i]
    tabHead.addEventListener('click', function(e) {
        var tabName = e.target.innerHTML.toLowerCase();
        var tabs = document.getElementsByClassName('tab')
        for (var j = 0; j < tabs.length; j++) {
            var classMain = tabs[j].getAttribute('class').split(' ')[0]
            if (classMain == tabName) {
                tabs[j].style.display = "block";
            } else {
                tabs[j].style.display = "none";
            }
        }

        if (tabName === "list") {
            var xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var notes = JSON.parse(this.responseText)['content']
                    var ids = JSON.parse(this.responseText)['ids']
                    for (var i = 0; i < notes.length; i++) {
                        var list = document.createElement('li')
                        list.innerHTML = notes[i].slice(0, notes[i].length - 1) + '(' + ids[i] + ')';
                        list.setAttribute('class', 'c' + notes[i][notes[i].length - 1])
                        listHolder.appendChild(list)
                    }
                }
            }


            xhr.open('GET', '/list', true)
            var body = 'cat=dog&rat=mouse+cat'
            xhr.send(body)

        }
    }, true)
}

sort.onclick = function() {
    var lists = document.querySelectorAll('ul li')
    listHolder.innerHTML = "";
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        console.log(priority)
        if (priority == 3)
            listHolder.appendChild(lists[i])
    }
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        console.log(priority)
        if (priority == 2)
            listHolder.appendChild(lists[i])
    }
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        console.log(priority)
        if (priority == 1)
            listHolder.appendChild(lists[i])
    }

}
save.onclick = function() {
    //  alert(priorityValue.value + " " + note.value)
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var para = document.createElement('p')
            para.innerText = this.responseText;
            para.style.color = "red";
            para.setAttribute('class', 'message')
            mainBox.appendChild(para)
            note.value = ""
            setTimeout(function() {
                var message = document.querySelector('.message')
                message.remove()
            }, 2000)
        }

    }
    xhr.open('POST', '/add', true)
    var body = 'priority=' + priorityValue.value + "&content=" + replaceAll(note.value, " ", "+")
    xhr.send(body)


}

function replaceAll(string, charToBeReplaced, charToBeAdded) {
    while (string.indexOf(charToBeReplaced) != -1) {
        string = string.replace(charToBeReplaced, charToBeAdded)
    }
    return string
}
//edit notes
var red1 = document.querySelector('.red1')
var yellow1 = document.querySelector('.yellow1')
var green1 = document.querySelector('.green1')
red1.onclick = function() {
    priorityValueEdit.value = 3;
}
yellow1.onclick = function() {
    priorityValueEdit.value = 2;
}
green1.onclick = function() {
    priorityValueEdit.value = 1;
}
var editNote = document.getElementById('editNote')
var priorityValueEdit = document.querySelector('.priorityValueEdit')
var x = document.getElementById('x')
var sNo = document.querySelector('.sNo')
var save = document.getElementById('save')
sNo.onchange = function() {
    editNote.value = "";
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            editNote.value = this.responseText;
        }

    }
    xhr.open('GET', '/getContent/' + sNo.value, true)
    xhr.send()
}
saveEdit.onclick = function() {
    if (editNote.value != "") {
        var key = sNo.value.toString();
        var value = (editNote.value + priorityValue.value).toString();
        localStorage.setItem(key, value)
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var edit = document.querySelector('.edit')
                var para = document.createElement('p')
                para.innerText = this.responseText;
                para.style.color = "red";
                para.setAttribute('class', 'message')
                edit.appendChild(para)
                note.value = ""
                setTimeout(function() {
                    var message = document.querySelector('.message')
                    message.remove()
                }, 2000)
            }

        }
        var body = 'content=' + replaceAll(editNote.value, ' ', '+') + priorityValueEdit.value;
        xhr.open('POST', '/save/' + sNo.value, true)
        xhr.send(body)

    }
    editNote.value = ""
    sNo.value = ""
}

//delete
var preview = document.getElementById('preview')
var sNoDelete = document.querySelector('.sNoDelete')
var delete1 = document.getElementById('delete1')
sNoDelete.onchange = function() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            preview.innerHTML = this.responseText;
        }

    }
    xhr.open('GET', '/getContent/' + sNoDelete.value, true)
    xhr.send()
}
delete1.onclick = function() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //differently named cause reserve words
            var deleteTab = document.querySelector('.delete')
            var para = document.createElement('p')
            para.innerText = this.responseText;
            para.style.color = "red";
            para.setAttribute('class', 'message')
            deleteTab.appendChild(para)
            preview.innerHTML = ""
            sNoDelete.value = ""
            setTimeout(function() {
                var message = document.querySelector('.message')
                message.remove()
            }, 2000)
        }

    }
    xhr.open('POST', '/delete/' + sNoDelete.value, true)
    xhr.send()
}