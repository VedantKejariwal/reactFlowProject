---
title: Step 4 - Extract GoodRatings, BadRatings and compute NetRatings for each player

sidebar_label: 'Step 4'
sidebar_position: 5
---
---

import DAF4 from '@theme/DAF4';

<DAF4 />


---

## Step 4.0: Create extract_ratings function that extracts accumulated good and bad ratings for each producer

A function extract_ratings is created (which takes in all the rows in the column ‘reviews’) to extract the most recent good (index=0) and bad (index=1) ratings from the reviews column. It parses the reviews string into a list and retrieves the last sublist's values. We take the last index because the ratings get added after each round and the last index contains the accumulated ratings.

```
Input: review_str = "[[1, 2], [3, 4]]", index=0 
```
```
Output: 3 (the last sublist is [3, 4], and the value at index 0 is 3).
```

## Step 4.1: Apply extract_ratings to create GoodRatings and BadRatings for df_reputation and df_warrants

The extract_ratings function is applied to the reviews column of both df_reputation and df_warrants to create two new columns: GoodRatings and BadRatings.

```
Input: reviews = "[[1, 2], [3, 4]]" 
```
```
Output: GoodRatings = 3, BadRatings = 4

```

## Step 4.2: Replace all NaN values with 0
Replace any missing (NaN) values in GoodRatings and BadRatings with 0. 

## Step 4.3: Compute NetRatings = GoodRatings - BadRatings
Calculate NetRatings as the difference: NetRatings = GoodRatings - BadRatings.

---