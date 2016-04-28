"use strict";

//System.import("../lib/qunit/qunit");
//System.import("./utils/TestCallbackUtil");

import * as QUnit from "../../lib/qunit/qunit";
import * as CallbackUtil from "../../src/utils/CallbackUtil";

(function()
{
    QUnit.test('CallbackUtil.createCallbackContextObject', function(assert)
    {
        let callback = function(){};
        
        let context = this;
        
        let argument1 = 1;
        
        let argument2 = 1;
        
        let argument3 = 1;
        
        let callbackContextObject = CallbackUtil.createCallbackContextObject(
            callback,
            context,
            argument1,
            argument2,
            argument3);
        
        assert.propEqual(true, false,
            'Constructor correctly intializes all the values of the component.');
    });
}());
