$(document).ready(function () {
    var storageData = localStorage.getItem('NLCreatorData');
    if ( storageData !== null ) {
        var dataJSON = JSON.parse(storageData);
        console.log(dataJSON);

        // collect title from data
        storedTitle = dataJSON.title;
        if (storedTitle) {
            $('#summaryTitel').html(storedTitle);
        }

        // collect learning target information from data
        storedLearningTargets = dataJSON.learningTargets;
        if (storedLearningTargets) {
            for (var i = 0; i < Object.keys(storedLearningTargets).length; i++) {
                var level = storedLearningTargets[i].level;
                var text = storedLearningTargets[i].text ? storedLearningTargets[i].text : '';
                var verb = storedLearningTargets[i].verb ? storedLearningTargets[i].verb : '';

                if (level) {
                    var learningTargetHTML = `<li>
                        <p><span class="conceptLearningTargetLevel">Stufe `+ level + `:</span> Die Teilnehmenden können <span class="inputTextLearningTargetLevel">`+ text + `</span> <span class="learningTargetLevelVerb">`+ verb + `</span>.</p>
                    </li>`
                    $('.learningTargetLevelList').append(learningTargetHTML);
                }
            }
        }

        // collect time information from data
        var dataInformation = [];
        var format = dataJSON.format;
        var digitalFormat = dataJSON.digitalFormat;

        if (format == '' || format == undefined) {
            dataInformation['format'] = 'Freies Format';
            dataInformation['time'] = convertDaysToHHMM(dataJSON.time.time);
        } else if (format == 'presence') {
            dataInformation['format'] = 'Präsenz';
            dataInformation['time'] = convertDaysToHHMM(dataJSON.timePresence.time);
        } else if (format == 'digital') {
            digitalFormat = dataJSON.digitalFormat;
            time = dataJSON.timeDigital.time;
            if (digitalFormat == '' || digitalFormat == 'live-online') {
                dataInformation['format'] = 'Live-Online-Training';
                dataInformation['time'] = convertDaysToHHMM(time);
            } else {
                dataInformation['format'] = 'E-Learning';
                dataInformation['time'] = convertHoursToHHMM(time);
            }
        } else if (format == 'digital-presence') {
            digitalFormat = dataJSON.digitalFormat;
            timePresence = dataJSON.timePresence.time;
            timeDigital = dataJSON.timeDigital.time;
            if (digitalFormat == '' || digitalFormat == 'live-online') {
                dataInformation['format'] = 'Präsenz + Live-Online-Event';
                dataInformation['time'] = convertDaysToHHMM(timePresence) + ' + ' + convertDaysToHHMM(timeDigital);
            } else {
                dataInformation['format'] = 'Blended-Learning';
                dataInformation['time'] = convertDaysToHHMM(timePresence) + ' + ' + convertHoursToHHMM(timeDigital);
            }
        }

        $('#summaryFormat b').html(dataInformation['format']);
        $('#summaryTime b').html(dataInformation['time']);


        // collect participant information from data
        storedUserPerEvent = dataJSON.userPerEvent;
        if (storedUserPerEvent) {
            $('#summaryUserPerEvent b').html(storedUserPerEvent.min + ' - ' + storedUserPerEvent.max);
        }

        storedDigitalAffinity = dataJSON.digitalAffinity;
        if (storedDigitalAffinity) {
            var storedDigitalAffinityText;
            if (storedDigitalAffinity == 'low') { storedDigitalAffinityText = 'Niedrig'; };
            if (storedDigitalAffinity == 'middle') { storedDigitalAffinityText = 'Mittel'; };
            if (storedDigitalAffinity == 'high') { storedDigitalAffinityText = 'Hoch'; };
            if (storedDigitalAffinity == 'mixed') { storedDigitalAffinityText = 'Gemischt'; };
            $('#summaryDigitalAffinity b').html(storedDigitalAffinityText);
        }

        storedKnowledgeSkills = dataJSON.knowledgeSkills;
        if (storedKnowledgeSkills) {
            var storedKnowledgeSkillsText;
            if (storedKnowledgeSkills == 'beginner') { storedKnowledgeSkillsText = 'Anfänger'; };
            if (storedKnowledgeSkills == 'advanced') { storedKnowledgeSkillsText = 'Fortgeschrittene'; };
            if (storedKnowledgeSkills == 'expert') { storedKnowledgeSkillsText = 'Experten'; };
            if (storedKnowledgeSkills == 'mixed') { storedKnowledgeSkillsText = 'Gemischt'; };
            $('#summaryKnowledgeSkills b').html(storedKnowledgeSkillsText);
        }
    }

    var storageData = localStorage.getItem('NLCreatorStructure');
    if ( storageData !== null ) {
        var structureJSON = JSON.parse(storageData);
        console.log(structureJSON);

        for (i = 0; i < structureJSON.length; i++) {
            var section = structureJSON[i];

            var typeName = '';
            if (section?.type) {
                if (section.type == 'presence-seminar') {
                    typeName = 'Präsenz-Veranstaltung';
                } else if (section.type == 'live-seminar') {
                    typeName = 'Live-Online-Event';
                } else if (section.type == 'elearning') {
                    typeName = 'E-Learning';
                } else if (section.type == "practice-transfer") {
                    typeName = "Transferphase";
                } else if (section.type == "practice-self-learning") {
                    typeName = "Selbstlernphase";
                } else if (section.type == "practice-project") {
                    typeName = "Projektphase";
                }
            }

            var isStartTimeSet = false;
            var initialTime = '';
            if (section?.startTime) {
                if (section.startTime !== '') {
                    isStartTimeSet = true;
                    initialTime = section.startTime;
                    var durationUncomplete = false;
                }
            }

            var html = `<div class="cardTitleWrapper summaryStructureElement" data-type="${section?.type}">
                <div class="structureElementHeaderRow">
                    <h3 class="cardTitle structureElementHeaderHeading">${section?.title}</h3>
                    <div class="headerTypeBadge fontSizeSmall">${typeName}</div>
                </div>
                <div class="card bigPadding">
                    <div class="inputWrapper">
                        <table class="structureElementAllSections">
                            <thead>
                                <tr>
                                    <th class="contentSectionTitle">Titel</th>
                                    ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar' || section?.type == 'elearning') ? '<th class="contentPhase">Verlauf</th>' : ''}
                                    ${(isStartTimeSet == true) && (section?.type == 'presence-seminar' || section?.type == 'live-seminar' || section?.type == 'elearning') ? '<th class="contentTime">Uhrzeit</th>' : ''}
                                    ${(isStartTimeSet == false) && (section?.type == 'presence-seminar' || section?.type == 'live-seminar' || section?.type == 'elearning') ? '<th class="contentTime">Dauer (Min.)</th>' : ''}
                                    <th class="contentSubtopic">Inhalt</th>
                                    ${(section?.type == 'elearning') ? '<th class="contentSubtopicConcept">Lernmaterialien und Aufgaben</th>' : ''}
                                    ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? '<th class="contentMethod">Methode</th>' : ''}
                                    ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? '<th class="contentLearningTargetFormulation">Lernziel</th>' : ''}
                                    ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? '<th class="contentSocialForm">Sozialform</th>' : ''}
                                    ${(section?.type == 'practice-transfer' || section?.type == 'practice-self-learning' || section?.type == 'practice-project') ? '<th class="contentTask">Aufgabenstellung</th>' : ''}
                                </tr>
                            </thead>
                            <tbody>`;
                            
            for (j = 0; j < section?.container?.length; j++) {
                var container = section.container[j];

                var phaseName = '-';
                if (container?.phase) {
                    if (container.phase == 'introduction') {
                        phaseName = 'Einführung';
                    } else if (container.phase == 'motivation') {
                        phaseName = 'Motivation';
                    } else if (container.phase == 'elaboration') {
                        phaseName = 'Erarbeitung';
                    } else if (container.phase == 'consolidation') {
                        phaseName = 'Festigung';
                    } else if (container.phase == 'application') {
                        phaseName = 'Anwendung';
                    } else if (container.phase == 'transfer') {
                        phaseName = 'Transfer';
                    } else if (container.phase == 'completion') {
                        phaseName = 'Abschluss';
                    } else if (container.phase == 'examination') {
                        phaseName = 'Prüfung';
                    }
                }

                var allContent = '';
                if (container?.content) {
                    for (k = 0; k < container.content.length; k++) {
                        allContent += '<li>' + container.content[k].title + '</li>';
                    }
                    if (container.content.length === 0) {
                        allContent = '-';
                    }
                } else {
                    allContent = '-';
                }

                var allContentConcept = '';
                if (container?.content) {
                    for (n = 0; n < container.content.length; n++) {
                        if (container.content[n]?.contentConcept) {
                            for (m = 0; m < container.content[n].contentConcept.length; m++) {
                                allContentConcept += '<li>' + container.content[n].contentConcept[m].title + '</li>';
                            }
                            if (container.content[n].contentConcept.length === 0) {
                                allContentConcept = '-';
                            }
                        }
                    }
                    if (container.content.length === 0) {
                        allContentConcept = '-';
                    }
                } else {
                    allContentConcept = '-';
                }

                var methodText = '-';
                if (container?.concept?.method) {
                    methodText = container.concept.method;
                }

                var learningTargetText = '';
                if (container?.concept?.learningTargetLevel && container?.concept?.learningTargetFormulation && container?.concept?.learningTargetVerb) {
                    learningTargetText += `Stufe ${container.concept.learningTargetLevel}: Die Teilnehmenden können ${container.concept.learningTargetFormulation} ${container.concept.learningTargetVerb}`
                } else {
                    learningTargetText = '-';
                }

                var socialFormName = '-';
                if (container?.concept?.socialForm) {
                    if (container.concept.socialForm == 'single') {
                        socialFormName = 'Einzelarbeit';
                    } else if (container.concept.socialForm == 'partner') {
                        socialFormName = 'Partnerarbeit';
                    } else if (container.concept.socialForm == 'group') {
                        socialFormName = 'Gruppenarbeit';
                    } else if (container.concept.socialForm == 'plenum') {
                        socialFormName = 'Plenum';
                    }
                }

                var contentTime = '-';
                if (isStartTimeSet == true) {
                    if (container?.durationMinutes && durationUncomplete == false) {
                        contentTime = initialTime;
                        var parts = initialTime.split(":");
                        var hours = parseInt(parts[0]);
                        var minutes = parseInt(parts[1]);
                        var totalMinutes = hours * 60 + minutes + parseInt(container.durationMinutes);
                        console.log(hours + " " + minutes);
                        console.log(totalMinutes);
                        var newHours = Math.floor(totalMinutes / 60) % 24;
                        var newMinutes = totalMinutes % 60;
                        var newTime = (newHours < 10 ? "0" : "") + newHours + ":" + (newMinutes < 10 ? "0" : "") + newMinutes;
                        initialTime = newTime;
                    } else {
                        durationUncomplete = true;
                    }
                } else {
                    contentTime = container?.durationMinutes;
                }

                var taskText = '-';
                if (container?.concept?.task) {
                    taskText = container.concept.task;
                }

                html += `<tr class="${container?.type == 'pause' ? 'isPause' : ''}">
                            <td class="contentSectionTitle">${container?.title}</td>
                            ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar' || section?.type == 'elearning') ? `<td class="contentPhase">${phaseName}</td>` : ''}
                            ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar' || section?.type == 'elearning') ? `<td class="contentTime">${contentTime}</td>` : ''}
                            <td class="contentSubtopic"><ul>${allContent}</ul></td>
                            ${(section?.type == 'elearning') ? `<td class="contentSubtopicConcept"><ul>${allContentConcept}</ul></td>` : ''}
                            ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? `<td class="contentMethod">${methodText}</td>` : ''}
                            ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? `<td class="contentLearningTargetFormulation">${learningTargetText}</td>` : ''}
                            ${(section?.type == 'presence-seminar' || section?.type == 'live-seminar') ? `<td class="contentSocialForm">${socialFormName}</td>` : ''}
                            ${(section?.type == 'practice-transfer' || section?.type == 'practice-self-learning' || section?.type == 'practice-project') ? `<td class="contentSocialForm">${taskText}</td>` : ''}
                        </tr>`;
            }
            
            html += `</tbody>
                        </table>
                    </div>
                </div>
            </div>`;

            $('#summaryStructureElements').append(html);
        }
    }

});