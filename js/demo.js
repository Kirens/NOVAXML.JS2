var SCHOOLS_N_IDS = [
    "Blackebergs Gymnasium", 52550,
    "Kungsholmens Gymnasium", 29200,
    "Norra Real", 81530,
    "Östra Real", 59150
], //Every school has a different value. For example, Blackebergs Gymnasium has the id 52550
    errorFunction = function(error) {
        document.body.style.cursor = "default";
        if (error == 'InvalidPDFException') {
            alert('Wrong data: Could not load PDF' + "\n" + "Se till så att du inte har skrivit in fel skola eller id.");
        } else {
            alert(error + "\n" + "Se till så att du inte har skrivit in fel skola eller id.")
        }
        throw {
            name: error,
            message: 'Something went badly wrong'
        };

    },
    SCHOOLS_SELECT_ID = "schools_select_id";

//Functions
setUpSchoolList = function(conArray, parent, insertBefore) {
    //Insert a list in the form (parent) and before the select of periods

    //Insert options into a select. 

    //Create select
    var selectSchool = document.createElement("select");
    selectSchool.id = SCHOOLS_SELECT_ID;
    //Create options and insert them into select
    for (var i = 0; i < (conArray.length); i = i + 2) {
        //Create option
        var option = document.createElement("option");
        option.innerHTML = conArray[i];
        option.value = conArray[i + 1];

        //Insert option into select
        selectSchool.appendChild(option);
    }
    //insert select into DOM.
    parent.insertBefore(selectSchool, insertBefore);

}
//Add initial pdf for design and good looks :)
NOVA.PDF({
    id: null,
    week: null,
    completeFn: function(error) {},
    errorFn: errorFunction,
    container: document.getElementById("pdfContainer")
});

//Set up a select-option thingy with the above values and content, into the input_form, before periodList. 
setUpSchoolList(SCHOOLS_N_IDS, document.getElementById("input_form"), document.getElementById("periodList"));

document.getElementById("submitBtn").onclick = function() {

    //Get info

    var id = document.getElementById("userId").value,
        period = document.getElementById("periodList").options[document.getElementById("periodList").selectedIndex].value,
        school = document.getElementById(SCHOOLS_SELECT_ID)
            .options[document.getElementById(SCHOOLS_SELECT_ID)
                .selectedIndex].value,
        container = document.getElementById("pdfContainer"),
        startWeek,
        stopWeek;

    //Figure out the start and stop week from period.

    if (period === "Vt") {
        stopWeek = 24;
        startWeek = 1;
    } else if (period === "Ht") {
        stopWeek = 52;
        startWeek = 34;
    }

    //What does the API need to know? 
    //We need id, school, week interval and a container for where the schedule should be drawn. 

    NOVA.startNova(id, school, startWeek, stopWeek, container);
}