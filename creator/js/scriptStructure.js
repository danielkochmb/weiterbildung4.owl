/* specific js code for structure page */




var structureSlideIncrement = 0;

$(document).ready(function () {

    // check structure header height
    if ($(window).width() < 1280) {
        switchStructureHeader();
    } 

    // conted card concept wrapper
    $("body").on("click", ".empty .conceptNew", function () {
        var sectionType = $(this).parents(".structureElement").attr("data-type");
        if (sectionType !== "practice-transfer" && sectionType !== "practice-self-learning" && sectionType !== "practice-project") {
            if ($(this).parents(".structureCard").find(".structureCardHeaderSelectPhase").attr("data-selected-phase") == "") {
                toast("danger", "Achtung!", "Wählen Sie zunächst eine Phase aus, um das Feinkonzept zu starten.");
                return
            }
        }
        $(this).parents(".structureCardBottom").removeClass("empty");
        $(this).siblings(".conceptWrapper").slideDown();
        $(this).siblings(".conceptCollapse").addClass("active");
    });

    $("body").on("click", ".conceptCollapse", function () {
        $(this).toggleClass("active");
        $(this).siblings(".conceptWrapper").slideToggle();
        if ($(this).siblings(".conceptWrapper").find(".conceptRow:not(.empty)").length <= 0) {
            $(this).parents(".structureCardBottom").addClass("empty");
        }
    });


    // concept card duration input
    $("body").on("input", ".inputOnlyNumbers", function () {
        $(this).val($(this).val().replace(/\D/g, ''));
    });




    /**
     * concept row functions
     */
    // concept row lightbox
    $("body").on("click", ".conceptButton", function () {

        // open lightbox to top, if bottom of screen
        var offset = $(this).offset();
        var posYBottom = offset.top - $(window).scrollTop() - $(window).innerHeight();
        if (posYBottom > -450) {
            $(this).parents(".conceptRow").addClass("lightboxTop");
        }

        var conceptType = $(this).attr("data-conceptType");

        // if (conceptType == "learningTargetFormulation" && $(this).parents(".conceptWrapper").find(".conceptLearningTargetLevel") ) {
        //     toast("danger", "Achtung!", "Wählen Sie zunächst eine Phase aus, um das Feinkonzept zu starten.");
        //     return
        // }


        getConceptRecommendations(this, conceptType);
        // getLearningTargetVerbData(this);

        $(this).toggleClass("active");
        $(this).siblings(".conceptRowLightbox").fadeToggle(200);
        $('.structureSlideButton').toggle();
        if ($(this).hasClass("active")) {
            $(this).parents(".conceptRow").addClass("activeLightbox");
        } else {
            var element = $(this);
            setTimeout(function () {
                $(element).parents(".conceptRow").removeClass("activeLightbox lightboxTop");
            }, 200);
        }
    });

    $("body").on("click", ".conceptRowLightboxInner .hasInfoButton", function () {
        getLearningTargetVerbData(this);
    });

    $("body").on("click", ".conceptRowLightboxBackground", function () {
        var conceptRow = $(this).parents(".conceptRow");
        closeConceptRowLightbox(conceptRow);
    });


    // learning target level 
    //// structure
    $("body").on("click", ".learningTargetLevelLink", function (e) {
        e.preventDefault();
        var level = $(this).attr("data-level");
        var text = $(this).find(".copy").text();
        var conceptRow = $(this).parents(".conceptRow");

        $(conceptRow).find(".conceptTitle").text("Stufe " + level + ":");
        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).attr("data-level", level);
        $(this).parents(".textInputBox").attr("data-level", level).removeClass("noLevel");
        $(conceptRow).removeClass("empty next");
        $(conceptRow).nextAll('.conceptRow:visible').first().addClass("next").removeClass("disabled");

        if (!$(conceptRow).hasClass("empty") && !$(conceptRow).siblings(".conceptRow.conceptSocialForm").hasClass("empty")) {
            $(conceptRow).siblings(".conceptRow.conceptMethods").addClass("next").removeClass("disabled");
        }

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });

    // data
    $("body").on("click", ".learningTargetLevelLinkData", function (e) {
        e.preventDefault();
        var level = $(this).attr("data-level");
        var text = $(this).find(".copy").text();
        var conceptRow = $(this).parents(".conceptRow");
        // var dataLearningTargetRow = $(this).parents(".dataLearningTargetRow");

        $(conceptRow).find(".conceptTitle").text("Stufe " + level); // hier Doppelpunkt rausgenommen
        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).attr("data-level", level);
        $(this).parents(".textInputBox").attr("data-level", level).removeClass("noLevel");
        $(conceptRow).removeClass("empty next");
        $(conceptRow).nextAll('.conceptRow:visible').first().addClass("next").removeClass("disabled");

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });


    // learning target formulation 
    $("body").on("change input", ".learningTargetFormulationText, .learningTargetSelect", function (e) {
        var formulationText = $(this).parents(".learningTargetFormulationInner").find(".learningTargetFormulationText").val();
        var targetSelect = $(this).parents(".learningTargetFormulationInner").find(".learningTargetSelect").val();
        if (formulationText === "") {
            $(this).parents(".learningTargetFormulationInner").find(".learningTargetFormulationText").addClass("empty");
        } else {
            $(this).parents(".learningTargetFormulationInner").find(".learningTargetFormulationText").removeClass("empty");
        }
        if (targetSelect === null) {
            $(this).parents(".learningTargetFormulationInner").find(".learningTargetSelect").addClass("empty");
        } else {
            $(this).parents(".learningTargetFormulationInner").find(".learningTargetSelect").removeClass("empty");
        }
        if (formulationText !== "" && targetSelect !== null) {
            $(this).parents(".conceptRowLightboxInner").find(".saveLearningTargetFormulation").removeClass("inactive");
        } else {
            $(this).parents(".conceptRowLightboxInner").find(".saveLearningTargetFormulation").addClass("inactive");
        }
    });

    $("body").on("click", ".saveLearningTargetFormulation", function (e) {
        var conceptRow = $(this).parents(".conceptRow");
        var learningTargetText = $(conceptRow).find(".learningTargetFormulationText").val();
        var learningTargetVerb = $(conceptRow).find(".learningTargetSelect").val();

        $(conceptRow).find(".conceptTitle").text("Lernzielformulierung:");
        $(conceptRow).find(".conceptContent").text("Die Teilnehmenden können " + learningTargetText + " " + learningTargetVerb);
        $(conceptRow).removeClass("empty next");
        $(conceptRow).nextAll('.conceptRow:visible').first().addClass("next");
        $(conceptRow).attr("data-formulation", learningTargetText);
        $(conceptRow).attr("data-verb", learningTargetVerb);

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });


    // method
    $("body").on("click", ".conceptMethodLink", function (e) {
        e.preventDefault();
        var text = $(this).text();
        var conceptRow = $(this).parents(".conceptRow");

        $(conceptRow).find(".conceptTitle").text("Methode:");
        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).removeClass("empty next");
        $(conceptRow).nextAll('.conceptRow:visible').first().addClass("next");
        $(conceptRow).attr("data-method", text);

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });


    // social form 
    $("body").on("click", ".conceptSocialFormLink", function (e) {
        e.preventDefault();
        var text = $(this).text();
        var form = $(this).attr("data-form");
        var conceptRow = $(this).parents(".conceptRow");

        $(conceptRow).find(".conceptTitle").text("Sozialform:");
        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).attr("data-socialForm", form);
        $(conceptRow).removeClass("empty next");

        if (!$(conceptRow).siblings(".conceptRow.conceptLearningTargetLevel").hasClass("empty") && !$(conceptRow).hasClass("empty")) {
            $(conceptRow).siblings(".conceptRow.conceptMethods").addClass("next").removeClass("disabled");
        }

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });

    // phase
    $("body").on("click", ".conceptPhaseLink", function (e) {
        e.preventDefault();
        var text = $(this).text();
        var phase = $(this).attr("data-phase");
        var conceptRow = $(this).parents(".conceptRow");

        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).attr("data-selected-phase", phase);
        $(conceptRow).removeClass("empty");

        $(this).parents(".structureCardHeader").siblings(".structureCardBottom").removeClass("conceptDisabled");

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });


    // task - old
    $("body").on("click", ".conceptTaskLink", function (e) {
        e.preventDefault();
        var text = $(this).text();
        var conceptRow = $(this).parents(".conceptRow");

        $(conceptRow).find(".conceptTitle").text("Aufgabe:");
        $(conceptRow).find(".conceptContent").text(text);
        $(conceptRow).removeClass("empty next");
        $(conceptRow).nextAll('.conceptRow:visible').first().addClass("next");

        // close lightbox
        closeConceptRowLightbox(conceptRow);
    });

    // task
    $("body").on("input", ".conceptTaskTextarea", function (e) {
        e.preventDefault();
        var text = $(this).val();
        var conceptRow = $(this).parents(".conceptRow");

        if ($.trim(text) == ""){
            $(conceptRow).addClass("empty")
        } else {
            $(conceptRow).find(".conceptTitle").text("Aufgabenstellung:");
            $(conceptRow).find(".conceptContent").text(text);
            $(conceptRow).removeClass("empty next");
        }
        saveStructure();
    });

    // info
    $("body").on("input", ".conceptInformationTextarea", function (e) {
        e.preventDefault();
        var text = $(this).val();
        var conceptRow = $(this).parents(".conceptRow");

        if ($.trim(text) == ""){
            $(conceptRow).addClass("empty")
        } else {
            $(conceptRow).find(".conceptTitle").text("Informationen:");
            $(conceptRow).find(".conceptContent").text(text);
            $(conceptRow).removeClass("empty next");
        }
        saveStructure();
    });


    // concept lightbox more accordion
    $("body").on("click", ".conceptRowLightboxMoreCollapse", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(this).siblings(".conceptRowLightboxMore").slideToggle();
    });


    // structure card delete
    $("body").on("click", ".structureCardDelete", function () {
        $(this).parents(".structureCard").remove();
        structureTimeCalculation();
    });

    //structure card copy
    $("body").on("click", ".structureCardCopy", function () {
        var copiedElement = $(this).parents('.structureCard').clone();
        $(this).parents('.structureCard').after(copiedElement);
        saveStructure();
    });


    // add structure dropdown
    $("body").on("click", ".secondaryButton", function () {
        $(this).toggleClass("active");
        $(this).siblings(".addStructureDropdown").fadeToggle(200);
    });


    // add structure part overlay
    $("body").on("click", ".addStructurePartContainer:not(.active) .addStructurePartInner", function () {
        $('.structureSlideButton').hide();
        $(this).parents('.addStructurePartContainer').addClass('active');
    });

    // close structure part overlay
    $("body").on("click", ".addStructurePartOverlay", function () {
        $('.structureSlideButton').show();
        $(this).parents('.addStructurePartContainer').removeClass('active');
    });

    // add container
    $("body").on("click", ".addStructureCard", function () {
        var cardType = $(this).attr("data-container-type");
        var sectionType = $(this).parents(".structureElement").attr("data-type");
        var container = {
            "type": cardType,
            "concept": {
                "isCreated": false,
            }
        };
        html = generateContainer(container, sectionType);
        if ($(this).parents('.addStructurePartContainer').siblings(".structureElementInner").length) {
            $(this).parents('.addStructurePartContainer').siblings(".structureElementInner").append(html);
        } else {
            $(this).parents(".structureCard").after(html);
        }
        $(this).parents('.addStructurePartContainer').removeClass('active');
        $('.structureSlideButton').show();
        initSortables(true);
    });


    // add section
    $("body").on("click", ".addSectionButton", function (event) {
        if ($(event.target).hasClass("infotextButton")) {
            return;
        }
        $(".addStructureElementButton.active").removeClass("active");
        $(".addStructureDropdown").hide();
        var type = $(this).attr("data-type");
        var section = {
            "id": 4,
            "title": "",
            "type": type,
            "duration": "",
            "container": []
        };

        html = generateSection(section);
        $(this).parents(".addStructureElement").before(html);
        changeOverlayOffset();
        initSortables(true);
    });

    // remove section
    $("body").on("click", ".structureElementDelete", function () {
        $("#deleteStructureElement").attr("data-section-id", $(this).parents(".structureElement").index());
        $("#deleteStructureElement").fadeIn(200).addClass("active");
    });



    // slide buttons
    $(".structureSlideButton").click(function () {
        var countStructureElements = $(".structureElement").length;

        if (!$(this).hasClass("inactive")) {

            $(".structureSlideButton").attr("disabled", "disabled");
            $(".structureHeaderSwitch").css("visibility", "hidden");

            if ($(this).hasClass("slideRight")) {
                structureSlideIncrement = structureSlideIncrement + 1;
            } else if ($(this).hasClass("slideLeft")) {
                structureSlideIncrement = structureSlideIncrement - 1;
            }

            if (structureSlideIncrement < 0) {
                structureSlideIncrement = 0;
                $(element).removeAttr("disabled");
            }

            if (structureSlideIncrement >= countStructureElements - 1) {
                structureSlideIncrement = countStructureElements - 1;
                $(".structureSlideButton.slideRight").addClass("inactive");
            } else {
                $(".structureSlideButton.slideRight").removeClass("inactive");
            }

            if (structureSlideIncrement == 0) {
                $("#structure").css("transform", "translate(0, 0)");
                $(".structureSlideButton.slideLeft").addClass("inactive");
            } else {
                if ($(window).width() < 1280) {
                    structureHeaderStylePadding = 60; 
                } else {
                    structureHeaderStylePadding = 100; 
                }
                $("#structure").css("transform", "translate(calc(var(--structureElementWidth) * -" + structureSlideIncrement + " - " + structureSlideIncrement * structureHeaderStylePadding + "px), 0)");
                $(".structureSlideButton.slideLeft").removeClass("inactive");
            }

            var element = $(this);

            if ($(window).width() < 1280) {
                var structureSlideOffset = 420;
            } else {
                var structureSlideOffset = 500;
            }
            $(".structureHeaderSwitch").css("left", structureSlideIncrement * structureSlideOffset + "px");
            $(".addStructurePartContainer .addStructurePartOverlay").css("left", structureSlideIncrement * structureSlideOffset + "px");

            setTimeout(function () {
                $(".structureSlideButton").removeAttr("disabled");
                $(".structureHeaderSwitch").css("visibility", "unset");
            }, 600);

        }
    });


    // input section title placeholder
    $("body").on("input", ".structureElementHeaderHeading", function () {
        if ($(this).text() !== "") {
            $(this).parents(".structureElementHeaderRow").removeClass("empty");
        } else {
            $(this).parents(".structureElementHeaderRow").addClass("empty");
        }
    });

    $("body").on("blur", ".structureElementHeaderHeading", function () {
        $(this).scrollLeft(0);
    });

    $(document).on('keydown', '.structureElementHeaderHeading', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });


    // input container title placeholder
    $("body").on("input", ".structureCardHeaderText", function () {
        if ($(this).text() !== "") {
            $(this).parents(".structureCardHeader").removeClass("empty");
        } else {
            $(this).parents(".structureCardHeader").addClass("empty");
        }
    });

    // input duration minutes
    $("body").on("input", ".structureCardHeaderDuration input", function () {
        if ($(this).val() == "") {
            $(this).addClass("empty");
        } else {
            $(this).removeClass("empty");
        }
    });

    // input starting time
    $("body").on("input", ".headerStartingTime input", function () {
        if ($(this).val() == "") {
            $(this).addClass("empty");
        } else {
            $(this).removeClass("empty");
        }
    });


    // content card edit lightbox e-learning
    $("body").on("click", ".contentCardEdit", function () {
        $("#moveLightbox.lightboxWrapper").fadeIn(200).addClass("active");
        var contentCardTitel = $(this).parents(".contentCard").find(".contentCardTitle").text();
        $(this).parents(".contentCard").addClass("inContentConceptEditMode");
        $("#moveLightbox.lightboxWrapper").find(".lightboxHeaderTitle").text(contentCardTitel);
        generateContentConcept($(this).parents(".contentCard"));
    });

    $("body").on("click", ".lightboxMovecontentSave", function () {
        saveStructure();
        $(".lightboxWrapper").fadeOut(200).removeClass("active");
        $(".contentCard").removeClass("inContentConceptEditMode");
    });


    // content
    // content lightbox button
    $("body").on("click", ".addContentCard, .addContentCardEmpty", function () {
        $("#contentLightbox.lightboxWrapper").fadeIn(200).addClass("active");
        $("#contentLightbox.lightboxWrapper .lightboxContentInsert").addClass("inactive");
        $("#contentLightbox.lightboxWrapper .lightboxContentInsert").attr("disabled", "disabled");
        var targetCard = $(this).parents(".structureCard");
        $(targetCard).addClass("targetCard");
    });

    $("body").on("click", ".lightboxBackground", function () {
        $(".lightboxWrapper").fadeOut(200).removeClass("active");
        $(".targetCard").removeClass("targetCard");
    });

    $("body").on("click", ".lightboxContentClose", function () {
        $(".lightboxWrapper").fadeOut(200).removeClass("active");
        $(".targetCard").removeClass("targetCard");
    });

    $("body").on("click", ".lightboxContentInsert", function () {
        $(".contentCardList .contentCard .checkboxItem input:checked").each(function (index) {
            $(this).parents(".contentCard").clone().appendTo($(".targetCard .structureCardContentInner"));
        });
        initSortables();
        $(".contentCardListColumn").find(".checkboxItem input").prop("checked", false);
        $(".targetCard").removeClass("noContent");

        $(".lightboxWrapper").fadeOut(200).removeClass("active");
        $(".targetCard").removeClass("targetCard");
    });

    $("body").on("click", ".cardListAddContentCard", function () {
        var content = "";
        html = generateContentCard(content);
        $(this).before(html);
        initSortables(true);
    });


    // content add cards
    $("body").on("click", ".addSmallContentCard", function () {
        addSmallContentCard($(this));
    });

    $("body").on("click", ".addBigContentCard", function () {
        addBigContentCard($(this));
    });

    // content create new content card on enter
    $(".contentCardWrapper").on("keydown", ".structureCardContentInner .contentCardTitle", function(event) {
        if (event.which === 13) {
            event.preventDefault(); 
            var nextAddSmallContentCard = $(this).parents(".structureCardContentInner").siblings(".addSmallContentCard");
            addSmallContentCard(nextAddSmallContentCard);
        }
    });
    $(".contentCardWrapper").on("keydown", ".bigContentCard .contentCardTitle", function(event) {
        if (event.which === 13) {
            event.preventDefault(); 
            var nextAddSmallContentCard = $(this).parents(".bigContentCard").siblings(".addSmallContentCard");
            addSmallContentCard(nextAddSmallContentCard);
        }
    });


    // content card functions
    $("body").on("click", ".contentCardDelete", function () {
        if ($(this).closest('#structure').length !== 0) {
            if ($(this).closest('.structureCard').find('.contentCard').length == 1) {
                $(this).closest('.structureCard').addClass('noContent');
            }
        }
        if ($(this).parents('.contentCard').hasClass('bigContentCard')) {
            deleteContentComments($(this).parents(".contentCard").attr("data-id"));
            $(this).parents('.contentCard').siblings('.structureCardContentInner').find('.contentCard').each(function() {
                deleteContentComments($(this).attr('data-id'));
            });
            if ($(this).parents('section').attr('id') === 'structure') {
                $(this).parents('.contentCard').remove();
            } else {
                $(this).parents('.contentCardListColumn').remove();
            }
        } else {
            deleteContentComments($(this).parents(".contentCard").attr("data-id")); 
            $(this).parents('.contentCard').remove();
        }
        initSortables(true);
    });

    $("body").on("click", ".contentCardCopy", function () {
        if ($(this).parents('.contentCard').hasClass('bigContentCard')) {
            var copiedElement = $(this).parents('.contentCardListColumn').clone();
            $(copiedElement).find(".ui-sortable").removeClass("ui-sortable");
            $(this).parents('.contentCardListColumn').after(copiedElement);
        } else {
            var copiedElement = $(this).parents('.contentCard').clone();
            $(this).parents('.contentCard').after(copiedElement);
        }
        initSortables(true);
        // countContentComments();
    });


    // content overview checkboxes - raus seit Umbau der Content Cards
    // $("body").on("input", ".bigContentCard .checkboxItem input", function () {
    //     if ($(this).is(':checked')) {
    //         $(this).parents(".contentCardListColumn").find(".checkboxItem input").prop("checked", true);
    //     } else {
    //         $(this).parents(".contentCardListColumn").find(".checkboxItem input").prop("checked", false);
    //     }
    // });

    // content structure lightbox close only when content cards selected
    $("body").on("input", ".contentCard .checkboxItem input", function () {
        var isContentCardChecked = false;
        $("#contentLightbox .contentCard").each( function() {
            if ($(this).find(".checkboxItem input").is(':checked')) {
                isContentCardChecked = true;
                return false;
            }
        });
        if (isContentCardChecked) {
            $("#contentLightbox .lightboxContentInsert").removeClass("inactive");
            $("#contentLightbox .lightboxContentInsert").removeAttr("disabled");
        } else {
            $("#contentLightbox .lightboxContentInsert").addClass("inactive");
            $("#contentLightbox .lightboxContentInsert").attr("disabled", "disabled");
        }
    });

    // content concept card functions
    $("body").on("input", ".contentCardTitle", function () {
        if ($(this).text() !== "") {
            $(this).parents(".contentCard").removeClass("empty");
        } else {
            $(this).parents(".contentCard").addClass("empty");
        }
    });

    $("body").on("click", ".contentConceptCard .contentCardDelete", function () {
        $(this).parents('.contentConceptCard').remove();
        initSortables(true);
    });

    $("body").on("click", ".contentConceptCard", function () {
        $('.contentConceptDropdown').not($(this).find('.contentConceptDropdown')).slideUp();
        $('.contentConceptCard').not($(this)).removeClass('activeContentConceptCard');
        $(this).find('.contentConceptDropdown').slideToggle();
        $(this).toggleClass("activeContentConceptCard");
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest('.contentConceptCard').length) {
            $('.contentConceptDropdown').slideUp();
            $('.contentConceptCard').removeClass('activeContentConceptCard');
        }
    });

    $("body").on("click", ".contentConceptDropdownItem", function () {
        var contentType = $(this).text();
        var cardTitle = $(this).parents(".contentConceptCard").find(".contentConceptCardTitle");
        if ($(this).hasClass("contentConceptSelected")) {
            $(this).removeClass("contentConceptSelected");
            cardTitle.addClass("contentConceptCardUnset");
            cardTitle.html("Inhaltstyp auswählen...");
        } else {
            $(this).parents(".contentConceptCard").find(".contentConceptDropdownItem").removeClass("contentConceptSelected");
            $(this).addClass("contentConceptSelected");
            cardTitle.removeClass("contentConceptCardUnset");
            cardTitle.html(contentType);
        }
    });

    $("body").on("click", ".addContentConceptCard", function () {
        html = `
        <div class="contentConceptCard">
            <div class="contentConceptCardIcon contentConceptCardDragIcon smallPadding ">
                <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                    <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
                </span>
            </div>
            <div class="contentConceptCardTitle contentConceptCardUnset">Inhaltstyp auswählen...</div>
            <div class="contentConceptCardIcon contentConceptCardSelectIcon smallPadding ">
                <span class="dooIconContainer dooContainerName-arrow-down userIcon">
                    <i class="dooIcon dooIcon-arrow-down dooIconSize-18"></i>
                </span>
            </div>
            <button type="button" title="Löschen" class="contentCardButton contentCardDelete smallPadding">
                <span class="dooIconContainer dooContainerName-trash userIcon">
                    <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                </span>
            </button>
            <div class="contentConceptDropdown">
                <div class="contentConceptDropdownRow firstDropdownRow">
                    <div class="contentConceptDropdownContainer">
                        <div class="contentConceptDropdownItem">Text</div>
                        <div class="contentConceptDropdownItem">Überschrift</div>
                        <div class="contentConceptDropdownItem">Überschrift mit Text</div>
                        <div class="contentConceptDropdownItem">Auflistung</div>
                        <div class="contentConceptDropdownItem">Sprechblase</div>
                        <div class="contentConceptDropdownItem">Notizzettel</div>
                    </div>

                    <div class="contentConceptDropdownContainer">
                        <div class="contentConceptDropdownItem">Bild</div>
                        <div class="contentConceptDropdownItem">Panorama</div>
                        <div class="contentConceptDropdownItem">Text mit Bild</div>
                        <div class="contentConceptDropdownItem">Text auf Hintergrund</div>
                        <div class="contentConceptDropdownItem">Bild-Slider</div>
                    </div>

                    <div class="contentConceptDropdownContainer">
                        <div class="contentConceptDropdownItem">Lokales Video</div>
                        <div class="contentConceptDropdownItem">Externes Video</div>
                        <div class="contentConceptDropdownItem">Audio</div>
                        <div class="contentConceptDropdownItem">PDF</div>
                    </div>
                </div>
                <div class="contentConceptDropdownRow secondDropdownRow">
                    <div class="contentConceptDropdownContainer">
                        <div class="contentConceptDropdownItem">Accordion</div>
                        <div class="contentConceptDropdownItem">Tab-Element</div>
                        <div class="contentConceptDropdownItem">Bild mit Hotspots</div>
                        <div class="contentConceptDropdownItem">Zeitstrahl</div>
                        <div class="contentConceptDropdownItem">Slider</div>
                        <div class="contentConceptDropdownItem">Lernkarte</div>
                        <div class="contentConceptDropdownItem">Bildvergleich</div>
                    </div>

                    <div class="contentConceptDropdownContainer">
                        <div class="contentConceptDropdownItem">Single/Multiple Choice-Frage</div>
                        <div class="contentConceptDropdownItem">Zuordnungs-Frage</div>
                        <div class="contentConceptDropdownItem">Bilder-Frage</div>
                        <div class="contentConceptDropdownItem">Lückentext-Frage</div>
                        <div class="contentConceptDropdownItem">Reihenfolge-Frage</div>
                        <div class="contentConceptDropdownItem">Schieberegler-Frage</div>
                    </div>
                </div>
            </div>
        </div>
        `;
        $(this).siblings(".contentConceptInner").append(html);
        initSortables(true);
    });


    // show time checkbox
    $("body").on("click", ".showTimeCheckbox", function () {
        if ($('.showTimeCheckbox input').prop('checked')) {
            $(".structureCardHeaderTime").removeClass("hiddenTime");
            $(".headerStartingTime").removeClass("hiddenTime");
        } else {
            $(".structureCardHeaderTime").addClass("hiddenTime");
            $(".headerStartingTime").addClass("hiddenTime");
        }
    });

    // show analysis mode
    var isAnalysis = getUrlParameter('analysis');
    if (isAnalysis === 'true') {
        var storageData = localStorage.getItem('NLCreatorAnalysis');
        if (storageData !== null) {
            var analysisJSON = JSON.parse(storageData);
            console.log("analysisJSON");
            console.log(analysisJSON);

            var analysisToast = `<div class="structureAnalysisContainer card">
                <div class="structureAnalysisHeader padding">
                    <h3 class="structureAnalysisTitle">Optimierungsvorschläge:</h3>
                    <button type="button" class="structureAnalysisMinimize" onclick="minimizeAnalysis();">
                        <span class="dooIconContainer dooContainerName-cancel">
                            <i class="dooIcon dooIcon-cancel dooIconSize-18"></i>
                        </span>
                    </button>
                </div>
                 <div class="structureAnalysisHeaderMini padding">
                    <p class="structureAnalysisTitle">Optimierungsvorschläge:</p>
                    <button type="button" class="structureAnalysisMinimize" onclick="minimizeAnalysis();">
                        <span class="dooIconContainer dooContainerName-bigview">
                            <i class="dooIcon dooIcon-bigview dooIconSize-18"></i>
                        </span>
                    </button>
                </div>
                <div class="structureAnalysisContent">`;

                for (i = 0; i < Object.keys(analysisJSON).length; i++) {
                    var recommendationId = Object.keys(analysisJSON)[i];
                    var canBeLocated = analysisJSON[recommendationId]['display'] ? 'canBeLocated' : '';

                    analysisToast += `<div class="structureAnalysisRecommendation ${canBeLocated}" analysis-index="${analysisJSON[recommendationId]['index']}" ${analysisJSON[recommendationId]['display'] ? 'onclick="getAnalysisIndexInStructure(this);' : ''}">
                        <div class="structureAnalysisRecommendationInner">
                            <div class="hex-container">
                                <div class="hex"></div>
                                <div class="hex-number">${analysisJSON[recommendationId]['index']}</div>
                            </div>
                            <div class="structureAnalysisRecommendationText">
                            ${analysisJSON[recommendationId]['text']}
                            </div>
                        </div>`;

                        if (analysisJSON[recommendationId]['display']) {
                            // analysisToast += `<div class="primaryButton small showRecommendation">Anzeigen</div>`;
                            analysisToast += `<span class="showRecommendation">In Struktur anzeigen</span>`;
                        }
                    analysisToast += `</div>`;
                }

            analysisToast += `</div>
            </div>
            `;
            $('#structure').parents('body').append(analysisToast);
        }
        $('#structure').addClass('analysisMode');
    }


    initSortables();

}); // document ready end






function closeConceptRowLightbox(conceptRow) {
    $(conceptRow).find(".conceptButton").removeClass("active");
    $(conceptRow).find(".conceptRowLightbox").fadeOut(200);
    $('.structureSlideButton').show();
    setTimeout(function () {
        $(conceptRow).removeClass("activeLightbox lightboxTop");
    }, 200);
}

// remove section
function removeStructureSection(element) {
    var sectionId = $(element).parents("#deleteStructureElement").attr("data-section-id");
    $(".structureElement").eq(sectionId).remove();
    saveStructure();
}


function initSortables(destroy) {
    if (destroy) {
        $(".ui-sortable").sortable("destroy");
    }

    /**
     * sortable structure card
     */

    $(".structureElementInner").sortable({
        placeholder: "card",
        tolerance: "pointer",
        handle: '.structureCardDrag ',
        cursor: 'grabbing',
        connectWith: ".structureElementInner",
        scroll: true,

        start: function (e, ui) {
            $(ui.placeholder).css("height", $(ui.item).innerHeight());
            $(".structureElementInner").addClass("active");
        },
        sort: function (event, ui) {
            $(".structureElementInner").sortable("refreshPositions");
        },
        stop: function (e, ui) {
            $(".structureElementInner").removeClass("active");
            saveStructure(); // save structureJSON to local storage
            structureTimeCalculation(); // calculate time
        }
    });


    /**
     * sortable content card
     */

    $(".structureCardContentInner").sortable({
        placeholder: "contentCard",
        tolerance: "pointer",
        handle: '.contentCardDragIcon',
        cursor: 'grabbing',
        connectWith: ".structureCardContentInner",

        start: function (e, ui) {
            const isBigCard = ui.item.attr("data-type") === "big";
            ui.placeholder.toggleClass("bigContentCard", isBigCard);
            $(".addContentCardEmpty").addClass("hide");
            $(".addContentCardColumn, .addSmallContentCard").hide(); // Gestrichelte Rahmen ausgeblendet beim Drag
            $(".contentCardColumns").addClass("activeSortable"); // min-height hinzufügen über +Unterthema, damit contentCard darüber eingefügt werden kann
        },
        sort: function (e, ui) {
            $(".structureCardContentInner").sortable("refreshPositions");
        },
        stop: function (e, ui) {
            ui.placeholder.removeClass("bigContentCard");
            if (ui.item.parents(".structureCardContentInner").find(".contentCard")) {
                $(".structureCardContentInner").each(function (index) {
                    if ($(this).find(".contentCard").length <= 0) {
                        $(this).parents(".structureCard ").addClass("noContent");
                    } else {
                        $(this).parents(".structureCard ").removeClass("noContent");
                    }
                });
                $(".addContentCardEmpty").removeClass("hide");
            }
            $(".addContentCardColumn, .addSmallContentCard").show(); // Gestrichelte Rahmen eingeblendet beim Drop
            $(".contentCardColumns").removeClass("activeSortable"); // min-height entfernen über +Unterthema, damit Abstände wieder passen
            saveStructure(); // save structureJSON to local storage
            saveContent(); // save contentJSON to local storage
        }
    });

    /**
     * sortable big content card
     */

    $(".contentCardColumns").sortable({
        placeholder: "contentCard bigContentCard",
        tolerance: "pointer",
        handle: '.contentCardDragIcon',
        cursor: 'grabbing',
        connectWith: ".contentCardColumns",

        start: function (e, ui) {
            $(".addContentCardEmpty").addClass("hide");
            $(".addContentCardColumn, .addSmallContentCard").hide(); // Gestrichelte Boxen ausgeblendet beim Drag
        },
        sort: function (event, ui) {
            $(".structureCardContentInner").sortable("refreshPositions");

            // Wenn Big Content Card bewegt wird und keine Unterthemen hat, dann soll der Strich ausgeblendet werden
            if (!$(this).children(".ui-sortable-helper").has(".contentCardInner .contentCard").length) {
                $(this).children(".contentCardListColumn").addClass("activeNoContentCard");
            } else {
                $(this).children(".contentCardListColumn").addClass("shortLine"); // Strich ragt nicht mehr über gelbe Karte hinaus
            }
        },
        stop: function (e, ui) {
            if (ui.item.parents(".structureCardContentInner").find(".contentCard")) {
                $(".structureCardContentInner").each(function (index) {
                    if ($(this).find(".contentCard").length <= 0) {
                        $(this).parents(".structureCard ").addClass("noContent");
                    } else {
                        $(this).parents(".structureCard ").removeClass("noContent");
                    }
                });
                $(".addContentCardEmpty").removeClass("hide");
            }
            $(".addContentCardColumn, .addSmallContentCard").show(); // Gestrichelte Rahmen eingeblendet beim Drop
            $(this).children(".contentCardListColumn").removeClass("activeNoContentCard"); // Verbindungslinie zwischen Karten wieder einblenden
            $(this).children(".contentCardListColumn").removeClass("shortLine");
            saveContent(); // save contentJSON to local storage
        }
    });

    /**
     * sortable content concept card
     */

    $(".contentConceptInner").sortable({
        placeholder: "contentConceptCard",
        tolerance: "pointer",
        handle: '.contentConceptCardDragIcon',
        cursor: 'grabbing',
        connectWith: ".contentConceptInner",

        start: function (e, ui) {
            $('.contentConceptDropdown').slideUp();
            $('.contentConceptCard').removeClass('activeContentConceptCard');
        },
        sort: function (event, ui) {
        },
        stop: function (e, ui) {
        }
    });
}




/**
 * content functions
 */

function addSmallContentCard(element, cardTitle, id = 0) {
    id = id === 0 ? getContentCardIndex() : id;
    var html = `<div class="contentCard ${cardTitle ? `` : 'empty'}" data-id="${id.toString().padStart(4, '0')}" data-type="small">
        <div class="contentCardIcon contentCardDragIcon smallPadding">
            <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
            </span>
        </div>
        <div class="contentCardIcon contentCardCheckbox smallPadding">
            <label class="checkboxItem"> 
                <input type="checkbox">
                <span></span> 
            </label>
        </div>
        <div class="contentCardTitle smallPadding" contenteditable="true">${cardTitle ? `${cardTitle}` : ''}</div>
        <div class="contentCardPlaceholder">Unterthema eingeben...</div>
        <button type="button" title="Kommentare" class="contentCardIcon contentCardCommentIcon smallPadding">
            <span class="numberOfComments"></span>
            <span class="dooIconContainer dooContainerName-community userIcon"> 
                <i class="dooIcon dooIcon-community dooIconSize-20"></i>
            </span>
        </button>
        <button type="button" title="Löschen" class="contentCardButton contentCardDelete smallPadding">
            <span class="dooIconContainer dooContainerName-trash userIcon">
                <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
            </span>
        </button>
        <button type="button" title="Duplizieren" class="contentCardButton contentCardCopy smallPadding">
            <span class="dooIconContainer dooContainerName-copy userIcon">
                <i class="dooIcon dooIcon-copy dooIconSize-16"></i>
            </span>
        </button>
        <button type="button" title="Bearbeiten" class="contentCardButton contentCardEdit smallPadding">
            <span class="dooIconContainer dooContainerName-edit userIcon">
                <i class="dooIcon dooIcon-edit dooIconSize-16"></i>
            </span>
        </button>
    </div>`;
    $(element).siblings('.structureCardContentInner').append(html);
    initSortables(true);
    countContentComments(id);
    $(element).siblings('.structureCardContentInner').find('.contentCard:last .contentCardTitle').focus();
    saveContent();
}

function addBigContentCard(element, cardTitle, id = 0) {
    id = id === 0 ? getContentCardIndex() : id;
    var html = `<div class="contentCardListColumn">
        <div class="contentCard bigContentCard ${cardTitle ? `` : 'empty'}" data-id="${id.toString().padStart(4, '0')}" data-type="big">
            <div class="contentCardIcon contentCardDragIcon smallPadding">
                <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                    <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
                </span>
            </div>
            <div class="contentCardIcon contentCardCheckbox smallPadding">
                <label class="checkboxItem">
                    <input type="checkbox">
                    <span></span>
                </label>
            </div>
            <div class="contentCardTitle smallPadding" contenteditable="true">${cardTitle ? `${cardTitle}` : ''}</div>
            <div class="contentCardPlaceholder">Thema eingeben...</div>
            <button type="button" title="Kommentare" class="contentCardIcon contentCardCommentIcon smallPadding">
                <span class="numberOfComments"></span>
                <span class="dooIconContainer dooContainerName-community userIcon">
                    <i class="dooIcon dooIcon-community dooIconSize-20"></i>
                </span>
            </button>
            <button type="button" title="Löschen" class="contentCardButton contentCardDelete smallPadding">
                <span class="dooIconContainer dooContainerName-trash userIcon">
                    <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                </span>
            </button>
            <button type="button" title="Duplizieren" class="contentCardButton contentCardCopy smallPadding">
                <span class="dooIconContainer dooContainerName-copy userIcon">
                    <i class="dooIcon dooIcon-copy dooIconSize-16"></i>
                </span>
            </button>
             <button type="button" title="Bearbeiten" class="contentCardButton contentCardEdit smallPadding">
                <span class="dooIconContainer dooContainerName-edit userIcon">
                    <i class="dooIcon dooIcon-edit dooIconSize-16"></i>
                </span>
            </button>
        </div>
        <div class="structureCardContentInner contentCardInner"></div>
        <button type="button" class="addSmallContentCard">+ Unterthema</button>
    </div>`;
    $(element).parents('.contentCardWrapper').find('.contentCardColumns').append(html);
    initSortables(true);
    countContentComments(id);
    $(element).parents('.contentCardWrapper').find('.contentCardColumns .contentCardListColumn:last .contentCardTitle').focus();
}




/**
 * structure concept recommendations
 */
function getConceptRecommendations(element, conceptType) {

    if (conceptType == "learningTargetFormulation") {
        var sectionType = $(element).parents(".structureElement").attr("data-type");
        var phase = $(element).parents(".structureCard").find(".structureCardHeaderSelectPhase").attr("data-selected-phase");
        var learningTargetLevel = $(element).parents(".conceptWrapper").find(".conceptLearningTargetLevel").attr("data-level");
        var learningTargetVerb = $(element).parents(".conceptWrapper").find(".conceptLearningTargetFormulation").attr("data-verb");
        var socialForm = $(element).parents(".conceptWrapper").find(".conceptSocialForm").attr("data-socialForm");

        var verbs = getLearningTargetVerb(sectionType, phase, learningTargetLevel, learningTargetVerb, socialForm);

        $(element).parents(".conceptRow").find(".learningTargetSelect").html("");
        var html = "";
        var empty = true;

        verbs.forEach(function (element) {
            if (element == learningTargetVerb) {
                html += '<option value="' + element + '" selected>' + element + '</option>';
                empty = false;
            } else {
                html += '<option value="' + element + '">' + element + '</option>';
            }
        });
        if (empty) {
            html = '<option value="" disabled="" selected="" hidden="">Verb (St. ' + learningTargetLevel + ') auswählen...</option>' + html;
        }

        $(element).parents(".conceptRow").find(".learningTargetSelect").html(html);
    }

    if (conceptType == "method") {
        var sectionType = $(element).parents(".structureElement").attr("data-type");
        var phase = $(element).parents(".structureCard").find(".structureCardHeaderSelectPhase").attr("data-selected-phase");
        var learningTargetLevel = $(element).parents(".conceptWrapper").find(".conceptLearningTargetLevel").attr("data-level");
        var learningTargetVerb = $(element).parents(".conceptWrapper").find(".conceptLearningTargetFormulation").attr("data-verb");
        var socialForm = $(element).parents(".conceptWrapper").find(".conceptSocialForm").attr("data-socialForm");

        var methods = getMethodRecommendation(sectionType, phase, learningTargetLevel, socialForm);

        if (typeof methods["recommendations"] !== 'undefined' && methods["recommendations"].length > 0) {
            $(element).parents(".conceptRow").find(".conceptRowLightboxInner").html("");
            var html = "";

            methods["recommendations"].forEach(function (recommendations, index) {
                html += '<div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink conceptMethodLink recommendation">' + methods["recommendations"][index] + '</a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="method' + methods["recommendations"][index] + '">?</button></div>';
            });

            if (typeof methods["suggestions"] !== 'undefined' && methods["suggestions"].length > 0) {
                html += '<a class=conceptRowLightboxMoreCollapse href=#>Weitere Methoden <span class="conceptCollapseArrow dooContainerName-toggle-down dooIconContainer userIcon"><i class="dooIcon dooIcon-toggle-down dooIconSize-12"></i></span></a>';

                html += '<div class="conceptRowLightboxMore">';
                methods["suggestions"].forEach(function (suggestions, index) {
                    html += '<div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink conceptMethodLink">' + methods["suggestions"][index] + '</a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="method' + methods["suggestions"][index] + '">?</button></div>';
                });
            }

            html += '</div>';

            $(element).parents(".conceptRow").find(".conceptRowLightboxInner").html(html);
        } else {
            toast("danger", "Keine Methodenvorschläge möglich!", "Es konnten keine Methodenvorschläge für diese Kombination generiert werden.");
        }
    }

}

// data function
function getLearningTargetVerbData(element) {
    var sectionType;
    var phase;
    var learningTargetLevel = $(element).find(".learningTargetLevelLinkData").attr("data-level");
    var learningTargetVerb;
    var socialForm;

    var verbs = getLearningTargetVerb(sectionType, phase, learningTargetLevel, learningTargetVerb, socialForm);
    console.log(verbs);

    $(element).parents(".conceptRow").siblings(".dropdownContainer").find("select.dropdown").html("");
    var html = "";
    var empty = true;

    verbs.forEach(function (element) {
        if (element == learningTargetVerb) {
            html += '<option value="' + element + '" selected=>' + element + '</option>';
            empty = false;
        } else {
            html += '<option value="' + element + '">' + element + '</option>';
        }
    });
    if (empty) {
        html = '<option value="" disabled="" selected="" hidden="">Verb (St. ' + learningTargetLevel + ') auswählen...</option>' + html;
    }

    $(element).parents(".conceptRow").siblings(".dropdownContainer").find("select.dropdown").html(html);
}

// learning target verb
function getLearningTargetVerb(sectionType, phase, learningTargetLevel, learningTargetFormulation, socialForm) {
    var verbs = [];
    switch (parseInt(learningTargetLevel)) {
        case 1:
            verbs = ["angeben", "aufführen", "auflisten", "aufschreiben", "aufzählen", "aufzeichnen", "ausführen", "benennen", "beschreiben", "bezeichnen", "darstellen", "finden", "kennen", "kopieren", "nachmachen", "nennen", "reproduzieren", "vervielfältigen", "vervollständigen", "zeichnen", "zeigen",];
            break;
        case 2:
            verbs = ["absetzen", "anfordern", "anordnen", "archivieren", "aufnehmen", "aufschreiben", "aufstellen", "beachten", "bedienen", "begründen", "berichten", "beschaffen", "beschreiben", "definieren", "deuten", "dokumentieren", "eingrenzen", "einhalten", "einordnen", "einrichten", "einsetzen", "einstellen", "erfassen", "erkennen", "erklären", "erläutern", "identifizieren", "illustrieren", "interpretieren", "kennzeichnen", "lagern", "messen", "nach Vorlage erstellen", "ordnen", "packen", "präzisieren", "schildern", "sortieren", "transportieren", "überblicken", "übergeben", "übernehmen","übersetzen", "übertragen", "umschreiben", "verdeutlichen", "vergleichen", "vervollständigen", "vor- und nachbehandeln", "vorbereiten", "wiedererkennen", "wiedergeben", "wiederholen", "zuordnen","zusammenfassen"];
            break;
        case 3:
            verbs = ["ableiten (Leitungen)", "abschätzen", "abtasten", "anfertigen", "anfertigen", "anknüpfen", "Annahmen treffen", "anpassen", "anschließen", "anwenden", "aufstellen", "ausführen", "ausrichten", "auswählen", "bauen", "befestigen", "begründen", "beheben", "berechnen", "bestimmen", "beweisen", "bilden", "bohren", "definieren", "demonstrieren", "demontieren", "diskutieren (Kommunikation)", "durchführen", "einordnen", "einweisen", "entsorgen", "entwerfen", "entwickeln", "erstellen", "fertigen", "formulieren", "generalisieren", "hämmern", "(Hypothesen) bilden", "illustrieren", "in Betrieb nehmen", "indizieren", "inspizieren", "installieren", "Instand setzen", "kalibrieren", "konstruieren", "kontrollieren", "korrigieren", "lösen", "mitwirken", "modifizieren", "montieren", "nachbehandeln", "nachbereiten", "organisieren", "planen", "produzieren", "programmieren", "prüfen", "quantifizieren", "realisieren", "recherchieren", "richten", "sägen", "schützen", "sichern", "sichtprüfen", "skizzieren", "spannen", "suchen", "testen", "trennen (Material)", "übersetzen", "umformen", "umschreiben", "umsetzen", "unterscheiden", "untersuchen", "verbinden", "verdeutlichen", "verdrahten", "verwalten", "verwenden", "vorbehandeln", "vorbereiten", "warten", "zeichnen", "zeigen", "zusammenbauen"];
            break;
        case 4:
            verbs = ["abgrenzen", "ableiten", "analysieren", "anpassen", "auflösen", "auswerten", "beschreiben", "charakterisieren", "darlegen", "differenzieren", "einkreisen", "erkennen", "gegenüberstellen", "gliedern", "herausstellen", "herleiten", "hinweisen", "identifizieren", "isolieren", "kategorisieren", "klären", "klassifizieren", "nachweisen", "präsentieren", "sich etw. vorstellen", "spezifizieren", "strukturieren", "veranlassen", "vergleichen", "verknüpfen", "zerlegen", "zuordnen"];
            break;
        case 5:
            verbs = ["abfassen", "abnehmen", "abschätzen", "abstimmen", "abwägen", "ausarbeiten", "auswählen", "auswerten", "berücksichtigen", "beurteilen", "bewerten", "definieren", "diskutieren (z.B. Ergebnisse)", "disponieren", "einleiten" ,"einschätzen", "erläutern", "ermessen", "evaluieren", "festlegen", "freigeben", "gewichten", "integrieren", "kombinieren", "konfigurieren", "koordinieren", "kritisieren", "messen", "modifizieren", "optimieren", "planen", "schlussfolgern", "steuern", "urteilen", "verfassen", "vergleichen", "vermitteln", "verteidigen", "werten", "zusammenstellen"];
            break;
        case 6:
            verbs = ["aufbauen", "aufstellen", "äußern", "designen", "entscheiden", "entwerfen", "entwickeln", "erfinden", "erforschen", "erstellen" ,"folgern", "generieren", "gestalten", "herstellen", "innovieren", "konstruieren", "managen", "prognostizieren", "prüfen", "qualifizieren", "rekombinieren", "spekulieren", "vertreten", "widerlegen"];
    }
    return verbs;
}


var methodRecommendations = [];
methodRecommendations["1"] = "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch";
methodRecommendations["1"]["suggestions"] = "";

methodRecommendations["2"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["3"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Brainwriting", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch", "Lebendige Statistik"];
methodRecommendations["4"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment", "Lebendige Statistik", "Vorstellungsrunde"];
methodRecommendations["5"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["6"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["7"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Brainwriting", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["8"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["9"] = ["Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["10"] = ["Murmelgruppen", "Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["11"] = ["Murmelgruppen", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["12"] = ["Diskussion", "Aufgabe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Experiment"];
methodRecommendations["13"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["14"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["15"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Brainwriting", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch", "Lebendige Statistik"];
methodRecommendations["16"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment", "Lebendige Statistik"];
methodRecommendations["17"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["18"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["19"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Brainwriting", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["20"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["21"] = ["Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["22"] = ["Murmelgruppen", "Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["23"] = ["Murmelgruppen", "Diskussion", "Aufgabe", "Übung", "Lehrgespräch", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["24"] = ["Diskussion", "Aufgabe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Experiment"];
methodRecommendations["25"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["26"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["27"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Kollegiale Fallberatung", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Lehrgespräch", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch", "Lebendige Statistik"];
methodRecommendations["28"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Übung", "Demonstration", "Der heiße Stuhl", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Lebendige Statistik"];
methodRecommendations["29"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["30"] = ["Murmelgruppen", "Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Planspiel", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["31"] = ["Galeriewalk", "Gruppenpuzzle", "Murmelgruppen", "Brainstorming", "Diskussion", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Portfolio", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["32"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Übung", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["33"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["34"] = ["Murmelgruppen", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["35"] = ["Galeriewalk", "Gruppenpuzzle", "Murmelgruppen", "Diskussion", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Der heiße Stuhl", "Planspiel", "Portfolio", "Rollenspiel", "Pro-Contra-Diskussion", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["36"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Kugellager", "Experiment"];
methodRecommendations["37"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["38"] = ["Murmelgruppen", "Brainstorming", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["39"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Aufgabe", "Kollegiale Fallberatung", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Lehrgespräch", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch", "Lebendige Statistik"];
methodRecommendations["40"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Übung", "Demonstration", "Der heiße Stuhl", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Lebendige Statistik"];
methodRecommendations["41"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["42"] = ["Murmelgruppen", "Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Planspiel", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["43"] = ["Galeriewalk", "Gruppenpuzzle", "Murmelgruppen", "Brainstorming", "Diskussion", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Portfolio", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["44"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Übung", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["45"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["46"] = ["Murmelgruppen", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["47"] = ["Galeriewalk", "Gruppenpuzzle", "Murmelgruppen", "Diskussion", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Der heiße Stuhl", "Planspiel", "Portfolio", "Rollenspiel", "Pro-Contra-Diskussion", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["48"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Kugellager", "Experiment"];
methodRecommendations["49"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["50"] = ["Murmelgruppen", "Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["51"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Lehrgespräch", "Rollenspiel", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["52"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["53"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["54"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["55"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["56"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Dilemmamethode", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["57"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["58"] = ["Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["59"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Kugellager", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["60"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Dilemmamethode", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Kugellager", "Experiment"];
methodRecommendations["61"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["62"] = ["Murmelgruppen", "Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["63"] = ["Murmelgruppen", "Brainstorming", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Lehrgespräch", "Rollenspiel", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["64"] = ["Brainstorming", "Diskussion", "Aufgabe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Vortrag", "Rollenspiel", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["65"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["66"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Portfolio", "Mindmapping", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["67"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Kugellager", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["68"] = ["Galeriewalk", "Gruppenpuzzle", "Brainstorming", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Dilemmamethode", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Kugellager", "Experiment"];
methodRecommendations["69"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["70"] = ["Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["71"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "World Cafe", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Kugellager", "Experiment", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["72"] = ["Galeriewalk", "Gruppenpuzzle", "Diskussion", "Aufgabe", "World Cafe", "Zukunftswerkstatt", "Lehrfilm/Realfilm", "Erklärfilm", "Fishbowl", "Peer-Teaching", "Demonstration", "Der heiße Stuhl", "Dilemmamethode", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Kugellager", "Experiment"];
methodRecommendations["73"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["74"] = ["Aufgabe"];
methodRecommendations["75"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["76"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["77"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["78"] = ["Aufgabe"];
methodRecommendations["79"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["80"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["81"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["82"] = ["Aufgabe"];
methodRecommendations["83"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["84"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["85"] = ["Klausur", "Prüfgespräch", "Präsentation", "Test"];
methodRecommendations["86"] = ["Prüfgespräch", "Demonstration", "Präsentation"];
methodRecommendations["87"] = ["Prüfgespräch", "Präsentation"];
methodRecommendations["88"] = ["Klausur", "Test"];
methodRecommendations["89"] = ["Klausur", "Prüfgespräch", "Fallstudie", "Hausarbeit", " Demonstration", "Portfolio", "Präsentation", "Test"];
methodRecommendations["90"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", "Portfolio", "Präsentation"];
methodRecommendations["91"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", " Präsentation"];
methodRecommendations["92"] = ["Klausur", "Test"];
methodRecommendations["93"] = ["Klausur", "Prüfgespräch", "Fallstudie", "Hausarbeit", " Demonstration", "Portfolio", "Präsentation", "Test"];
methodRecommendations["94"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", "Portfolio", "Präsentation"];
methodRecommendations["95"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", " Präsentation"];
methodRecommendations["96"] = ["Klausur", "Test"];
methodRecommendations["97"] = ["Brainstorming", "Aufgabe", "Lückentext", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["98"] = ["Brainstorming", "Aufgabe", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["99"] = ["Brainstorming", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["100"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment", "Vorstellungsrunde", "Diskussion"];
methodRecommendations["101"] = ["Brainstorming", "Aufgabe", "Lückentext", "Lehrgespräch", "Leittextmethode", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["102"] = ["Brainstorming", "Aufgabe", "Lehrgespräch", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["103"] = ["Brainstorming", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["104"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["105"] = ["Aufgabe", "Lückentext", "Lehrgespräch", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["106"] = ["Aufgabe", "Lehrgespräch", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["107"] = ["Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Poster-Methode", "Gespräch"];
methodRecommendations["108"] = ["Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Lehrgespräch", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Experiment"];
methodRecommendations["109"] = ["Brainstorming", "Aufgabe", "Lückentext", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["110"] = ["Brainstorming", "Aufgabe", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["111"] = ["Brainstorming", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["112"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["113"] = ["Brainstorming", "Aufgabe", "Lückentext", "Lehrgespräch", "Leittextmethode", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["114"] = ["Brainstorming", "Aufgabe", "Lehrgespräch", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["115"] = ["Brainstorming", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["116"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["117"] = ["Aufgabe", "Lückentext", "Lehrgespräch", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["118"] = ["Aufgabe", "Lehrgespräch", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["119"] = ["Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Poster-Methode", "Gespräch"];
methodRecommendations["120"] = ["Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Demonstration", "Lehrgespräch", "Vortrag", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Experiment"];
methodRecommendations["121"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["122"] = ["Brainstorming", "Aufgabe", "Übung", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["123"] = ["Brainstorming", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["124"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["125"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["126"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["127"] = ["Gruppenpuzzle", "Brainstorming", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["128"] = ["Gruppenpuzzle", "Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["129"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["130"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["131"] = ["Gruppenpuzzle", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Rollenspiel", "Pro-Contra-Diskussion", "Poster-Methode", "Gespräch"];
methodRecommendations["132"] = ["Gruppenpuzzle", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Experiment"];
methodRecommendations["133"] = ["Brainstorming", "Aufgabe", "Lückentext", "Übung", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["134"] = ["Brainstorming", "Aufgabe", "Übung", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["135"] = ["Brainstorming", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["136"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["137"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["138"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["139"] = ["Gruppenpuzzle", "Brainstorming", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["140"] = ["Gruppenpuzzle", "Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["141"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["142"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Planspiel", "Portfolio", "Strukturlegetechnik", "Poster-Methode", "Gespräch"];
methodRecommendations["143"] = ["Gruppenpuzzle", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Planspiel", "Rollenspiel", "Pro-Contra-Diskussion", "Poster-Methode", "Gespräch"];
methodRecommendations["144"] = ["Gruppenpuzzle", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Experiment"];
methodRecommendations["145"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["146"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Übung", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["147"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["148"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["149"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["150"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["151"] = ["Gruppenpuzzle", "Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["152"] = ["Gruppenpuzzle", "Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Dilemmamethode", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["153"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["154"] = ["Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["155"] = ["Gruppenpuzzle", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["156"] = ["Gruppenpuzzle", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Dilemmamethode", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Experiment"];
methodRecommendations["157"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Lückentext", "Übung", "Lehrgespräch", "Leittextmethode", "Quiz", "Mindmapping", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["158"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Übung", "Lehrgespräch", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["159"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Brainwriting", "Mindmapping", "Poster-Methode", "Gespräch"];
methodRecommendations["160"] = ["Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Vortrag", "Rollenspiel", "Quiz", "Digitale Live-Abfrage", "Präsentation", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["161"] = ["Brainstorming", "Fallstudie", "Aufgabe", "Beratung", "Lückentext", "Übung", "Leittextmethode", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["162"] = ["Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Mindmapping", "Strukturlegetechnik", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["163"] = ["Gruppenpuzzle", "Brainstorming", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Brainwriting", "Mindmapping", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["164"] = ["Gruppenpuzzle", "Brainstorming", "Aufgabe", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Dilemmamethode", "Vortrag", "Rollenspiel", "Digitale Live-Abfrage", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Brainwriting", "Mindmapping", "Experiment"];
methodRecommendations["165"] = ["Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Experiment", "Poster-Methode", "Gespräch"];
methodRecommendations["166"] = ["Planspiel", "Fallstudie", "Aufgabe", "Beratung", "Übung", "Portfolio", "Strukturlegetechnik", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["167"] = ["Gruppenpuzzle", "Planspiel", "Fallstudie", "Aufgabe", "Kollegiale Fallberatung", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Übung", "Der heiße Stuhl", "Rollenspiel", "Pro-Contra-Diskussion", "Poster-Methode", "Szenario-Methode", "Gespräch"];
methodRecommendations["168"] = ["Gruppenpuzzle", "Aufgabe", "Lehrfilm/Realfilm", "Erklärfilm", "Peer-Teaching", "Demonstration", "Dilemmamethode", "Vortrag", "Rollenspiel", "Präsentation", "Pro-Contra-Diskussion", "Podcast", "Experiment"];
methodRecommendations["169"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["170"] = ["Aufgabe"];
methodRecommendations["171"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["172"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["173"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["174"] = ["Aufgabe"];
methodRecommendations["175"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["176"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["177"] = ["Aufgabe", "schriftliches Feedback"];
methodRecommendations["178"] = ["Aufgabe"];
methodRecommendations["179"] = ["Aufgabe", "mündliches Feedback"];
methodRecommendations["180"] = ["Aufgabe", "Feedbackrunde", "mündliches Feedback", "Wrap-Up"];
methodRecommendations["181"] = ["Klausur", "Prüfgespräch", " Präsentation", "Test"];
methodRecommendations["182"] = ["Prüfgespräch", "Präsentation"];
methodRecommendations["183"] = ["Prüfgespräch", " Präsentation"];
methodRecommendations["184"] = ["Klausur", "Test"];
methodRecommendations["185"] = ["Klausur", "Prüfgespräch", "Fallstudie", "Hausarbeit", " Demonstration", "Portfolio", "Präsentation", "Test"];
methodRecommendations["186"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", "Portfolio", "Präsentation"];
methodRecommendations["187"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", " Präsentation"];
methodRecommendations["188"] = ["Klausur", "Test"];
methodRecommendations["189"] = ["Klausur", "Prüfgespräch", "Fallstudie", "Hausarbeit", " Demonstration", "Portfolio", "Präsentation", "Test"];
methodRecommendations["190"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", "Portfolio", "Präsentation"];
methodRecommendations["191"] = ["Prüfgespräch", "Planspiel", "Hausarbeit", " Präsentation"];
methodRecommendations["192"] = ["Klausur", "Test"];
methodRecommendations["193"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["194"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["195"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["196"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["197"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["198"] = ["Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["199"] = ["Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["200"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["201"] = ["Fallstudie", "Freitext Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["202"] = ["Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["203"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["204"] = ["Fallstudie", "Freitext Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["205"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["206"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["207"] = ["Fallstudie", "Freitext Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["208"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["209"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Screencast", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Lückentext", "Leittextmethode", "Podcast", "Flashcard-Aufgaben", "Mindmapping", "Brainwriting", "Strukturlegetechnik"];
methodRecommendations["210"] = ["Fallstudie", "Freitext Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Interaktive Inforgrafik", "Lehrfilm/Realfilm", "Erklärfilm", "Flash Frage", "Podcast", "Strukturlegetechnik"];
methodRecommendations["211"] = ["Freitext Feedbackfragen", "Ja/Nein Feedbackfragen", "Multiple Choice Feedbackfragen", "Priorisierungs Feedbackfragen", "Schieberegler Feedbackfragen", "Single Choice Feedbackfragen"];
methodRecommendations["212"] = ["Freitext Feedbackfragen", "Ja/Nein Feedbackfragen", "Multiple Choice Feedbackfragen", "Priorisierungs Feedbackfragen", "Schieberegler Feedbackfragen", "Single Choice Feedbackfragen"];
methodRecommendations["213"] = ["Freitext Feedbackfragen", "Ja/Nein Feedbackfragen", "Multiple Choice Feedbackfragen", "Priorisierungs Feedbackfragen", "Schieberegler Feedbackfragen", "Single Choice Feedbackfragen"];
methodRecommendations["214"] = ["Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Flash Frage", "Lückentext", "Flashcard-Aufgaben", "Test"];
methodRecommendations["215"] = ["Fallstudie", "Freitext Frage", "Ja/Nein Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Flash Frage", "Lückentext", "Flashcard-Aufgaben", "Test"];
methodRecommendations["216"] = ["Fallstudie", "Freitext Frage", "Multiple Choice Frage", "Single Choice Frage", "Reihenfolge Frage", "Audioaufgabe", "Dialog Frage", "Videoaufgabe", "Zuordnungsfragen", "Bild Frage", "Interaktive Frage", "Hotspotaufgabe", "Flash Frage", "Test"];

var methodSuggestions = [];
methodSuggestions["1"] = ["Brainwriting"];
methodSuggestions["2"] = ["Brainwriting", "Vorstellungsrunde"];
methodSuggestions["3"] = ["Kugellager", "Vorstellungsrunde"];
methodSuggestions["4"] = ["Murmelgruppen", "Kugellager"];
methodSuggestions["5"] = ["Strukturlegetechnik", "Brainwriting", "Fallstudie"];
methodSuggestions["6"] = ["Strukturlegetechnik", "Brainwriting", "Vorstellungsrunde", "Fallstudie"];
methodSuggestions["7"] = ["Strukturlegetechnik", "Präsentation", "Vorstellungsrunde", "Lebendige Statistik", "Fallstudie"];
methodSuggestions["8"] = ["Murmelgruppen", "Vorstellungsrunde", "Lebendige Statistik", "Fallstudie"];
methodSuggestions["9"] = ["Lückentext", "Strukturlegetechnik", "Fallstudie"];
methodSuggestions["10"] = ["Strukturlegetechnik", "Fallstudie"];
methodSuggestions["11"] = ["Präsentation", "Strukturlegetechnik", "Lebendige Statistik", "Fallstudie", "Demonstration"];
methodSuggestions["12"] = ["Murmelgruppen", "Lebendige Statistik", "Gallerywalk", "Gruppenpuzzle", "Der heiße Stuhl", "Pro-Contra-Diskussion", "Quiz", "Fallstudie"];
methodSuggestions["13"] = ["Brainwriting", "Strukturlegetechnik", "Fallstudie"];
methodSuggestions["14"] = ["Brainwriting", "Strukturlegetechnik", "Fallstudie"];
methodSuggestions["15"] = ["Strukturlegetechnik", "Fallstudie", "Präsentation", "Demonstration"];
methodSuggestions["16"] = ["Murmelgruppen", "Fallstudie", "Pro-Contra-Diskussion", "Gallerywalk", "Gruppenpuzzle"];
methodSuggestions["17"] = ["Brainwriting", "Strukturlegetechnik", "Portfolio"];
methodSuggestions["18"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["19"] = ["Beratung", "Strukturlegetechnik", "Präsentation", "Demonstration", "Beratung"];
methodSuggestions["20"] = ["Murmelgruppen"];
methodSuggestions["21"] = ["Brainwriting", "Strukturlegetechnik", "Portfolio", "Brainstorming", "Portfolio"];
methodSuggestions["22"] = ["Brainwriting", "Strukturlegetechnik", "Brainstorming"];
methodSuggestions["23"] = ["Beratung", "Strukturlegetechnik", "Präsentation", "Demonstration", "Beratung", "Brainstorming", "Brainwriting"];
methodSuggestions["24"] = ["Murmelgruppen", "Brainstorming", "Brainwriting"];
methodSuggestions["25"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["26"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["27"] = ["Strukturlegetechnik", "Präsentation", "Demonstration"];
methodSuggestions["28"] = ["Murmelgruppen", "Fallstudie", "Pro-Contra-Diskussion", "Gallerywalk", "Gruppenpuzzle"];
methodSuggestions["29"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["30"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["31"] = ["Beratung", "Strukturlegetechnik ", "Präsentation", "Demonstration", "Beratung", "Portfolio"];
methodSuggestions["32"] = ["Murmelgruppen"];
methodSuggestions["33"] = ["Brainwriting", "Strukturlegetechnik", "Brainstorming", "Mindmapping"];
methodSuggestions["34"] = ["Brainwriting", "Strukturlegetechnik", "Brainstorming", "Mindmapping"];
methodSuggestions["35"] = ["Beratung", "Strukturlegetechnik", "Präsentation", "Demonstration", "Portfolio", "Brainstorming", "Brainwriting", "Mindmapping"];
methodSuggestions["36"] = ["Murmelgruppen", "Brainstorming", "Brainwriting", "Mindmaping"];
methodSuggestions["37"] = ["Mündliches Feedback", "Demonstration"];
methodSuggestions["38"] = ["Mündliches Feedback", "Schriftliches Feedback"];
methodSuggestions["39"] = ["Feedbackrunde"];
methodSuggestions["40"] = ["Digitale Live-Abfrage"];
methodSuggestions["41"] = ["Mündliches Feedback", "Rollenspiel"];
methodSuggestions["42"] = ["Mündliches Feedback", "Schriftliches Feedback", "Rollenspiel", "Demonstration"];
methodSuggestions["43"] = ["Feedbackrunde", "Portfolio", "Rollenspiel"];
methodSuggestions["44"] = ["Digitale Live-Abfrage", "Planspiel"];
methodSuggestions["45"] = ["Mündliches Feedback", "Rollenspiel"];
methodSuggestions["46"] = ["Mündliches Feedback", "Schriftliches Feedback", "Rollenspiel", "Demonstration"];
methodSuggestions["47"] = ["Feedbackrunde", "Portfolio", "Rollenspiel"];
methodSuggestions["48"] = ["Digitale Live-Abfrage", "Planspiel"];
methodSuggestions["49"] = ["Brainwriting"];
methodSuggestions["50"] = ["Murmelgruppen", "Brainwriting", "Vorstellungsrunde", "Lückentext"];
methodSuggestions["51"] = ["Murmelgruppen", "Kugellager", "Vorstellungsrunde"];
methodSuggestions["52"] = ["Murmelgruppen", "Kugellager"];
methodSuggestions["53"] = ["Brainwriting", "Fallstudie"];
methodSuggestions["54"] = ["Murmelgruppen", "Lückentext", "Brainwriting", "Vorstellungsrunde", "Fallstudie", "Lückentext"];
methodSuggestions["55"] = ["Murmelgruppen", "Strukturlegetechnik", "Präsentation", "Vorstellungsrunde", "Fallstudie"];
methodSuggestions["56"] = ["Murmelgruppen", "Vorstellungsrunde", "Fallstudie"];
methodSuggestions["57"] = ["Fallstudie"];
methodSuggestions["58"] = ["Murmelgruppen", "Fallstudie"];
methodSuggestions["59"] = ["Murmelgruppen", "Präsentation", "Strukturlegetechnik", "Fallstudie", "Demonstration"];
methodSuggestions["60"] = ["Murmelgruppen", "Gallerywalk", "Gruppenpuzzle", "Pro-Contra-Diskussion", "Quiz", "Fallstudie"];
methodSuggestions["61"] = ["Brainwriting", "Strukturlegetechnik", "Fallstudie"];
methodSuggestions["62"] = ["Murmelgruppen", "Brainwriting", "Strukturlegetechnik", "Fallstudie", "Lückentext"];
methodSuggestions["63"] = ["Murmelgruppen", "Strukturlegetechnik", "Fallstudie", "Präsentation", "Demonstration"];
methodSuggestions["64"] = ["Murmelgruppen", "Fallstudie", "Pro-Contra-Diskussion", "Gallerywalk", "Gruppenpuzzle"];
methodSuggestions["65"] = ["Brainwriting"];
methodSuggestions["66"] = ["Murmelgruppen", "Brainwriting", "Lückentext"];
methodSuggestions["67"] = ["Beratung", "Murmelgruppen", "Strukturlegetechnik", "Diskussion", "Gallerywalk", "Kugellager", "Präsentation", "Demonstration"];
methodSuggestions["68"] = ["Murmelgruppen", "Gallerywalk", "Diskussion", "Kugellager"];
methodSuggestions["69"] = ["Brainwriting", "Brainstorming"];
methodSuggestions["70"] = ["Murmelgruppen", "Brainstorming", "Brainstorming"];
methodSuggestions["71"] = ["Beratung", "Murmelgruppen", "Strukturlegetechnik", "Diskussion", "Gallerywalk", "Kugellager", "Präsentation", "Demonstration", "Brainwriting", "Brainstorming"];
methodSuggestions["72"] = ["Murmelgruppen", "Gallerywalk", "Diskussion", "Kugellager", "Brainwriting", "Brainstorming"];
methodSuggestions["73"] = ["Brainwriting", "Strukturlegetechnik"];
methodSuggestions["74"] = ["Murmelgruppen", "Brainwriting", "Strukturlegetechnik", "Lückentext"];
methodSuggestions["75"] = ["Murmelgruppen", "Strukturlegetechnik", "Präsentation", "Demonstration"];
methodSuggestions["76"] = ["Murmelgruppen", "Fallstudie", "Pro-Contra-Diskussion", "Gallerywalk", "Gruppenpuzzle"];
methodSuggestions["77"] = ["Brainwriting"];
methodSuggestions["78"] = ["Murmelgruppen", "Brainwriting", "Lückentext"];
methodSuggestions["79"] = ["Beratung", "Murmelgruppen", "Strukturlegetechnik", "Diskussion", "Gallerywalk", "Kugellager", "Präsentation", "Demonstration", "Portfolio"];
methodSuggestions["80"] = ["Murmelgruppen", "Gallerywalk", "Diskussion", "Kugellager"];
methodSuggestions["81"] = ["Brainwriting", "Brainstorming", "Mindmapping"];
methodSuggestions["82"] = ["Murmelgruppen", "Brainwriting", "Brainstorming", "Mindmapping"];
methodSuggestions["83"] = ["Beratung", "Murmelgruppen", "Strukturlegetechnik", "Diskussion", "Gallerywalk", "Kugellager", "Präsentation", "Demonstration", "Brainwriting", "Brainstorming", "Mindmapping"];
methodSuggestions["84"] = ["Murmelgruppen", "Gallerywalk", "Diskussion", "Kugellager", "Brainwriting", "Brainstorming", "Mindmapping"];
methodSuggestions["85"] = ["Mündliches Feedback", "Demonstration"];
methodSuggestions["86"] = ["Mündliches Feedback", "Schriftliches Feedback"];
methodSuggestions["87"] = ["Feedbackrunde"];
methodSuggestions["88"] = ["Digitale Live-Abfrage"];
methodSuggestions["89"] = ["Mündliches Feedback", "Rollenspiel"];
methodSuggestions["90"] = ["Mündliches Feedback", "Schriftliches Feedback", "Rollenspiel", "Demonstration"];
methodSuggestions["91"] = ["Feedbackrunde", "Portfolio", "Rollenspiel"];
methodSuggestions["92"] = ["Digitale Live-Abfrage", "Planspiel"];
methodSuggestions["93"] = ["Mündliches Feedback", "Rollenspiel"];
methodSuggestions["94"] = ["Mündliches Feedback", "Schriftliches Feedback", "Rollenspiel", "Demonstration"];
methodSuggestions["95"] = ["Feedbackrunde", "Portfolio", "Rollenspiel"];
methodSuggestions["96"] = ["Digitale Live-Abfrage", "Planspiel"];



// method recommendations
function getMethodRecommendation(sectionType, phase, learningTargetLevel, socialForm) {
    console.log("Methoden für: " + sectionType + ", " + phase + ", Level " + learningTargetLevel + ", " + socialForm);
    var methods = [];

    // Typ: Präsenz
    if (sectionType == "presence-seminar") {

        // Phase: Einführung
        if (phase == "introduction") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["1"]; methods["suggestions"] = methodSuggestions["1"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["2"]; methods["suggestions"] = methodSuggestions["2"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["3"]; methods["suggestions"] = methodSuggestions["3"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["4"]; methods["suggestions"] = methodSuggestions["4"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["5"]; methods["suggestions"] = methodSuggestions["5"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["6"]; methods["suggestions"] = methodSuggestions["6"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["7"]; methods["suggestions"] = methodSuggestions["7"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["8"]; methods["suggestions"] = methodSuggestions["8"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["9"]; methods["suggestions"] = methodSuggestions["9"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["10"]; methods["suggestions"] = methodSuggestions["10"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["11"]; methods["suggestions"] = methodSuggestions["11"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["12"]; methods["suggestions"] = methodSuggestions["12"]; }

            // Phase: Motivation
        } else if (phase == "motivation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["13"]; methods["suggestions"] = methodSuggestions["1"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["14"]; methods["suggestions"] = methodSuggestions["2"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["15"]; methods["suggestions"] = methodSuggestions["3"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["16"]; methods["suggestions"] = methodSuggestions["4"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["17"]; methods["suggestions"] = methodSuggestions["5"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["18"]; methods["suggestions"] = methodSuggestions["6"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["19"]; methods["suggestions"] = methodSuggestions["7"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["20"]; methods["suggestions"] = methodSuggestions["8"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["21"]; methods["suggestions"] = methodSuggestions["9"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["22"]; methods["suggestions"] = methodSuggestions["10"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["23"]; methods["suggestions"] = methodSuggestions["11"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["24"]; methods["suggestions"] = methodSuggestions["12"]; }

            // Phase: Erarbeitung
        } else if (phase == "elaboration") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["25"]; methods["suggestions"] = methodSuggestions["13"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["26"]; methods["suggestions"] = methodSuggestions["14"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["27"]; methods["suggestions"] = methodSuggestions["15"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["28"]; methods["suggestions"] = methodSuggestions["16"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["29"]; methods["suggestions"] = methodSuggestions["17"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["30"]; methods["suggestions"] = methodSuggestions["18"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["31"]; methods["suggestions"] = methodSuggestions["19"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["32"]; methods["suggestions"] = methodSuggestions["20"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["33"]; methods["suggestions"] = methodSuggestions["21"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["34"]; methods["suggestions"] = methodSuggestions["22"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["35"]; methods["suggestions"] = methodSuggestions["23"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["36"]; methods["suggestions"] = methodSuggestions["24"]; }

            // Phase: Festigung
        } else if (phase == "consolidation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["37"]; methods["suggestions"] = methodSuggestions["13"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["38"]; methods["suggestions"] = methodSuggestions["14"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["39"]; methods["suggestions"] = methodSuggestions["15"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["40"]; methods["suggestions"] = methodSuggestions["16"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["41"]; methods["suggestions"] = methodSuggestions["17"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["42"]; methods["suggestions"] = methodSuggestions["18"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["43"]; methods["suggestions"] = methodSuggestions["19"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["44"]; methods["suggestions"] = methodSuggestions["20"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["45"]; methods["suggestions"] = methodSuggestions["21"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["46"]; methods["suggestions"] = methodSuggestions["22"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["47"]; methods["suggestions"] = methodSuggestions["23"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["48"]; methods["suggestions"] = methodSuggestions["24"]; }

            // Phase: Anwendung
        } else if (phase == "application") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["49"]; methods["suggestions"] = methodSuggestions["25"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["50"]; methods["suggestions"] = methodSuggestions["26"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["51"]; methods["suggestions"] = methodSuggestions["27"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["52"]; methods["suggestions"] = methodSuggestions["28"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["53"]; methods["suggestions"] = methodSuggestions["29"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["54"]; methods["suggestions"] = methodSuggestions["30"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["55"]; methods["suggestions"] = methodSuggestions["31"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["56"]; methods["suggestions"] = methodSuggestions["32"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["57"]; methods["suggestions"] = methodSuggestions["33"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["58"]; methods["suggestions"] = methodSuggestions["34"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["59"]; methods["suggestions"] = methodSuggestions["35"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["60"]; methods["suggestions"] = methodSuggestions["36"]; }

            // Phase: Transfer
        } else if (phase == "transfer") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["61"]; methods["suggestions"] = methodSuggestions["25"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["62"]; methods["suggestions"] = methodSuggestions["26"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["63"]; methods["suggestions"] = methodSuggestions["27"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["64"]; methods["suggestions"] = methodSuggestions["28"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["65"]; methods["suggestions"] = methodSuggestions["29"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["66"]; methods["suggestions"] = methodSuggestions["30"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["67"]; methods["suggestions"] = methodSuggestions["31"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["68"]; methods["suggestions"] = methodSuggestions["32"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["69"]; methods["suggestions"] = methodSuggestions["33"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["70"]; methods["suggestions"] = methodSuggestions["34"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["71"]; methods["suggestions"] = methodSuggestions["35"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["72"]; methods["suggestions"] = methodSuggestions["36"]; }

            // Phase: Abschluss
        } else if (phase == "completion") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["73"]; methods["suggestions"] = methodSuggestions["37"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["74"]; methods["suggestions"] = methodSuggestions["38"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["75"]; methods["suggestions"] = methodSuggestions["39"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["76"]; methods["suggestions"] = methodSuggestions["40"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["77"]; methods["suggestions"] = methodSuggestions["41"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["78"]; methods["suggestions"] = methodSuggestions["42"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["79"]; methods["suggestions"] = methodSuggestions["43"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["80"]; methods["suggestions"] = methodSuggestions["44"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["81"]; methods["suggestions"] = methodSuggestions["45"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["82"]; methods["suggestions"] = methodSuggestions["46"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["83"]; methods["suggestions"] = methodSuggestions["47"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["84"]; methods["suggestions"] = methodSuggestions["48"]; }

            // Phase: Prüfung
        } else if (phase == "examination") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["85"]; methods["suggestions"] = methodSuggestions["37"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["86"]; methods["suggestions"] = methodSuggestions["38"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["87"]; methods["suggestions"] = methodSuggestions["39"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["88"]; methods["suggestions"] = methodSuggestions["40"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["89"]; methods["suggestions"] = methodSuggestions["41"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["90"]; methods["suggestions"] = methodSuggestions["42"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["91"]; methods["suggestions"] = methodSuggestions["43"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["92"]; methods["suggestions"] = methodSuggestions["44"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["93"]; methods["suggestions"] = methodSuggestions["45"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["94"]; methods["suggestions"] = methodSuggestions["46"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["95"]; methods["suggestions"] = methodSuggestions["47"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["96"]; methods["suggestions"] = methodSuggestions["48"]; }

        }

        // Typ: Live-Online
    } else if (sectionType == "live-seminar") {

        // Phase: Einführung
        if (phase == "introduction") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["97"]; methods["suggestions"] = methodSuggestions["49"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["98"]; methods["suggestions"] = methodSuggestions["50"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["99"]; methods["suggestions"] = methodSuggestions["51"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["100"]; methods["suggestions"] = methodSuggestions["52"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["101"]; methods["suggestions"] = methodSuggestions["53"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["102"]; methods["suggestions"] = methodSuggestions["54"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["103"]; methods["suggestions"] = methodSuggestions["55"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["104"]; methods["suggestions"] = methodSuggestions["56"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["105"]; methods["suggestions"] = methodSuggestions["57"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["106"]; methods["suggestions"] = methodSuggestions["58"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["107"]; methods["suggestions"] = methodSuggestions["59"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["108"]; methods["suggestions"] = methodSuggestions["60"]; }

            // Phase: Motivation
        } else if (phase == "motivation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["109"]; methods["suggestions"] = methodSuggestions["49"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["110"]; methods["suggestions"] = methodSuggestions["50"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["111"]; methods["suggestions"] = methodSuggestions["51"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["112"]; methods["suggestions"] = methodSuggestions["52"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["113"]; methods["suggestions"] = methodSuggestions["53"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["114"]; methods["suggestions"] = methodSuggestions["54"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["115"]; methods["suggestions"] = methodSuggestions["55"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["116"]; methods["suggestions"] = methodSuggestions["56"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["117"]; methods["suggestions"] = methodSuggestions["57"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["118"]; methods["suggestions"] = methodSuggestions["58"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["119"]; methods["suggestions"] = methodSuggestions["59"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["120"]; methods["suggestions"] = methodSuggestions["60"]; }

            // Phase: Erarbeitung
        } else if (phase == "elaboration") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["121"]; methods["suggestions"] = methodSuggestions["61"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["122"]; methods["suggestions"] = methodSuggestions["62"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["123"]; methods["suggestions"] = methodSuggestions["63"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["124"]; methods["suggestions"] = methodSuggestions["64"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["125"]; methods["suggestions"] = methodSuggestions["65"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["126"]; methods["suggestions"] = methodSuggestions["66"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["127"]; methods["suggestions"] = methodSuggestions["67"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["128"]; methods["suggestions"] = methodSuggestions["68"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["129"]; methods["suggestions"] = methodSuggestions["69"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["130"]; methods["suggestions"] = methodSuggestions["70"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["131"]; methods["suggestions"] = methodSuggestions["71"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["132"]; methods["suggestions"] = methodSuggestions["72"]; }

            // Phase: Festigung
        } else if (phase == "consolidation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["133"]; methods["suggestions"] = methodSuggestions["61"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["134"]; methods["suggestions"] = methodSuggestions["62"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["135"]; methods["suggestions"] = methodSuggestions["63"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["136"]; methods["suggestions"] = methodSuggestions["64"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["137"]; methods["suggestions"] = methodSuggestions["65"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["138"]; methods["suggestions"] = methodSuggestions["66"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["139"]; methods["suggestions"] = methodSuggestions["67"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["140"]; methods["suggestions"] = methodSuggestions["68"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["141"]; methods["suggestions"] = methodSuggestions["69"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["142"]; methods["suggestions"] = methodSuggestions["70"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["143"]; methods["suggestions"] = methodSuggestions["71"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["144"]; methods["suggestions"] = methodSuggestions["72"]; }

            // Phase: Anwendung
        } else if (phase == "application") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["145"]; methods["suggestions"] = methodSuggestions["73"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["146"]; methods["suggestions"] = methodSuggestions["74"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["147"]; methods["suggestions"] = methodSuggestions["75"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["148"]; methods["suggestions"] = methodSuggestions["76"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["149"]; methods["suggestions"] = methodSuggestions["77"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["150"]; methods["suggestions"] = methodSuggestions["78"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["151"]; methods["suggestions"] = methodSuggestions["79"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["152"]; methods["suggestions"] = methodSuggestions["80"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["153"]; methods["suggestions"] = methodSuggestions["81"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["154"]; methods["suggestions"] = methodSuggestions["82"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["155"]; methods["suggestions"] = methodSuggestions["83"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["156"]; methods["suggestions"] = methodSuggestions["84"]; }

            // Phase: Transfer
        } else if (phase == "transfer") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["157"]; methods["suggestions"] = methodSuggestions["73"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["158"]; methods["suggestions"] = methodSuggestions["74"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["159"]; methods["suggestions"] = methodSuggestions["75"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["160"]; methods["suggestions"] = methodSuggestions["76"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["161"]; methods["suggestions"] = methodSuggestions["77"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["162"]; methods["suggestions"] = methodSuggestions["78"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["163"]; methods["suggestions"] = methodSuggestions["79"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["164"]; methods["suggestions"] = methodSuggestions["80"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["165"]; methods["suggestions"] = methodSuggestions["81"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["166"]; methods["suggestions"] = methodSuggestions["82"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["167"]; methods["suggestions"] = methodSuggestions["83"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["168"]; methods["suggestions"] = methodSuggestions["84"]; }

            // Phase: Abschluss
        } else if (phase == "completion") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["169"]; methods["suggestions"] = methodSuggestions["85"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["170"]; methods["suggestions"] = methodSuggestions["86"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["171"]; methods["suggestions"] = methodSuggestions["87"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["172"]; methods["suggestions"] = methodSuggestions["88"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["173"]; methods["suggestions"] = methodSuggestions["89"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["174"]; methods["suggestions"] = methodSuggestions["90"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["175"]; methods["suggestions"] = methodSuggestions["91"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["176"]; methods["suggestions"] = methodSuggestions["92"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["177"]; methods["suggestions"] = methodSuggestions["93"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["178"]; methods["suggestions"] = methodSuggestions["94"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["179"]; methods["suggestions"] = methodSuggestions["95"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["180"]; methods["suggestions"] = methodSuggestions["96"]; }

            // Phase: Prüfung
        } else if (phase == "examination") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "single") { methods["recommendations"] = methodRecommendations["181"]; methods["suggestions"] = methodSuggestions["85"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["182"]; methods["suggestions"] = methodSuggestions["86"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "group") { methods["recommendations"] = methodRecommendations["183"]; methods["suggestions"] = methodSuggestions["87"]; }
            else if ((learningTargetLevel == "1" || learningTargetLevel == "2") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["184"]; methods["suggestions"] = methodSuggestions["88"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "single") { methods["recommendations"] = methodRecommendations["185"]; methods["suggestions"] = methodSuggestions["89"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["186"]; methods["suggestions"] = methodSuggestions["90"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "group") { methods["recommendations"] = methodRecommendations["187"]; methods["suggestions"] = methodSuggestions["91"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["188"]; methods["suggestions"] = methodSuggestions["92"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "single") { methods["recommendations"] = methodRecommendations["189"]; methods["suggestions"] = methodSuggestions["93"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "partner") { methods["recommendations"] = methodRecommendations["190"]; methods["suggestions"] = methodSuggestions["94"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "group") { methods["recommendations"] = methodRecommendations["191"]; methods["suggestions"] = methodSuggestions["95"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6") && socialForm == "plenum") { methods["recommendations"] = methodRecommendations["192"]; methods["suggestions"] = methodSuggestions["96"]; }

        }

        // Typ: E-Learning
    } else if (sectionType == "elearning") {

        // Phase: Einführung
        if (phase == "introduction") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["193"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["194"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["195"]; }

            // Phase: Motivation
        } else if (phase == "motivation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["196"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["197"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["198"]; }

            // Phase: Erarbeitung
        } else if (phase == "elaboration") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["199"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["200"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["201"]; }

            // Phase: Festigung
        } else if (phase == "consolidation") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["202"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["203"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["204"]; }

            // Phase: Anwendung
        } else if (phase == "application") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["205"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["206"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["207"]; }

            // Phase: Transfer
        } else if (phase == "transfer") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["208"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["209"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["210"]; }

            // Phase: Abschluss
        } else if (phase == "completion") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["211"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["212"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["213"]; }

            // Phase: Prüfung
        } else if (phase == "examination") {
            if ((learningTargetLevel == "1" || learningTargetLevel == "2")) { methods["recommendations"] = methodRecommendations["214"]; }
            else if ((learningTargetLevel == "3" || learningTargetLevel == "4")) { methods["recommendations"] = methodRecommendations["215"]; }
            else if ((learningTargetLevel == "5" || learningTargetLevel == "6")) { methods["recommendations"] = methodRecommendations["216"]; }

        }

    } else { methods["recommendations"] = ["Diskussion", "Aufgabe"]; methods["suggestions"] = []; }

    if (methods["recommendations"]) {
        methods["recommendations"].sort();
    }
    
    console.log (methods);
    return methods;
}


// check if data and structure have the same setting
var rawStructureInformation;

function checkIfDataStructureEqual() {
    var currentStorageData = localStorage.getItem("NLCreatorData");
    var currentStorageStructure = localStorage.getItem("NLCreatorStructure");
    if ( currentStorageData !== null && currentStorageStructure !== null ) {
        var dataJSON = JSON.parse(currentStorageData);
        console.log(dataJSON);

        // if (dataJSON["dataApproved"] === 'false' && ) {}

        var structureJSON = JSON.parse(currentStorageStructure);

        // collect information from structure
        var structureInformation = [];
        for (i = 0; i < structureJSON.length; i++) {
            var section = structureJSON[i];
            structureInformation[i] = {};
            // type can be "live-seminar", "presence-seminar", "elearning", "practice"
            structureInformation[i]['type'] = section.type;
            //duration is in format 00:00
            structureInformation[i]['duration'] = section.duration;
        }

        // collect information from data
        var dataInformation = [];
        dataInformation['time'] = [];

        var format = dataJSON.format;
        var digitalFormat = dataJSON.digitalFormat;

        var bothEqual = false;

        if (format == '' || format == undefined) {
            dataInformation['format'] = "Freies Format";
            dataInformation['time'][0] = [];
            dataInformation['time'][0]['duration'] = convertDaysToHHMM(dataJSON.time.time);
            dataInformation['time'][0]['type'] = "event";
            dataInformation['time'][0]['singleFormat'] = "Schulung";

            time = dataJSON.time.time;
            time = !Number.isInteger(time) ? Math.round(time) : time;
            if (time === structureInformation.length) {
                bothEqual = true;
                console.log('bothEqual(all): ' + bothEqual);
            }
            // -> hier sind alle Möglichkeiten mit der entsprechenden Zeit in Struktur möglich
        } else if (format == "presence") {
            dataInformation['format'] = "Präsenz-Veranstaltung";
            dataInformation['time'][0] = [];
            dataInformation['time'][0]['duration']  = convertDaysToHHMM(dataJSON.timePresence.time);
            dataInformation['time'][0]['type'] = "event";
            dataInformation['time'][0]['singleFormat'] = "Präsenz-Veranstaltung";

            time = dataJSON.timePresence.time;
            time = !Number.isInteger(time) ? Math.round(time) : time;
            if (time === structureInformation.length && checkStructureFormat(structureInformation, format)) {
                bothEqual = true;
                console.log('bothEqual(presence): ' + bothEqual);
            }
            // -> hier nur Präsenz mit der entsprechenden Zeit in Struktur möglich
        } else if (format == "digital") {
            digitalFormat = dataJSON.digitalFormat;
            time = dataJSON.timeDigital.time;
            if (digitalFormat == '' || digitalFormat == "live-online") {
                dataInformation['format'] = "Live-Online-Training";
                dataInformation['time'][0] = [];
                dataInformation['time'][0]['duration'] = convertDaysToHHMM(time);
                dataInformation['time'][0]['type'] = "event";
                dataInformation['time'][0]['singleFormat'] = "Live-Online-Training";

                time = !Number.isInteger(time) ? Math.round(time) : time;
                if (time === structureInformation.length && checkStructureFormat(structureInformation, format, digitalFormat)) {
                    bothEqual = true;
                    console.log('bothEqual(live-online): ' + bothEqual);
                }
            } else {
                dataInformation['format'] = "E-Learning";
                dataInformation['time'][0] = [];
                dataInformation['time'][0]['duration'] = convertHoursToHHMM(time);
                dataInformation['time'][0]['type'] = "elearning";
                dataInformation['time'][0]['singleFormat'] = "E-Learning";

                if (checkElearningTime(structureInformation, time) && checkStructureFormat(structureInformation, format, digitalFormat)) {
                    bothEqual = true;
                    console.log('bothEqual(elearning): ' + bothEqual);
                }
            }
            // -> hier nur Digital mit live-online oder elearning mit der entsprechenden Zeit in Struktur möglich
        } else if (format == "digital-presence") {
            digitalFormat = dataJSON.digitalFormat;
            timePresence = dataJSON.timePresence.time;
            timeDigital = dataJSON.timeDigital.time;
            if (digitalFormat == '' || digitalFormat == "live-online") {
                dataInformation['format'] = "Präsenz + Live-Online-Event";
                dataInformation['time'][0] = [];
                dataInformation['time'][0]['duration'] = convertDaysToHHMM(timePresence);
                dataInformation['time'][0]['type'] = "event";
                dataInformation['time'][0]['singleFormat'] = "Präsenz-Veranstaltung";
                dataInformation['time'][1] = [];
                dataInformation['time'][1]['duration'] = convertDaysToHHMM(timeDigital);
                dataInformation['time'][1]['type'] = "event";
                dataInformation['time'][1]['singleFormat'] = "Live-Online-Training";

                time = !Number.isInteger(timePresence + timeDigital) ? Math.round(timePresence + timeDigital) : timePresence + timeDigital;
                if (time === structureInformation.length && checkStructureFormat(structureInformation, format, digitalFormat)) {
                    bothEqual = true;
                    console.log('bothEqual(live-online + presence): ' + bothEqual);
                }
            } else {
                dataInformation['format'] = "Blended-Learning";
                dataInformation['time'][0] = [];
                dataInformation['time'][0]['duration'] = convertDaysToHHMM(timePresence);
                dataInformation['time'][0]['type'] = "event";
                dataInformation['time'][0]['singleFormat'] = "Präsenz-Veranstaltung";
                dataInformation['time'][1] = [];
                dataInformation['time'][1]['duration'] = convertHoursToHHMM(timeDigital);
                dataInformation['time'][1]['type'] = "elearning";
                dataInformation['time'][1]['singleFormat'] = "E-Learning";


                timePresence = !Number.isInteger(timePresence) ? Math.round(timePresence) : timePresence;
                var structurePresenceTime = 0;
                for (i = 0; i < structureInformation.length; i++) {
                    if (structureInformation[i]['type'] === 'presence-seminar') {
                        structurePresenceTime += 1;
                    }
                } 
                if (timePresence === structurePresenceTime && checkElearningTime(structureInformation, timeDigital) && checkStructureFormat(structureInformation, format, digitalFormat)) {
                    bothEqual = true;
                    console.log('bothEqual(blended-learning): ' + bothEqual);
                }
            }
            // -> hier nur Digital + Präsenz mit live-online + Präsenz oder Blended-Learning mit der entsprechenden Zeit in Struktur möglich
        }

        var structureInformationOutput = getStructureInformationOutput(structureInformation, true);
        console.log(structureInformationOutput);

        rawStructureInformation = getStructureInformationOutput(structureInformation);
        // console.log(rawStructureInformation);

        // show lightbox if bothEqual false
        if (!bothEqual && dataJSON["dataApproved"] === 'false') {
            var dataOverview = `<div class="dataStructureOverview">
                <b>Ihre angegebenen Rahmendaten:</b> ${dataInformation['format']}
                <div class="overviewContainer">
                    ${(() => {
                        let overviewList = '';
                        for (let i = 0; i < dataInformation['time'].length; i++) {
                            let thisDuration = dataInformation['time'][i]['duration'] + ' Stunden';
                            let thisWidth = timeToPercent(dataInformation['time'][i]['duration']);
                            if (thisDuration === '00:00 Stunden') { thisDuration = ''; }
                            overviewList += `<div class="overviewItem" style="width: ${thisWidth}%" data-type="${dataInformation['time'][i]['type']}">${thisDuration} ${dataInformation['time'][i]['singleFormat']}</div>`;
                        }
                        return overviewList;
                    })()}
                </div>
            </div>`;
            $('#dataStructureNotEqual .dataStructureOverview[data-type="data"]').html(dataOverview);

            var structreOverview = `<div class="dataStructureOverview">
                <b>Ihre geplante Struktur:</b> ${structureInformationOutput['format']}
                <div class="overviewContainer">
                    ${(() => {
                        let overviewList = '';
                        for (let i = 0; i < structureInformationOutput['time'].length; i++) {
                            let thisDuration = structureInformationOutput['time'][i]['duration'] + ' Stunden';
                            let thisWidth = timeToPercent(structureInformationOutput['time'][i]['duration']);
                            if (thisDuration === '00:00 Stunden') { thisDuration = ''; }
                            overviewList += `<div class="overviewItem" style="width: ${thisWidth}%" data-type="${structureInformationOutput['time'][i]['type']}">${thisDuration} ${structureInformationOutput['time'][i]['singleFormat']}</div>`;
                        }
                        return overviewList;
                    })()}
                </div>
            </div>`;
            $('#dataStructureNotEqual .dataStructureOverview[data-type="structure"]').html(structreOverview);
            // $('#dataStructureNotEqual .dataStructureOverview .structureInformationFormat').html( structureInformationOutput['format'] + ': ' + structureInformationOutput['time'] + ' Stunden');
                    
            if (structureInformationOutput['formatNotFound'] === true) {
                $('#dataStructureNotEqual').find('.setDataBasedOnStructure').hide();
            } else {
                $('#dataStructureNotEqual').find('.setDataBasedOnStructure').show();
            }

            $('#dataStructureNotEqual').show();
        } else {
            var currentUrl = window.location.href;
            var urlToAnalysis = currentUrl.replace('structure.html', 'analysis.html');
            window.location.href = urlToAnalysis;
        }
    }
}

function getStructureInformationOutput(structureInformation, formatInformation = false ) {
    const totals = {};
    for (let i = 0; i < structureInformation.length; i++) {
        const { type, duration } = structureInformation[i];
        const minutes = parseDurationToMinutes(duration);

        if (!totals[type]) {
            totals[type] = 0;
        }

        totals[type] += minutes;
    }

    if (formatInformation) {
        var structureInformationOutput = {};
        structureInformationOutput['time'] = [];

        var formattedTypes = [];
        Object.entries(totals).forEach(([type, totalMinutes], i) => {
            formattedTypes.push(type);

            structureInformationOutput['time'][i] = [];
            structureInformationOutput['time'][i]['duration'] = convertMinutesToHHMM(totalMinutes);

            let thisType = '';
            if (type === 'presence-seminar' || type === 'live-seminar') { thisType = 'event'; }
            if (type === 'elearning') { thisType = 'elearning'; }
            if (type === 'practice-transfer' || type === 'practice-self-learning' || type === 'practice-project') { thisType = 'practice'; }
            structureInformationOutput['time'][i]['type'] = thisType;

            let singleFormat = '';
            if (type === 'presence-seminar') { singleFormat = 'Präsenz-Veranstaltung'; }
            if (type === 'live-seminar') { singleFormat = 'Live-Online-Event'; }
            if (type === 'elearning') { singleFormat = 'E-Learning'; }
            if (type === 'practice-transfer') { singleFormat = 'Transferphase'; }
            if (type === 'practice-self-learning') { singleFormat = 'Selbstlernphase'; }
            if (type === 'practice-project') { singleFormat = 'Projektphase'; }
            structureInformationOutput['time'][i]['singleFormat'] = singleFormat;
        });

        var outputFormat = '';
        var formatNotFound = false;

        formattedTypes = formattedTypes.filter(item => !['practice-transfer', 'practice-self-learning', 'practice-project'].includes(item));
        if (formattedTypes.length > 1) {
            if ($.inArray('presence-seminar', formattedTypes) !== -1 && $.inArray('live-seminar', formattedTypes) !== -1) {
                outputFormat = 'Präsenz + Live-Online-Event';
            } else if ($.inArray('presence-seminar', formattedTypes) !== -1 && $.inArray('elearning', formattedTypes) !== -1) {
                outputFormat = 'Blended-Learning';
            } else {
                formatNotFound = true;
            }
        } else {
            if (formattedTypes[0] === 'presence-seminar') {
                outputFormat = 'Präsenz-Veranstaltung';
            } else if (formattedTypes[0] === 'live-seminar') {
                outputFormat = 'Live-Online-Training';
            } else if (formattedTypes[0] === 'elearning') {
                outputFormat = 'E-Learning';
            } else {
                formatNotFound = true;
            }
        }
        // --> wenn hier kein passende Kombination gefunden wurde, damit Rahmendaten übernommen werden können, Button zum Übernehmen ausblenden
        
        structureInformationOutput['format'] = outputFormat; 
        structureInformationOutput['formatNotFound'] = formatNotFound;

        return structureInformationOutput; 
    } else {
        return totals; 
    }
}

function parseDurationToMinutes(duration) {
    const parts = duration.split(':');
    if (parts.length !== 2) {
        throw new Error(`Invalid duration format: ${duration}`);
    }
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid numbers in duration: ${duration}`);
    }
    return hours * 60 + minutes;
}

function checkStructureFormat(structureInformation, dataFormat, dataDigitalFormat) {
    var doubleFormat = false;
    if (dataFormat === 'presence') {
        dataFormat = 'presence-seminar';
    }
    if (dataFormat === 'digital') {
        if (dataDigitalFormat === 'live-online') {
            dataFormat = 'live-seminar';
        } else {
            dataFormat = 'elearning';
        }
    }
    if (dataFormat === 'digital-presence') {
        doubleFormat = true;
        if (dataDigitalFormat === 'live-online') {
            dataFormat = 'live-seminar';
        } else {
            dataFormat = 'elearning';
        }
    }
    var formatEqual = true;
    for (i = 0; i < structureInformation.length; i++) {
        if (!doubleFormat) {
            if (structureInformation[i]['type'] !== dataFormat) {
                formatEqual = false;
                continue;
            }
        } else if (doubleFormat) {
            if (structureInformation[i]['type'] !== dataFormat && structureInformation[i]['type'] !== 'presence-seminar') {
                formatEqual = false;
                continue;
            }
        }
    }
    return formatEqual;
}

function checkElearningTime(structureInformation, time) {
    var structureTime = 0;
    for (i = 0; i < structureInformation.length; i++) {
        if (structureInformation[i]['type'] === 'elearning') {
            structureTime += convertHHMMToHours(structureInformation[i]['duration']);
        }
    } 
    var timeEqual = Math.round(structureTime) === time ? true : false;
    return timeEqual;
}

function convertHHMMToHours(timeString) {
    var [hours, minutes] = timeString.split(':').map(Number);
    var totalHours = hours + (minutes / 60);
    return totalHours;
}

function convertDaysToHHMM(days) {
    var totalHours = days * 8;  // Convert days to hours
    var hh = Math.floor(totalHours);  // Hours part
    var mm = Math.round((totalHours - hh) * 60);  // Convert decimal hours to minutes
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

function convertHoursToHHMM(hours) {
    var totalMinutes = hours * 60;
    var hh = Math.floor(totalMinutes / 60);
    var mm = totalMinutes % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

function convertMinutesToHHMM(minutes) {
    var hh = Math.floor(minutes / 60);
    var mm = minutes % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

function timeToPercent(time) {
    let parts = time.split(':');
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    let decimalMinutes = minutes / 60;
    let total = hours + decimalMinutes;

    let percent = Math.round(total * 100);
    if (percent < 70) {
        percent = 70;
    }
    return percent;
}

/* data and structure not the same -> get structruedata to data information */
/** structureData stored in global object rawStructureInformation */
function setDataBasedOnStructure() {
    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData !== null) {
        var dataJSON = JSON.parse(storageData);
        let digitalFormatSet = false;

        // filter rawStructureInformation for practice sections
        const filteredRawStructureInformation = Object.fromEntries(
            Object.entries(rawStructureInformation).filter(
                ([type, totalMinutes]) => !['practice-transfer', 'practice-self-learning', 'practice-project'].includes(type)
            )
        );

        for (const [type, totalMinutes] of Object.entries(filteredRawStructureInformation)) {
            if (Object.keys(filteredRawStructureInformation).length > 1) {
                dataJSON["format"] = "digital-presence";
                if (type == "live-seminar" || type == "elearning") {
                    if (type == "live-seminar" && !digitalFormatSet) {
                        dataJSON["digitalFormat"] = "live-online";
                        digitalFormatSet = true;
                    } else if (type == "elearning" && !digitalFormatSet) {
                        dataJSON["digitalFormat"] = "elearning";
                        digitalFormatSet = true;
                    }
                    dataJSON["timeDigital"]["time"] = type == "live-seminar" ? mathCalculateAndRound(totalMinutes, "days") : mathCalculateAndRound(totalMinutes, "hours");
                    dataJSON["timeDigital"]["type"] = type == "live-seminar" ? "days" : "hours";
                } else if (type == "presence-seminar") {
                    dataJSON["timePresence"]["time"] = mathCalculateAndRound(totalMinutes, "days");
                    dataJSON["timePresence"]["type"] = "days";
                }
                
            } else {
                if (type == "presence-seminar") {
                    dataJSON["format"] = "presence";
                    dataJSON["timePresence"]["time"] = mathCalculateAndRound(totalMinutes, "days");
                    dataJSON["timePresence"]["type"] = "days";
                } else if (type == "live-seminar") {
                    dataJSON["format"] = "digital";
                    dataJSON["digitalFormat"] = "live-online";
                    dataJSON["timeDigital"]["time"] = mathCalculateAndRound(totalMinutes, "days");
                    dataJSON["timeDigital"]["type"] = "days";
                } else if (type == "elearning") {
                    dataJSON["format"] = "digital";
                    dataJSON["digitalFormat"] = "elearning";
                    dataJSON["timeDigital"]["time"] = mathCalculateAndRound(totalMinutes, "hours");
                    dataJSON["timeDigital"]["type"] = "hours";
                }
            }
        }

        storageData = JSON.stringify(dataJSON);
        localStorage.setItem("NLCreatorData", storageData);

        flagStructureAsApproved();

        $('#dataStructureNotEqual .changeDataSuccess').addClass('active');
        setTimeout(function() {
            var currentUrl = window.location.href;
            var urlToAnalysis = currentUrl.replace('structure.html', 'analysis.html');
            window.location.href = urlToAnalysis;
        }, 2000);
    }
}

function mathCalculateAndRound(minutes, type) {
    let newTime;
    if (type == "days") {
        newTime = Math.max(Math.round((minutes / 60 / 8)/ 0.5) * 0.5, 0.5);
    } else if (type == "hours") {
        newTime = Math.max(Math.round((minutes / 60)/ 0.5) * 0.5, 0.5);
    } 
    return newTime;
}

function flagStructureAsApproved(set = true) {
    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData !== null) {
        var dataJSON = JSON.parse(storageData);
        dataJSON["dataApproved"] = set ? "true" : "false";

        storageData = JSON.stringify(dataJSON);
        localStorage.setItem("NLCreatorData", storageData);
    }
    
}


/* switch structre header */

function switchStructureHeader() {
    $('.structureHeaderSwitch').toggleClass('small');
    var headerStyle = $('#structure').attr('data-header-style');
    if (headerStyle === "small") {
        $('#structure').attr('data-header-style', 'normal');
    } else {
        $('#structure').attr('data-header-style', 'small');
    }
}


/* flag structure as visited */

function flagStructureAsVisited() {
    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData !== null) {
        var dataJSON = JSON.parse(storageData);
        dataJSON["structureVisited"] = "true";

        storageData = JSON.stringify(dataJSON);
        localStorage.setItem("NLCreatorData", storageData);
    }
    
}


/* get parameter from url */

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

/* get analysis id in structure and show */

function getAnalysisIndexInStructure(element) {
    $('.structureAnalysisRecommendation').removeClass('active');
    $('.structureCard').removeClass('optimizationFound');
    $('.conceptCollapse').each( function() {
        if ($(this).hasClass('active')) {
            $(this).click();
        }
    });
    var indexId = $(element).attr('analysis-index');
    var selectedElements = $('[analysis-index="' + indexId + '"]');
    selectedElements.each( function() {
        if ($(this).parents('.conceptWrapper').siblings('.conceptCollapse').length !== 0) {
            $(this).parents('.conceptWrapper').siblings('.conceptCollapse').click();
        }
        if ($(this).parents('.structureCard').length !== 0) {
            $(this).parents('.structureCard').addClass('optimizationFound');
        }
    });
    $(element).addClass('active');
}

function changeOverlayOffset() {
    $(".addStructurePartContainer .addStructurePartOverlay").css("left", structureSlideIncrement * 500 + "px");
}

function minimizeAnalysis() {
    $('.structureAnalysisContainer').toggleClass('minimized');
}