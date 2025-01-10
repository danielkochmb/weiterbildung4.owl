/* load and save data to local storage */

$(document).ready(function () {

    // insert data only on data page automatically
    if ($("#data").length > 0) {
        loadData();
    }

    $(document).on("change", "#data input, #data select", function() {
        saveData();
    });
    
    $(document).on("click", "#data .singleMultipleButton, #data .learningTargetLevelLinkData, .deleteEntryButton", function() {
        saveData();
    });

});




// JSON template
dataJSON = {
    "title": "",
    "learningTargets": [
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
    ],
    "format": "",
    "time": {
        "time": "1",
        "type": "days",
    },
    "timePresence": {
        "time": "1",
        "type": "days",
    },
    "timeDigital": {
        "time": "1",
        "type": "hours",
    },
    "digitalFormat": "",
    "userPerEvent": {
        "min": "40",
        "max": "60",
    },
    "userTotal": "50",
    "digitalAffinity": "",
    "knowledgeSkills": "",
    "structureVisited": "false",
    "dataApproved": "false"
};

// JSON template
resetDataJSON = {
    "title": "",
    "learningTargets": [
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
        {
            "level": "",
            "text": "",
            "verb": "",
        },
    ],
    "format": "",
    "time": {
        "time": "1",
        "type": "days",
    },
    "timePresence": {
        "time": "1",
        "type": "days",
    },
    "timeDigital": {
        "time": "1",
        "type": "hours",
    },
    "digitalFormat": "",
    "userPerEvent": {
        "min": "40",
        "max": "60",
    },
    "userTotal": "50",
    "digitalAffinity": "",
    "knowledgeSkills": "",
    "structureVisited": "false",
    "dataApproved": "false"
};




// save data from data page
function saveData() {

    var currentData = localStorage.getItem("NLCreatorData");
    if ( currentData !== null ) {
        var currentDataJSON = JSON.parse(currentData);
        console.log(currentDataJSON);
    }

    dataJSON["title"] = $("#dataTitle").val();

    // clear learning targets to get new numbering
    dataJSON["learningTargets"] = {};
    for (var i = 0; i < 5; i++) { 
        dataJSON["learningTargets"][i] = {};
        dataJSON["learningTargets"][i]["level"] = "";
        dataJSON["learningTargets"][i]["text"] = "";
        dataJSON["learningTargets"][i]["verb"] = "";
    }
    $(".dataLearningTargetWrapper .dataLearningTargetRow").each(function( index ) {
        dataJSON["learningTargets"][index]["level"] = $(this).attr("data-level");
        dataJSON["learningTargets"][index]["text"] = $(this).find(".dataLearningTargetText").val();
        dataJSON["learningTargets"][index]["verb"] = $(this).find(".dataLearningTargetVerb").val();
    });

    dataJSON["format"] = $(".dataFormat.active").attr("data-format");

    dataJSON["time"] = {};
    dataJSON["time"]["time"] = parseFloat($("#dataTime").val());
    // dataJSON["time"]["type"] = $(".dataTimeType.active").attr("data-timeType");
    dataJSON["time"]["type"] = $(".dataTimeType").attr("data-timeType");

    dataJSON["timePresence"] = {};
    dataJSON["timePresence"]["time"] = parseFloat($("#dataTimePresence").val());
    // dataJSON["timePresence"]["type"] = $(".dataTimePresenceType.active").attr("data-timePresenceType");
    dataJSON["timePresence"]["type"] = $(".dataTimePresenceType").attr("data-timeType");

    dataJSON["timeDigital"] = {};
    dataJSON["timeDigital"]["time"] = parseFloat($("#dataTimeDigital").val());
    // dataJSON["timeDigital"]["type"] = $(".dataTimeDigitalType.active").attr("data-timeDigitalType");
    dataJSON["timeDigital"]["type"] = $(".dataTimeDigitalType").attr("data-timeType");

    dataJSON["digitalFormat"] = $(".dataDigitalFormat.active").attr("data-digitalFormat");

    dataJSON["userPerEvent"] = {};
    dataJSON["userPerEvent"]["min"] = parseInt($(".dataUserPerEventMin").val());
    dataJSON["userPerEvent"]["max"]  = parseInt($(".dataUserPerEventMax").val());
    // dataJSON["userTotal"] = parseInt($("#dataUserTotal").val());

    dataJSON["digitalAffinity"] = $(".dataDigitalAffinity.active").attr("data-digitalAffinity");
    dataJSON["knowledgeSkills"] = $(".dataKnowledgeSkills.active").attr("data-knowledgeSkills");

    if ( currentData !== null) {
        if (currentDataJSON.length !== 0) {
            dataJSON["structureVisited"] = currentDataJSON["structureVisited"];
            dataJSON["dataApproved"] = currentDataJSON["dataApproved"];

            if (currentDataJSON["format"] != dataJSON["format"] || currentDataJSON["digitalFormat"] != dataJSON["digitalFormat"] || currentDataJSON["time"]["time"] != dataJSON["time"]["time"] || currentDataJSON["timePresence"]["time"] != dataJSON["timePresence"]["time"] || currentDataJSON["timeDigital"]["time"] != dataJSON["timeDigital"]["time"] ) {
                dataJSON["dataApproved"] = 'false';
            }
        }
    }

    console.log(dataJSON);

    // save in localStorage
    storageData = JSON.stringify(dataJSON);
    localStorage.setItem("NLCreatorData", storageData);

    console.log("successfully saved data to localStorage");
}


// load data from data page
function loadData() {
    // load from localStorage
    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData == null) {
        localStorage.setItem("NLCreatorData", JSON.stringify(resetDataJSON));
    }

    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData !== null) {


        var dataJSON = JSON.parse(storageData);

        console.log(dataJSON);

        $("#dataTitle").val(dataJSON["title"]);

        // learning target
        for (var i = 0; i < 5; i++) { 
            if (dataJSON["learningTargets"][i]["level"] != "") {
                if (i == 0) {
                    $(".dataLearningTargetRow").remove();
                }
                addTextInputList($(".dataLearningTargetWrapper .addButton"), dataJSON["learningTargets"][i]["level"], dataJSON["learningTargets"][i]["text"], dataJSON["learningTargets"][i]["verb"]);
                var child = i + 1;
                $(".dataLearningTargetWrapper .dataLearningTargetRow:nth-child("+child+") .learningTargetLevelLinkData[data-level="+dataJSON['learningTargets'][i]['level']+"]").click();
                $(".dataLearningTargetWrapper .dataLearningTargetRow:nth-child("+child+") .dataLearningTargetVerb option[value='"+ dataJSON["learningTargets"][i]["verb"] +"']").attr("selected" , "selected");
            }
        }

        multipleButtonActive($(".dataFormat[data-format='"+ dataJSON["format"] +"']"));

        $(".dataTime").val(parseFloat(dataJSON["time"]["time"]));
        $(".dataTimeType").attr("data-timeType", dataJSON["time"]["type"]);
        // multipleButtonActive($(".dataTimeType[data-timeType='"+ dataJSON["time"]["type"] +"']"));

        $(".dataTimePresence").val(parseFloat(dataJSON["timePresence"]["time"]));
        $(".dataTimePresenceType").attr("data-timeType", dataJSON["timePresence"]["type"]);
        // multipleButtonActive($(".dataTimePresenceType[data-timePresenceType='"+ dataJSON["timePresence"]["type"] +"']"));

        $(".dataTimeDigital").val(parseFloat(dataJSON["timeDigital"]["time"]));
        $(".dataTimeDigitalType").attr("data-timeType", dataJSON["timeDigital"]["type"]);
        loadSliderType(dataJSON["timeDigital"]["type"]);
        
        // multipleButtonActive($(".dataTimeDigitalType[data-timeDigitalType='"+ dataJSON["timeDigital"]["type"] +"']"));

        multipleButtonActive($(".dataDigitalFormat[data-digitalFormat='"+ dataJSON["digitalFormat"] +"']"));

        $(".dataUserPerEventMin").val(parseFloat(dataJSON["userPerEvent"]["min"]));
        $(".dataUserPerEventMax").val(parseFloat(dataJSON["userPerEvent"]["max"]));
        // $(".rangeSliderUI").slider("values", [parseFloat(dataJSON["userPerEvent"]["min"]), parseFloat(dataJSON["userPerEvent"]["max"])]);
        // $(".dataUserPerEvent").val(parseInt(dataJSON["userPerEvent"]));
        // $(".dataUserTotal").val(dataJSON["userTotal"]);

        multipleButtonActive($(".dataDigitalAffinity[data-digitalAffinity='"+ dataJSON["digitalAffinity"] +"']"));
        multipleButtonActive($(".dataKnowledgeSkills[data-knowledgeSkills='"+ dataJSON["knowledgeSkills"] +"']"));
    }
}

// load slider type to hours or days
function loadSliderType(type) {
    var digitalSlider = $(".additionalQuestionTimeDigital").find(".slider");
    var digitalSliderText = $(".additionalQuestionTimeDigital").find(".silderInputText");
    if (type == "hours") {
        digitalSlider.attr("min", "1");
        digitalSlider.attr("max", "16");
        digitalSlider.attr("step", "1");
        digitalSliderText.html("Stunden");
        digitalSliderText.attr("data-timeType", "hours");
    } else {
        digitalSlider.attr("min", "0.5");
        digitalSlider.attr("max", "8");
        digitalSlider.attr("step", "0.5");
        digitalSliderText.html("Tage");
        digitalSliderText.attr("data-timeType", "days");
    }
}





