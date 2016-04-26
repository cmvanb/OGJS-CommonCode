/**
 * A waiter object waits for an arbitrary number of asynchronous processes. 
 * Each async process is encapsulated in a callback-context-argument object.
 *
 * @author Casper
 */

import * as CallbackUtil from "utils/CallbackUtil";

class Waiter
{
    /**
     * Waiter.
     *
     * @constructor
     */
    constructor()
    {
        this._callbackContextObjects = [];

        this._inProgress = false;
    }
    
    /**
     * Adds a callback-context-arguments object to an array, to be executed 
     * asynchronously. When all 'waitFor' and 'andFor' callbacks have been 
     * fired, it will call the final 'then' callback.
     * 
     * @param callback
     * @param context
     * @returns {Object}
     */
    waitFor(callback, context)
    {
        console.assert(
            !this._inProgress,
            "Waiter.waitFor: " + Waiter.ERRORS.ALREADY_IN_PROGRESS);
        
        // This function is basically syntactic sugar, so just reuse the
        // perfectly fine andFor().
        return this.andFor.apply(this, arguments);
    }
    
    /**
     * Adds a callback-context-arguments object to an array, to be executed 
     * asynchronously. When all 'waitFor' and 'andFor' callbacks have been 
     * fired, it will call the final 'then' callback.
     * 
     * @param callback
     * @param context
     * @returns {Object}
     */
    andFor(callback, context)
    {
        console.assert(
            !this._inProgress,
            "Waiter.andFor: " + Waiter.ERRORS.ALREADY_IN_PROGRESS);
        
        let nextObject = CallbackUtil.createCallbackContextObject.apply(
            this, arguments);

        this._callbackContextObjects.push(nextObject);

        return this;
    }

    /**
     * Stores the final 'then' callback, listens for the completion of all 
     * previous callbacks, and when successfull, triggers the final callback.
     *
     * @param callback
     * @param context
     */
    then(callback, context)
    {
        console.assert(
            !this._inProgress,
            "Waiter.then: " + Waiter.ERRORS.ALREADY_IN_PROGRESS);
        
        let finalObject = CallbackUtil.createCallbackContextObject.apply(
            this, arguments);

        let callbacksCount = this._callbackContextObjects.length;

        let callbacksCompleted = 0;

        function onCallbackCompleted()
        {
            ++callbacksCompleted;

            if (callbacksCompleted === callbacksCount)
            {
                finalObject.callback.apply(
                    finalObject.context, finalObject.args);
            }
        }

        this._inProgress = true;

        this._callbackContextObjects.forEach(function(callbackContextObject)
        {
            let args = [ onCallbackCompleted, this ];

            Array.prototype.push.apply(args, callbackContextObject.args);

            callbackContextObject.callback.apply(
                callbackContextObject.context, args);
        }, this);
    }
}

Waiter.ERRORS = {};

Waiter.ERRORS.ALREADY_IN_PROGRESS = "This function is not possible for waiters that are already in progress. Check the order in which you call the functions.";

export default Waiter;
