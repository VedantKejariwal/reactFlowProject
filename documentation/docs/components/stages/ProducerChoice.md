<a name="ProducerChoice"></a>

## ProducerChoice()
This function handles the entirety of the Producer Choice stage. 
Initializes player(producer), game, producer's warrants and 
different states that will rerender the page based on actions.

**Kind**: global function  

* [ProducerChoice()](#ProducerChoice)
    * [~rounds](#ProducerChoice..rounds) ⇒
    * [~addItem()](#ProducerChoice..addItem) ⇒ `Array.&lt;string&gt;`
    * [~selectWarrant()](#ProducerChoice..selectWarrant)
    * [~handleSubmit()](#ProducerChoice..handleSubmit) ⇒

<a name="ProducerChoice..rounds"></a>

### ProducerChoice~rounds ⇒
This loop takes in the number of rounds from the treatment and verifies the round exists.

**Kind**: inner constant of [`ProducerChoice`](#ProducerChoice)  
**Returns**: N/A  
<a name="ProducerChoice..addItem"></a>

### ProducerChoice~addItem() ⇒ `Array.&lt;string&gt;`
This function adds in the current round's produced item's quality into an array of strings.

**Kind**: inner method of [`ProducerChoice`](#ProducerChoice)  
**Returns**: `Array.&lt;string&gt;` - The list of producer's product qualities with the appended string.  
**Example**  
```js
addItem("low") -> ["low"];
  // Returns the list of the producer's product qualities with the appended product.
```
<a name="ProducerChoice..selectWarrant"></a>

### ProducerChoice~selectWarrant()
Author: Isa, Tiger.

set's the warrantStatus and clickCounter useState to conditonally render the warrant tag.
clickCounter is used to not render a color before an option is picked by the producer.

**Kind**: inner method of [`ProducerChoice`](#ProducerChoice)  
<a name="ProducerChoice..handleSubmit"></a>

### ProducerChoice~handleSubmit() ⇒
This function is the handle submit that updates capital based on product quality and warrant status.

**Kind**: inner method of [`ProducerChoice`](#ProducerChoice)  
**Returns**: The user interface code after it updates fields (capital, currentQuality, Warrant Status)  
