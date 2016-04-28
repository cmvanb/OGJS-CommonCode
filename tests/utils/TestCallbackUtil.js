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
    QUnit.module('CallbackUtil');
    
    QUnit.test('CallbackUtil.createCallbackContextObject', function(assert)
    {
        let callback = function(){};
        
        let context = this;
        
        let argument1 = 1;
        
        let argument2 = 1;
        
        let argument3 = 1;
        
        let foo = CallbackUtil.createCallbackContextObject(
            callback,
            context,
            argument1,
            argument2,
            argument3);

        let bar = {
            callback: callback,
            context: context,
            arguments: [ argument1, argument2, argument3 ]
        };

        assert.propEqual(foo, bar,
            'Callback context object is created with correct values.');
    });
}());
