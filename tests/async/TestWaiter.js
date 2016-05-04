/**
 * Tests for Waiter.
 * 
 * @author Casper
 */

"use strict";

import QUnit from "lib/qunit/qunit";
import Waiter from "src/async/Waiter";

(function()
{
    QUnit.module("Waiter");
    
    QUnit.test("finally -> calls all callbacks", function(assert)
    {
        let waiter = new Waiter();

        let timesCalled = 0;

        let calledFinalCallback = false;

        function mockAsyncProcess(callback, context)
        {
            ++timesCalled;
            
            callback.call(context);
        }

        waiter.waitFor(mockAsyncProcess, this)
            .andFor(mockAsyncProcess, this)
            .andFor(mockAsyncProcess, this)
            .finally(function()
            {
                calledFinalCallback = true;
            }, this);

        assert.strictEqual(
            timesCalled,
            3,
            "Mock async process was called the correct number of times.");

        assert.ok(calledFinalCallback, "Final callback was called.");
    });

    QUnit.test("waitFor -> passes arguments correctly", function(assert)
    {
        let waiter = new Waiter();

        let argumentsPassed = [];

        function mockAsyncProcess(callback, context)
        {
            let args = Array.prototype.splice.call(arguments, 2);
            
            argumentsPassed = argumentsPassed.concat(args);
            
            callback.call(context);
        }
        
        function finalMockAsyncProcess()
        {
            let args = Array.prototype.splice.call(arguments, 0);
            
            argumentsPassed = argumentsPassed.concat(args);
        }

        let bar = {
            value: "bar"
        };

        waiter.waitFor(mockAsyncProcess, this, "foo")
            .andFor(mockAsyncProcess, this, bar)
            .finally(finalMockAsyncProcess, this, 3, 2, 1);

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
}());
