class CallbackUtil
{
    /**
     * Create a js object encapsulating a callback function and it's context, and any additional
     * arguments.
     *
     * @param callback
     * @param context
     * @returns {Object}
     */
    static createCallbackContextObject(callback, context)
    {
        var args = Array.prototype.slice.call(arguments);

        // Splice out callback and context, we want to pass any extra arguments as an array.
        args.splice(0, 2);

        return {
            callback: callback,
            context: context,
            args: args
        };
    };
}

export default CallbackUtil;
