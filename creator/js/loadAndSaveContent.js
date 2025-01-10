/* load and save content to local storage */

$(document).ready(function () {

    if ($("#content").length > 0 || $("#contentLightbox").length > 0) {
        loadContent();
        loadContentComments();
    }

});

$(document).on("click", ".addBigContentCard, .addSmallContentCard, .contentCardDelete, .contentCardCopy", function() {
    setTimeout(function() {
        saveContent();
    }, 100);
});

$(document).on("input", "#content .contentCardTitle, .contentCardTitle", function() {
    saveContent();
});


// JSON template
contentJSON = [ 
    {
        "id": 0,
        "title": "",
        "content": [],
        "comments": []
    } 
];

contentJSONtest = [ 
    {
        "id": 0,
        "title": "Oberthema 1",
        "content": [
            {
                "id": 0,
                "title": "Unterthema 1",
                "comments": [
                    {
                        "id": 0,
                        "text": "Das ist ein Test-Kommentar für das Unterthema",
                    }
                ]
            },
            {
                "id": 1,
                "title": "Unterthema 2",
                "comments": [],
            },
        ],
        "comments": [
            {
                "id": 0,
                "text": "Das ist ein Test-Kommentar für Oberthema",
            },
            {
                "id": 1,
                "text": "Das ist ein Test-Kommentar 2 für Oberthema",
            }
        ]
    } 
];

// save data from content page
function saveContent() {

    var contentJSON = [];
    $(".contentCardColumns .contentCardListColumn").each(function( i ) {
        contentJSON[i] = {};
        contentJSON[i]["id"] = $(this).find(".bigContentCard").attr("data-id");
        contentJSON[i]["title"] = $(this).find(".bigContentCard .contentCardTitle").html();
        contentJSON[i]["content"] = []; 
        $(this).find(".contentCardInner .contentCard").each(function( j ) {
            contentJSON[i]["content"].push({});
            contentJSON[i]["content"][j]["id"] = $(this).attr("data-id");
            contentJSON[i]["content"][j]["title"] = $(this).find(".contentCardTitle").html();
        });
    });

    // save in localStorage
    storageData = JSON.stringify(contentJSON);
    localStorage.setItem("NLCreatorContent", storageData);

    console.log("successfully saved NLCreatorContent to localStorage");
    console.log(contentJSON);
}

// load data from content page
function loadContent() {
    // load from localStorage
    var storageData = localStorage.getItem("NLCreatorContent");
    if (storageData !== null) {
        var contentJSON = JSON.parse(storageData);

        for (var i = 0; i < contentJSON.length; i++) {
            var item = contentJSON[i];

            addBigContentCard($(".addContentCardColumn .addBigContentCard"), item.title, item.id);
            
            // Iterate over the content array
            for (var j = 0; j < item.content.length; j++) {
                var contentItem = item.content[j];
                var contentCardListColumn = $(".contentCardColumns .contentCardListColumn").eq(i);
                
                addSmallContentCard(contentCardListColumn.find(".addSmallContentCard"), contentItem.title, contentItem.id);
            }
        }
    }
}

function getContentCardIndex() {
    var currentContent = localStorage.getItem("NLCreatorContent");
    if ( currentContent !== null ) {
        var contentCardIndexId = "0000";
        var currentContentJSON = JSON.parse(currentContent);
        
        // iterate over each object in the array
        for (var i = 0; i < currentContentJSON.length; i++) {
            var contentObject = currentContentJSON[i];
            if (contentObject.id > contentCardIndexId) {
                contentCardIndexId = contentObject.id;
            }
            // optionally, check IDs in the nested content array (if needed)
            for (var j = 0; j < contentObject.content.length; j++) {
                var nestedContent = contentObject.content[j];
                if (nestedContent.id > contentCardIndexId) {
                    contentCardIndexId = nestedContent.id;
                }
            }
        }

        // increment the highest key found and pad with zeros
        var newIndex = (parseInt(contentCardIndexId, 10) + 1).toString().padStart(4, '0');
        return newIndex;

    } else {
        return "0001";
    }
}

/*** comments ***/
function saveContentComment(id, time, comment) {
    // retrieve commentJSON from localStorage, or initialize as an empty object
    let commentJSON = JSON.parse(localStorage.getItem('NLCreatorComments')) || {};
    if (!commentJSON[id]) {
        commentJSON[id] = {};
    }
    let commentIndex = Object.keys(commentJSON[id]).length.toString();

    // ddd the new comment to the commentJSON[id] object
    commentJSON[id][commentIndex] = {
        time: time,
        comment: comment
    };

    console.log(commentJSON);
    storageData = JSON.stringify(commentJSON);
    localStorage.setItem("NLCreatorComments", storageData);
    console.log("successfully saved NLCreatorComments to localStorage");
}

function loadContentComments(id) {
    var storageData = localStorage.getItem("NLCreatorComments");
    if (storageData !== null) {
        var commentJSON = JSON.parse(storageData);
        if (commentJSON[id]) {
            var comments = commentJSON[id];
            $('.contentCommentWrapper .allContentComments .noContentComments').removeClass('active');
            $('.contentCommentWrapper .allContentComments').find('.contentComment').remove();
            $.each(comments, function(key, comment) {
                var commentHtml = `<div class="contentComment" data-index="${key}">
                    <div class="contentCommentData">
                        <div class="contentCommentUserName">Test User</div>
                        <div class="contentCommentDate">${comment.time}</div>
                    </div>
                    <div class="contentCommentText">
                        ${comment.comment}
                        <button type="button" title="Löschen" class="contentCommentButton contentCommentDelete smallPadding">
                            <span class="dooIconContainer dooContainerName-trash userIcon"><i class="dooIcon dooIcon-trash dooIconSize-16"></i></span>
                        </button>
                    </div>
                 </div>`;
                $(commentHtml).insertAfter('.contentCommentWrapper .allContentComments h3'); 
            });
        } else {
            $('.contentCommentWrapper .allContentComments').find('.contentComment').remove();
            $('.contentCommentWrapper .allContentComments .noContentComments').addClass('active');
        }
        countContentComments(id);
    }
}

function deleteContentComments(id) {
    var storageData = localStorage.getItem("NLCreatorComments");
    if (storageData !== null) {
        var commentJSON = JSON.parse(storageData);
        if (commentJSON[id]) {
            delete commentJSON[id];
            localStorage.setItem('NLCreatorComments', JSON.stringify(commentJSON));
            console.log(commentJSON);
            console.log("successfully saved NLCreatorComments to localStorage");

            countContentComments(id);
        } 
    }
}

function deleteOneContentComment(id, index) {
    var storageData = localStorage.getItem("NLCreatorComments");
    if (storageData !== null) {
        var commentJSON = JSON.parse(storageData);
        if (commentJSON[id]) {
            if (commentJSON[id][index]) {
                // console.log("delete comment with contentCommentId: " + id + " and width index of: " + index);
                delete commentJSON[id][index];

                // rebuild the object to re-index the comments
                let reorderedComments = {};
                let newIndex = 0;
                for (let key in commentJSON[id]) {
                    if (commentJSON[id].hasOwnProperty(key)) {
                        reorderedComments[newIndex] = commentJSON[id][key];
                        newIndex++;
                    }
                }
                commentJSON[id] = reorderedComments;

                // reorder content comments in frontend
                $($(".contentComment").get().reverse()).each(function(j) {
                    $(this).attr("data-index", j);
                });
                
                localStorage.setItem('NLCreatorComments', JSON.stringify(commentJSON));
                console.log(commentJSON);
                console.log("successfully saved NLCreatorComments to localStorage"); 

                countContentComments(id);
            }
        } 
    }
}

function countContentComments(id) {
    var thisCommentLength = 0;

    var storageData = localStorage.getItem("NLCreatorComments");
    if (storageData !== null) {
        var commentJSON = JSON.parse(storageData);
        if (commentJSON[id]) {
            thisCommentLength = Object.keys(commentJSON[id]).length;
            // console.log(commentJSON[id] + " found with length of " + thisCommentLength);
        } 
    }

    $(".noContentComments").toggleClass("active", thisCommentLength === 0);
    $(".contentCard[data-id='" + id + "'] .contentCardCommentIcon .numberOfComments").toggleClass("active", thisCommentLength !== 0);
    $(".contentCard[data-id='" + id + "'] .contentCardCommentIcon .numberOfComments").html(thisCommentLength);
}