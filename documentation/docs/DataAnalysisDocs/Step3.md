---
title: Step 3 - Create Round arrays for each player

sidebar_label: 'Step 3'
sidebar_position: 4
---
---

import DAF3 from '@theme/DAF3';

<DAF3 />

---

## Step 3.0: Extract 'numRounds' from the 'treatment' column

Treatments is a column in the DataFrame that contains JSON-like strings which is converted into a dictionary which includes a key called numRounds. We extract the value of the key numRounds and store it in the Rounds array.

```
Rounds
0       5
1       5
2       5
3       5
4       5
```

## Step 3.1: Create the 'Round' column with a list from 1 to the value in 'Rounds'

The variable X (value = 5) here is the value from numRounds key and we create an array called Round which spans from 1 to 5.

```
Round
0  [1, 2, 3, 4, 5]
1  [1, 2, 3, 4, 5]
2  [1, 2, 3, 4, 5]
3  [1, 2, 3, 4, 5]
4  [1, 2, 3, 4, 5]
```

---