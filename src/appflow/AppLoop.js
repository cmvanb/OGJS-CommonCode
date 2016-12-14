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
    constructor(timeSource)
    {
        this._timeSource = timeSource;
    }

    /**
     * Update the application. Pass the amount of time elapsed since this
     * function was last called.
     *
     * @param deltaTime
     */
    update(deltaTime)
    {
    }

    /**
     * Render the application. Pass the amount of time elapsed since this
     * function was last called.
     *
     * @param deltaTime
     */
    render(deltaTime)
    {
    }

    animate(t)
    {
        requestAnimationFrame(animate);

        this.update(this._timeSource.getDeltaTime());
        this.render(this._timeSource.getDeltaTime());
    }
}

export default AppLoop;
