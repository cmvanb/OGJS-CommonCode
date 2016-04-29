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
    
    QUnit.test("then -> calls all callbacks", function(assert)
    {
        let waiter = new Waiter();

        let timesCalled = 0;

        let calledFinalCallback = false;

        function mockAsyncProcess(callback, context)
        {
            ++timesCalled;
            
            callback.call(context);
        }

        waiter.waitFor(mockAsyncProcess)
            .andFor(mockAsyncProcess)
            .andFor(mockAsyncProcess)
            .then(function()
            {
                calledFinalCallback = true;
            }, this);

        assert.strictEqual(
            timesCalled,
            3,
            "Mock async process was called the correct number of times.");

        assert.ok(calledFinalCallback, "Final callback was called.");
    });
}());
