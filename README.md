# Front-end Web Developer Nanodegree Project 6
This project is a result of my completion of Udacity's Front-end Web Developer
 Nanodegree.

## Overview

The goal is to take an existing web app (in this case, an RSS feed reader) which has the beginnings of testing functionality via [Jasmine](http://jasmine.github.io/) (v2.1.2) included, and do the following:

- Complete any existing test suites
- Create additional test suites to meet base project requirements
- Create additional test suites with meaningful tests to maximize usefulness beyond project requirements

Overall, the project is an exercise in employing test-driven development practices that are massively helpful in development of apps.

## Installation
Just clone the Github repo:

`git clone https://github.com/nicksorrell/frontend-nanodegree-feedreader.git`

There's nothing to install for this project, since Jasmine is included as part of the existing app files.

## How to Run
Open _index.html_ in a web browser and wait for the tests to return results. Running it on a web server is optional.

The Jasmine test suite results are found at the bottom of the page.

## How it Works
The Jasmin testing spec is run on load, and concerns testing the RSS data itself, how the app handles loading data, and the app UI itself.

### Test Suite Summary

#### RSS Feeds
- Does data for the RSS feeds exist?
- Is the data for the feeds are correctly formatted?

#### Initial Entries
- Is initial data is loaded into the UI on load?

#### Menu
- Is the menu's visibility state is correct in various cases?

#### Menu Feed Selection
- Is the  menu's visibility state is correct?
- Is the UI is updated with new data?
- Does the app fail gracefully when it can't load a feed?

This list is a summary of the test categories. See _./spec/feedreader.js_ for details on each individual test.
