---
title: Step 5 - Extract reputation and warrants dataframes

sidebar_label: 'Step 5'
sidebar_position: 6
---
---

import DAF5 from '@theme/DAF5';

<DAF5 />

---

This step processes the dataframe to add three new columns in df_warrants and df_reputaton: Condition, ProductCost, and ProductPrice.

```javascript
df_reputation = prepare_and_process(df_reputation) 
df_warrants = prepare_and_process(df_warrants)
```

## Step 5.0: Create prepare_and_process function using helper function process_row

The prepare_and_process function initializes the following columns in the DataFrame: 

- Condition: Indicates the market type (0 for reputation, 1 for warrants) this will be needed when we combine the two dataframes to df_ads.
- ProductCost: A list of costs per round based on product quality (low → 2, high → 6) using process_row function. 
- ProductPrice: A list of prices per round based on whether the product is warranted (not warranted → 10, warranted → 12) using process_row function.

```
Condition: None
ProductCost: None
ProductPrice: None
```

## Step 5.1: Process each row (process_row function)

The process_row helper function processes each row to compute the values for ProductCost, and ProductPrice: 
We create a loop depending on the length of lists of quality_list and warrant_list and then take each round’s product and based on the conditions below append new values to new columns.

- ProductCost: Computed based on productQuality: low → 2 high → 6
- ProductPrice: Computed based on warrants: True → 12 False → 10

```
Input:
productQuality: ["low", "high", "low"]
warrants: [True, False, True]
```
```
Output:
ProductCost: [2, 6, 2]
ProductPrice: [12, 10, 12]
```

## Step 5.2: Apply prepare_and_process to create Condition, ProductCost, and ProductPrice and manually set Condition to 0 for reputation and 1 for warrants

The prepare_and_process function applies process_row to every row in the DataFrame, updating the columns.
```
Output:
productQuality: ["low", "high", "low"]
warrants: [True, False, True]
Condition: 1
ProductCost: [2, 6, 2]
ProductPrice: [12, 10, 12]
```

---
