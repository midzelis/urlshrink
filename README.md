# URL Shrink source code

Note, this code is just an quick example and is not of the highest quality. 

## Note: Google deprecated the google URL shrinker, so this code doens't work anymore


## Installing urlshrink using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

-   Enable Dev Hub in your Trailhead Playground
-   Install Salesforce CLI
-   Install Visual Studio Code
-   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

```
sfdx force:auth:web:login -d -a myhuborg
```

3. Clone the urlshrink repository:

```
git clone https://github.com/midzelis/urlshrink
cd urlshrink
```

4. Create a scratch org and provide it with an alias (**urlshrink** in the command below):

```
sfdx force:org:create -s -f config/project-scratch-def.json -a urlshrink
```

5. Push the app to your scratch org:

```
sfdx force:source:push
```

6. Open the scratch org:

```
sfdx force:org:open
```

7. In **Setup**, under **Apps/App Manager**, click new **Lightning App** give it a name, click next, and next again, until you see "Add Utility Items". Click **Add Utility Item** and select **gLinkShrink** from the custom heading. Note, you must enter your google API key to make this work. 

8. Finish the wizard. 

9. In App Launcher, select the App you just created.