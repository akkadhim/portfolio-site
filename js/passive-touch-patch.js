// Passive Touch Event Listener Patch
// This script patches third-party libraries to use passive touch event listeners
// Place this script after your third-party libraries but before your main scripts

(function() {
    'use strict';
    
    // Store the original addEventListener
    var originalAddEventListener = EventTarget.prototype.addEventListener;
    
    // Touch events that should be passive by default
    var passiveTouchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    
    // Override addEventListener to make touch events passive by default
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Check if this is a touch event and no options were provided
        if (passiveTouchEvents.indexOf(type) !== -1) {
            // If options is boolean (for capture), convert to object
            if (typeof options === 'boolean') {
                options = { capture: options, passive: true };
            } 
            // If options is undefined or null, set as passive
            else if (!options) {
                options = { passive: true };
            }
            // If options is object but doesn't specify passive, set it to true
            else if (typeof options === 'object' && !('passive' in options)) {
                options.passive = true;
            }
        }
        
        // Call the original addEventListener with the modified options
        return originalAddEventListener.call(this, type, listener, options);
    };

    // Patch jQuery's event binding if jQuery is present
    if (typeof jQuery !== 'undefined') {
        var originalOn = jQuery.fn.on;
        
        jQuery.fn.on = function(events, selector, data, handler) {
            // If events is a string and contains touch events
            if (typeof events === 'string') {
                var eventList = events.split(' ');
                var hasPassiveTouchEvent = eventList.some(function(event) {
                    return passiveTouchEvents.indexOf(event.split('.')[0]) !== -1;
                });
                
                // If it has touch events, we need to handle them specially
                if (hasPassiveTouchEvent) {
                    // For jQuery events, we'll set a flag that can be checked
                    var $elements = this;
                    eventList.forEach(function(eventType) {
                        var baseEvent = eventType.split('.')[0];
                        if (passiveTouchEvents.indexOf(baseEvent) !== -1) {
                            $elements.each(function() {
                                var element = this;
                                var finalHandler = typeof selector === 'function' ? selector : 
                                                  typeof data === 'function' ? data : handler;
                                
                                if (finalHandler && element.addEventListener) {
                                    element.addEventListener(baseEvent, finalHandler, { passive: true });
                                }
                            });
                        }
                    });
                    
                    // Still call original for non-touch events
                    var nonTouchEvents = eventList.filter(function(event) {
                        return passiveTouchEvents.indexOf(event.split('.')[0]) === -1;
                    }).join(' ');
                    
                    if (nonTouchEvents) {
                        return originalOn.call(this, nonTouchEvents, selector, data, handler);
                    }
                    
                    return this;
                }
            }
            
            // For non-touch events or object-based events, use original method
            return originalOn.call(this, events, selector, data, handler);
        };
    }
})();
