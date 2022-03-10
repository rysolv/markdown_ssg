title=Stop calling yourself a Junior engineer
description=7 tips for your first tech job
image=https://compassionate-saha-53a9e6.netlify.app/assets/no-idea-dog.png
date=2022-03-10
publish=true
@@@

<small>Published 2022-03-10</small>
![Markdown to HTMl](./assets/no-idea-dog.png)

# Stop calling yourself a Junior Engineer

<p style="text-align:center; font-style: italic; font-size: larger">Seven tips for <span style="text-decoration: line-through">Junior</span> Engineers</p>

&nbsp;

It happened! After months of studying data structures and cramming LeetCode problems you land that first dev job!
Only to discover that rather than _reversing linked lists_, you're reviewing pull requests and tracking tickets in Jira.

&nbsp;

In fact, the only linked-list you're likely to see is `Git`, and you never covered _rebasing_ or all the weird branching strategies your company may use.

It's a common culture shock when you pivot from **studying for a dev job** vs **working your first dev job**. And I constantly see developers reaching out for advice on navigating their first few months at a new job.

Take a breather. Remember, working your first dev job is _WAY_ easier than getting one. But to help smooth the transition, I've compiled a list of 7 habits that really help a new developer get up to speed.

### 1. Practice Asynchronous Communication

Phrase questions and responses in a detailed way that doesn't require your teammate to be online.

❌ "Hey can I ask you a question?"

✔ "Hey what port are we running the email server on?"

When you're heads down on a problem, these little Slack pings can really break your focus. Asynchronous communication allows teammates to answer questions at their own pace.

### 2. Ask for help when stuck (but try first)

> <small>11:50 AM</small>
>
> Hey what port does the email server run on?
>
> <small>11:52 AM</small>
>
> Oh nevermind it's in the docs (:

This is the one I see people get wrong the most. It's a fine balance between <b>spinning your wheels</b> on an unsolvable problem and being <b>too quick to ask questions</b>. Sometimes you just need a couple hours to figure out a problem, and other times you'll spend days on a question that would take your teammate 5 minutes to answer.

<br>
<i>How much time should I spend?</i> Hard to say. Over time you'll develop better judgement on these decisions. If your team has a point based system, maybe try an hour per point?

-   `1pt story` => spend an hour before asking for help
-   `8pt story` => take a day to dive in before reaching out

Most often I see new engineers err on the side of caution, and spin their wheels for days when they should be asking for help. Your teammates are there to help you, so reach out (_asynchronously_)!

### 3. Log your work

Work in a way that doesn't require 1 on 1 time to explain what you've been up to. Progress updates, setbacks, blockers should all be visible without your teammates needing to reach out directly.

Try looking at your stories from a teammate or Project Manager's perspective.

> Can I quickly see where you are in the process?
>
> If I'm waiting for you to submit a fix, how will I know when you're done?
>
> When are your changes ready to pull down?

The specifics of reporting will depend on your company's workflow, but it never hurts to:

1. **Make your Pull Requests readable**

    - Describe the ticket, and your implementation.
    - Write better commit messages.
    - Include links to relevant code / blockers.

2. **Update Jira (or whatever task tool you use)**

    - SCRUM tools are only as good as the data they're given. Keep your stories up to date, highlight any blockers, and give realistic time frames.

### 4. Git is your friend

**First**, make sure you understand your company's [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows).

> Do we branch off of dev? The latest release? When do we create an epic? Do we merge to the feature branch or release branch?

Every company is going to be different here, as the "best git strategy" is still a fiercely debated topic.

**Second**, brush up on git! You'll need it.

Need to go work on another branch real quick? `git stash`

```
// All all the current files and push it to the stash
git add .
git stash

// Do whatever you need to do
git checkout some-other-branch

// Go right back to where you were
git checkout original-branch
git stash pop
```

Forgot to checkout a new branch and already committed to `main`?

```
On branch main
Your branch is 1 commit ahead of origin/main

// Create a new branch (WITHOUT the -b flag)
git branch the-proper-branch

// Reset main to the head
git reset HEAD~ --hard

// Switch over to your new branch with all your changes
git checkout the-proper-branch
```

Maybe take a few hours to peruse the official docs: https://git-scm.com/doc

Or for emergencies, check out [Oh Shit, Git!?!](https://ohshitgit.com/)

### 5. Document your onboarding flow

99% of the time, you're gonna run into some problems onboarding.

-   Missing secret keys
-   API readme is out of date
-   They forgot to add you to the dev server

Write these things down!

Updating READMEs is an invaluable skill. And one that always often gets pushed to the backburner. This is a great contribution you can make on day #1 at your new company.

And the next time your company hires someone, you'll be able to make their process that much easier.

### 6. Offer fresh perspective

Don't underestimate your voice in planning/architecture decisions. You may not understand all the minutiae of the challenge at hand, but you help steer the conversation in the right direction.

-   "Which users are affected by this bug?"
-   "Does this need to be refactored right now?"
-   "What is the smallest step we can take in the right direction?"

If a solution sounds too complex, <i>maybe it is</i>? Spend enough time on a problem and you're likely to develop tunnel vision. Having a fresh set of eyes can be immensely helpful. So speak up!

### 7. Finally, stop calling yourself a Junior engineer

This one is a bit subjective. But I see this question come up a lot:

```
"How do I stand out as a junior engineer?"
"How can I be the best junior engineer?"
```

And I hate it. For me, this comes down to confidence, and the level of emphasis you place on your job title.

Your company will have a ton of different names for the job.

> L1, L2, L3, L4, SWE I, SWE II, Junior Dev, Senior Dev, Tech Lead, Team Lead, Principal, Architect, etc.

Now I'm not advocating that you start calling yourself [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds). Or only apply to Principal Engineer roles.

But you don't need to wrap _*"Junior Engineer"*_ around your whole professional identity. Of course you won't know all there is to know about programming. But neither does anyone else at your company!

&nbsp;

You've landed the job! The hard part is over. And a great way to advance from the Junior Engineer role, is to cross out the ~~Junior~~.
