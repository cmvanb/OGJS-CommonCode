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

    sequence(callback, context)
    {
        console.assert(
            !this._inProgress,
            "Sequencer.sequence: " + Sequencer.ERRORS.ALREADY_IN_PROGRESS);
        
        let nextProcess = CallbackUtil.createCallbackContextObject.apply(
            this,
            arguments);

        this._processes.push(nextProcess);

        return this;
    }

    andThen(callback, context)
    {
        // This function is basically syntactic sugar, so just reuse the
        // perfectly fine sequence().
        return this.sequence.apply(this, arguments);
    }

    finally(callback, context)
    {
        console.assert(
            !this._inProgress,
            "Sequencer.finally: " + Sequencer.ERRORS.ALREADY_IN_PROGRESS);

        this.sequence.apply(this, arguments);

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
