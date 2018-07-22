import Templates from './templates.js';

/**
 * Usage
 * -------------------
 * The wizard will be added as the inner html of the specified element
 * -------------------
 *  Properties
 * -------------------
 * Settings:
*       current_page -> The current page the wizard is on, has to match a page number given in the pages_with_labels object
 *      wizardName: When we support multiple wizard templates
 *      pages_with_labels: A Json Key/Value pair where the key is the page number and the value is the label of the Page 
 * 
 * Classes:
 *      incomplete -> to be used when a wizard element is incomplete, add to element with class wizard-step-section-selector
 *      complete -> to be used when a wizard element is complete, add to element with class wizard-step-section-selector
 * -------------------
 **/
//TO DO: ALGORITHM TO APPEND THE TEMPLATE
(function ( $ ) {

    $.fn.wizard = function ( options ) {
        
        // var Templates = {
        //     "default" : {
        //         "classes" : {
        //                 "current":'wizard-stage-number-active',
        //                 "complete":"wizard-stage-number-checked",
        //             },
        //             "special_elements" : {
        //                 "complete":'<div class="wizard-check-icon">'+
        //                             '<img src="/images/tick-wizard-icon.png"/>'+
        //                             '</div>'
        //             },
        //             "elements" : {
        //                 'main-section':'<div class="wizard wizard-body-selector"></div>',
        //                 'content':'<div class="wizard-child">'+
        //                                     '<div class="wizard-child-inner">'+
        //                                         '<div class="wizard-stage">'+
        //                                             '<div class="wizard-stage-number wizard-step-section-selector">'+
        //                                                 "<h6 class='wizard-step-selector'>1</h6>"+
        //                                             '</div>'+
        //                                         '</div>'+
        //                                     '</div>'+
        //                                     '<div class="wizard-stage-txt wizard-label-section-selector">'+
        //                                         "<p class='wizard-label-selector'>Placeholder</p>"+
        //                                     '</div>'+
        //                                     '<div class="wizard-stage-line wizard-line-selector"></div>'+
        //                                 '</div>'
        //             }
        //     }
        // }

        var settings = $.extend({
            current_page:'1',
            wizardName:'default',
            pages_with_labels:{'1':'Step One', '2':'Step Two', '3':'Step Three'},
            template:'default'
        }, options );

        var template = Templates[settings.template];
        var $parentElement = $(this);
        var reachedCurrentPage = false;
        var currentSection;

        $parentElement.html(template["elements"]['main-section'])
        
        for(var page in settings.pages_with_labels){
            //The completed element
            var $element = $(template["elements"]['content'])
            
            var pages_array = Object.keys(settings.pages_with_labels)
            var lastPage = pages_array[pages_array.length-1]
            
            //Check to see if the current page has been reached, This check happens until the current page has reached
            if(!reachedCurrentPage){
                reachedCurrentPage = (page == settings.current_page ? true : false)
            }
            
            //If the current page has not been reached then the current section is of type complete
            if(!reachedCurrentPage){
                currentSection = 'complete'
            }
            else {
                currentSection = (page == settings.current_page)? "current" : "incomplete"
            }
            // console.log('page--',page);
            // console.log('element ',$element.find('.wizard-step-selector'))
            if(template["special_elements"][currentSection]){
                $element.find('.wizard-step-section-selector').html(template["special_elements"][currentSection])
            }  else { 
                $element.find('.wizard-step-selector').html(page)
            }
            console.log('truth test', template["classes"][currentSection])
            if(template["classes"][currentSection]){
                $element.find('.wizard-step-section-selector').addClass(template["classes"][currentSection])
                }

            $element.find('.wizard-label-selector').html(settings.pages_with_labels[page])

            if (page === lastPage)
                $element.find('.wizard-line-selector').remove()
            
            //If its the first insertion it needs to be the inner html of the body, else be inserted after the last wizard element class
            $parentElement.find('.wizard-child').length > 0 ? $element.insertAfter($parentElement.find('.wizard-child:last')) : $parentElement.html($element)
                
        }
        return this
    }

}( jQuery));