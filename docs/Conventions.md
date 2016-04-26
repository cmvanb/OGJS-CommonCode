# Conventions

## Line length

Use a maximum line length of 80 characters. Originally this maximum length was a technical limit, however these days it is simply a nice style that has some desirable benefits.

Benefits of a maximum line length of 80 characters include:

* Promoting shorter, more readable code.
* Allowing two code files to open adjacently on standard HD (1920x1080) monitors.

## Line breaks

### Function call parameters

#### Situation

In this situation the function call parameters have extended past the 80 character limit.

    // ------------------------------------ This is the 80 character limit. --->

    {
        exampleObject.exampleMethod("Some example data in a string.", "More example data.");
    }

#### Solution

The solution is to change the formatting of the function call to a block style. Each parameter is put on a new line. This gives each parameter plenty of space, and isolates the function call for better visibility.

    {
        exampleObject.exampleMethod(
            "Some example data in a string.",
            "More example data.");
    }
