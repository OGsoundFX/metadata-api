# What is this metadata project ??? :monocle_face:

It's a small **Nodejs** app that does 2 things:
* Replace the whitespace and "-" characters with "-" (underscores) from all filenames contained in a folder
* Fetch all the metadata you need from thes files and store them in a **JSON** file

### But Why ??? :woman_shrugging:

Short answer: Because I needed it :nerd_face:
<br>
I often need to upload a large number of **sound effect audio tracks** to in order to add them to my catalogue in my **Sound Effect online shop: [BamSFX.com](https://www.bamsfx.com)**
<br>
* My first **problem** was: all my track names contain whitespaces :facepalm:
* My second **problem** was: I need seed my database with all the information from these tracks, and fortunately a lot of it is stored as **metadata**. I just need to reach it, store it in a **JSON** file that I can later use to seed my **Ruby on Rails app [BamSFX.com](https://www.bamsfx.com)**

### Then how does it work ??? :raised_eyebrow:

#### Installation:

After ```cloning``` the project, run:
``` npm install ```

#### Files and Folders Walkthrough:
The files and folders you should have a look at are:
* Folder ```originalFiles```: <br> This is where you will place all your files that you want to modify the titles.
* Folder ```files```: <br> This is the destination folder where are the newly titled files will end up. <br> This is also the folder where the app will look for the tracks to extract their metadata and store the information in the ```JSON``` file (see bellow).
* File ```tracks.json```: this is the destination file where the metadata from your files will be stored.
* File ``ìndex.js```: this is where all the code will be happening

#### The ``` index.js``` file, how does it work:

If you have added some files in the ```originalFiles```folder, you can run the program: <br> ```node index.js``` <br>
This will:
1- Remove all the whitespace and '-' characters from the files titles and replace them with '_'.
2- Store and fetch and bunch of metadata (specifically handpicked by myself in this case) and export them into the ```tracks.json``` file.

#### Adapt the program to your needs, and run it:

In the ```index.js``` files, I have indicated the different steps in comments like so:
````
  // STEP 1: REMOVE whitespace & '-' from track titles and move the files from
  // the "originalFiles" folder to the "files" folder
  
  < SOME CODE >
  
  // STEP 2: get metadata from files in the "files" folder
  
  < SOME CODE >
  
  // STEP 3: run both functions asynchronously
  
  < SOME CODE >
  
  // STEP 4 (optional): verify if there is the correct amount of files in the JSON file
  
  < SOME CODE >
````

**YOU CAN ADAPT THE CODE AND RUN JUST ONE OR BOTH PROGRAMS DEPENDING ON YOUR NEED BY MODIFYING STEP 3**
In step 3, both functions are run asynchronously like so:
````
  replace();
  setTimeout(() => {
    metadata();
  }, 5000)
````
**SCENARIO 1: you just want to use the first STEP and change the titles of your files**

* **PREPARATION** <br> Place all your files to which you want to change the title in the folder ```originalFiles```
* **STEP 1** <br> **line 25** replace the regex code according to your needs
* **STEP 2** <br> **COMMENT OUT** (you don't need it)
* **STEP 3** <br> **REPLACE THE CODE WITH:** ```replace()``` to run only the **replace()** function!
* **STEP 4** <br> **COMMENT OUT** (you don't need it)
* **RESULT** <br> Find your files with their new titles in the folder ```files```

**SCENARIO 2: you just want to use the second STEP and get the metadata of a list of files and store them into a JSON file**

* **PREPARATION** <br> Place all your files in the ```files``` folder
* **STEP 1** <br> **COMMENT OUT** (you don't need it)
* **STEP 2** <br> First you can check what **metadata** information your files contain:
  * Comment out lines **57** to **64**
  * Un-comment line **56** to console.log the **metadata** from your files
  * Depending on what metadata you would like to store, adapt lines **57** to **61**
  * Comment out line **56** and un-comment lines **57** to **64** back
* **STEP 3** <br> **REPLACE THE CODE WITH:** ```metadata()``` to run only the **metadata()** function!
* **STEP 4 (optional)** <br> Verify if there is the correct amount of files in the JSON file.
* **RESULT** <br> Copy your JSON file and store it where you need it. **!!! clear the tracks.json file and set it back to ```{"list":[]}``` !!!***

**SCENARIO 3: You want to both change the titles of your files and store their metadata**
* **PREPARATION**  <br> Place all your files in the ```files``` folder
* **STEP 1** <br> **line 25** replace the regex code according to your needs
* **STEP 2** <br> First you can check what **metadata** information your files contain:
  * Comment out lines **57** to **64**
  * Un-comment line **56** to console.log the **metadata** from your files
  * Depending on what metadata you would like to store, adapt lines **57** to **61**
  * Comment out line **56** and un-comment lines **57** to **64** back
* **STEP 3** <br> Leave like this
* **STEP 4 (optional)** <br> Verify if there is the correct amount of files in the JSON file.
* **RESULT**
  * Find your files with their new titles in the folder ```files```
  * Copy your JSON file and store it where you need it. **!!! clear the tracks.json file and set it back to ```{"list":[]}``` !!!***

#### Conclusion
in all scenarii don't forget to remove the files from the ```files``` folder, for re-use of this program next time !!!

### Check out [BamSFX.com](https://www.bamsfx.com) and reach out to me for any questions :grin:
