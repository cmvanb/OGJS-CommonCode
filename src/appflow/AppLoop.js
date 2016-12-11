/**
 * AppLoop creates and maintains an application update and render loop.
 *
 * @author Casper
 */

"use strict";

class AppLoop
{
    /**
     * AppLoop.
     *
     * @constructor
     */
    constructor()
    {
    }

    function update(dt)
    {
    }

    function render(dt)
    {
    }

    function animate(t)
    {
        requestAnimationFrame(animate);

        update(clock.getDelta());
        render(clock.getDelta());
    }
}

export default AppLoop;
