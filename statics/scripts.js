document.addEventListener("DOMContentLoaded", function( ) {

    // HTML environment
    let default_note = document.querySelector(".note");
    default_note.style.display = "none";  
    let note_list = document.getElementById("note-list");  
    let plusButton = document.getElementById("plus");
    let notes = getStorage();

    // Access localStorage Notes and show on the screen
    function getStorage() {
        if (localStorage.getItem("notes")) {
            var notes = JSON.parse( localStorage.getItem("notes") );
        } else {
            var notes =  JSON.stringify( [{"name":"Click to Rename", "content": ""}] );
            localStorage.setItem("notes", notes);
        }

        // Populate Notes on the screen
        for (let i=0; i<notes.length; i++) {
            if (notes.length > 1 && i==0) {
                {} // doesn't show the default note if there's saved notes on the localStorage
            } else {
                let new_note = default_note.cloneNode(true);
                new_note.childNodes[1].innerHTML = notes[i]["name"];
                new_note.childNodes[3].innerHTML = notes[i]["content"];
                new_note.style.display = "";
                note_list.appendChild(new_note);
            }
        }
        return notes;
    }

    // Event Listeners
    plusButton.addEventListener('click', manageNotes, false);
    note_list.addEventListener('click', manageNotes, false);

    // Manage Notes
    function manageNotes(e) { 
        // Delete a Note
        if (e.target.alt == "Delete Note") {
            if (confirm("Are you sure?")) {
                e.target.parentElement.parentElement.parentElement.remove();
                let note_clicked = e.target.parentElement.parentElement.parentElement;
                console.log(note_clicked);
                
                let note_name = note_clicked.querySelector('h4').innerHTML;
                let note_content = note_clicked.querySelector('textarea').innerHTML;

                if (notes.length > 1) {
                    notes.pop( notes.indexOf({"name":note_name, "content":note_content}) );
                    localStorage.setItem("notes", JSON.stringify(notes) );
                } else if (notes.length == 1 && note_name=="Click to Rename" && note_content=="") {
                    {}
                }
            }

        // Add new Note
        } else if (e.target.alt == "Add Note") {
            const new_note = default_note.cloneNode(true);
            new_note.style.display = "";
            new_note.childNodes[1].innerText = notes[0].name;
            new_note.childNodes[3].innerText = notes[0].content;
            note_list.appendChild(new_note);

        // Save Notes in localStorage and refresh page
        } else if (e.target.alt == "Save Note") {
            let note_clicked = e.target.parentElement.parentElement.parentElement;
            let note_name = note_clicked.querySelector('h4').innerHTML;
            let note_content = note_clicked.querySelector('textarea').value;

            notes.push({"name":note_name, "content":note_content});
            localStorage.setItem("notes", JSON.stringify(notes) );
            alert("Note saved in your computer!")

        // Rename Note
        } else if (e.target.className == "note-name"){ 
            let note_name = window.prompt("New Name: ", "My Note");
            if (note_name.length > 0) {
                e.target.innerText = note_name;
            } else {
                alert("Choose a valid name!")
            }
        }
        e.stopPropagation();
    }
})
