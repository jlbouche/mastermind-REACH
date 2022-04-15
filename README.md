# Numbers Mastermind

This is a game where a player tries to guess the number combinations. At the end of each
attempt to guess the 4 number combinations, the computer will provide feedback whether the
player had guess a number correctly, or/and a number and digit correctly. A player must guess
the right number combinations within 10 attempts to win the game.

## Game Rules/Reqs

* At the start of the game the computer will randomly select a pattern of four different
numbers from a total of 8 different numbers.
* A player will have 10 attempts to guess the number combinations
* At the end of each guess, computer will provide one of the following response
as feedback:
* The player had guess a correct number
* The player had guessed a correct number and its correct location
* The player’s guess was incorrect
* The computer’s feedback should not reveal which number the player guessed correctly
* Must use https://www.random.org/clients/http/api/ to generate random numbers

## UI Reqs

* Ability to guess the combinations of 4 numbers
* Ability to view the history of guesses and their feedback
* The number of guesses remaining is displayed

## Stretch goals/ideas

* Add support to give hints
* Add a configurable “difficulty level” and adjust the number of numbers that are used
* Draw all of graphical components, add animations and sounds
* Change numbers into colored pegs, shapes, animals, etc
* Keep track of scores
* Add a timer for the entire game, or each guess attempts
* Anything else that you come up with to make the game more fun/interesting!

## Implementation

Javascript/HTML/CSS/Bootstrap/Random.org's API