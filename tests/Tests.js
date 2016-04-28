/**
 * Run all tests. All test modules should be imported here.
 * 
 * @author Casper
 */

"use strict";

import QUnit from "lib/qunit/qunit";
import TestCallbackUtil from "tests/utils/TestCallbackUtil";

(function()
{
    // Load all unit tests.
    QUnit.load();

    // Run all unit tests.
    QUnit.start();
}());
