# Human-AI Marketplace - How to Document Code
Add docstrings & comments when creating or modifying files in the codebase.

## Auto-Generated Documentation for HAI Market
This repo uses an automated documentation pipeline that scans the codebase and generates Markdown files using `jsdoc-to-markdown`. You only need to follow a specific format for your code comments, and the rest is taken care of with one command.

---

### How to Document Your Code
To include your code in the docs, use JSDoc-style comments like this:

```javascript 
/**
*@summary This runs when a round ends.
*@param {object} round - The round object.
*@returns {void} */ Empirica.onRoundEnded(({ round }) => { ... });
*/
```

✅ Use valid types like: `string`, `number`, `boolean`, `object`, `Array<string>`, etc.

Check out the follwoing exampples for refernce!

```javascript
/**
 * @summary Adds two numbers and returns the result.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Sum of a and b.
 */
function add(a, b) {
  return a + b;
}
```

```javascript
/**
 * @summary Sends a welcome message to the user.
 * @param {string} username - The name of the user.
 * @returns {void}
 */
function greetUser(username) {
  console.log(`Welcome, ${username}!`);
}
```

```javascript
/**
 * @summary Returns a list of active users.
 * @returns {Array<string>} An array of usernames.
 */
function getActiveUsers() {
  return ["alice", "bob", "charlie"];
}
```

```javascript
/**
 * @summary Initializes the player in the game.
 * @param {object} player - The player object.
 * @param {string} role - The role assigned to the player ("producer" or "consumer").
 * @returns {void}
 */
function initPlayer(player, role) {
  player.set("role", role);
}
```

```javascript
/**
 * @summary Calculates profit based on price and cost.
 * @param {number} price - Selling price of the product.
 * @param {number} cost - Production cost of the product.
 * @returns {number} The profit earned.
 */
function calculateProfit(price, cost) {
  return price - cost;
}
```

**Additionally any comments with `/** */` will also be included in documenatation.**

For Example:
```javascript
/**
  This loop takes in the number of rounds from the treatment and verifies the round exists.
  @returns N/A
  */
  ```

---

### How to Generate Docs

Run this command from the root of the repo:

`npm run gendocs`

This will:

- Scan all files in client/src and server/src (subfolders like components, stages, intro-exit)

- Parse JSDoc-style comments

- Auto-generate .md files in documentation/docs/components/ and documentation/docs/server/

- Clean invalid HTML formatting for Docusaurus

---

### Output Location

Docs will be created inside:

`documentation/docs/components/`
`documentation/docs/server/`

**Each JS or JSX file will have a matching .md file in the same folder structure.**

---

*Just add proper JSDoc comments to your code and run:*

`npm run gendocs`

*It will generate docs in the right folders — no manual setup needed.*
