/**
 * Run all tests. All test modules should be imported here.
 *
 * @author Casper
 */

"use strict";

import QUnit from "lib/qunit/qunit";
import TestSequencer from "tests/async/TestSequencer";
import TestWaiter from "tests/async/TestWaiter";
import TestCallbackUtil from "tests/utils/TestCallbackUtil";

(function()
{
    // Load and run all unit tests.
    QUnit.load();

    QUnit.start();
}());
