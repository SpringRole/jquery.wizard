module.exports = {
    "default" : {
        "classes" : {
                "current":'wizard-stage-number-active',
                "complete":"wizard-stage-number-checked",
            },
            "special_elements" : {
                "complete":'<div class="wizard-check-icon">'+
                            '<img src="../images/tick-wizard-icon.png"/>'+
                            '</div>'
            },
            "elements" : {
                'main-section':'<div class="wizard wizard-body-selector"></div>',
                'content':'<div class="wizard-child">'+
                                    '<div class="wizard-child-inner">'+
                                        '<div class="wizard-stage">'+
                                            '<div class="wizard-stage-number wizard-step-section-selector">'+
                                                "<h6 class='wizard-step-selector'>1</h6>"+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="wizard-stage-txt wizard-label-section-selector">'+
                                        "<p class='wizard-label-selector'>Placeholder</p>"+
                                    '</div>'+
                                    '<div class="wizard-stage-line wizard-line-selector"></div>'+
                                '</div>'
            }
    }
}