/**
 * Tests for Sequencer.
 * 
 * @author Casper
 */

"use strict";

import QUnit from "lib/qunit/qunit";
import Sequencer from "src/async/Sequencer";

(function()
{
    QUnit.module("Sequencer");
    
    QUnit.test("finally -> calls all callbacks in order", function(assert)
    {
        let sequencer = new Sequencer();

        let callOrder = [];

        let calledFinalCallback = false;

        function mockAsyncProcess1(callback, context)
        {
            callOrder.push(1);
            
            callback.call(context);
        }

        function mockAsyncProcess2(callback, context)
        {
            callOrder.push(2);
            
            callback.call(context);
        }

        function mockAsyncProcess3(callback, context)
        {
            callOrder.push(3);
            
            callback.call(context);
        }

        sequencer.sequence(mockAsyncProcess1, this)
            .andThen(mockAsyncProcess2, this)
            .andThen(mockAsyncProcess3, this)
            .finally(function()
            {
                calledFinalCallback = true;
            }, this);

        assert.deepEqual(
            callOrder,
            [ 1, 2, 3 ],
            "Mock async processes were called in the correct order.");

        assert.ok(calledFinalCallback, "Final callback was called.");
    });

    QUnit.test("sequence -> passes arguments correctly", function(assert)
    {
        let sequencer = new Sequencer();

        let argumentsPassed = [];

        function mockAsyncProcess(callback, context, argument)
        {
            let args = Array.prototype.splice.call(arguments, 2);
            
            argumentsPassed = argumentsPassed.concat(args);
            
            callback.call(context);
        }

        let bar = {
            value: "bar"
        };

        sequencer.sequence(mockAsyncProcess, this, "foo")
            .andThen(mockAsyncProcess, this, bar)
            .finally(mockAsyncProcess, this, 3, 2, 1);

        assert.strictEqual(
            argumentsPassed[0],
            "foo",
            "String argument was passed correctly.");

        assert.strictEqual(
            argumentsPassed[1],
            bar,
            "Object argument was passed correctly.");

        assert.deepEqual(
            [ argumentsPassed[2], argumentsPassed[3], argumentsPassed[4] ],
            [ 3, 2, 1 ],
            "Multiple integer arguments were passed correctly.");
    });

    QUnit.test("sequence -> doesn't allow more function calls after finally()", function(assert)
    {
        let sequencer = new Sequencer();
        
        function mockAsyncProcess(callback, context)
        {
            callback.call(context);
        }
        
        sequencer.sequence(mockAsyncProcess, this)
            .andThen(mockAsyncProcess, this)
            .finally(mockAsyncProcess, this);
        
        assert.throws(
            function()
            {
                sequencer.sequence(mockAsyncProcess, this);
            },
            "Throws error when calling sequence() after finally().");
    });
}());
