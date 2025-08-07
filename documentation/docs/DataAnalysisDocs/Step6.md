---
title: Step 6 - Create Challenged and NumChallenges

sidebar_label: 'Step 6'
sidebar_position: 7
---
---

import DAF6 from '@theme/DAF6';

<DAF6 />

---

This step processes the challenges column in the data to extract information about challenges in each round.
Two new columns are created: 

- Challenged: A list of boolean values indicating whether a challenge occurred in each round (True if a challenge occurred, False otherwise).
- NumChallenges: A list of integers representing the number of challenges (True)  in each round.

## Step 6.0: Create process_challenges function to extract data from the ‘challenges’ column

First converts Strings to Lists
For each round in the challenges column: 

- Add True to Challenged if any challenge occurred, by checking if the value in the list is NOT "No Challenge", otherwise add False. 

- Count the number of True challenges in the round and store it in NumChallenges.

## Step 6.1: Apply process_challenges to both dataframes

Apply the process_challenges function to both df_reputation and df_warrants to process their challenges columns.

---