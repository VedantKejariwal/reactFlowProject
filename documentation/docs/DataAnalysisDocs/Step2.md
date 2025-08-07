---
title: Step 2 - Count units sold per round for each player (SoldStock)


sidebar_label: 'Step 2'
sidebar_position: 3
---
---

import DAF2 from '@theme/DAF2';

<DAF2 />


---

## Create the count_sales function that counts number of sales in each round

First it converts the string to a list and then counts the number of items in the list.

```
"[['c2', 'c1'], ['c2'], ['c1']]" -> 
[["c2", "c1"], ["c2", "c1"], ["c2", "c1"], ["c2", "c1"], ["c1"]]
```

## Apply the function to count sales per round for each player

In this step, the script calculates the number of items sold by each producer in every round. This is done by processing the sold column, which contains data about the consumers each producer sold to in each round.

```
[["c2", "c1"], ["c2", "c1"], ["c2", "c1"], ["c2", "c1"], ["c1"]] -> 
[2, 2, 2, 2, 1]
```

Here ["c2", "c1"] means that producer A in round 1 sold 2 products, using the len function we add the number of elements in the list (c2, c1) = 2, this gives the number of products sold by Producer A in round 1.

---