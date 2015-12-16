/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures each has a name defined
     * and that the name is not empty.
     */
    it('have valid names', function() {
      for (var i = 0, j = allFeeds.length; i < j; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures each has a URL defined
     * and that the URL is not empty.
     */
    it('have valid URLs', function() {
      for (var i = 0, j = allFeeds.length; i < j; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });
  });


  /* This suite contains tests for the menu in the UI. It is
   * concerned with the visibility and toggle functionality.
   */
  describe('The menu', function() {
    /* First, set up some references to the body element and the
     * menu icon element, since both are involved in toggling
     * menu visibility.
     */
    var body = $('body'),
      menuIcon = $('a.menu-icon-link');


    /* This test ensures the menu element is
     * hidden by default, by checking the body element for
     * the 'menu-hidden' class, since that is used to toggle
     * menu visibility.
     */
    it('is hidden by default', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });


    /* This test ensures the menu changes
     * visibility when the menu icon is clicked. The test
     * triggers a click event on the menu icon to simulate
     * user interaction, checks if the menu is open, then
     * repeats the process to close the menu.
     */
    it('toggles visibility when the menu icon is clicked', function() {
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });


  /* This suite runs tests involving the asynchronous loading and
   * display of initial entries for the feed list.
   */
  describe('Initial entries', function() {
    /* First, set up some variables which will be used to hold the
     * title of the feed container at different states.
     */
    var currentFeedTitle,
        newFeedTitle;


    /* Since loading feeds is asynchronous, the first feed is requestd
     * via 'loadFeed' before tests are run.
     */
    beforeAll(function(done) {
      currentFeedTitle = $('h1.header-title').text();
      loadFeed(0, function() {
        done();
      });
    });

    /* This test ensures when a new feed is loaded by the
     * loadFeed function that the displayed feed title updates.
     * The test compares the feed title text after loading
     * one feed, to the feed title text after loading another.
     */
    it('updates the displayed feed title', function(done) {
      newFeedTitle = $('h1.header-title').text();
      expect(newFeedTitle).not.toEqual(currentFeedTitle);
      done();
    });


    /* This test  ensures that when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('add at least one entry to the feed list', function(done) {
      var feedEntries = $('div.feed > a.entry-link');
      expect(feedEntries.length).toBeGreaterThan(0);
      done();
    });
  });


  /* This suite runs tests involving the asynchronous loading and
   * display of entries from new feeds after the initial feed
   * entries have been loaded.
   */
  describe('New feed selection', function() {
    /* First, set up some variables which will be used to hold the
     * contents and title of the feed container at different states.
     */
    var body = $('body'),
        currentFeedHTML,
        newFeedHTML,
        currentFeedTitle,
        newFeedTitle;


    // Increase the timeout to 10s for terrible slow connections
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


    /* Since loading feeds is asynchronous, the test loads one feed,
     * with a callback function that saves some feed info, and loads
     * a second feed, which calls the 'done' method as its callback.
     */
    beforeAll(function(done) {
      loadFeed(0, function() {
        currentFeedHTML = $('div.feed').html();
        currentFeedTitle = $('h1.header-title').text();

        loadFeed(1, function() {
          done();
        });
      });
    });


    /* This test ensures that when a new feed is loaded,
     * the menu closes, via the body element having the
     * 'menu-hidden' class on it. It does not rely on
     * asynchronous work, so there is no callback.
     */
    it('closes the menu', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* This test ensures when a new feed is loaded by the
     * loadFeed function that the displayed feed title updates.
     * The test compares the feed title text after loading
     * one feed, to the feed title text after loading another.
     */
    it('updates the displayed feed title', function(done) {
      newFeedTitle = $('h1.header-title').text();
      expect(newFeedTitle).not.toEqual(currentFeedTitle);
      done();
    });


    /* This test ensures when a new feed is loaded by the
     * loadFeed function that feed content actually updates.
     * The test compares the feed list contents after loading
     * one feed, to the feed list contents after loading another.
     */
    it('updates the feed list with new data', function(done) {
      newFeedHTML = $('div.feed').html();
      expect(newFeedHTML).not.toEqual(currentFeedHTML);
      done();
    });
  });
}());
