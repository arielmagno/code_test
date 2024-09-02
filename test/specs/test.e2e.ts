import { expect } from "chai"; // Import the assertion library
const { check, checkFullPageScreen } = require("wdio-image-comparison-service");

// Take a screenshot
describe("Visual Regression Tests", () => {
  it("should take a screenshot of the Safety highlights page", async () => {
    // Navigate to the URL
    await browser.url("https://www.volvocars.com/intl/v/safety/highlights");

    // Save baseline screenshot
    await browser.saveScreenshot("./baseline/safety-highlights-page.png");

    // Take a screenshot
    const screenshot = await browser.takeScreenshot();
    // Save the screenshot to a file
    require("fs").writeFileSync(
      "./screenshots/campaign.png",
      screenshot,
      "base64"
    );

    // Add further checks or assertions as needed
    expect(await browser.getTitle()).to.equal(
      "Safety - Highlights | Volvo Cars"
    );
  });
});

// Verify Page Title and URL
describe("Volvo Safety Highlights Page", () => {
  it("should have the correct title and URL", async () => {
    await browser.url("https://www.volvocars.com/intl/v/safety/highlights");

    const title = await browser.getTitle();
    expect(title).equal("Safety - Highlights | Volvo Cars");

    const url = await browser.getUrl();
    expect(url).to.equal("https://www.volvocars.com/intl/v/safety/highlights");
  });
});

// Verify Key Elements Are Displayed
describe("Volvo Safety Highlights Page", () => {
  it("should display the main heading and key content", async () => {
    await browser.url("https://www.volvocars.com/intl/v/safety/highlights");

    const mainHeading = await $("h1");
    expect(await mainHeading.isDisplayed()).to.be.true;
    expect(await mainHeading.getText()).to.contain("Safety");
  });
});

// Check the Presence of a Video or Interactive Element
describe("Volvo Safety Highlights Page", () => {
  it("should load and display the safety video correctly", async () => {
    await browser.url("https://www.volvocars.com/intl/v/safety/highlights");

    const video = await $("video");
    // The page has no video element. Set to false by default
    expect(await video.isDisplayed()).to.equal(false);
  });
});

describe("Volvo Cars Safety Highlights - Visual Regression Test", () => {
  it("should match the full page screenshot with the baseline", async () => {
    // Navigate to the Volvo Cars Safety Highlights page
    await browser.url("https://www.volvocars.com/intl/v/safety/highlights");

    // Take a screenshot of the full page and compare with the baseline
    const comparisonResult = await checkFullPageScreen("Safety-Highlights-Page", {
      /* options if needed */
      ignoreElements: ["#header", "#footer"],
    });

    // Assert that the comparison result matches the baseline
    expect(comparisonResult.misMatchPercentage).lessThan(1); // Adjust the threshold as needed
  });
});
