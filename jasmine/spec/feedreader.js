/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 *
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

  /* RSS FEEDS TEST SUITE
   * - - - - - - - - -
   * This suite concerns the data in the allFeeds var in the app.
   *
   * Tests:
   * - Are the RSS feeds defined?
   * - Does each feed have a valid name?
   * - Does each feed have a valid URL?
   */

  describe('RSS feeds', function() {

    /* This test ensures that the allFeeds variable has
     * been defined and that it is not empty.
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

  /* LOADING INITIAL DATA TEST SUITE
   * - - - - - - - - -
   * This suite concerns the asynchronous loading and
   * display of initial entries for the feed list.
   *
   * Tests:
   * - Is the title updated as the initial feed is loaded?
   * - Does the feed list get populated with loaded data?
   */

  describe('Initial entries loading', function() {

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
    it('adds at least one entry to the feed list', function(done) {
      var feedEntries = $('div.feed > a.entry-link');
      expect(feedEntries.length).toBeGreaterThan(0);
      done();
    });

  });


  /* MENU TEST SUITE
   * - - - - - - - - -
   * This suite concerns the the menu in the UI and its
   * visibility and toggle functionality.
   *
   * Tests:
   * - Is the menu hidden by default?
   * - Is the menu's visibility toggled when its icon is selected?
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
    it('toggles visibility when the menu icon is selected', function() {
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

  });


  /* LOADING INITIAL DATA TEST SUITE
   * - - - - - - - - -
   * This suite concerns the asynchronous loading and
   * display of entries from new feeds based on user input, and
   * the effects on the UI.
   *
   * Tests:
   * - Does the menu close automatically when the user selects a feed?
   * - Does the displayed feed title update when the users selected a feed?
   * - Does the feed list update when the user selects a feed?
   * - Does the app fail gracefully when it tries to load bad data?
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


    /* This test ensures that when bad data is loaded, the UI
     * isn't negatively affected, and the feed list just shows
     * the last good feed that was loaded. A broken feed is
     * temporarily added to the feedlist for this test.
     */
    it('fails gracefully when a feed can`t load', function(done) {
      allFeeds.push({
        name: 'Broken feed',
        url: 'http://localhost'
      });

      loadFeed(allFeeds.length - 1, function() {
        allFeeds.splice(allFeeds.length - 1, 1);
        newFeedHTML = $('div.feed').html();
        expect(newFeedHTML).not.toEqual(currentFeedHTML);
        done();
      });
    });

  });

}());
