/**
 * CallbackUtil is a static utility class containing methods related to 
 * callbacks.
 * 
 * @author Casper
 */

"use strict";

class CallbackUtil
{
    /**
     * Create a js object encapsulating a callback function and it's context, 
     * and any additional arguments.
     *
     * @param callback
     * @param context
     * @returns {Object}
     */
    static createCallbackContextObject(callback, context)
    {
        let args = Array.prototype.slice.call(arguments);

        // Splice out callback and context, we want to pass any extra arguments
        // as an array.
        args.splice(0, 2);

        return {
            callback: callback,
            context: context,
            arguments: args
        };
    };
}

export default CallbackUtil;
