var Templates = require('./templates')

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
        
        var settings = $.extend({
            current_page:'1',
            wizardName:'default',
            pages_with_labels:{'1':'Step One', '2':'Step Two', '3':'Step Three'},
        }, options );
                
        var $currentElement = $(this)
        var reachedCurrentPage = false
        var currentSection = "sectionComplete"
        $currentElement.html(elements['main-section'])
        
        for(var page in settings.pages_with_labels){
            var step_class='';
            var $completedElement = $(elements['content'])
            var pages_array = Object.keys(settings.pages_with_labels)
            var lastPage = pages_array[pages_array.length-1]
            
            //Check to see if the current page has been reached
            if(!reachedCurrentPage){
                reachedCurrentPage = (page == settings.current_page ? true : false)
                currentSection = reachedCurrentPage ? "currentSection" : "sectionComplete"
            }
            //If the current page has not been reached then select the class for complete and the required labels
            if(!reachedCurrentPage){
                step_class = 'complete';
                $completedElement.find('.wizard-step-section-selector')
                                                .html(special_elements['completedLabel'])
            }
            else {   //If its the current page  reached then select the class for the current page
                page == settings.current_page ? step_class = 'current' :  null
                $completedElement.find('.wizard-step-selector').html(page)
            }
            
            if (page === lastPage)
                $completedElement.find('.wizard-line-selector')
                                                .remove()
                                    
            $completedElement.find('.wizard-step-section-selector')
                                            .addClass(classes[step_class])
            $completedElement.find('.wizard-label-selector')
                                            .html(settings.pages_with_labels[page])
            
            //If its the first insertion it needs to be the inner html of the body, else be inserted after the last wizard element class
            $currentElement.find('.wizard-child').length > 0 ? $completedElement.insertAfter($currentElement.find('.wizard-child:last')) : $currentElement.html($completedElement)
                
        }
        return this
    }

}( jQuery));