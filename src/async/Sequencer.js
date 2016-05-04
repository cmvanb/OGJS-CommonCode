/**
 * Sequencer executes a series of async processes in a defined order.
 *
 * @author Casper
 */

"use strict";

import CallbackUtil from "src/utils/CallbackUtil";

class Sequencer
{
    /**
     * Sequencer.
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
     * in sequence. When finally() is called, the sequencer will call the first
     * callback, wait for it to complete and then call each following callback
     * in order.
     * 
     * @param callback
     * @param context
     * @returns {Object}
     */
    sequence(callback, context)
    {
        if (this._inProgress)
        {
            throw "Sequencer.sequence: " + Sequencer.ERRORS.ALREADY_IN_PROGRESS;
        }
        
        let nextProcess = CallbackUtil.createCallbackContextObject.apply(
            this,
            arguments);

        this._processes.push(nextProcess);

        return this;
    }

    /**
     * Adds a callback-context-arguments object to an array, to be executed 
     * in sequence. When finally() is called, the sequencer will call the first
     * callback, wait for it to complete and then call each following callback
     * in order.
     * 
     * @param callback
     * @param context
     * @returns {Object}
     */
    andThen(callback, context)
    {
        // This function is basically syntactic sugar, so just reuse the
        // perfectly fine sequence().
        return this.sequence.apply(this, arguments);
    }

    /**
     * Stores the final callback, and kicks off the first callback in the 
     * sequence.
     *
     * @param callback
     * @param context
     */
    finally(callback, context)
    {
        this.sequence.apply(this, arguments);

        this._inProgress = true;
        
        this._callNext();
    }

    _callNext()
    {
        if (this._processes.length > 0)
        {
            let process = this._processes.shift();

            let args = [ this._callNext, this ];

            // Append process.arguments to args array.
            Array.prototype.push.apply(args, process.arguments);

            process.callback.apply(process.context, args);
        }
    }
}

Sequencer.ERRORS = {};

Sequencer.ERRORS.ALREADY_IN_PROGRESS = "This function is not possible for sequencers that are already in progress. Check the order in which you call the functions.";

export default Sequencer;
