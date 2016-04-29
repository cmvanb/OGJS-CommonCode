/**
 * Tests for CallbackUtil.
 * 
 * @author Casper
 */

"use strict";

import QUnit from "lib/qunit/qunit";
import CallbackUtil from "src/utils/CallbackUtil";

(function()
{
    QUnit.module("CallbackUtil");
    
    QUnit.test("createCallbackContextObject | returns expected object", function(assert)
    {
        let callback = function(){};
        
        let context = this;
        
        let argument1 = 1;
        
        let argument2 = 1;
        
        let argument3 = 1;
        
        let actualObject = CallbackUtil.createCallbackContextObject(
            callback,
            context,
            argument1,
            argument2,
            argument3);

        let expectedObject = {
            callback: callback,
            context: context,
            arguments: [
                argument1,
                argument2,
                argument3
            ]
        };

        assert.propEqual(
            actualObject,
            expectedObject,
            "Callback context object was created with correct values.");
    });
}());
