---
title: Step 7 - Extract reputation and warrants dataframes

sidebar_label: 'Step 7'
sidebar_position: 8
---
---

import DAF7 from '@theme/DAF7';

<DAF7 />

---

## Step 7.0.0: Rename columns appropriately

To ensure consistency between the df_reputation and df_warrants DataFrames, we rename columns to have the same names.

## Step 7.0.1: Split participantID to PlayerID (consumer) and ProducerID (producer)

We split the participantID column into two new columns: Where PlayerID contains IDs of consumers (players) and ProducerID contains IDs of producers (sellers). This is done by filtering out the role column.

## Step 7.1.: Process Warranted and create WarrantCount in df_warrants

We process the Warranted column in df_warrants to create a new column, WarrantCount, which counts the number of warranties for each round.

Extracting consumerCount from the treatment column gives us the number of consumers in the round. After that we generate WarrantCount based on the boolean values in Warranted, the list contains True then WarrantCount is updated.

```
Input: 
Warranted: [[True, False, True], [False, False, False]] consumerCount: [3, 2]
```
```
Output: 
WarrantCount: [[3, 0, 3], [0, 0, 0]]
```

## Step 7.2.0: Create df_ads

We standardize column names and identify common columns between the two DataFrames. Then, we concatenate them into a single DataFrame, df_ads.

## Step 7.2.1.: Process the ProductCost and ProductPrice columns to count the occurrences of low quality, high quality, not warranted, and warranted products

We count occurrences of the Low-quality products (ProductCost = 2), High-quality products (ProductCost = 6), Not-warranted products (ProductPrice = 10), Warranted products (ProductPrice = 12). We do this by counting the number of product cost and product price according to the above criteria.

```
Input:
ProductCost: ['[2, 6]', '[6, 2]']
ProductPrice: ['[10, 12]', '[12, 10]']
```
```
Output:
Low quality: 2, High quality: 2, Not warranted: 2, Warranted: 2
```

## Step 7.2.3.: Add RatingIndicator to df_ads

We create a new column, RatingIndicator, which is set to 1 if a consumer has any good or bad ratings, and 0 otherwise. This is to check if any ratings were given

```
Input:
GoodRatings: [1, 0, 2]
BadRatings: [0, 0, 1]
```
```
Output:
RatingIndicator: [1, 0, 1]
Step 8:
```

---
