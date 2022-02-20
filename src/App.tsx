/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-ignore
import emoji from "emoji-dictionary";
// @ts-ignore
import remarkSectionize from "remark-sectionize";
import TOC from "./toc";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneLight} from "react-syntax-highlighter/dist/esm/styles/hljs";

const markdown = `
# Chapter 4: Storing Data in C++

We use **variables** to store data in C++.

## Putting Your Data in Place: Variables

In C/C++ programming, a variable is simply a storage bin with an associated name.

### Create an integer value

Writing code to create a variable are being refered as **creating a variable**. Variable consists of three aspects:

| Aspect | What It Means                                                |
| ------ | ------------------------------------------------------------ |
| Name   | The name you used in your application to refer to the variable |
| Type   | The type of information that the variable can hold           |
| Value  | The actual thing that the storage bin holds                  |

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int mynumber;
	mynumber = 10;
	cout << mynumber << endl;
	return 0;
}
\`\`\`

The first line inside \`main()\` looks like this:

\`\`\`cpp
int mynumber;
\`\`\`

The word \`int\` stands for **integer** in C++, indicates the type of the variable. Next is the name of the variable. This variable is named \`mynumber\`. The variable declaration is then ended with a **semicolon (;)**.

The next line looks like this:

\`\`\`cpp
mynumber = 10;
\`\`\`

This line that puts things into the variable is being known as an **assignment**. Since this variable is declared to be an integer, putting anything but a number will result in an error. Note that every statement ends with a **semicolon** in C++. The action of putting a value  into variable can be expressed as **setting** the variable to the value.

The next line is:

\`\`\`cpp
cout << mynumber << endl;
\`\`\`

This lines simply write the value in \`mynumber\` on the console. Since the previous line of code puts a \`10\` into the variable, the result will be:

\`\`\`
10
\`\`\`

Two things can be done to a variable:

1. **Set the variable** - Put something inside the variable.
2. **Retrieve the value** - Get the content that is stored inside the variable.

### Declaring multiple variables

To declare multiple variables witht the same type in the same row:

\`\`\`cpp
int num1, num2, num3;
\`\`\`

This line create three seperate variables: \`num1\`, \`num2\`, and \`num3\`. Each of them holds an integer value. To put thing inside them:

\`\`\`cpp
num1 = 1;
num2 = 2;
num3 = 3;
\`\`\`

When running the application, the computer first create three empty integer variables, and put values into each of them respectively.

### Changing values

You can still change the value inside a variable after it's being initialized:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int mynumber;
	mynumber = 10;
	cout << mynumber << endl;

	mynumber = 20;
	cout << mynumber << endl;

	return 0;
}
\`\`\`

When you see a single **equal (=)** sign by itself, the item on the left side of equal sign is variable of item that receives the information that is on the right side.

### Setting one variable equal to another

The process of retrieving the value of one variable and putting it in the other is often refered to as **copying** the variable from one to another:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int first, second;
	first = 50;
	second = first;
	cout << second << endl;
	return 0;
}
\`\`\`

When copying the values from one to another, the two variables must be the same type, or the application will throw an error and stop running.

### Initializing a variable

When a variable is created, there are nothing inside it. Hence, something has to be put into it. The process of placing a value inside a variable before trying to retrieve its contents is called **initializing the variable**. There are two possible way of doing it. The first method declare the variable and put something into it, which takes two lines of code:

\`\`\`cpp
int mynumber;
mynumber = 10;
\`\`\`

The second method takes only one line of code, which is a bit quicker.

\`\`\`cpp
int mynumber = 10;
\`\`\`

### Naming your variables

C++ variables are **case sensitive**, that means \`Count\` and \`count\` will be treat as two different variables. Kindly don't use these two variables in the same application. Although it won't cause any issue when compiling, the mere humans that may have to read your code or work on it later might get confused.

Here are the rules that have to be followed when creating a variable name:

1. **Characters** - You can only use uppercase and lowercase letters, numbers, and underscores in your variable names. Other symbols are not allowed. The only catches are that
   - The first character cannot be a number.
   - The variable name cannot consist of only numbers.

2. **Length** - You can have unlimited amount of characters in your variable name, but do you really have to create such a long variable name? I recommend keeping the variable namees long enough to make sense and short enough so that you can easily type them out.

## Manipulating Integer Variables

Arithmetic operations like addition, subtraction, multiplication and division can be done on variables. You can retrieve the value inside a variable, do arithmetic operations with it, and then print the result out or store it back to the variable or into another variable.

### Adding integer values

The example below add two variables (\`a\` and \`b\`) and print it out to the console:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int a, b;
	a = 2;
	b = 3;
	cout << a + b << endl;
	return 0;
}
\`\`\`

If you want to use the summed value later, you can store it inside another variable:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int a, b, total;
	a = 2;
	b = 3;
	total = a + b;
	cout << total << endl;
	return 0;
}
\`\`\`

Numbers can also be added to the variables:

\`\`\`cpp
cout << a + 5 << endl;
\`\`\`

You can also store the result into another variable:

\`\`\`cpp
total = a + 5;
cout << total << endl;
\`\`\`

You can also store the result back into the same variable:

\`\`\`cpp
total = total + 5;
\`\`\`

This can also be written as:

\`\`\`cpp
total += 5;
\`\`\`

You can also use \`+=\` notation with other variables:

\`\`\`
total += b;
\`\`\`

That means add the value inside \`total\` and the value inside \`b\` and store the result back to \`total\`.

If you just want to add 1 to a variable, a.k.a. **incrementing the variable**, you can use an even shorter shortcut:

\`\`\`cpp
total ++;
\`\`\`

This is the same as \`total += 1\` and \`total = total +1\`.

Note that when you see \`++\`, it's pronounced as **plus plus**, not **double plus**.

#### Doing Things with Addition

| What You Can Do                                              | Sample Statement          |
| ------------------------------------------------------------ | ------------------------- |
| Add two variables                                            | \`cout << a + b << endl;\`  |
| Add a variable and a number                                  | \`count << a + 5 << endl;\` |
| Add two variables and save the result in a variable          | \`total = a + b;\`          |
| Add a number to what's already in the variable               | \`total = total + 5;\`      |
| Add a number to what's already in the variable by using shortcut | \`total += 5;\`             |
| Add a variable to what's already in the variable             | \`total = total + 5;\`      |
| Add a number to what's already in the variable by using shortcut | \`total += 5;\`             |
| Add one to a variable                                        | \`total++; \`               |

### Subtracting integer variables

Everything you can do that involves addition of integer can also be done with subtraction. Simply change the operator from \`+\` to \`-\`.\`b\`

This prints the result of \`a - b\` but doesn't modify the value inside \`a\` and \`b\`:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int a, b;

	a = 5;
	b = 1;

	cout << a - b << end;

	return 0;
}
\`\`\`

You can subtract an integer from the variable:

\`\`\`cpp
cout << a - 2 << end;
\`\`\`

You can subtract one variable from another and store the result inside a third variable:

\`\`\`cpp
c = a - b;
\`\`\`

Or store the result back into the variable:

\`\`\`cpp
a = a - b;
\`\`\`

You can do the same thing by using shortcut notation:

\`\`\`cpp
a -= b;
\`\`\`

You can do the same thing with a number as well:

\`\`\`cpp
a = a - 2;
\`\`\`

or

\`\`\`cpp
a -= 2;
\`\`\`

Finally, to subtract 1 from a variable, a.k.a **decrementing the variable**, simplt use two minus sign (pronounced as **minus minus**):

\`\`\`cpp
a--;
\`\`\`

### Multiplying integer variables

We use the **asterisk (\*)** symbol to do multipication in C++.

To print a result of multiplying two variables:

\`\`\`cpp
cout << a * b;
\`\`\`

To print a result of multiplying a variable and a number:

\`\`\`cpp
cout << a * 5;
\`\`\`

To multiply two variables and store the result in a third variable:

\`\`\`cpp
c = a * b;
\`\`\`

To modify a variable by multiplication:

\`\`\`cpp
a = a * b;
\`\`\`

or

\`\`\`cpp
a *= b;
\`\`\`

You can also do the same thing with a number:

\`\`\`cpp
a = a * 5;
\`\`\`

or

\`\`\`cpp
a *= 5;
\`\`\`

Note that there is no such thing as a **\*\*** operator to multiply a value by 1 or by itself. You'll get an error when compiling if you type \`a**;\`.

### Dividing integer variables

Whole numbers can't be divided evently sometimes. When doing division with integers in computer, you'll get two different answers: the **quotient** and the **remainder**.  C++ uses different operator for figuring these two different answers: **slash (/)** for finding the quotient, and **percentage sign (%)** for finding remainder (also known as **modulus**).

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int a, b;

	cout << "Dividing 28 by 14." << endl;

	a = 28;
	b = 14;

	cout << "Quotient  " << a / b << endl;
	cout << "Remainder " << a % b << endl

	cout << "Dividing 32 by 6." << endl;

	a = 32;
	b = 6;

	cout << "Quotient  " << a / b << endl;
	cout << "Remainder " << a % b << endl;

	return 0;
}
\`\`\`

When you run this application, you'll get the following output:

\`\`\`
Dividing 28 by 14.
Quotient  2
Remainder 0
Dividing 32 by 6.
Quotient  5
Remainder 2
\`\`\`

You can store the result of division and modulus into other variables:

\`\`\`cpp
q = a / b;
r = a % b;
\`\`\`

Shortcuts are also available:

\`\`\`cpp
int a = 30;
a /= 5;
cout << a << endl;
\`\`\`

and

\`\`\`cpp
int a = 33;
a %= 5;
cout << a << endl;
\`\`\`

## Characters

**Character variable** is able to hold just one character that C++ stores as a number. It holds a value between -127 and 128 (\`char\` or \`signed char\`) or 0 adn 255 (\`unsigned char\`). A list of valid characters can be found on https://en.cppreference.com/w/cpp/language/ascii.

To use a character variable, you use the type name \`char\` before the variable name. To initialize it, you must put your character inside **single quotes** (You'll get an error if using double quotes since double quotes create a string). 

Create a character variable called \`ch\`, put an \`'a'\` into it, and print the variable out:

\`\`\`cpp
char ch;
ch = 'a';
cout << ch << endl;
\`\`\`

### Null character

Null characters are used to signify the end of some data.

To notate the null character in C++, use \`\0\` as in 

\`\`\`cpp
char ch = '\0';
\`\`\`

### Noneprintable and other cool characters

The **newline character** (\`\n\`) symbolizes the start of a new line of text.

The **carriage return character** (\`\r\`) place the insertion point at the start of the line, overriding the existing characters on the line.

Characters like **tab character** (\`\t\`) that starts with a backslash are count as an individual character and can be put inside character variable.

\`\`\`cpp
char ch = '\t';
\`\`\`

Double quote can be put in character variable without leading backslash but single quote does required it:

\`\`\`cpp
char dq = '"';
char sq = '\'';
\`\`\`

To put a backslash inside character variable, you use two backslashes:

\`\`\`cpp
char ch = '\\';
\`\`\`

When compiler sees a backslash, it treat the backslash as a special character and look at whatever follows it.

#### What is That Symbol?

Below are the name of symbols that are often used by computer gigs:

| Symbol | Name                                            |
| ------ | ----------------------------------------------- |
| \.     | Dot                                             |
| \@     | At                                              |
| \&     | Ampersand                                       |
| \#     | Pound                                           |
| \!     | Bang                                            |
| \~     | Tilde                                           |
| \%     | Percent                                         |
| \*     | Star                                            |
| \(     | Left paren or left parenthesis                  |
| \)     | Right paren or right parenthesis                |
| \[     | Left square backet or left bracket              |
| \]     | Right square bracket or right bracket           |
| ==     | Equal-equal                                     |
| ++     | Plus-plus                                       |
| --     | Minus-minus                                     |
| \/     | Forward slash                                   |
| \\     | Backslash                                       |
| \{     | Left brace or left curly brace or open brace    |
| \}     | Right brace or right curly brace or close brace |
| \^     | Caret                                           |
| \"     | Double quotes                                   |

## String

A **string** is a set of characters joining together. **Double quotes** were used to designate the start and the end of a string.

A string variable should have a type of \`string\`:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	string s;
	s = "Hello World!";
	cout << s << endl;
	return 0;
}
\`\`\`

### Getting a part of a string

You can retrieve a single character in a string by putting a square bracket after the string variable, containing the **index** of the character in the string:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	string s;
	s = "Hello World!;";
	cout << s[2] << endl;
	return 0
}
\`\`\`

The result will be:

\`\`\`
l
\`\`\`

Since the index always starts at 0, when you put a \`2\` inside the \`[]\`, you'll get the third character of the string.

A string consists of different characters. Hence, each and every character within a string has the type \`char\`.

\`\`\`cpp
#include <iostream<

using namespace std;

int main() {
	string s = "Hello World!";
	char ch = s[2];
	cout << ch << endl;
	return 0;
}
\`\`\`

The result will still be the same as the last example:

\`\`\`
l
\`\`\`

### Changing part of a string

You can change a character in a string using the bracket notation.

\`\`\`cpp
string s = "Hello World!";
s[1] = 'a';
cout << s << endl;
\`\`\`

This changes the second character of the string from \`e\` to \`a\` and print it out. The result will be:

\`\`\`
Hallo World!
\`\`\`

### Addng onto a string

A string can be added to another string using the \`+=\` notation:

\`\`\`cpp
string s = "Hello ";
s += "World!";
cout << s << endl;
\`\`\`

The process of adding a string onto another is called **concatenation**.

A single character can also be added to a string:

\`\`\`cpp
string s = "Hello World";
s += \`!\`;
cout << s << endl;
\`\`\`

### Adding two strings

You can add two string together by using the \`+\` sign.

To add two string together and store it into another variable

\`\`\`cpp
string a = "Hello ";
string b = "World!"
string c = a + b;
cout << c << endl;
\`\`\`

To add a **string constant** (a string that is surrounded by double quotes in your code) with an existing string variable and store it into another variable:

\`\`\`cpp
string a = "Hello ";
string b = a + "World!";
cout << b << endl;
\`\`\`

You can add two string constant together as well:

\`\`\`cpp
string s = "Hello " + "World!";
cout << s << endl;
\`\`\`

But this is unnessecary, since you can get the exact same result with a much simpler way:

\`\`\`cpp
string s = "Hello World!";
cout << s << endl;
\`\`\`

## Making Decisions Using Conditional Operators

Let's say you have the code below:

\`\`\`cpp
int a = 10;
int b = 20;
string result;
\`\`\`

You want the result to be \`"euqal"\` if a is equal to b and \`"not equal"\` otherwise. Here is how we do it:

\`\`\`cpp
result = (first == second) ? "equal" : "not equal";
\`\`\`

The left side of the single equal sign is the storage bin where the result of the **expression** on the right side will be stored in. The expression used here is called **conditional operators**. Here is how it forms:

\`\`\`cpp
(condition) ? "condition is true" : "condition is false";
\`\`\`

Below are the complete code of doing comparison using conditional operators:

\`\`\`cpp
#include <iostream>

using namespace std;

int main() {
	int a = 10;
	int b = 20;
	string result;
	result = (first == second) ? "equal" : "not equal";
	cout >> result >> endl;
	return 0;
}
\`\`\`
`;

function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\W/g, "-").split("-").filter((e) => e)
    .join("-");
  return React.createElement(`h${props.level}`, { id: slug }, props.children);
}

function App() {
  return (
    <div className="App flex">
      <div className="flex-shrink-0 flex-auto toc w-[26%] p-4 py-6 h-screen overflow-y-auto overflow-x-hidden border-r-[1.6px] border-neutral-200">
        <h1 className="font-medium text-amber-500 text-base mt-0 mb-6 outline-none after:hidden">OUTLINE</h1>
        <ReactMarkdown
          children={TOC(markdown)}
        />
      </div>
      <div className="px-32 flex-shrink py-12 flex-auto w-[74%] h-screen overflow-y-auto overflow-x-hidden">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSectionize]}
          children={markdown.replace(/:\w+:/gi, (name) => emoji.getUnicode(name))}
          components={{
            h1: HeadingRenderer,
            h2: HeadingRenderer,
            h3: HeadingRenderer,
            h4: HeadingRenderer,
            h5: HeadingRenderer,
            h6: HeadingRenderer,
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={atomOneLight}
                  customStyle={{
                    backgroundColor: "rgb(229 229 229)"
                  }}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
