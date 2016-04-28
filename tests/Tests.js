"use strict";

import QUnit from "lib/qunit/qunit";
import TestCallbackUtil from "tests/utils/TestCallbackUtil";

(function()
{
    console.log("WTF");
    console.log(QUnit);
    console.log(TestCallbackUtil);
    
    QUnit.load();
    QUnit.start();
}());
