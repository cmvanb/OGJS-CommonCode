/**
 * Waiter waits for a collection of parallel asynchronous processes to complete.
 * Each async process is encapsulated in a callback-context-argument object.
 *
 * @author Casper
 */

"use strict";

import CallbackUtil from "src/utils/CallbackUtil";

class Waiter
{
    /**
     * Waiter.
     *
     * @constructor
     */
    constructor()
    {
        this._processes = [];

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
        if (this._inProgress)
        {
            throw "Waiter.waitFor: " + Waiter.ERRORS.ALREADY_IN_PROGRESS;
        }
        
        let nextProcess = CallbackUtil.createCallbackContextObject.apply(
            this,
            arguments);

        this._processes.push(nextProcess);

        return this;
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
        // This function is basically syntactic sugar, so just reuse the
        // perfectly fine waitFor().
        return this.waitFor.apply(this, arguments);
    }

    /**
     * Stores the final callback, listens for the completion of all previous
     * callbacks, and when successfull, triggers the final callback.
     *
     * @param callback
     * @param context
     */
    finally(callback, context)
    {
        if (this._inProgress)
        {
            throw "Waiter.finally: " + Waiter.ERRORS.ALREADY_IN_PROGRESS;
        }
        
        let finalProcess = CallbackUtil.createCallbackContextObject.apply(
            this,
            arguments);

        let callbacksCount = this._processes.length;

        let callbacksCompleted = 0;

        function onCallbackCompleted()
        {
            ++callbacksCompleted;

            if (callbacksCompleted === callbacksCount)
            {
                finalProcess.callback.apply(
                    finalProcess.context,
                    finalProcess.arguments);
            }
        }
        
        this._inProgress = true;
        
        this._processes.forEach(function(process)
        {
            let args = [ onCallbackCompleted, this ];

            // Append process.arguments to args array.
            Array.prototype.push.apply(args, process.arguments);

            process.callback.apply(process.context, args);
        }, this);
    }
}

Waiter.ERRORS = {};

Waiter.ERRORS.ALREADY_IN_PROGRESS = "This function is not possible for waiters that are already in progress. Check the order in which you call the functions.";

export default Waiter;
