$(document).ready(function () {
    const url = new URL(window.location.href);
    if (url.searchParams.has('objectId')) {
        loadData();
        $(".primaryButton").addClass("previewMode");
        $(".backButton").addClass("previewMode");
        $("section").addClass("previewMode");
        $("footer").addClass("previewMode");
        $("main").addClass("previewMode");
    } else {
        // activate checkboxes on enter key
        $('input[type="checkbox"]').on('keypress', function (event) {
            if (event.which === 13) {
                this.checked = !this.checked;
            }
        });

        // initialize every slider
        $(".slider").each(function () {
            sliderValue(this);
        });

        // custom input file name
        $('input[type="file"]').change(function (e) {

            var fileName = e.target.files[0].name;
            var inputLabel = $(this).next("label");
            var inputSpan = inputLabel.find("span");

            if (this.files && this.files.length > 1) {
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            } else if (e.target.value) {
                fileName = e.target.value.split('\\').pop();
            }
            inputSpan.html(fileName);
            inputSpan.removeClass("fileUploadPlaceholder");
        });

        $('input[type="file"]').on('focus', function () { $('input[type="file"]').addClass('has-focus'); })
        $('input[type="file"]').on('blur', function () { $('input[type="file"]').removeClass('has-focus'); });

        $(".check-answer").on('focusout change', function () {
            checkIfFilled(this);
        });

        // slider label function
        $('.slider').on('input', function () {
            sliderLabel(this);
        });

        $(window).on('resize', function () {
            $(".slider").each(function(){
                sliderLabel(this);
            });
        });

        //date input min date today
        var todaysDate = new Date().toISOString().split("T")[0];
        $(".customDateInput").attr('min', todaysDate);

        progressBar();
    }
});

// show next section
function showNext(element) {
    $(element).parents("section").removeClass("active");
    $(element).parents("section").next("section").addClass("active");
    var setLink = $(".menuFooterListItem.active")
    setLink.next(".menuFooterListItem").addClass("active");
    setLink.removeClass("active");
    $(".slider").each(function(){
        sliderLabel(this);
    });
}

// show previous section
function showPrevious(element) {
    $(element).parents("section").removeClass("active");
    $(element).parents("section").prev("section").addClass("active");
    var setLink = $(".menuFooterListItem.active")
    setLink.prev(".menuFooterListItem").addClass("active");
    setLink.removeClass("active");
    $(".slider").each(function(){
        sliderLabel(this);
    });
}

// navigate with footer links
function showPage(element) {
    var target = $(element).attr("href");
    $("section.active").removeClass("active");
    $("section" + target).addClass("active");

    $(".menuFooterListItem").removeClass("active");
    $(".menuFooterListItemLink").each(function () {
        var href = $(this).attr("href");
        if (href === target) {
            $(this).parents(".menuFooterListItem").addClass("active");
        }
    });
    $(".slider").each(function(){
        sliderLabel(this);
    });
}


// add input list item
function addInputList(element) {
    var inputListPlaceholder = $(element).siblings(".inputList").find(".textarea").attr("placeholder");
    $(element).parents(".inputWrapper").find(".inputList").find(".inputListItem:last-child").after('<li class="inputListItem"><textarea name="question7" class="textarea check-answer question7" autocomplete="off" placeholder="' + inputListPlaceholder + '"></textarea><div class="inputListItemCancel"><i class="iconCancel" onclick="removeInputList(this);"  onkeydown="removeInputListOnKey(this);" tabindex="0"></i></div></li>');
    if ($(element).parents(".inputWrapper").find(".inputListItem").length >= 5) {
        $(element).parents(".inputWrapper").find('.addButton').hide();
    } else {
        $(element).parents(".inputWrapper").find('.addButton').show();
    }
}

// save all input list items in one textarea 

function saveInputList(element){
    $(".inputWrapperTextarea").each(function(){
        var parent = $(this);
        var input = "";
        $(parent).find(".allTexts").val("");
        $(parent).find(".inputListItem").each(function(){
            var inputListItemObject = $(this).find(".textarea.check-answer").val();
            if (inputListItemObject != ""){
                input += inputListItemObject + ", ";
            }
    }); 
        $(parent).find(".allTexts").val(input.slice(0,-2));
    }); 

}

// add dropdown list item
function addDropdownList(element) {
    var languages = ['Deutsch', 'Englisch', 'Französisch', 'Italienisch'];
    var languageArray = [];
    var dropdownLists = $(element).parents('.inputWrapper').find('.dropdown');
    $.each(dropdownLists, function (j) {
        var selectedOption = $(dropdownLists[j]).find('option:selected').text();
        languages.splice($.inArray(selectedOption, languages), 1);
    });
    $.each(languages, function (i) {
        languageArray.push('<option value="' + languages[i] + '">' + languages[i] + '</option>');
    });
    languageArray.join("");
    $(element).parents(".inputWrapper").find(".inputList").find(".inputListItem:last-child").after('<li class="inputListItem"><select class="dropdown check-answer question19" name="question19" onclick="selectAddInput(this)"><option value="" disabled selected hidden>Sprache auswählen...</option>' + languageArray + '<option value="Weitere" class="additionalInput">Weitere</option></select><div class="inputListItemArrow"><i class="iconArrow"></i></div><div class="inputListItemCancel"><i class="iconCancel" onclick="removeInputList(this);" onkeydown="removeInputListOnKey(this);"tabindex="0"></i></div></li>');
}


// save all dropDown list items in one textarea 

function saveInputListDropDown(element){
    $(".selectWrapperTextarea").each(function(){
        var parent = $(this);
        var input = "";
        $(parent).find(".allTexts").val("");
        $(parent).find(".inputListItem").each(function(){
            var inputDropDownItemObject = $(this).find('select').val();
            var inputDropDownItemText = $(this).find('.textarea').val();
            if (inputDropDownItemObject != null){
                input += inputDropDownItemObject + ", ";
            }else if (inputDropDownItemText != null){
                input += inputDropDownItemText + ", ";
            }
            else if (inputDropDownItemObject != null && inputDropDownItemText != null){
                input += inputDropDownItemText + ", " + inputDropDownItemText + ", ";
            }
    }); 
        $(parent).find(".allTexts").val(input.slice(0,-2));
    }); 
}


// add input list item on select option additionalInput
function selectAddInput(element) {
    var optionInput = $(element).find("option.additionalInput");
    if (optionInput.is(':selected')) {
        var selectList = $(element).parents(".inputListItem");
        selectList.after('<li class="inputListItem"><textarea name="question19" class="textarea check-answer select-add-input question19" autocomplete="off" placeholder="Sprache eingeben..."></textarea><div class="inputListItemCancel"><i class="iconCancel" onclick="removeInputList(this);"  onkeydown="removeInputListOnKey(this);" tabindex="0"></i></div></li>');
        // var next = selectList.next()
        // next.find(".textarea").focus();
        selectList.remove();
    }
}

// remove input list or dropdown list item
function removeInputList(element) {
    if ($(element).parents(".inputListItem").find("textarea").hasClass("select-add-input")) {
        addDropdownList($(element).parents(".inputListItem"));
    } else if ($(element).parents(".dropdownContainer").hasClass('categorySystemInputWrapper')) {
        clearCategory();
    }
    $(element).parents(".inputWrapper").find('.addButton').show();
    // $(element).parents(".inputWrapper").focus();
    $(element).parents(".inputListItem").remove();
}

// remove input list or dropdown list item on enter key
function removeInputListOnKey(element) {
    $(document).keypress(function (event) {
        if (event.which === 13) {
            if ($(element).parents(".inputListItem").find("textarea").hasClass("select-add-input")) {
                addDropdownList($(element).parents(".inputListItem"));
            } else if ($(element).parents(".dropdownContainer").hasClass('categorySystemInputWrapper')) {
                clearCategory();
            }
            $(element).parents(".inputListItem").remove();
        }
    });
}



// function for multible button switch
function multipleButtonActive(element) {
    var questionName = $(element).attr("name");
    var multipleButtonResponseRadio = $(element).parents(".multipleButtonRadioQuestions").siblings(".inputWrapper").find(".radio");
    $(element).parents(".inputWrapper").siblings(".inputWrapper").removeClass("active");
    if ($(element).hasClass("active")) {
        if ($(element).parents(".multipleButton").hasClass("multipleButtonResponse")) {
            $(element).parents(".multipleButton").siblings(".hiddenCheckbox").addClass("active");
            $(element).parents(".multipleButton").find(".singleMultipleButton").removeClass("active");
            // hide additional question when changing "Format"
            multipleButtonResponseRadio.prop('checked', false);
            var thisRadio = $(element).parents(".inputWrapper").siblings(".inputWrapper").find(".openNextQuestion");

            toggleNextRadioQuestion(thisRadio);
            checkIfFilled(multipleButtonResponseRadio);
        } else if ($(element).parents(".multipleButton").hasClass('alwaysActive')) {
            // set switch button always active
            $(element).addClass("active");
        } else {
            $(element).parents(".multipleButton").find(".singleMultipleButton").removeClass("active");
        }

    } else {
        if ($(element).parents(".multipleButton").hasClass("multipleButtonResponse")) {
            $(element).parents(".multipleButton").siblings(".hiddenCheckbox").removeClass("active");
            $(element).parents(".inputWrapper").siblings("." + questionName).addClass("active");
            // hide additional question when changing "Format"
            multipleButtonResponseRadio.prop('checked', false);
            var thisRadio = $(element).parents(".inputWrapper").siblings(".inputWrapper").find(".openNextQuestion");

            toggleNextRadioQuestion(thisRadio);
            checkIfFilled(multipleButtonResponseRadio);

            if ($(element).hasClass("question9")) {
                $(".questionPresence, .questionDigital, .questionDigitalPresence").removeClass("required");
                if($(".questionPresence").hasClass("active")){
                    $(".questionPresence").addClass("required");
                } else if($(".questionDigital").hasClass("active")) {
                    $(".questionDigital").addClass("required");
                } else if($(".questionDigitalPresence").hasClass("active")) {
                    $(".questionDigitalPresence").addClass("required");
                }
            }
        }
        $(element).parents(".multipleButton").find(".singleMultipleButton").removeClass("active");
        $(element).addClass("active");
    }

    // remove answers for question 25
    var multipleButtonResponseQuestionEmail = $(element).parents(".inputWrapper").siblings(".questionEmail");
    var multipleButtonResponseQuestionTelephone = $(element).parents(".inputWrapper").siblings(".questionTelephone");
    multipleButtonResponseQuestionEmail.find(".input").val('');
    multipleButtonResponseQuestionTelephone.find(".input").val('');

    var activeResponseQuastionName = $(element).attr('name');
    if ($(element).hasClass('active') && (activeResponseQuastionName == "questionEmail" || activeResponseQuastionName == "questionTelephone")) {
        multipleButtonResponseQuestionEmail.removeClass('required');
        multipleButtonResponseQuestionTelephone.removeClass('required');
        $(element).parents(".inputWrapper").siblings("." + activeResponseQuastionName + "").addClass('required');
    }
    // checkIfFilled(multipleButtonResponseQuestionEmail);
    // checkIfFilled(multipleButtonResponseQuestionTelephone);
    checkIfFilledRemoveIcon(multipleButtonResponseQuestionEmail.find(".input"));
    checkIfFilledRemoveIcon(multipleButtonResponseQuestionTelephone.find(".input"));

    checkIfFilled(element); // check if answer is given
}

// function for multible button switch with multible answer options
function multipleButtonActiveAnswerMultible(element) {
    if ($(element).hasClass("active")) {
        $(element).removeClass("active");
    } else {
        $(element).addClass("active");
    }
    checkIfFilled(element); // check if answer is given
}

// shows a new question on radio choice
function toggleNextRadioQuestion(element) {
    var nextQuestion = $(element).parents(".inputWrapper").next(".questionDigitalPresence");
    var thisRadio = $(element).find(".radio");
    if (thisRadio.is(':checked') && $(element).hasClass('openNextQuestion')) {
        nextQuestion.slideDown("slow");
    } else {
        nextQuestion.slideUp("slow");
    }
}

// changes slider range on button choice
function multipleButtonSliderRange(element) {
    var thisSlider = $(element).parents(".hourDayContainer").siblings(".rangeContainer").find(".slider");
    if ($(element).hasClass("sliderConfig1")) {
        thisSlider.attr("max", "30000");
        thisSlider.attr("value", "15000");
    } else {
        thisSlider.attr("max", "100000");
        thisSlider.attr("value", "50000");
    }
    sliderValue(thisSlider);
    sliderLabel(thisSlider);
}


// give slider value output to input field
function sliderValue(element) {
    var sliderValue = $(element).val();
    var output = $(element).parents(".rangeContainer").siblings(".hourDayContainer").find(".sliderInput");
    output.val(sliderValue);
}

// give input field output to slider value
function outputValue(element) {
    var outputValue = $(element).val();
    var slider = $(element).parents(".hourDayContainer").siblings(".rangeContainer").find(".slider");
    slider.val(outputValue);
    sliderLabel(slider);
}

// slider label function
function sliderLabel(element) {
    var sliderValue = $(element).val();
    var sliderWidth = $(element).width();
    var min = parseInt($(element).attr('min'));
    var max = parseInt($(element).attr('max'));
    var newPosition = (sliderValue - min) * (sliderWidth - 27) / (max - min);

    $(element).next('.sliderLabel').text(sliderValue);
    $(element).next('.sliderLabel').css('left', newPosition + 'px');
}

// set slider inactive on checkbox
function inactiveAnswer(element) {
    var checkbox = $(element).find(".checkbox");
    if (checkbox.is(':checked')) {
        $(element).parents(".inputWrapper").find(".rangeContainer").addClass("inactive");
        $(element).parents(".inputWrapper").find(".hourDayContainer").addClass("inactive");

        $(element).parents("#format").find(".questionPresence").addClass("inactive");
        $(element).parents("#format").find(".questionPresence").removeClass("required active");
        $(element).parents("#format").find(".questionDigital").addClass("inactive");
        $(element).parents("#format").find(".questionDigital").removeClass("required active");
        $(element).parents("#format").find(".questionDigitalPresence").addClass("inactive");
        $(element).parents("#format").find(".questionDigitalPresence").removeClass("required active");

        $(element).parents(".inputWrapper").find(".multipleButton").addClass("inactive");
    } else {
        $(element).parents(".inputWrapper").find(".rangeContainer").removeClass("inactive");
        $(element).parents(".inputWrapper").find(".hourDayContainer").removeClass("inactive");

        $(element).parents("#format").find(".questionPresence").removeClass("inactive");
        $(element).parents("#format").find(".questionDigital").removeClass("inactive");
        $(element).parents("#format").find(".questionDigitalPresence").removeClass("inactive");

        $(element).parents(".inputWrapper").find(".multipleButton").removeClass("inactive");
    }
}


// open additional wrapper on second radio choice
function toggleRadioAnswer(element) {
    var secondRadio = $(element).parents(".radioList").find(".radioItem:nth-child(2)").find(".radio");
    if (secondRadio.is(':checked')) {
        $(element).parents(".radioList").find(".radioAdditionalWrapper").slideDown("slow");
    } else {
        $(element).parents(".radioList").find(".radioAdditionalWrapper").slideUp("slow");
    }
    dynamicSubmitButton(element);
}

// changes submit description depending on radio answer
function dynamicSubmitButton(element) {
    var questionRadio = $(element).find(".radio");
    var dynamicButtonName = $(element).find(".radio").attr("data-dynamic-button");
    var submitButton = $(".dynamicSubmit");
    if (questionRadio.is(':checked')) {
        submitButton.html(dynamicButtonName);
    } else {
        submitButton.html("Absenden");
    }
}


// opens information table in additional wrapper
function toggleInformationTable(element, event) {
    var informationTable = $(element).parents(".checkboxItemWrapper").next(".informationTable");
    $(element).toggleClass("active");
    informationTable.slideToggle("slow");
}



// check every answer and mark it
function checkIfFilled(element, checkAll) {
    if ($(element).is("textarea")) {
        if (!$.trim($(element).val())) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("select")) {
        if (!$(element).val()) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='range']") || $(element).is("input[type='number']")) {
        checkIfFilledAddIcon(element);
    } else if ($(element).is("button")) {
        if (!$(element).parents(".multipleButton").find(".check-answer").hasClass("active") && !$(element).parents(".multipleButton").hasClass("no-check-answer")) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='checkbox']")) {
        if (!$(element).parents(".checkboxList").find(".check-answer").is(":checked")) {
            if ($(element).parents(".singleCheckbox").siblings(".rangeContainer").find(".slider").length > 0) {
                return false;
            } else {
                checkIfFilledRemoveIcon(element);
            }
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='radio']")) {
        if (!$(element).parents(".radioList").find(".check-answer").is(":checked")) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='file']")) {
        if ($(element).get(0).files.length === 0) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='date']")) {
        if (!$(element).val()) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).is("input[type='input']")) {
        var allRequiredFields = $(element).parents(".inputWrapper").find(".check-answer");
        var isFilled = null;
        var requiredFilledCounter = 0;
        $(allRequiredFields).each(function () {
            if ($.trim($(this).val())) {
                $(this).addClass('inputEdited');
            }
            if ($(this).hasClass('inputEdited')) {
                requiredFilledCounter++;
            }
        });
        if (checkAll == true) {
            requiredFilledCounter = 2;
        }
        if (requiredFilledCounter === 2) {
            $(allRequiredFields).each(function () {
                if (!$.trim($(this).val())) {
                    isFilled = false;
                    return false;
                } else {
                    if ($(this).hasClass('checkEmailValidation')) {
                        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test($(this).val())) {
                            isFilled = false;
                            return false;
                        }
                    } else {
                        isFilled = true;
                    }
                }
            });
        } else {
            return;
        }
        if (isFilled === false) {
            checkIfFilledRemoveIcon(element);
        } else if ((isFilled === true)) {
            checkIfFilledAddIcon(element);
        }
    } else if ($(element).hasClass('categorySearchInput') || $(element).hasClass('categorySystemInput')) {
        if (!$.trim($(element).val()) || !$.trim($($('.categorySystemInput')).val())) {
            checkIfFilledRemoveIcon(element);
        } else {
            checkIfFilledAddIcon(element);
        }
    }
    progressBar();
    $(element).parents(".inputWrapper").addClass('elemEdited');
    showUnfinishedElements(element);
}

function checkIfFilledRemoveIcon(element) {
    var iconContainer = $(element).parents(".inputWrapper").find(".answer-filled-icon-container");
    $(element).parents(".inputWrapper").find(".filled-answer").removeClass("filled-answer");
    $(element).parents(".inputWrapper").removeClass("container-checked");

    iconContainer.addClass("shrink");
    setTimeout(function () {
        iconContainer.remove();
    }, 450);
}

function showUnfinishedElements(element) {
    var cardName = $(element).parents("section").find('.cardHeadline').text();
    $('.menuFooterListItemLink').each(function () {
        var footerLinkText = $(this).find('.footerTitel').text();
        if (footerLinkText === cardName) {
            var allCardAnswers = $(element).parents('.card').find('.required');
            var footerRequiredInt = 0;
            allCardAnswers.each(function () {
                var cardAnswers = $(this).find('.check-answer').first();
                cardAnswers.each(function () {
                    if ($(this).parents('.inputWrapper').hasClass('elemEdited')) {
                        // debugger;
                        if ($(this).parents('.inputWrapper').hasClass('container-checked')) {
                            $(this).parents('.inputWrapper').removeClass('runRequiredDesign');
                        } else {
                            footerRequiredInt++;
                            $(this).parents('.inputWrapper').addClass('runRequiredDesign');
                        }
                    }
                });
            });

            var footerCircle = $(this).find('.footerRequiredCircle');
            footerCircle.data('required', footerRequiredInt);
            footerCircle.text(footerRequiredInt);
            if (footerRequiredInt > 0) {
                footerCircle.fadeIn();
                // console.log('fehlend in ' + footerLinkText + ' : ' + footerRequiredInt);
            } else {
                footerCircle.fadeOut();
            }

        }
    });
}

function checkIfFilledAddIcon(element) {
    if (!$(element).parents(".inputWrapper").find(".answer-filled-icon-container").length) {
        $(element).parents(".inputWrapper").append("<div class='answer-filled-icon-container'><i class='iconOk icon-answer-filled'></i></div>");
        $(element).addClass("filled-answer");
        $(element).parents(".inputWrapper").addClass("container-checked");
    }
}

function progressBar() {
    var requiredAnswers = 0;
    $(".inputWrapper.required").each(function () {
        if ($(this).find('.filled-answer')[0]) {
            requiredAnswers++;
        }
    });

    var requiredPossibleAnswers = $(".inputWrapper.required").length;
    // requiredPossibleAnswers = requiredPossibleAnswers - 1;

    var progressBarPercent = (requiredAnswers / requiredPossibleAnswers) * 100;

    $(".progressBar").stop().animate({
        width: progressBarPercent + "%"
    }, 500);

    if (requiredPossibleAnswers === requiredAnswers) {
        $(".dynamicSubmit").removeClass("required-not-filled");
    } else {
        $(".dynamicSubmit").addClass("required-not-filled");
    }

    var requiredLeft = requiredPossibleAnswers - requiredAnswers;
    if (requiredLeft === 1) {
        $(".submitMessage").html('Ihnen fehlt <span class="dynamicSubmitText">' + requiredLeft + ' Pflichtangabe</span>, um Ihre Anfrage abzuschicken.');
    } else {
        $(".submitMessage").html('Ihnen fehlen <span class="dynamicSubmitText">' + requiredLeft + ' Pflichtangaben</span>, um Ihre Anfrage abzuschicken.');
    }
}

function checkSubmit(element) {
    if ($(element).hasClass('required-not-filled')) {
        $('.inputWrapper.required').each(function () {
            var thisAnswers = $(this).find('.check-answer');
            thisAnswers.each(function () {
                // if ( $(this).hasClass('singleMultipleButton') || $(this).parents('.checkboxList').hasClass('singleMultipleButtonCheckbox')) {
                //     if ($(this).parents('.inputWrapper').find('.singleMultipleButton').hasClass('filled-answer') || $(this).parents('.inputWrapper').find('.checkbox').is(':checked')) {
                //         return;
                //     } else {
                //         checkIfFilled($(this));
                //     }
                // } else if ( $(this).parents('.checkboxList').hasClass('sliderCheckbox') ){
                //     if ( $(this).parents('.inputWrapper').hasClass('elemEdited') ) {
                //         return;
                //     } else {
                //         checkIfFilled($(this));
                //     }
                // } else if ( $(this).parents('.radioList') ){
                //     if ( $(this).parents('.radioList').find('.radioItem').is(':checked') ) {
                //         return;
                //     } else {
                //         checkIfFilled($(this));
                //     }
                // } else {
                //     checkIfFilled($(this));
                // }

                if ($(this).parents('.inputWrapper').hasClass('container-checked')) {
                    return;
                } else {
                    checkIfFilled($(this));
                }

            });
        });
    } else {
        // createBubbles();
        // createConfetti();
        // showNext(element);
        sendCreate(element);
    }
}

function checkSubmitRequired() {
    $('.inputWrapper.required').each(function () {
        var thisAnswers = $(this).find('.check-answer');
        thisAnswers.each(function () {
            if ($(this).parents('.inputWrapper').hasClass('container-checked')) {
                return;
            } else {
                checkIfFilled($(this), true);
            }

        });
    });
}

var bubbleInterval;

function createBubbles() {
    const bubbleContainer = document.getElementById('bubble-container');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.top = Math.floor(Math.random() * bubbleContainer.clientHeight) + 'px';
        bubble.style.left = Math.floor(Math.random() * bubbleContainer.clientWidth) + 'px';
        bubble.style.width = Math.floor(Math.random() * 50) + 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubbleContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.classList.add('fadeOut');
            setTimeout(() => {
                bubbleContainer.removeChild(bubble);
            }, 500);
        }, 1000);
    }
    bubbleInterval = setInterval(() => {
        createBubble();
        createBubble();
        createBubble();
    }, 500);
}

function resetRequest() {
    clearInterval(bubbleInterval);
    if (particlesInstance) {
        particlesInstance = undefined;
        const particlesContainer = document.getElementById('tsparticles');
        particlesContainer.innerHTML = '';
    }
    location.reload();
}

var particlesInstance;
function createConfetti() {
    particlesInstance = tsParticles.load("tsparticles", {
        "fullScreen": {
            "zIndex": 1
        },
        "emitters": [
            {
                "position": {
                    "x": 0,
                    "y": 30
                },
                "rate": {
                    "quantity": 5,
                    "delay": 0.15
                },
                "particles": {
                    "move": {
                        "direction": "top-right",
                        "outModes": {
                            "top": "none",
                            "left": "none",
                            "default": "destroy"
                        }
                    }
                }
            },
            {
                "position": {
                    "x": 100,
                    "y": 30
                },
                "rate": {
                    "quantity": 5,
                    "delay": 0.15
                },
                "particles": {
                    "move": {
                        "direction": "top-left",
                        "outModes": {
                            "top": "none",
                            "right": "none",
                            "default": "destroy"
                        }
                    }
                }
            }
        ],
        "particles": {
            "color": {
                "value": [
                    "#00afb8",
                    "#c3d600"
                ]
            },
            "move": {
                "decay": 0.05,
                "direction": "top",
                "enable": true,
                "gravity": {
                    "enable": true
                },
                "outModes": {
                    "top": "none",
                    "default": "destroy"
                },
                "speed": {
                    "min": 10,
                    "max": 20
                }
            },
            "number": {
                "value": 0
            },
            "opacity": {
                "value": 1
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "animation": {
                    "enable": true,
                    "speed": 20
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 30
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                },
                "animation": {
                    "enable": true,
                    "startValue": "min",
                    "count": 1,
                    "speed": 16,
                    "sync": true
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 5,
                    "max": 15
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "speed": {
                    "min": -7,
                    "max": 7
                }
            },
            "shape": {
                "type": [
                    "circle",
                    "square"
                ],
                "options": {}
            }
        }
    });
}


var jsonArray = {
    "IT & EDV": {
        "IT-Training": [
            "IT-Training Einführung; IT-Training Überblick",
            "IT im Business",
            "Microsoft 365",
            "Datenschutz und IT-Sicherheit",
            "IT-Recht",
            "SAP",
            "ERP",
            "Sonstiges IT-Training"
        ],
        "Betriebssysteme; Netzwerke & Server": [
            "Betriebssysteme Einführung; Netzwerke & Server Einführung; Betriebssysteme Überblick; Netzwerke & Server Überblick",
            "iOS",
            "Android",
            "Linux; Unix",
            "Microsoft Windows",
            "VMWare",
            "Internet of Things; IoT",
            "Sonstiges Betriebssysteme; Netzwerke & Server"
        ],
        "Cloud Computing": [
            "Cloud Computing Einführung; Cloud Computing Überblick",
            "Cloud-Administration",
            "Cloud-Dienste",
            "Cloud-Entwicklung",
            "Cloud-Plattformen",
            "Cloud-Sicherheit; Windows Server",
            "Cloud-Speicher",
            "Sonstiges Cloud Computing"
        ],
        "Datenbankverwaltung": [
            "Datenbankverwaltung  Einführung; Datenbankverwaltung  Überblick",
            "Datenbankadministration",
            "Datenbankentwicklung",
            "Datenressourcenmanagement",
            "Rechenzentren",
            "Oracle",
            "SQL",
            "Sonstiges Datenbankverwaltung "
        ],
        "IT-Service-Management": [
            "IT-Service-Management Einführung; IT-Service-Management  Überblick",
            "ITIL",
            "COBIT",
            "Business Process Framework; tTOM",
            "FitSM",
            "Microsoft Operations Framework; MOF",
            "Sonstiges IT-Service-Management "
        ],
        "IT-Projektmanagement": [
            "IT-Projektmanagement Einführung; IT-Projektmanagement Überblick",
            "DevOps; DevOps Werkzeuge; DevOps Grundlagen",
            "Agile Softwareentwicklung; Scrum",
            "Sonstiges IT-Projektmanagement"
        ],
        "IT-Sicherheit": [
            "IT-Sicherheit Einführung; IT-Sicherheit Überblick; Cybersicherheit Einführung; Cybersicherheit Überblick",
            "Cyber Safety; Cybersafety",
            "Identitäts- und Zugriffsverwaltung",
            "Incident Response",
            "Kryptographie",
            "Mobile Anwendungssicherheit",
            "Netzwerksicherheit",
            "Schwachstellenmanagement",
            "Sicherheitsbewusstsein",
            "Sicherheitsmanagement und -richtlinien",
            "Data Security & Privacy",
            "Sonstiges IT-Sicherheit"
        ],
        "MS Office": [
            "MS Office Einführung; MS Office Überblick",
            "Access",
            "Excel",
            "MS Project",
            "Outlook",
            "Powerpoint",
            "Word",
            "Sonstiges MS Office"
        ],
        "SAP": [
            "SAP Einführung; SAP Überblick",
            "SAP/FI/CO",
            "SAP HCM",
            "SAP Logistik (MM/PP/SD)",
            "S/4HANA",
            "Sonstiges SAP"
        ],
        "Softwareentwicklung": [
            "Softwareentwicklung Einführung; Softwareentwicklung Überblick",
            "Sichere Softwareentwicklung; Softwareentwicklungssicherheit",
            "Datenbankentwicklung",
            "Enterprise-Architektur",
            "Entwicklertools",
            "Microsoft-Entwicklung",
            "Objektorientierte Programmierung",
            "Programmierschnittstellen",
            "Programmiersprachen",
            "Software-Entwurfsmuster",
            "Software-Testing; Softwaretest; Penetrationstests",
            "Softwarearchitektur",
            "Softwaredesign",
            "Spieleentwicklung",
            "Versionskontrolle",
            "App-Entwicklung; Applikationsentwicklung; Application Development",
            "Sonstiges Softwareentwicklung"
        ],
        "Software & Progammiersprachen": [
            "Software & Programmiersprachen Einführung; Software & Programmiersprachen  Überblick",
            "C#",
            "C/C++; ISTQB",
            "Java",
            "Python",
            "Java",
            "JavaScript",
            "Azure",
            "WordPress",
            "Visual Studio",
            "Windows Server",
            "SQL",
            "Kubernetes",
            "ASP.NET",
            "Amazon Web Services",
            "HTML",
            "CSS",
            "React.js",
            "Angular",
            "SAP ABAP/NetWeaver",
            "MS SQL-Server",
            "VBA Visual Basic for Applications",
            "XML",
            "Sonstiges Software & Programmiersprachen"
        ],
        "Webdesign & Webentwicklung": [
            "Webdesign & Webentwicklung Einführung; Webdesign & Webentwicklung Überblick",
            "Dreamweaver",
            "PHP",
            "Backend-Webentwicklung",
            "Content-Management-Systeme (CMS)",
            "E-Commerce-Entwicklung; Typo3",
            "Frontend-Webentwicklung; Wordpress",
            "Fullstack-Webentwicklung",
            "JavaScript-Frameworks",
            "Webentwicklungswerkzeuge",
            "Sonstiges Webdesign & Webentwicklung"
        ],
        "Mobile Entwicklung ": [
            "Mobile Entwicklung Einführung; Mobile Entwicklung Überblick",
            "Android-Entwicklung",
            "Mobile Spieleentwicklung",
            "Plattformübergreifende Entwicklung",
            "iOS-Entwicklung",
            "Sonstiges Mobile Entwicklung"
        ],
        "Netzwerk- und Systemadministration": [
            "Netzwerk- und Systemadministration Einführung; Netzwerk- und Systemadministration Überblick",
            "Netzwerktechnik",
            "CRM- und ERP-Administration",
            "Enterprise-Content-Management",
            "IT-Automatisierung",
            "Mobile-Device-Management",
            "Serveradministration",
            "Softwareverteilung",
            "Virtualisierung",
            "Sonstiges Netzwerk- und Systemadministration"
        ],
        "Telekommunikationstechnik": [
            "Telekommunikationstechnik Einführung; Telekommunikationstechnik Überblick",
            "Übertragungstechnik",
            "Vermittlungstechnik",
            "Sprachkommunikation",
            "Endgeräte und Telekommunikationsanlagen",
            "Communication Center Services",
            "xDSL Breitbandzugänge",
            "Voice Over IP",
            "Firmen-Netzwerke",
            "Mobilfunk",
            "Next-Generation-Network; NGN",
            "Sonstiges Telekommunikationstechnik"
        ],
        "Sonstiges in IT & EDV": [
            "Computerführerschein; ECDL; ICDL",
            "SharePoint"
        ]
    },
    "Digitale Transformation; Digitalisierung; Industrie 4.0; Digitalization; Digitization; Digitalisation": {
        "Industrie 4.0 Technologien": [
            "Industrie 4.0 Technologien Einführung; Industrie 4.0 Technologien Überblick",
            "5G",
            "Additive Fertigung / 3D-Druck",
            "Assistenzsysteme / Intelligente Assistenz",
            "Augmented Reality (AR); Erweiterte Realität; Augmented Reality (AR)",
            "Cyberphysische Systeme (CPS); cyberphysisches System; cyberphysical system",
            "Smart Factory",
            "Internet of Things (IoT); Industrial Internet of Things (IIoT); Internet der Dinge; Industrielles Internet der Dinge",
            "Virtual Reality (VR); virtual reality; virtuelle Realität",
            "Mixed Reality (MR); Mixed Reality (MR); Gemischte Realität; Vermischte Realität",
            "Digitaler Zwilling; Digitaler Zwilling; Digitale Simulation",
            "Predictive Maintenance; Predictive Maintenance; Prädiktive Instandhaltung; Smart Maintenance; Vorausschauende Wartung",
            "Autonome Roboter / Robotik",
            "Horizontale & vertikale Integration; Horizontale Integration; Vertikale Integration",
            "Sonstiges Industrie 4.0 Technologien"
        ],
        "Data Science": [
            "Data Science Einführung; Data Science Überblick",
            "Big Data",
            "Künstliche Intelligenz (KI); Artificial Intelligence (AI); Künstliche Intelligenz (KI); Maschinelle Intelligenz",
            "Machine Learning; Machine Learning; Maschinelles Lernen",
            "Business Analytics",
            "Business Intelligence",
            "Data Engineering",
            "Data Governance",
            "Datenanalyse",
            "Datenmodellierung",
            "Datenschutz",
            "Datenvisualisierung",
            "Blockchain",
            "Data Warehouse",
            "Data Mining",
            "Data Science mit Python",
            "Sonstiges Data Science"
        ],
        "Digital Business": [
            "Digital Business Einführung; Digital Business Überblick",
            "Digitale Geschäftsmodelle",
            "Digital Business",
            "E-Business",
            "Digitale Kundenschnittstelle",
            "Digitale Plattformen",
            "Digital Services",
            "Digital Sales",
            "Digital Marketing",
            "Digitale Wertschöpfungsnetze",
            "Digital HR; Digital Human Resources; Digital Human Resource Management; Digital HR; Digital HRM; Digitales Personalmanagement; Human Resource Management 4.0 (HRM 4.0); Human Resource Management 4.0 (HRM 4.0); Personalmanagement 4.0",
            "Sonstiges Digital Business"
        ],
        "Digital Management": [
            "Digital Management Einführung; Digital Management Überblick",
            "Digital Transformation Management",
            "Digital Change Management",
            "Digitalisierung und Nachhaltigkeit",
            "Digitalisierung und Prozessautomatisierung",
            "Sonstiges Digital Management"
        ],
        "Data Driven Business": [
            "Data Driven Business Einführung; Data Driven Business Überblick",
            "Data Driven Innovations",
            "Data Driven Finance and Controlling",
            "Data Driven HR; Data Driven HR; datengetriebenes Personalmanagement",
            "Data Security & Privacy",
            "Data Driven Marketing & Sales",
            "Data Driven Procurement",
            "Data Driven Property Management",
            "Sonstiges Data Driven Business"
        ],
        "Digitale Arbeitswelt": [
            "Digitale Arbeitswelt Einführung; Digitale Arbeitswelt Überblick",
            "Grundlagen der Digitalisierung",
            "Digitale Kompetenzen",
            "Arbeit 4.0",
            "Mobiles Arbeiten",
            "Agile Arbeit",
            "Ausbildung 4.0; Ausbildung 4.0; Digitale Ausbildung; Digitalisierung Ausbildung; Ausbildung und Digitalisierung; Ausbildung digitale Arbeitswelt",
            "Digitalisierung und Compliance",
            "Sonstiges Digitale Arbeitswelt"
        ],
        "Sonstiges in Digitale Transformation; Digitalisierung; Industrie 4.0; Digitalization; Digitization; Digitalisation": [
            "Sonstiges in Digitale Transformation; Digitalisierung; Industrie 4.0; Digitalization; Digitization; Digitalisation"
        ]
    },
    "Steuern & Recht": {
        "Individuelles Arbeitsrecht": [
            "Individuelles Arbeitsrecht Einführung; Individuelles Arbeitsrecht Überblick",
            "Arbeitsvertragsrecht",
            "Arbeitsschutzrecht",
            "Sonstiges im individuellen Arbeitsrecht"
        ],
        "Kollektives Arbeitsrecht": [
            "Kollektives Arbeitsrecht Einführung; Kollektives Arbeitsrecht Überblick",
            "Betriebsverfassungsrecht",
            "Personalvertretungsgesetz",
            "Tarifvertragsrecht (Lohn- und Gehaltstarifvertrag; Rahmentarifvertrag; Manteltarifvertrag); Betriebsvereinbarungen",
            "Mitbestimmungsrecht; Betriebliche Mitbestimmung; Unternehmensmitbestimmung; Überbetriebliche Mitbestimmung",
            "Sonstiges im kollektiven Arbeitsrecht"
        ],
        "Arbeitssicherheit; Arbeitsplatzsicherheit": [
            "Arbeitssicherheit Einführung; Arbeitsplatzsicherheit Einführung; Arbeitssicherheit Überblick; Arbeitsplatzsicherheit Überblick; Arbeitssicherheitsgesetz (ASiG); Arbeitsschutzgesetz (ArbSchG); Arbeitsstättenverordnung (ArbStättV); Verordnungen zum Schutz der Arbeitnehmer; Regelwerk der Berufsgenossenschaften",
            "Emissionsschutz",
            "Brandschutz",
            "Sonstiges Arbeitssicherheit; Sonstiges Arbeitsplatzsicherheit"
        ],
        "Gewerblicher Rechtsschutz": [
            "Gewerblicher Rechtsschutz Einführung; Gewerblicher Rechtsschutz Überblick",
            "Urheberrecht",
            "Markenrecht",
            "Patentrecht",
            "Sonstiges im gewerblichen Rechtsschutz"
        ],
        "Handelsrecht; Wirtschaftsrecht; Wirtschaftsprivatrecht": [
            "Handelsrecht; Wirtschaftsrecht; Wirtschaftsprivatrecht Einführung; Handelsrecht; Wirtschaftsrecht; Wirtschaftsprivatrecht Überblick; § 433 BGB; Kaufvertrag; §631 BGB; Werkvertrag; §611 BGB; Dienstvertrag; §651 BGB; Werklieferungsvertrag; Überraschende Klausel; Inhaltskontrolle; §307 BGB; Klauselverbot; §309 BGB; Individualabrede; AGB; Allgemeine Geschäftsbedingungen; Gewährleistung; Garantie; Nacherfüllung; §323 BGB; §440 BGB; Rücktritt; Minderung; §441 BGB; Schadenersatz; Aufwendungsersatz; Sachmangel; Rechtsmangel; Holschuld; Bringschuld; Schickschuld; §425 HGB; Untersuchungs- und Rügepflicht; §377 HGB; Buy-Back-Vertrag; Revenue Sharing; Quantity Flexibility Contract; Options Contract",
            "Gesellschaftsrecht",
            "Insolvenzrecht",
            "Recht im Einkauf",
            "Sonstiges im Handelsrecht; Wirtschaftsrecht; Wirtschaftsprivatrecht "
        ],
        "Sozialrecht": [
            "Sozialrecht Einführung; Sozialrecht Überblick",
            "Krankenversicherung",
            "Rentenversicherung",
            "Unfallversicherung",
            "Pflegeversicherung",
            "Arbeitsförderung",
            "Ausbildungsförderung",
            "Erziehungsgeld",
            "Grundsicherung",
            "Kindergeld",
            "Kinder- und Jugendhilfe",
            "Rehabilitation und Teilhabe behinderter Menschen",
            "Sozialhilfe",
            "Unterhaltsvorschuss",
            "Wohngeld",
            "Sonstiges im Sozialrecht"
        ],
        "Versicherungsrecht; Versicherung": [
            "Versicherungsrecht Einführung; Versicherung Einführung; Versicherungsrecht Überblick; Versicherung Überblick",
            "Versicherungsrecht allgemein",
            "Privatversicherung",
            "Lebensversicherung",
            "Sonstiges Versicherungsrecht; Versicherung"
        ],
        "Datenschutz": [
            "Datenschutz Einführung; Datenschutz Überblick",
            "Datenschutzgrundverodnung (DSGVO); Bundesdatenschutzgesetzt (BDSG)",
            "Sonstiges im Datenschutz"
        ],
        "Baurecht": [
            "Baurecht Einführung; Baurecht Überblick",
            "Privates Baurecht",
            "Öffentliches Baurecht",
            "Architektenrecht",
            "Sonstiges im Baurecht"
        ],
        "Miet- und Immobilienrecht": [
            "Miet- und Immobilienrecht Einführung; Miet- und Immobilienrecht Überblick",
            "Öffentliches Mietrecht",
            "Privates Mietrecht",
            "Maklerrecht",
            "Wohnungseigentumsrecht",
            "Sonstiges im Miet- und Immobilienrecht"
        ],
        "Steuern": [
            "Steuern Einführung; Steuern Überblick",
            "Betriebliche Steuern allgemein; Steuerrecht allgemein",
            "Körperschaftssteuer",
            "Steuersoftware; DATEV; Addison Mittelstand; Stotax; Lexware Quick Steuer",
            "Steuern für Selbstständige",
            "Steuern für Privatpersonen",
            "Internationales Steuerrecht; Betriebliche Steuerlehre",
            "Sonstiges in Steuern"

        ],
        "Sonstiges in Steuern & Recht": [
            "Strafrecht",
            "Vergaberecht; Ausschreibungen",
            "Compliance; Geldwäscheprävention"
        ]

    },
    "Marketing; Kommunikation & Vertrieb": {
        "Vertrieb; Sales; Verkauf und Handel": [
            "Vertrieb Einführung; Sales Einführung; Verkauf und Handel Einführung; Vertrieb Überblick; Sales Überblick; Verkauf und Handel Überblick",
            "Vertriebssteuerung; Vertriebsführung; Vertriebsmanagement",
            "E-Commerce",
            "Einzelhandel",
            "Technischer Vertrieb",
            "Inbound Sales",
            "Outbound Sales",
            "Business to Business (B2B)",
            "Business to Customer (B2C)",
            "Business to Government (B2G)",
            "Verkauf und Verhandlungsführung; Verkaufstraining; Telefontraining; Überzeugungskraft und Souveränität; Kaltakquise",
            "Vertriebsaußendienst",
            "Vertriebsinnendienst; Vertriebsentwicklung (SDR); Umsatzentwicklung (BDR)",
            "Customer Relationship Management (CRM)",
            "Kundenservice; Beschwerdemanagement; CRM-Software; Kundenservice-Kompetenzen; Kundenservice-Management",
            "Key Account Management",
            "Sonstiges Vertrieb; Sales; Verkauf und Handel"
        ],
        "Marketing und Kommunikation; PR; Werbung": [
            "Marketing und Kommunikation Einführung; PR Einführung; Werbung Einführung; Marketing und Kommunikation Überblick; PR Überblick; Werbung Überblick",
            "Marketing Management",
            "Brand Management; Markenmanagement",
            "Produktmarketing; Product Marketing",
            "PR & Öffentlichkeitsarbeit",
            "Content Marketing; Content Creation",
            "E-Mail Marketing",
            "Search Engine Marketing (SEM); Search Engine Advertising (SEA); Suchmaschinenwerbung; Search Engine Optimization (SEO); Suchmaschinenoptimierung; Google Ads; Google AdWords",
            "Social Media Marketing; Facebook; Instagram; Youtube; Twitter; LinkedIn; Xing; TikTok; Webanalyse; Analytics; Marketing Automation",
            "Online-Marketing; Online-Werbung",
            "Video-Marketing",
            "User Experience Marketing; UX Marketing",
            "Performance Marketing",
            "Texten & Storytelling",
            "Krisenkommunikation; Krisen-PR",
            "Sonstiges Marketing; Kommunikation; PR; Werbung"
        ],
        "Medien und Gestaltung": [
            "Medien und Gestaltung Einführung; Medien und Gestaltung Überblick",
            "Fotografie",
            "Grafikdesign; Adobe Creative Cloud; Adobe Creative Suite; Adobe Acrobat; Adobe Illustrator; Adobe InDesign; Adobe Photoshop; Adobe Premiere & After Effekts; Layout",
            "Musik & Ton",
            "Usability",
            "Sonstiges Medien und Gestaltung"
        ],
        "Sonstiges Marketing; Kommunikation & Vertrieb": [
            "Eventmanagement; Veranstaltungsmanagement"
        ]
    },
    "Management und Organisation": {
        "Allgemeines Management; General Management": [
            "Allgemeines Management Einführung; General Management Einführung; Allgemeines Management Überblick; General Management Überblick",
            "Executive Management Program; Executive Leadership Programm Topmanagement Geschäftsführung; Geschäftsleitung; Unternehmensführung ; Unternehmensleitung",
            "Senior Management Program; GmbH-Geschäftsführung",
            "Junior Management Program; Junior Leadership Programm,Management Nachwuchs",
            "Management von Kleinen und Mittleren Unternehmen; KMU-Management; Management im Mittelstand",
            "Organisationsentwicklung; Organisational Design; Organisationsgestaltung; Organisationsstruktur",
            "Strategisches Management; Strategische Unternehmensführung; Corporate Strategy; Strategieentwicklung; Strategie-Entwicklung und Umsetzungsplanung; Strategie-Implementierung",
            "Technologiebasierte Unternehmensführung",
            "Grundlagen der BWL",
            "Grundlagen der VWL",
            "Makroökonomie und Wirtschaftspolitik",
            "Unternehmenskultur; Dienstleistungskultur; Exzellenzkultur; Digital & Agile Leadership; Charismatisch führen ",
            "Resilienz; Unternehmensresilienz",
            "Ganzheitliches Management",
            "Recht für Führungskräfte",
            "Strategische Prozessoptimierung",
            "Risikomanagement",
            "Sonstige General Management Themen"
        ],
        "Führung und Leadership; Führungskräftetraining": [
            "Führung und Leadership Einführung; Führungskräftetraining Einführung; Führung und Leadership Überblick; Führungskräftetraining Überblick",
            "Führungskompetenz; Führungskompetenz für Einsteiger; Erweiterte Führungskompetenz,Führungskompetenz für erfahrene Führungskräfte; Führungskompetenz für erfahrene Führungskräfte; Standing und Durchsetzungsstärke für Führungskräfte",
            "New Leadership; Führung im Wandel; Leadership-Tools",
            "Frauen in Führung",
            "Führungsmethoden",
            "Lean Management; Lean Leadership",
            "Personalführung; Mitarbeiterführung",
            "Laterale Führung; Laterales Führen",
            "Agile Führung; Agiles Führen",
            "Team- und Organisationsentwicklung",
            "Führen auf Distanz",
            "Führungskraft als Coach; Coaching und Mentoring",
            "Gesunde Führung",
            "Kommunikation für Führungskräfte",
            "Entscheidungsmanagement; Entscheidungsfindung",
            "Teambuilding; Teams und Zusammenarbeit",
            "Führungskräfte-Coaching",
            "Sonstige Führung und Leadership"
        ],
        "Business Development Management; Geschäftsmodellentwicklung; New Business; Geschäftsfeldentwicklung; Marktmanagement": [
            "Business Development Management Einführung; Business Development Management Einführung; Geschäftsmodellentwicklung Einführung; Geschäftsmodellentwicklung Überblick; New Business Einführung; New Business Einführung; Geschäftsfeldentwicklung Einführung; Marktmanagement Einführung; Business Development Management Überblick;   Geschäftsmodellentwicklung Überblick; New Business Einführung; Geschäftsfeldentwicklung Überblick; Marktmanagement Überblick",
            "Innovationsmanagement; Innovationsentwicklung; Lean Start-Up; Open und Lean Innovation",
            "Internationales Business Development; Agile Innovationsmethoden",
            "Marktforschung & Trends; Trendanalyse; Five-Forces-Analyse; Benchmarking; ROI-Messung und A/B-Testing; Die Marketing-Roadmap für die Strategie-Entwicklung; Marketing-Kennzahlen; SWOT-Analyse; Innovations-/Trendradar; Szenario-Analyse",
            "Neue Geschäftsmodelle; Strategieableitung; Pläne und Entscheidungsmethoden; Disruptive Geschäftsmodelle; radikale Innovationen; Business Canvas; Business Model Canvas; Strategy Map; Design Thinking; Portfolio-Methoden; STP-Ansatz; Nutzwertanalyse/Scoring-Modelle; BDE-Systeme; Blue Ocean",
            "M&A; Mergers & Acquisitions; Due Dilligence; Exclusivity und Auction Process; Verhandlungen",
            "Business Plan; Geschäftsplan",
            "Managerial Economics",
            "Unternehmensgründung",
            "Sonstige Business Development Management; Geschäftsmodellentwicklung; New Business; Geschäftsfeldentwicklung; Marktmanagement"
        ],
        "Change Management; Veränderungsmanagement": [
            "Change Management Einführung; Veränderungsmanagement Einführung; Change Management Überblick; Veränderungsmanagement Überblick; ADKAR-Modell; 5-Phasen-Modell nach Krüger",
            "Change & Organizational Development",
            "Mindset & Culture",
            "Change-Reporting",
            "Sonstige Change Management; Veränderungsmanagement"
        ],
        "Sonstige Change Management; Veränderungsmanagement": [
            "Sonstige Change Management; Veränderungsmanagement"
        ]
    },
    "Technik & Industrie": {
        "Chemie; Chemische Industrie": [
            "Chemie Einführung; Chemische Industrie Einführung; Chemie Überblick; Chemische Industrie Überblick",
            "Qualitätssystem GLP",
            "Anlagensicherheit",
            "Labormanagement",
            "Organische Chemie",
            "Anorganische Chemie",
            "Bioverfahrenstechnik",
            "Technische Elektrochemie",
            "Katalysatorenentwicklung",
            "Lebensmitteltechnik",
            "mechanische Verfahrenstechnik",
            "Reaktionstechnik",
            "Thermische Verfahrenstechnik",
            "Sonstige Chemie; Chemische Industrie"
        ],
        "Computer Aided Design (CAD)": [
            "Computer Aided Design (CAD) Einführung; Computer Aided Design (CAD) Überblick",
            "Autodesk AutoCAD",
            "Autodesk Inventor",
            "Inventor",
            "SOLIDWORKS",
            "Vault (PDM)",
            "Sonstige Computer Aided Design (CAD)"
        ],
        "Druck und Print": [
            "Druck und Print Einführung; Druck und Print Überblick",
            "Druckvorstufe; Farbmanagement; Printdesign; DTP-Software; Druckraster",
            "Veredelung",
            "Offsetdruck",
            "Digitaldruck",
            "3D-Druck",
            "Proof",
            "Durchdruck",
            "Hochdruck",
            "Tiefdruck",
            "Flachdruck",
            "Sonstige Druck und Print; Buchdruck und Buchbindung; Textildruck; Verpackungsdruck"
        ],
        "Elektrotechnik; Elektronik; Elektrik": [
            "Elektrotechnik Einführung; Elektronik Einführung; Elektrik Einführung; Elektrotechnik Einführung; Elektronik Einführung; Elektrik Einführung; Elektrische Schaltungen",
            "Automatisierungstechnik; Produktionsplanung; Steuerungstechnik; Prozess-, Fertigungs-, Gebäudeautomatisierung; Messtechnik; Sensoren,Regelungstechnik; Robotik; GRAFCET",
            "Messtechnik",
            "Nachrichtentechnik",
            "Gerätetechnik",
            "Rechnertechnik",
            "Elektrische Maschinen",
            "Technische Informatik",
            "Elektroinstallation",
            "Sonstige Elektrotechnik; Elektronik; Elektrik"
        ],
        "Sonstige Elektrotechnik; Elektronik; Elektrik": [
            "Energietechnik Einführung; Energiemanagement Einführung; Energiewirtschaft Einführung; Energietechnik Überblick; Energiemanagement Überblick; Energiewirtschaft Überblick; DIN EN ISO 50001",
            "Elektrischer Energieversorgungsnetze",
            "Thermodynamik",
            "Energieinformationstechnik",
            "Erneuerbare Energien",
            "Wärmepumpen; Wärmepumpentechnik",
            "Leistungselektronik und Energiespeicher",
            "Modellierung von Anlagen und Systemen",
            "Umweltmanagement im Unternehmen",
            "Energiespeichertechnik",
            "Energie Contracting; Energiehandel",
            "Energieplanungsprozess",
            "Sonstige Energietechnik; Energiemanagement; Energiewirtschaft"
        ],
        "Hydraulik und Pneumatik": [
            "Hydraulik und Pneumatik Einführung; Hydraulik und Pneumatik Überblick; Hydraulikzylinder; Pneumatikzylinder",
            "Simulation in der Hydraulik; Simulation in der Pneumatik; FluidSim",
            "Proportionalhydraulik",
            "Industriehydraulik; Industriepneumatik; Hydraulik für die Instandhaltung; Mobilhydraulik",
            "Hydraulische Leitungstechnik; Überprüfung von Hydraulik-​Schlauchleitungen",
            "Sicherheit in der Hydraulik; Sicherheit in der Pneumatik",
            "Instandhaltung und Fehlersuche in der Hydraulik; Instandhaltung und Fehlersuche in der Pneumatik",
            "Aufbau von Antriebsaggregaten",
            "Hydraulikpumpen; Pneumatikpumpen",
            "Ventiltechnik; Wege-, Strom-, Sperr- und Druckventile",
            "Normen in der Fluidtechnik; Schaltzeichen nach DIN ISO 1219; Normung von Druckflüssigkeiten",
            "Elektropneumatik; Elektrohydraulik; Sicherheit in der Pneumatik und Elektropneumatik für die Konstruktion",
            "Sonstiges Hydraulik und Pneumatik"
        ],
        "Konstruktion und Entwicklung": [
            "Konstruktion und Entwicklung Einführung; Konstruktion und Entwicklung Überblick",
            "Konstruktionslehre",
            "Konstruktions- und Entwicklungstechnik",
            "Sonstige Konstruktion und Entwicklung"
        ],
        "Systems Engineering": [
            "Systems Engineering Einführung; Systems Engineering Überblick",
            "Requirements Engineering",
            "Advanced Systems Engineering",
            "Verification and Validation",
            "Product Lifecycle Management (PLM); Produktlebenszyklus Management",
            "Sonstige Systems Engineering"
        ],
        "Kunststoff": [
            "Kunststoff Einführung; Kunststoff Überblick",
            "Kunststoffkunde",
            "Kunststoffverarbeitung; Verbindungstechniken; Fließtechnische Auslegung von Formteilen; Rheologische Eigenschaften; Spritzgießen; Extrusion; Thermoformen; Kräfte im Spritzgießwerkzeug; Ungleichgewichte bei symmetrischen Schmelzeleitsysteme; Heißkanaltechnik; Entlüftung; Entformung",
            "Sonstiges Kunststoff"
        ],
        "Luftfahrttechnik": [
            "Luftfahrttechnik Einführung; Luftfahrttechnik Überblick",
            "Elektrik und Elektronik in der Luftfahrttechnik",
            "Elektronische Instrumentensysteme",
            "Komponenten der Luftfahrttechnik",
            "Aerodynamik von Flugzeugen; Konfigurationsaerodynamik",
            "Gasturbinentriebwerke",
            "Luftfahrtgesetzgebung",
            "Flugzeugtechnik",
            "Flugmechanik",
            "Flugleistungen",
            "Luftverkehrssystem",
            "Antriebstechnik",
            "Flugerprobung",
            "Sonstiges Luftfahrttechnik"
        ],
        "Maschinen- und Anlagenbau": [
            "Maschinenbau; Anlagenbau Einführung; Maschinenbau; Anlagenbau Überblick",
            "Antriebstechnik",
            "Automatisierungstechnik",
            "Regelungstechnik",
            "Messtechnik",
            "Schwingungstechnik",
            "Simulation und Berechnung",
            "Technische Dokumentation",
            "Patente; Normen; Richtlinien im Maschinen- und Anlagenbau",
            "Instandhaltung von Maschinen",
            "Speicherprogrammierbare Steuerung (SPS)",
            "Fertigungstechnik; Technische Kommunikation; Zeichen; Drahterodieren; Senkerodieren; Urformen; Umformen; Trennen; Fügen,Beschichten und Stoffeigenschaft ändern; Fertigungssysteme; CAM-Software",
            "Sicherheit im Maschinen- und Anlagenbau",
            "Fluidtechnik",
            "Steuerungstechnik",
            "Versorgungstechnik",
            "Sonstiges Maschinenbau / Anlagenbau"
        ],
        "Metallverarbeitung": [
            "Metallverarbeitung",
            "Drehen",
            "Fräsen",
            "CNC-Verfahren",
            "CNC-Programmierung",
            "Schweißen",
            "Metallbautechnik",
            "Zerspanungstechnik",
            "Schleifen",
            "Sonstiges Metallverarbeitung"
        ],
        "Optik": [
            "Optik Einführung; Optik Überblick",
            "Optische Messtechnik",
            "Optikdesign",
            "Optiktechnologie; Filter; Reichweiten; Remission; Linsen; Spiegel; Abbildung; Objektive; Reflektoren; Laser; Rundoptik; Planoptik; Fügen eines optischen Systems; Strahlen- und Wellenoptik; Optische Fasern/Signalübertragung; Technische Optik; Dünne Schichten für die Optik; Bildentstehung; Abbildungsgleichung; Blenden und Pupillen; Abbildungsfehler",
            "Lasertechnik; Lasermaterialbearbeitung; Lasermesstechnik",
            "Optische Werkstoffe",
            "Optische Bauelemente",
            "Sonstiges Optik"
        ],
        "Pharmazeutische Industrie": [
            "Pharma Einführung; Pharma Überblick",
            "Pathologie",
            "Tablettierung und Granulierung",
            "Pharma-Gesetze; Arzneimittelgesetz (AMG); Medizinproduktegesetz (MPG)",
            "ICH-/GCP-Richtlinien",
            "Chemie und Profilierung Wirkstoffe",
            "Drug Discovery und Evaluation Compounds",
            "Polymere und Soft Materials",
            "Moderne Abfüllung im Sterilbereich",
            "Bioanalytik",
            "Biochemie",
            "Bioprozesstechnik",
            "Biokompatible Werkstoffe",
            "Gesundheitsmanagement",
            "Pharmamarketing",
            "GMP; Good Manufacturing Practice; GMP gerechte Gebäude/Facilities,GMP gerechte Medientechnik; GMP gerechte Pharma Wasser Systeme; GMP/FDA gerechte Wartung und Instandhaltung; GMP/FDA gerechtes Anlagendesign; Reinlufttechnische Anlagen",
            "Sonstiges Pharma"
        ],
        "Produktion; Produktionstechnik": [
            "Produktion Einführung; Produktionstechnik Einführung; Produktion Überblick; Produktionstechnik Überblick",
            "Werkstofftechnik; Materialwissenschaft",
            "Produktionssysteme; Werkzeugmaschinen",
            "Kanban",
            "Rohstoffgewinnung; Rohstofferzeugung",
            "Verfahrenstechnik",
            "Sonstiges Produktion; Produktionstechnik"
        ],
        "Qualitätsmanagement": [
            "Qualitätsmanagement Einführung; Qualitätsmanagement Überblick; DIN ISO 9001,Risikobasiertes Denken; Kundenorientierung und ständige Verbesserung; Risikobasiertes Denken; Kundenorientierung und ständige Verbesserung; Überwachungsprozesse; Kennzahlensystem und Messmittelüberwachung",
            "Kontinuierlicher Verbesserungsprozess; KVP; PDCA-Zyklus; Kaizen; Qualitätsplanung; Qualitätssteuerung; Qualitätssicherung; Qualitätsgewinn",
            "Computer-aided Quality; CAQ; rechnerunterstützte Qualitätssicherung",
            "Sonstiges Qualitätsmanagement"
        ],
        "Technische Redaktion": [
            "Technische Redaktion Einführung; Technische Redaktion Überblick; Rechtliche Anforderungen an technische Dokumentation",
            "Funktionsdesign",
            "Lokalisierung und Terminologiemanagement",
            "Single-Source-Prinzip",
            "XML-Redaktionssysteme",
            "Sonstiges Technische Redaktion"
        ],
        "Nachhaltigkeitsmanagement; Sustainability Management": [
            "Nachhaltigkeitsmanagement Einführung; Nachhaltigkeitsmanagement Überblick; Nachhaltigkeitsmanagemnt Überblick; Sustainability Management Überblick; ISO 14001",
            "Abfall- und Kreislaufwirtschaft",
            "Umweltrecht",
            "Ressourcenmanagement",
            "Umweltmanagement",
            "Recyclingtechnik",
            "Zirkuläre Wertschöpfung",
            "Klimaschutz; Klimaschutzmanagement",
            "Corporate Social Responsibility; CSR",
            "Sonstiges Nachhaltigkeitsmanagement; Sustainability Management"
        ],
        "Handwerk": [
            "Holzhandwerk",
            "Metallhandwerk",
            "Glas- und Keramikhandwerk",
            "Bau- und Ausbauhandwerk",
            "Sanitär- und Versorgungstechnik",
            "Fahrzeug- und Maschinentechnik",
            "Farbtechnik",
            "Stein- und Plattenlegehandwerk",
            "Instrumentenbau",
            "Bekleidungshandwerk; Textilhandwerk; Lederhandwerk",
            "Lebensmittelhandwerk",
            "Schönheit",
            "Sonstiges Handwerk"
        ],
        "Immobilien": [
            "Immobilien Einführung; Immobilien Überblick",
            "Facility Management ; Gebäudemanagement; Hausverwaltung",
            "Immobilienbewertung",
            "Immobilienwirtschaft",
            "Vermietung & Bestandsmanagement",
            "Immobilienmanagement",
            "Sonstiges Immobilien"
        ],
        "Sonstiges im Bereich Industrie und Technik": [
            "Sonstiges im Bereich Industrie und Technik"
        ]
    },
    "Finanzen & Controlling": {
        "Externes Rechnungswesen": [
            "Externes Rechnungswesen Einführung; Externes Rechnungswesen Überblick",
            "Bilanzierung und Jahresabschluss",
            "Finanzbuchhaltung; Kreditorenbuchhaltung",
            "Bilanzbuchhaltung",
            "Sonstiges Externes Rechnungswesen"
        ],
        "Internes Rechnungswesen;  Management Accounting": [
            "Internes Rechnungswesen Einführung; Management Accounting Einführung; Internes Rechnungswesen Einführung; Management Accounting Einführung; Betriebliche Finanzwirtschaft",
            "Buchhaltungssoftware; Lexware; Sevdesk,Buchhaltungsbutler,WISO Buchhaltung 365; Sage 50; Papierkram.de; Kontolino!; Datev Buchhaltung",
            "Anlagenbuchhaltung",
            "Buchführung; Betriebsbuchführung",
            "Konzernrechnungslegung und Internationale Rechnungslegung",
            "Forderungsmanagement; Debitorenmanagement; Debitorenbuchhaltung",
            "Inventar",
            "Kosten- und Leistungsrechnung",
            "Lohnbuchhaltung",
            "Zahlungsverkehr",
            "Sonstiges Internes Rechnungswesen;  Management Accounting"
        ],
        "Controlling": [
            "Controlling Einführung; Controlling Überblick",
            "Finanzplanung",
            "Finanzwirtschaftliche Kennzahlen; KPIs im Business Development; Break-Even-Analyse; Business Case",
            "Controlling-Tools; Data Analytics und BI im Controlling",
            "Personalcontrolling",
            "Beschaffungscontrolling",
            "Produktionscontrolling",
            "Vertriebscontrolling",
            "Logistikcontrolling",
            "Logistikcontrolling",
            "Finanzcontrolling",
            "IT-Controlling",
            "Qualitätscontrolling",
            "Umweltcontrolling",
            "Strategisches Controlling",
            "Operatives Controlling",
            "Sonstiges in Controlling"
        ],
        "Sonstiges in Finanzen & Controlling; Accounting": [
            "Finanzierung von Kleinunternehmen"
        ]
    },
    "Einkauf; Beschaffung; Procurement; Purchasing": {
        "Procurement Management; Purchasing Management; Einkaufsmanagement; Beschaffungsmanagement": [
            "Procurement Management Einführung; Purchasing Management Einführung; Einkaufsmanagement Einführung; Beschaffungsmanagement Einführung; Procurement Management Überblick; Purchasing Management Überblick; Einkaufsmanagement Überblick; Beschaffungsmanagement Überblick",
            "Beschaffungspolitik; Angebotsvergleich; Einkaufsverträge; Preisgleitklausel; Preis-/Kostenanalyse; Einkaufsverhandlung; Einkaufsgewinnbeitrag",
            "Beschaffungsstrategien",
            "Nachhaltige Beschaffung; Sustainable procurement; Nachhaltigkeit im Einkauf",
            "Projekteinkauf; Claim Management; Risikomanagement; Total Cost of Ownership-Analyse (TCO)",
            "Strategischer Einkauf; Lieferantenauswahl; Preisverhandlungen; Warengruppenmanagement; Lagerhaltung; Beschaffungsmarktanalyse; Wertanalyse; Preisentwicklung; Vertragsverhandlungen; Vertragsmanagement; Supplier Realationship Management (SRM); Systematische Beschaffungsmarktbeobachtung; ABC-Analyse; XYZ-Analyse; Produktanalyse; Wertanalyse; Vendor Managed Inventory; Einkaufsbericht",
            "Operativer Einkauf; Bedarfsermittlung; Disposition; Bestellabwicklung; Terminverfolgung; Lieferungsverfolgung; Reklamationen; Stammdatenpflege",
            "Sonstiges Procurement Management; Purchasing Management; Einkaufsmanagement; Beschaffungsmanagement; Sonstiges Methoden im Einkauf"
        ],
        "Supply Chain Management; Logistik; Außenhandel": [
            "Supply Chain Management Einführung; Logisitk Einführung; Außenhandel Einführung; Supply Chain Management Überblick; Logisitk Überblick; Außenhandel Überblick",
            "Materialwirtschaft; Warenwirtschaft",
            "Transportwesen; Speditionswesen; Transportlogistik; Verpackung; Gefahrengut",
            "Dienstleistungsmanagement; Service-Management",
            "Strategisches Supply-Chain-Management; Outsourcing; Auslagerung; Collaborative Planning; Forecasting and Replenishment; Standortplanung; Efficient-Consumer-Response; ECR; Supply-Chain Operations Reference-Modell (SCOR-Modell); Supply-Chain-Finanzierung; Nachhaltiges Supply-Chain-Management; Sustainable Supply Chain Management (SSCM); Lagerhaltung; Lagerlogistik; Lieferantenmanagement; Make-or-Buy-Entscheidungen; Global Sourcing",
            "Operatives Supply-Chain-Management",
            "Just-in-time-Produktion",
            "Supply Chain Event Management (SCEM)",
            "Sonstiges Supply Chain Management; Logistik; Außenhandel"
        ],
        "Sonstiges in Einkauf; Beschaffung; Procurement; Purchasing": [
            "Sonstiges in Einkauf; Beschaffung; Procurement; Purchasing"
        ]
    },
    "Personal & Human Resource Management (HRM)": {
        "Personalführung; Mitarbeiterführung": [
            "Personalführung Einführung; Mitarbeiterführung Einführung; Personalführung Überblick; Mitarbeiterführung Überblick",
            "Mitarbeitereinbindung; Mitarbeitereinbindung; Einbindung der Mitarbeiter",
            "Führungskultur",
            "Methoden der Personalführung; Führungsstil",
            "Führung und Motivation; Führungspsychologie",
            "Führungsinstrumente",
            "Teamführung",
            "Personalgespräch; Personalgespräch; Mitarbeitergespräch",
            "Personalbeurteilung; Leistungsbeurteilung; Assessment-Center; 360-Grad-Feedback; Qualifikationsdatenbank",
            "Personalkommunikation",
            "Sonstiges Personalführung"
        ],
        "Personalentwicklung (PE)": [
            "Personalentwicklung (PE) Einführung; Personalentwicklung (PE) Überblick; Mitarbeiterbefragung; Einarbeitung neuer Mitarbeiter; Patenschaft und Mentorensystem; Mentoring; Coaching; Supervision; Job-Rotation; Job-Enlargement; Job-Enrichment; Projektmitarbeit und -verantwortung; Teamentwicklung; Führen auf Zeit; Praktikum; Auslandsaufenthalt; Auslandsaufenthalt; Entsendung; Lernen durch Lehren",
            "Potenzialanalyse",
            "Zielvereinbarung",
            "Laufbahnentwicklung; Karriereplanung",
            "Nachfolgeplanung",
            "Qualifizierung von Ausbildern; Qualifizierung von Ausbildern; Qualifizierung von Ausbildungsbeauftragten; Ausbildung der Ausbilder (AdA-Schein); Methoden für Ausbilder / Ausbildungsbeauftragte; Führung von Auszubildenden; Förderung von Auszubildenden",
            "Sonstiges Personalentwicklung (PE)"
        ],
        "Personalbeschaffung; Personalbeschaffungsprozess; Personalgewinnung": [
            "Personalbeschaffung Einführung; Personalbeschaffungsprozess Einführung; Personalgewinnung Einführung; Personalbeschaffung Überblick; Personalbeschaffungsprozess Überblick; Personalgewinnung Überblick",
            "Personalmarketing",
            "Employer Branding",
            "Stellenausschreibung",
            "Bewerbungsunterlagen",
            "Rekrutierung; Recruiting; Rekrutierungsprozess; Recruiting-Prozess; Recruitment Process",
            "Bewerbungsgespräch; Einstellungsgespräch; Vorstellungsgespräch; Jobinterview",
            "Einstellung; Einstellungsverfahren; Abwicklung der Einstellung neuer Mitarbeiter",
            "Interne Personalbeschaffung; interne Stellenausschreibung; Personalentwicklung; Beförderung; Versetzung; Mehrarbeit",
            "Sonstiges Personalplanung; Personalplanung; Personalplanungsprozesse"
        ],
        "Personaleinsatz": [
            "Personaleinsatz Einführung; Personaleinsatz Überblick",
            "Personaleinsatzplanung; Besetzungsplanung; Personalbestandplanung",
            "Stellenbeschreibung; Aufgabenbeschreibung; Stellenbeschreibung",
            "Onboarding; Personaleinführung; Personalzugang; Einarbeitung",
            "Personalabgang; Personalfreisetzung; Abmahnung; Kündigung;  Kündigung; kündigen; Entlassung; entlassen; Betriebsschließung & stilllegung; Betriebsschließung; Betriebsstilllegung; Pensionierung; Ruhestand; Altersteilzeit; Vorruhestand",
            "Mehrarbeit; Überstunden",
            "Kurzarbeit",
            "Expatriate Management; Expatriate Management; Auslandsentsendung; Repatriierung",
            "Sonstiges Personaleinsatz"
        ],
        "Entgeltmanagement": [
            "Entgeltmanagement Einführung; Entgeltmanagement Überblick",
            "Entlohnung; Vergütung; Vergütung; Compensation;",
            "Personalkosten; Senkung der Personalkosten; Personalkostenplanung; Personalkostenplanung; Planung zukünftiger Personalkosten; Planung strategischer Personalkosten; HR-Budget; HR-Budget; Personalbudget; HR-Budgetplanung",
            "Entgeltermittlung; Ermittlung von Arbeitsentgelten; Ermittlung von Nettoentgelten; Entgeltermittlung",
            "Entgeltabrechnung; Entgeltabrechnung; Lohnabrechnung; Gehaltsabrechnung",
            "Leistungspolitik; Benefits; Corporate Benefits",
            "Lohnpolitik",
            "Performance-Management",
            "Sonstiges Entgeltmanagement"
        ],
        "Personalmanagement; Personalpolitik; Arbeitspolitik": [
            "Personalmangement Einführung; Personalpolitk Einführung; Arbeitspolitik Einführung; Personalmangement Überblick; Personalpolitk Überblick; Arbeitspolitik Überblick",
            "Personalplanung;  Personalplanungsprozesse; Personalbedarf; Personalbedarf; Personalbedarfsermittlung; Ermittlung des Personalbedarfs; Personalbedarfsplanung;Personalkapazität; Personalkapazitätsplanung; personelle Kapazität",
            "Strategisches Personalmanagement",
            "Altersgerechte Personalpolitik; demographiegerechte Personalpolitik; demografiegerechte Personalpolitik",
            "Betriebliches Bildungsmanagement",
            "Mitarbeiterbindung; Personalbindung; Mitarbeiterbindung; Sozialwesen; Sozialmaßnahmen; Mitarbeiterzufriedenheit; Zufriedenheit am Arbeitsplatz; Mitarbeiterzufriedenheit; Anerkennung; Anerkennung; Wertschätzung; Würdigung; Bewunderung; Arbeitsklima",
            "Sonstiges Personalmanagement; Personalpolitik; Arbeitspolitik"
        ],
        "Betriebliches Gesundheitsmanagement (BGM)": [
            "Betriebliches Gesundheitsmanagement (BGM) Einführung; Betriebliches Gesundheitsmanagement (BGM) Überblick",
            "Betriebliche Gesundheitsförderung (BGF)",
            "Arbeitsschutzmanagement (ASM); Ergonomie; Gefährdungsbeurteilung; Arbeitsplatzbegehungen; Arbeitsmedizinische Vorsorge",
            "Betrieblches Eingliederungsmanagement (BEM)",
            "Sonstiges Betriebliches Gesundheitsmanagement (BGM)"
        ],
        "Sonstiges Personal / Human Resource Management (HRM); Personal; Personalarbeit; Personalwesen; Personalwirtschaft; Personalmanagement; Personalprozesse; Personalorganisation; Human Resources (HR); Human Resource": [
            "Arbeitsplatzgestaltung",
            "Arbeitszeugnis",
            "Talentmanagement",
            "Future Workforce & New Work",
            "Personalservice; Sozialbetreuung (z.B. Werksarzt; Sozialfürsorge); Sachmittelversorgung (z.B. Berufskleidung); Sachmittelbewilligung (z.B. Vermittlung einer Betriebswohnung); Dienstleistungen (z.B. Personalpflege); Informationen (z.B. Regelungen zur Sozialversicherung); Immaterielle Leistungen (z.B. Sanitätsdienst); Rückkehrgespräche; Mobbing"
        ]
    },
    "Persönliche Entwicklung & Soft Skills": {
        "Berufliche und persönliche Entwicklung": [
            "Berufliche und persönliche Entwicklung Einführung; Berufliche und persönliche Entwicklung Überblick",
            "Jobsuche",
            "Existenzgründung",
            "Bewerbungstraining",
            "Karriereplanung; Karrieremanagement",
            "Kreativitätstechniken",
            "Selbstmarketing; Personal Branding",
            "Persönlichkeitsentwicklung",
            "Persönliche Finanzplanung",
            "Soft Skills",
            "Sonstiges Berufliche und persönliche Entwicklung"
        ],
        "Kommunikation und Präsentation": [
            "Kommunikation und Präsentation Einführung; Kommunikation und Präsentation Überblick",
            "Besprechungen; Meetings; Selbstwahrnehmung und Fremdwahrnehmung",
            "Gesprächsführung",
            "Moderation",
            "Rhetorik",
            "Verhandlungskompetenz; Verhandlungstraining; Verhandeln",
            "Vorträge  und Präsentationen",
            "Schreibtraining; Texte schreiben",
            "Workshop-Gestaltung; Workshop-Kompetenzen; Workshop-Durchführung",
            "Business Knigge",
            "Business English",
            "Sonstiges Kommunikation und Präsentation"
        ],
        "Fremdsprachen": [
            "Deutsch",
            "Englisch",
            "Französisch",
            "Italienisch",
            "Russisch",
            "Spanisch",
            "Portugiesisch",
            "Türkisch",
            "Arabisch",
            "Chinesisch",
            "Sonstige"
        ],
        "Zeit-, Stress- und Selbstmanagement": [
            "Zeit-, Stress- und Selbstmanagement Einführung; Zeit-, Stress- und Selbstmanagement Überblick",
            "Arbeitstechniken; Arbeitsmanagement",
            "Homeoffice; Mobiles Arbeiten",
            "Vereinbarkeit von Beruf und Familie",
            "Zeitmanagement",
            "Selbstführung und Selbstmanagement; Entscheidungsfindung",
            "Achtsamkeit; Achtsamkeitstraining; Wohlbefinden und Selbstfürsorge",
            "Resilienz",
            "Stressmanagement",
            "Sonstiges Zeit-, Stress- und Selbstmanagement"
        ],
        "Team- und Konfliktmanagement": [
            "Team- und Konfliktmanagement Einführung; Team- und Konfliktführung Überblick",
            "Gruppendynamische Prozesse",
            "Konfliktmanagement; Kommunikationsstörungen; Rollenkonflikte; Zielkonflikte; Konfliktpotenziale; Dynamik der Eskalation; Konfliktspirale; Konfliktgespräch; Spannungspotenziale; Systematische Problemlösung; Drama-Dreieck; Harvard-Modell; Inakzeptables Verhalten; Konsensfindung; Grenzenverletzendes Verhalten; Mediation",
            "Diversität und Zusammengehörigkeit; Diversität und Zugehörigkeit; Seminare für Frauen; Integration von Geflüchteten / Flüchtlingen; Solidarität und Verbundenheit; Gendertheorien; Geschlecht; Geschlechterrollen; Gender Mainstreaming; Gleichstellungspolitik; Unconscious Bias; Lebensentwürfe; Sexuelle Orientierung und Identität; Kultureller Hintergrund; Religion und Weltanschauung; Alter und Generationen; Körperliche und geistige Fähigkeiten; Self-Awareness; Diversity Management; Weiterbildung für die Flüchtlingsarbeit; Weiterbildung für Migrant:innen",
            "Interkulturelles Training; Interkulturelle Kompetenz",
            "Sonstiges Team- und Konfliktmanagement"
        ],
        "Beratung; Coaching; Supervision": [
            "Beratung Einführung; Coaching Einführung; Beratung Überblick; Coaching Überblick",
            "Berufsberatung; Karriereberatung",
            "Entwicklungs-Coaching",
            "Ziele-Coaching",
            "Werte-Coaching",
            "Life-Coaching",
            "Health-Coaching",
            "Business-Health Coaching",
            "Sonstiges Beratung; Coaching"
        ],
        "Sonstiges Persönliche Entwicklung & Soft Skills / Persönliche und Soziale Kompetenzen": [
            "Sonstiges Persönliche Entwicklung & Soft Skills / Persönliche und Soziale Kompetenzen"
        ]
    }
};

var categoryList = [];



$(document).ready(function () {


    $('.chooseCategoryButton').click(function (e) {
        if (e.target !== e.currentTarget) return; // if child element is clicked, do nothing
        $('.categorySystemContainer').show();
        $('.categorySystemInputWrapper').toggleClass('active');
        $('.categoryOverlay').toggleClass('active');
        // $('.categorySuggestionContainer').slideToggle();
    });

    $.each(jsonArray, function (key1) {
        var splittedKey = key1.split(';');
        $('.categoryFirstRow').append('<div class="categoryButton categoryFirstLayer"><div class="category">' + splittedKey[0] + '</div></div>');
    });

    // choose and toggle first category
    $('.categoryFirstLayer').click(function () {
        $(this).toggleClass('activeCategory');
        $('.categorySecondLayer').slideUp(400, function () { $(this).remove(); });
        $('.categoryThirdLayer').slideUp(400, function () { $(this).remove(); });
        $('.categoryButton').not(this).toggle(400);
        $(this).removeClass('semiactiveCategory');
        if ($('.categoryFirstLayer').hasClass('activeCategory')) {
            $('.categoryFirstRow').addClass('active');
        } else {
            $('.categoryFirstRow').removeClass('active');
        }
        $('.categorySystemInput').val('');
        $('.categoryThirdLayer').promise().done(function () {
            categorySystem();
        });
        $('.categorySystemInput').removeClass('categorySetTrue');
        $('.saveButton').addClass('buttonInactive');
        checkIfFilled($('.categorySearchInput'));
        checkIfFilled($('.categorySystemInput'));
    });

    // choose second category
    $('.categorySecondRow').on('click', '.categorySecondLayer:not(.activeCategory)', function () {
        $(this).addClass('activeCategory');
        $('.categorySecondLayer').not(this).toggle(400);
        // if ( $(this).hasClass('activeCategory') ){
        //     var selectedCategory = $(this).find('.category').html();
        //     $('.categoryFirstRow').append('<div class="categoryButton categorySecondLayer activeCategory"><div class="category">' +selectedCategory+ '</div></div>');
        // } else {
        //     $('.categoryFirstRow').find('.categorySecondLayer').remove();
        // }
        // $(this).toggleClass('activeCategory');
        $('.categoryFirstRow').find('.categoryFirstLayer.activeCategory').toggleClass('semiactiveCategory');
        categorySystem();
    });

    // choose third category
    $('.categoryThirdRow').on('click', '.categoryThirdLayer:not(.activeCategory)', function () {
        $(this).addClass('activeCategory');
        $('.categoryThirdLayer').not(this).toggle(400);
        // if ( $(this).hasClass('activeCategory') ){
        //     var selectedCategory = $(this).find('.category').html();
        //     $('.categoryFirstRow').append('<div class="categoryButton categoryThirdLayer activeCategory"><div class="category">' +selectedCategory+ '</div></div>');
        // } else {
        //     $('.categoryFirstRow').find('.categoryThirdLayer').remove();
        // }
        // $(this).toggleClass('activeCategory');
        $('.categorySecondRow').find('.categorySecondLayer.activeCategory').toggleClass('semiactiveCategory');
        categorySystem();
    });

    // toggle second category
    $('.categorySecondRow').on('click', '.categorySecondLayer.activeCategory', function () {
        $(this).removeClass('activeCategory');
        $('.categoryThirdLayer').slideUp(400, function () { $(this).remove(); });
        $('.categorySecondLayer').not(this).toggle(400);
        $('.categoryFirstRow').find('.categoryFirstLayer.activeCategory').toggleClass('semiactiveCategory');
        $('.categoryFirstRow').addClass('active');
        $('.categorySystemInput').val('');
        $('.categorySystemInput').removeClass('categorySetTrue');
        $('.saveButton').addClass('buttonInactive');
        checkIfFilled($('.categorySearchInput'));
        checkIfFilled($('.categorySystemInput'));
    });

    // toggle third category
    $('.categoryThirdRow').on('click', '.categoryThirdLayer.activeCategory', function () {
        $(this).removeClass('activeCategory');
        $('.categoryThirdLayer').not(this).toggle(400);
        $('.categorySecondRow').find('.categorySecondLayer.activeCategory').toggleClass('semiactiveCategory');
        $('.categorySystemInput').val('');
        $('.categoryFirstRow').addClass('active');
        $('.categorySystemInput').removeClass('categorySetTrue');
        $('.saveButton').addClass('buttonInactive');
        checkIfFilled($('.categorySearchInput'));
        checkIfFilled($('.categorySystemInput'));
    });

    $.each(jsonArray, function (key1, key2) {
        $.each(key2, function (key2output, key3output) {
            $.each(key3output, function (i) {
                categoryList.push(key3output[i]);
            });
        });
    });

});

function closeOverlay() {
    $('.categorySystemContainer').hide();
    $('.categoryOverlay').toggleClass('active');
}


function categorySystem() {
    if ($('.categoryThirdRow .categoryButton').hasClass('activeCategory')) {
        var activeCategory = $('.activeCategory.categoryThirdLayer').find('.category').text();
        $('.categorySystemInput').val('Kategorie: ' + activeCategory);
        $('.categorySystemInput').addClass('categorySetTrue');
        if (!$('.categorySearchInput').val()) {
            $('.categorySearchInput').val(activeCategory);
        }
        $('.categoryFirstRow').removeClass('active');
        checkIfFilled($('.categorySearchInput'));
        checkIfFilled($('.categorySystemInput'));
        $('.categorySuggestionContainer').empty();
        $('.saveButton').removeClass('buttonInactive');
    } else if ($('.categorySecondRow .categoryButton').hasClass('activeCategory')) {
        var activeCategory = $('.activeCategory.categorySecondLayer').find('.category').text();
        $.each(jsonArray, function (key1, key2) {
            $.each(key2, function (key2output, key3output) {
                var splittedKey = key2output.split(';');
                if (splittedKey[0] == activeCategory) {
                    $.each(key3output, function (i) {
                        var splittedKey = key3output[i].split(';');
                        $('.categoryThirdRow').append('<div class="categoryButton categoryThirdLayer"><div class="category">' + splittedKey[0] + '</div></div>');
                    });
                }
            });
        });
    } else if ($('.categoryFirstRow .activeCategory').hasClass('categoryFirstLayer')) {
        var activeCategory = $('.activeCategory.categoryFirstLayer').find('.category').text();
        $.each(jsonArray, function (key1, key2) {
            var splittedKey = key1.split(';');
            if (splittedKey[0] == activeCategory) {
                $.each(key2, function (key2output) {
                    var splittedKey = key2output.split(';');
                    $('<div class="categoryButton categorySecondLayer"><div class="category">' + splittedKey[0] + '</div></div>').appendTo($('.categorySecondRow')).slideDown("slow");
                });
            }
        });
    }
}

function clearCategory() {
    $('.categorySystemInput').val('');
    $('.categoryFirstRow').find('.categoryFirstLayer.activeCategory').click();
    $('.categorySystemInput').removeClass('categorySetTrue');

    checkIfFilled($('.categorySearchInput'));
    checkIfFilled($('.categorySystemInput'));
    searchForCategory($('.categorySearchInput'));
}

function searchForCategory(element) {
    var catchedCategorys = [];
    var exactCategorys = [];

    var searchString = $(element).val().toLowerCase();
    if (searchString.length >= 2) {
        var firstCategory;
        var secondCategory;
        var thirdCategory;
        var search = searchString.split(/[ ,./]+/g);

        $.each(jsonArray, function (key1, key2) {
            var categoryFirstLevel = key1.split(';');
            $.each(key2, function (key2output, key3output) {
                var categorySecondLevel = key2output.split(';');
                $.each(key3output, function (i) {
                    var categoryThirdLevel = key3output[i].split(';');
                    $.each(categoryThirdLevel, function (j) {
                        var singleCategory = categoryThirdLevel[j].toLowerCase();
                        for (var e = 0; e < search.length; e++) {
                            if (search[e].length >= 2) {
                                if (singleCategory.search(search[e]) >= 0) {
                                    // console.log(categoryList[i]);
                                    catchedCategorys.push(categoryFirstLevel[0] + '|' + categorySecondLevel[0] + '|' + categoryThirdLevel[0]);

                                    firstCategory = categoryFirstLevel[0];
                                    secondCategory = categorySecondLevel[0];
                                    thirdCategory = categoryThirdLevel[0];
                                }

                            }
                        }
                        if ( singleCategory.search(searchString) >= 0){
                            // exactCategorys.push(categoryThirdLevel[0]);
                            exactCategorys.push(categoryFirstLevel[0] + '|' + categorySecondLevel[0] + '|' + categoryThirdLevel[0]);
                        }
                    });

                });

            });
        });

        // $.each( categoryList, function(i) {
        //     // console.log(categoryList[i]);
        //     var singleCategory = categoryList[i].toLowerCase();

        //     for (var e = 0; e < search.length; e++ ) {
        //         if ( search[e].length >= 2 ){
        //             if ( singleCategory.search(search[e]) >= 0){
        //                 // console.log(categoryList[i]);
        //                 catchedCategorys.push(categoryList[i]);
        //             }

        //         }
        //     }
        //     if ( singleCategory.search(searchString) >= 0){
        //         exactCategorys.push(categoryList[i]);
        //     }
        // });
    }


    // console.log('exact:' + exactCategorys);
    $.each(exactCategorys, function (j) {
        if (catchedCategorys.indexOf(exactCategorys[j]) > -1) {
            catchedCategorys.splice($.inArray(exactCategorys[j], catchedCategorys), 1);
        }
        catchedCategorys.unshift(exactCategorys[j]);
    });
    catchedCategorys = $.unique(catchedCategorys);
    // console.log('catched complete: ' + catchedCategorys);
    addCategorySuggestion(catchedCategorys);
}

function addCategorySuggestion(categorys) {
    $('.categorySuggestionContainer').empty();
    if (!$('.categorySystemInput').val()) {
        if (categorys.length > 0) {
            $('.categorySuggestionContainer').append('<div class="categorySuggestionTitle">Vorschläge:</div>');
        }
        $.each(categorys, function (i) {
            var splittedCategory = categorys[i].split('|');

            var searchString = $('.categorySearchInput').val().toLowerCase();
            var search = searchString.split(/[ ,./]+/g);
            for (var e = 0; e < search.length; e++) {
                if (search[e].length >= 2) {
                    search[e] = search[e].replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                    var pattern = new RegExp("(" + search[e] + ")", "gi");
                    splittedCategory[2] = splittedCategory[2].replace(pattern, '<mark>$1</mark>');
                    splittedCategory[2] = splittedCategory[2].replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");
                }
            }

            if (i <= 7) {
                $('.categorySuggestionContainer').append('<div class="categorySuggestion" onclick="addSearchedCategory(this);"><div class="category categoryFirstLevel">' +
                    splittedCategory[0] + '</div><i class="iconArrowRight"></i><div class="category categorySecondLevel">' +
                    splittedCategory[1] + '</div><i class="iconArrowRight"></i><div class="category categoryThirdLevel">' +
                    splittedCategory[2]
                    + '</div></div>');
            }
        });
    }
}

function addSearchedCategory(element) {
    var selectedCategory = $(element).find('.category.categoryThirdLevel').text();
    var firstCategory;
    var secondCategory;
    var thirdCategory;
    $.each(jsonArray, function (key1, key2) {
        var categoryFirstLevel = key1.split(';');
        $.each(key2, function (key2output, key3output) {
            var categorySecondLevel = key2output.split(';');
            $.each(key3output, function (i) {
                var splittedKey = key3output[i].split(';');
                if (splittedKey[0] == selectedCategory) {
                    firstCategory = categoryFirstLevel[0];
                    secondCategory = categorySecondLevel[0];
                    thirdCategory = splittedKey[0];


                }
            });

        });
    });
    // if ( $('.categorySystemInput').val() ) {
    //     // $('.categorySystemInput').val('');
    //     $('.categoryFirstRow').find('.categoryFirstLayer').click();
    // }
    // $('.categoryFirstRow').find('.category:contains(' + firstCategory + ')').click();
    // $('.categorySecondRow').find('.category:contains(' + secondCategory + ')').click();
    // $('.categoryThirdRow').find('.category:contains(' + thirdCategory + ')').click();
    $('.categoryFirstRow').find('.category').filter(function() {
        return $(this).text().trim() === firstCategory;
    }).click();
    $('.categorySecondRow').find('.category').filter(function() {
        return $(this).text().trim() === secondCategory;
    }).click();
    $('.categoryThirdRow').find('.category').filter(function() {
        return $(this).text().trim() === thirdCategory;
    }).click();
    $('.categorySuggestionContainer').empty();
    // console.log(firstCategory);
    // console.log(secondCategory);
    // console.log(thirdCategory);
}


// /* generate custom PDF */

async function generatePDF() {
    const { PDFDocument, rgb } = PDFLib;

    // if ($('.question9.checkbox').is(':checked')) {
    //     var formUrl = 'PDF/downloadPDF_intactive_q4.pdf';
    // } else if ($('.question9.buttonStart').hasClass('active')) {
    //     var formUrl = 'PDF/downloadPDF_intactive_q1.pdf';
    // } else if ($('.question9.buttonMiddle').hasClass('active')) {
    //     var formUrl = 'PDF/downloadPDF_intactive_q2.pdf';
    // } else if ($('.question9.buttonEnd').hasClass('active')) {
    //     var formUrl = 'PDF/downloadPDF_intactive_q3.pdf';
    // }
    const formUrl = 'PDF/downloadPDF_intactive_neu.pdf';
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    const answer1Field = form.getTextField('answer1');
    const answer1_1Field = form.getTextField('answer1_1');
    const answer2Field = form.getTextField('answer2');
    const answer3Field = form.getTextField('answer3');
    const answer4Field = form.getTextField('answer4');
    const answer5Field = form.getTextField('answer5');
    const answer5_1Field = form.getTextField('answer5_1');
    const answer6Field = form.getTextField('answer6');
    const answer7Field = form.getTextField('answer7');
    const answer8Field = form.getTextField('answer8');
    const answer9_1Field = form.getField('answer9_1');
    const answer9_2Field = form.getField('answer9_2');
    const answer9_3Field = form.getField('answer9_3');
    const answer9_4Field = form.getField('answer9_4');
    const answer10Field = form.getTextField('answer10');
    const answer11_14Field = form.getTextField('answer11_14');
    const answer12_15Field = form.getTextField('answer12_15');
    const answer13Field = form.getTextField('answer13');
    const answer16Field = form.getTextField('answer16');
    const answer17Field = form.getTextField('answer17');
    const answer17_1Field = form.getTextField('answer17_1');
    const answer18Field = form.getTextField('answer18');
    const answer19Field = form.getTextField('answer19');
    const answer20Field = form.getTextField('answer20');
    const answer21Field = form.getTextField('answer21');
    const answer22Field = form.getTextField('answer22');
    const answer23Field = form.getTextField('answer23');
    const answer23_1Field = form.getField('answer23_1');
    const answer23_2Field = form.getField('answer23_2');
    const answer24Field = form.getTextField('answer24');

    //Thema
    answer1Field.setText($('.question1').val() || '/');
    answer1_1Field.setText($('.question1_1').val() || '/');
    answer2Field.setText($('.question2').val() || '/');
    //Teilnehmer
    answer3Field.setText($('.question3').val() + ' Personen' || '/');
    answer4Field.setText($('.question4').val() || '/');
    answer5Field.setText(getMultipleButtonValue($('.question5.active')) || '/');
    answer5_1Field.setText($('.question5_1').val() || '/');
    //Ziel
    answer6Field.setText(getMultipleButtonValue($('.question6.active')) || '/');
    answer7Field.setText(getInputListItems($('.question7')) || '/');
    answer8Field.setText(getCheckboxValue($('.question8:checked'), true) || '/');
    //Format
    answer10Field.setText(getRadioValue($('.question10:checked')) || '/');
    answer11_14Field.setText(getTwoQuestions(getRadioValue($('.question11:checked')), getRadioValue($('.question14:checked'))) || '/');
    answer12_15Field.setText(getTwoQuestions(getRadioValue($('.question12:checked')), getRadioValue($('.question15:checked'))) || '/');
    answer13Field.setText(getRadioValue($('.question13:checked')) || '/');

    const pages = pdfDoc.getPages();
    const formatPage = pages[3]; 
    if ($('.question9.checkbox').is(':checked')) {
        answer9_4Field.check();
        form.removeField(answer10Field);
        form.removeField(answer11_14Field);
        form.removeField(answer12_15Field);
        form.removeField(answer13Field);
        var whiteRect = {
            x: 30, 
            y: 210, 
            width: 550, 
            height: 400, 
            color: rgb(1, 1, 1) 
        };
    } else if ($('.question9.buttonStart').hasClass('active')) {
        answer9_1Field.check();
        form.removeField(answer11_14Field);
        form.removeField(answer12_15Field);
        form.removeField(answer13Field);
        var whiteRect = {
            x: 30, 
            y: 210, 
            width: 550, 
            height: 320, 
            color: rgb(1, 1, 1) 
        };
    } else if ($('.question9.buttonMiddle').hasClass('active')) {
        answer9_2Field.check();
        form.removeField(answer10Field);
        form.removeField(answer13Field);
        var whiteRect = {
            x: 30, 
            y: 530, 
            width: 550, 
            height: 100, 
            color: rgb(1, 1, 1) 
        };
        var whiteRect2 = {
            x: 30, 
            y: 210, 
            width: 550, 
            height: 150, 
            color: rgb(1, 1, 1) 
        };
        formatPage.drawRectangle(whiteRect2);
    } else if ($('.question9.buttonEnd').hasClass('active')) {
        answer9_3Field.check();
        form.removeField(answer10Field);
        var whiteRect = {
            x: 30, 
            y: 530, 
            width: 550, 
            height: 100, 
            color: rgb(1, 1, 1) 
        };
    }
    formatPage.drawRectangle(whiteRect);
    //Rahmenbedingungen
    if ($('.question16.checkbox').is(':checked')) {
        answer16Field.setText('Offen für Vorschläge');
    } else {
        answer16Field.setText($('.question16.sliderInput').val() + ' ' + getMultipleButtonValue($('.singleMultipleButton.question16.active')) || '/');
    }
    answer17Field.setText(getMultipleButtonValue($('.question17.active')) || '/');
    answer17_1Field.setText($('.question17_1').val() || '/');
    if ($('.question18.checkbox').is(':checked')) {
        answer18Field.setText('Offen für Vorschläge');
    } else {
        answer18Field.setText($('.question18.sliderInput').val() + '€ ' + getMultipleButtonValue($('.singleMultipleButton.question18.active')) || '/');
    }
    answer19Field.setText(getInputListItems($('.question19')) || '/');
    //Besonderheiten
    answer20Field.setText($('.question20').val() || '/');
    answer21Field.setText($('.question21:not(.fileUploadPlaceholder)').text() || '/');
    //Abschluss
    if ($('.question22:checked').hasClass('radioAdditionalWrapperToggle')) {
        answer22Field.setText(getCheckboxValue($('.question22:checked'), true) + ' ' + getCheckboxValue($('.radioAdditionalWrapper .radio:checked')) || '/');
    } else {
        answer22Field.setText(getCheckboxValue($('.question22:checked')) || '/');
    }
    answer22Field.setText(getCheckboxValue($('.question22:checked'), true) || '/');

    if ($('.question23.buttonStart').hasClass('active')) {
        answer23_1Field.check();
    } else if ($('.question23.buttonEnd').hasClass('active')) {
        answer23_2Field.check();
    }
    answer23Field.setText(getInputListItems($('.question23.input')) || '/');
    var answer24DateString = $('.question24').val();
    let answer24dateObject = new Date(answer24DateString).toLocaleDateString();
    if (answer24dateObject == 'Invalid Date') {
        answer24dateObject = '/';
    }
    answer24Field.setText(answer24dateObject);


    form.flatten();

    const pdfBytes = await pdfDoc.save();

    const filledPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // const pdfURL = URL.createObjectURL(filledPdfBlob);
    // window.open(pdfURL, '_blank');
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(filledPdfBlob);
    downloadLink.download = 'NextLearningFinder_Zusammenfassung.pdf';
    downloadLink.target = '_blank';
    downloadLink.click();
}


function getMultipleButtonValue(element) {
    var selectedElement = $(element);
    var outputText = '';
    selectedElement.each(function (index) {
        if (index >= 1) {
            outputText = outputText + ', ' + $(this).text().trim();
        } else {
            outputText = outputText + $(this).text().trim();
        }
    });
    return outputText;
}

function getInputListItems(element) {
    var selectedElement = $(element);
    var outputText = '';
    selectedElement.each(function () {
        var thisElement = $(this).val();
        if (thisElement == null || thisElement == '') {
        } else {
            if ($(this).hasClass('question23')) {
                if ($(this).hasClass('textarea')) {
                    var parentTextElement = $(this).siblings('span').text();
                } else {
                    var parentTextElement = $(this).parents('.inputItem').siblings('span').text();
                }
                parentTextElement = parentTextElement.replace(/\*/g, '').replace(/\s+$/, '');
                outputText = outputText + '• ' + parentTextElement + ': ' + thisElement + '\n';
            } else {
                outputText = outputText + '• ' + thisElement + '\n';
            }
        }
    });
    return outputText;
}

function getCheckboxValue(element, showBulletPoints) {
    var selectedElement = $(element);
    var outputText = '';
    selectedElement.each(function (index) {
        
        if (showBulletPoints == true) {
            if ($(this).hasClass('checkboxAdditionalWrapperToggle')) {
                outputText = outputText + '• ' + $(this).val() + ': ' + getCheckboxValue($('.checkboxAdditionalWrapper .checkbox:checked'), false) + '\n';
            } else {
                outputText = outputText + '• ' + $(this).val() + '\n';
            }
        } else {
            if (index >= 1) {
                outputText = outputText + ', ' + $(this).val();
            } else {
                outputText = outputText + $(this).val();
            }
        }
    });
    return outputText;
}

function getRadioValue(element) {
    var selectedElement = $(element);
    var outputText = '';
    selectedElement.each(function () {
        outputText = $(this).parents('.radioItem').contents()
            .filter(function () {
                return this.nodeType === 3;
            })
            .text()
            .trim();
    });
    return outputText;
}

function getTwoQuestions(firstQuestionValue, secondQuestionValue) {
    if (firstQuestionValue.length > 0) {
        return firstQuestionValue;
    } else if (secondQuestionValue.length > 0) {
        return secondQuestionValue;
    }
}



// /*** API ***/

function sendCreate(element) {
    const url = new URL(window.location.href);
    const apiBase = url.searchParams.get('base');
    const category = url.searchParams.get('categoryId'); 
    const title = $('input[name=question1]').val();
    const description = $('textarea[name=question2]').val();
    const targetGroup = $('textarea[name=question4]').val();
    const learnTargets = $('textarea[name=question7_1]').val();

    const data = {
        categoryID: category,
        title: title,
        description: description,
        designToolId: "-2763128207417308660",
        targetGroup: targetGroup,
        learnTargets: learnTargets,
        customFields: {
            customWizardFieldList: []
        }
    };

    // Thema ist hier = titel (Standarfeld oben)
    // data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-6103886129778542449'));

    // Thema Kategorie
    data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-3547155663305458280'));

    // Inhalte = description (Standardfeld oben)
    // data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('4707406924110697321'));

    // Teilnehmerzahl
    data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-4268962273455824140'));

    // Zielgruppe = targetGroup (Standarfeld oben)
    // data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('756634203062863221'));

    // Wissensstand/Ausgangslevel
    let value = $('.question5.active').attr("option_id");
    data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-5165470176262312330', value));

    // Wissensstand/Ausgangslevel Ergänzung
    data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('401746071765203740'));

    // Ziellevel
    value = $('.question6.active').attr("option_id");
    data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-9022484519455170860', value));

    // Ziele = learnTargets (Standardfeld oben)
    // data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-6066245332755675049'));

    // Abschluss Form
    let formId = []
    $('#question8 input:checked').each(function(){
        formId.push($(this).attr("option_id"));
    });
    data.customFields.customWizardFieldList.push(createCustomFieldMultiselect('-7927954973256555860', formId));

  // Weiterbildungsformat

    value = $('#question9 input[name=checkbox1]').val();
    if (!$('#question9 input[name=checkbox1]').is(':checked')) {
        value = $('.question9.active').text();
    }else {
        value = $('#question9 input[name=checkbox1]').val();
    }
    data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('7782559299616829700', value));

        // Präsensz: Örtlichkeit
         value = $('#question10 input:checked').attr("option_id");
         data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-3660696668465634010', value));
        
        // Digital: Format
        value = $('#question11 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-1160524995243098970', value));
        
        // Digital: Infrastruktur
        value = $('#question12 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-7198792838469751310', value));

        // Hybrid: Örtlichkeit
        value = $('#question13 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-6857635318300007730', value));

        // Hybrid Format
        value = $('#question14 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-2990874983264856780', value));
 
        // Hybrid Infrastruktur
        value = $('#question15 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-4366418303564927030', value));

    // Dauer
        value = $('#question16 input[name=checkbox1]').val();
        if (!$('#question16 input[name=checkbox1]').is(':checked')) {
            value = $('input[name=question16]').val();
            if ($('.question16.multipleButton .active').hasClass('buttonStart')) {
                // buttonStart ist Stunden
                value = `${value} Stunden`;
            } else {
                // buttonEnd ist Tage
                value = `${value} Tage`;
            }
        }
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('6890281787929000090', value));

    // Durchführungszeitraum
        value = $('.question17.active').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-812571589422049910', value));

    // Durchführungszeitraum Ergänzung
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('4035343967521199580'));

    // Budget
        value = $('#question18 input[name=checkbox1]').val();
        if (!$('#question18 input[name=checkbox1]').is(':checked')) {
            value = $('input[name=question18]').val();
            if ($('.question18.multipleButton .active').hasClass('buttonStart')) {
                // buttonStart ist pro Person
                value = `${value} pro Person`;
            } else {
                // buttonEnd ist Insgesamt
                value = `${value} Insgesamt`;
            }
        }
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('7293279947918769110', value));

    // Sprache
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('5273801592987243770'));

    // Besonderheiten
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-8310085781429795890'));

    // Platzierung der Anfrage
        value = $('#question22 input:checked').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-399828778743522450', value));

    // Platzierung Anbieter
        formId = []
        $('#question22_1 input:checked').each(function(){
            formId.push($(this).attr("option_id"));
        });
        data.customFields.customWizardFieldList.push(createCustomFieldMultiselect('-2930431412281367090', formId));
    
    // Kontakt Form
        value = $('.question23.active').attr("option_id");
        data.customFields.customWizardFieldList.push(createCustomFieldOptionForAdd('-3565121280586418680', value));

        // Kontakt Form E-Mail: Name
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('9005901207318568320'));

        // Kontakt Form E-Mail: E-Mail
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('6083130473180617250'));

        // Kontakt Form E-Mail: Telefon
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('1769388826830243300'));

        // Kontakt Form E-Mail: Unternehmen
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-7331168861055180150'));

        // Kontakt Form E-Mail: Position
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-5382078710932503710'));

        // Kontakt Form E-Mail: Ergänzende Informationen
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('2192384661115568360'));

        // Kontakt Form Telefon: Name
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-5935897334659677360'));

        // Kontakt Form Telefon: E-Mail
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-516519611847937850'));

        // Kontakt Form Telefon: Telefon
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('1421266559869014290'));

        // Kontakt Form Telefon: Unternehmen
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('4857124570916322630'));

        // Kontakt Form Telefon: Position
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-4253906166654901030'));

        // Kontakt Form Telefon: Ergänzende Informationen
            data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-7974035170674233580'));


    // // Rückmeldung
        data.customFields.customWizardFieldList.push(createCustomFieldTextfieldForAdd('-4526400345000751610'));




        

    $.ajax({
        url: apiBase  + 'educationRequest',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(() => {
        createBubbles();
        createConfetti();
        showNext(element);
    });

}

function createCustomFieldSelectForAdd(fieldId) {
    let value = $(`.${fieldId}`).find(':selected').val();
    return {
        type: 'de.avendoo.api.v1.common.ApiCustomWizardFieldSelect',
        fieldId: fieldId,
        selectKey: value
    };
}

function createCustomFieldTextfieldForAdd(fieldId, value = null) {
    if (value == null) {
        value = $(`.${fieldId}`).val();
    }
    return {
        type: 'de.avendoo.api.v1.common.ApiCustomWizardFieldText',
        fieldId: fieldId,
        text: value
    };
}


function createCustomFieldOptionForAdd(fieldId, value) {
    return {
        type: 'de.avendoo.api.v1.common.ApiCustomWizardFieldSelect',
        fieldId: fieldId,
        selectKey: value
    };
}


function createCustomFieldMultiselect(fieldId, values) {
    return {
        type: 'de.avendoo.api.v1.common.ApiCustomWizardFieldMultiselect',
        fieldId: fieldId,
        allKeys: values
    };
}


// // Function to load data in opened Request

function loadData() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('objectId');
    const apiBase = url.searchParams.get('base');

    $.ajax({
        url: `${apiBase}educationRequest/${id}`
    }).done(res => {

        // Titel/Thema
        $('input[name=question1]').val(res.title); // Avendoo Pflichtfelder  Abruf 
        $('input[name=question1]').attr('readonly', true);

        // Thema Kategorie
        fieldId = '-3547155663305458280';
        let currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");
        questionParent.find(".dropdownContainer input").val(currentText);
        $(`input.${fieldId}`).attr('readonly', true);

        // Inhalte (Beschreibung)
         $('textarea[name=question2]').val(res.description);
         $('textarea[name=question2]').attr('readonly', true);

        // Teilnehmerzahl
        fieldId = '-4268962273455824140';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`input.${fieldId}[type=range]`).val(parseInt(currentText));
        sliderLabel($(`input.${fieldId}[type=range]`));
        $(`input.${fieldId}`).addClass("pointerEventsNone");


        // Zielgruppe
        $('textarea[name=question4]').val(res.targetGroup);
        $('textarea[name=question4]').attr('readonly', true);
        
        // Ausgangslevel
        fieldId = '-5165470176262312330';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`button.${fieldId}`).parents(".inputWrapper");

        questionParent.find('button').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).trigger('click');
        $(`button.${fieldId}`).addClass("pointerEventsNone");

        // Ausganzslevel Zusatz
        fieldId = '401746071765203740';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`textarea.${fieldId}`).val(currentText);
        $(`textarea.${fieldId}`).attr('readonly', true);

        // Ziellevel
        fieldId = '-9022484519455170860';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`button.${fieldId}`).parents(".inputWrapper");

        questionParent.find('button').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).trigger('click');
        $(`button.${fieldId}`).addClass("pointerEventsNone");

        // Ziele
        $('textarea[name=question7_1]').val(res.learnTargets);

        var goals = $(".inputWrapperTextarea").find('textarea[name=question7_1]').val();
        var separateGoals = goals.split(',');

        for (var i = 0; i < separateGoals.length; i++) {
            var value = separateGoals[i];
            value = value.replaceAll(' ', '');
            $('<li class="inputListItem"><textarea name="question7" class="textarea check-answer question7" autocomplete="off" placeholder="Lernziel eingeben..." required="">'+ value +'</textarea></li>').appendTo('.inputWrapperTextarea ul');
        }

        $('textarea[name=question7_1]').siblings(".addButton").hide();
        $('textarea[name=question7_1]').siblings(".inputList").find(".inputListItem:first-child").hide();
    
        $('textarea[name=question7_1]').attr('readonly', true);
        $('textarea[name=question7_1]').siblings(".inputList").find('textarea').attr('readonly', true);
        
        // Abschluss Form
        fieldId = '-7927954973256555860';
        selectedMap = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectedMap;
        for (var key in selectedMap) {
            var value = selectedMap[key];
            if(value){
            $(`input[value='${key}']`).prop("checked", true);
            }
        }
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Weiterbildungsformat
        fieldId = '7782559299616829700';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        if (currentText && questionParent.find('input[name=checkbox1]').val() === currentText) {
        questionParent.find('input[name=checkbox1]').prop('checked', true);
        questionParent.find('.multipleButton').addClass('inactive');
        } else if (currentText) {
            questionParent.find('button').filter(function() {
                return $(this).text() === currentText;
            }).trigger('click');
        }
        $(`button.${fieldId}`).parent().addClass("pointerEventsNone");
        $(`button.${fieldId}`).parent().siblings(".checkboxList").addClass("pointerEventsNone");

        // Präsensz: Örtlichkeit
        fieldId = '-3660696668465634010';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Digital: Format
        fieldId = '-1160524995243098970';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Digital: 'Infrastruktur'
        fieldId = '-7198792838469751310';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Hybrid: Örtlichkeit
        fieldId = '-6857635318300007730';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Hybrid Format
        fieldId = '-2990874983264856780';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Hybrid Infrastruktur
        fieldId = '-4366418303564927030';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Dauer
        fieldId = '6890281787929000090';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        questionParent = $(`input.${fieldId}[type=number]`).parents(".inputWrapper");
        multipleButtonParent = $(`input.${fieldId}[type=number]`).parent().siblings();
        $(`input.${fieldId}[type=number]`).val(parseInt(currentText));
        questionParent.find(`input[type=range]`).val(parseInt(currentText));
        sliderLabel(questionParent.find(`input[type=range]`));

        if (currentText && questionParent.find('input[name=checkbox1]').val() === currentText) {
            questionParent.find('input[name=checkbox1]').prop('checked', true);
            questionParent.find('.rangeContainer').addClass('inactive');
            questionParent.find('.hourDayContainer').addClass('inactive');
        } else if (currentText) {
            const split = currentText.split(' ');
            $(`input.${fieldId}[type=number]`).val(split[0]);
            if (split[1] === 'Stunden') {
                multipleButtonParent.find(".buttonStart").trigger('click');
            } else {
                multipleButtonParent.find(".buttonEnd").trigger('click');
            }
        }

        $(`input.${fieldId}`).attr('readonly', true);
        questionParent.addClass("pointerEventsNone");

        // Durchführungszeitraum
        fieldId = '-812571589422049910';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`button.${fieldId}`).parents(".inputWrapper");
        $(`button.${fieldId}`).parent().addClass("pointerEventsNone");

        questionParent.find('button').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).trigger('click');

        // Durchführungszeitraum Ergänzung
        fieldId = '4035343967521199580';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`textarea.${fieldId}`).val(currentText);
        $(`textarea.${fieldId}`).attr('readonly', true);

        // Budget
        fieldId = '7293279947918769110';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");
        const split = currentText.split(' ');
        multipleButtonParent = $(`input.${fieldId}`).parent().siblings();

        $(`input.${fieldId}`).val(split[0]);
        questionParent.find(`input[type=range]`).val(split[0].replace(".",""));
        sliderLabel(questionParent.find(`input[type=range]`));

        if (currentText && questionParent.find('input[name=checkbox1]').val() === currentText) {
        questionParent.find('input[name=checkbox1]').prop('checked', true);
        questionParent.find('.rangeContainer').addClass('inactive');
        questionParent.find('.hourDayContainer').addClass('inactive');
        } else if (currentText) {
            const [value, type] = currentText.split(' ');
            multipleButtonParent.find(`button:contains('${type}')`).trigger('click');
            $(`input.${fieldId}`).val(value);
        }

        value = questionParent.find('input[name=checkbox1]').val();        
        if (!questionParent.find('input[name=checkbox1]').is(':checked')) {
            value = $(`input.${fieldId}`).val();
            if (multipleButtonParent.find('.active').hasClass('buttonStart')) {
                // buttonStart ist pro Person
                value = `${value} pro Person`;
            } else {
                // buttonEnd ist Insgesamt
                value = `${value} Insgesamt`;
            }
        }

        $(`input.${fieldId}`).attr('readonly', true);
        questionParent.addClass("pointerEventsNone");

        // Sprache
        fieldId = '5273801592987243770';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`textarea.${fieldId}`).val(currentText);

        var language = $(".selectWrapperTextarea").find(`textarea.${fieldId}`).val();
        var separateLanguage = language.split(',');
        console.log(separateLanguage);

        for (var j = 0; j < separateLanguage.length; j++) {
            var valueLang = separateLanguage[j];
            valueLang = valueLang.replaceAll(' ', '');
            $('<li class="inputListItem"><select class="dropdown check-answer select-add-input question19" name="question19" onclick="selectAddInput(this)"><option value="" disabled="" selected="" hidden="">' + valueLang + '</option><option value="Deutsch">Deutsch</option><option value="Englisch">Englisch</option><option value="Französisch">Französisch</option><option value="Italienisch">Italienisch</option><option value="Weitere" class="additionalInput">Weitere</option></select><div class="inputListItemArrow"><i class="iconArrow"></i></div></li>').appendTo('.selectWrapperTextarea ul');
        }
        
        // $(`textarea.${fieldId}`).show();
        $(`textarea.${fieldId}`).siblings(".addButton").hide();
        // $(`textarea.${fieldId}`).siblings(".inputList").hide();
        $(`textarea.${fieldId}`).siblings(".inputList").find(".inputListItem:first-child").hide();
        $(`textarea.${fieldId}`).siblings(".inputList").addClass("pointerEventsNone");

        // Besonderheiten
        fieldId = '-8310085781429795890';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`textarea.${fieldId}`).val(currentText);
        $(`textarea.${fieldId}`).attr('readonly', true);

        // Platzierung der Anfrage
        fieldId = '-399828778743522450';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`input.${fieldId}`).parents(".inputWrapper");

        questionParent.find('input').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).prop('checked', true);


        var secondRadio = questionParent.find(".radioItem:nth-child(2)").find(".radio");
        if (secondRadio.is(':checked')) {
            questionParent.find(".radioAdditionalWrapper").show();
        } 

        questionParent.removeClass("runRequiredDesign");
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Platzierung Anbieter
        fieldId = '-2930431412281367090';
        selectedMap = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectedMap;
        for (var key in selectedMap) {
            var value = selectedMap[key];
            if(value){
            $(`input[value='${key}']`).prop("checked", true);
            }
        }
        $(`input.${fieldId}`).parent().addClass("pointerEventsNone");

        // Kontakt Form
        fieldId = '-3565121280586418680';
        selectedId = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').selectKey;
        questionParent = $(`button.${fieldId}`).parents(".inputWrapper");

        questionParent.find('button').filter(function() {
            return $(this).attr('option_id') === selectedId;
        }).trigger('click');
        $(`button.${fieldId}`).addClass("pointerEventsNone");

            // Kontakt Form E-Mail: Name
            fieldId = '9005901207318568320';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form E-Mail: E-Mail
            fieldId = '6083130473180617250';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form E-Mail: Telefon
            fieldId = '1769388826830243300';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form E-Mail: Unternhemen
            fieldId = '-7331168861055180150';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form E-Mail: Position
            fieldId = '-5382078710932503710';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form E-Mail: Ergänzende Informationen
            fieldId = '2192384661115568360';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`textarea.${fieldId}`).val(currentText);
            $(`textarea.${fieldId}`).attr('readonly', true);

             // Kontakt Form Telefon: Name
             fieldId = '-5935897334659677360';
             currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
             $(`input.${fieldId}`).val(currentText);
             $(`input.${fieldId}`).attr('readonly', true);
 
             // Kontakt Form Telefon: E-Mail
             fieldId = '-516519611847937850';
             currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
             $(`input.${fieldId}`).val(currentText);
             $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form Telefon: Telefon
            fieldId = '1421266559869014290';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form Telefon: Unternhemen
            fieldId = '4857124570916322630';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form Telefon: Position
            fieldId = '-4253906166654901030';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`input.${fieldId}`).val(currentText);
            $(`input.${fieldId}`).attr('readonly', true);

            // Kontakt Form Telefon: Ergänzende Informationen
            fieldId = '-7974035170674233580';
            currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
            $(`textarea.${fieldId}`).val(currentText);
            $(`textarea.${fieldId}`).attr('readonly', true);

        // // Rückmeldung
        fieldId = '-4526400345000751610';
        currentText = res.customFields.customWizardFieldList.find(f => f.fieldHtmlId === fieldId + '_1').text; 
        $(`input.${fieldId}`).val(currentText);
        $(`input.${fieldId}`).attr('readonly', true);

    });
}
