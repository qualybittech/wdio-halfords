import type { Options } from '@wdio/types'
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { generate } from 'multiple-cucumber-html-reporter'
import fs from 'node:fs/promises'
import { JSDOM } from "jsdom";
import * as path from 'node:path';

let baseUrl;
global.isRequired;
global.isRequired = 1       //it can be 1 for true or 0 for false
let env = process.argv[6]

switch (env) {
  case 'staging':
    baseUrl = 'https://www.halfords.com/?_wt.mode=staging';
    break;

  case 'stagingalt':
    baseUrl = 'https://www.halfords.com/?_wt.mode=staging';
    break;

  default:
    baseUrl = 'https://www.halfords.com/?_wt.mode=staging';
    
    break;
}

const RUN_ENV = process.env.RUN_ENV || 'local';

let capabilities: any[];
let services: any[];

if (RUN_ENV === 'local') {
    capabilities = [
        {
            browserName: 'chrome',
        }
    ];
    services = [];
} else {
    capabilities = [
        {
           // browserName: 'chrome',
            'bstack:options': {
                projectName: 'WebdriverIO tests',
                os: 'Windows',
                osVersion: '11',
                buildName: 'WDIO-BrowserStack',
                sessionName: 'Chrome Win11',
            }
        },
        // Add more BrowserStack capabilities here if needed
    ];
    services = //['browserstack'];
    [['browserstack', {
        accessibility: true,
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
        },
    }]]
}

export const config: Options.Testrunner = {

    user: process.env.BROWSERSTACK_USERNAME || '',
    key: process.env.BROWSERSTACK_ACCESS_KEY || '',
    capabilities,
    services,
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [
        ['./src/features/**/*.feature']
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
   /* capabilities: [{
        browserName: 'chrome',
            'bstack:options': {
                os: 'Windows',
                osVersion: '11',
                buildName: 'WDIO-BrowserStack',
                sessionName: 'Chrome Win11',
            }
    }],*/

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    //baseUrl: 'https://www.next.co.uk/',
    baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],
       /* services: [
        'browserstack'
        ],*/
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec',[ 'cucumberjs-json', {
        jsonFolder: '.tmp/json/',
        language: 'en',
    },
],],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./src/step-definitions/steps.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 100000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    onPrepare: () => {
        // Remove the `.tmp/` folder that holds the json and report files
        return fs.rm('.tmp/', { recursive: true });
      },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {object} specs    specs to be run in the worker process
     * @param  {object} args     object that will be merged with the main configuration once worker is initialized
     * @param  {object} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {number} exitCode 0 - success, 1 - fail
     * @param  {object} specs    specs to be run in the worker process
     * @param  {number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {string} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    before: function (capabilities, specs) {
        browser.maximizeWindow();
        },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {string}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
     * @param {object}                 context  Cucumber World object
     */
    // beforeScenario: function (world, context) {
    // },
    beforeScenario: function (world, context) {
        cucumberJson.attach('just a second string', 'text/plain');
    },
    
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {object}             context  Cucumber World object
     */
    // beforeStep: function (step, scenario, context) {
    // },
    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step             step data
     * @param {IPickle}            scenario         scenario pickle
     * @param {object}             result           results object containing scenario results
     * @param {boolean}            result.passed    true if scenario has passed
     * @param {string}             result.error     error stack if scenario failed
     * @param {number}             result.duration  duration of scenario in milliseconds
     * @param {object}             context          Cucumber World object
     */
    // afterStep: function (step, scenario, result, context) {
    // },
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
          const screenshot = await browser.takeScreenshot();
          // const screenshot = await browser.saveScreenshot('./output/' + Date.now() + '.png');
          //console.log('Screenshot path:', screenshot);
          await cucumberJson.attach('just a second string', 'text/plain');
          await cucumberJson.attach(await screenshot, 'image/png');
        }else{
          const screenshot = await browser.takeScreenshot();
          await cucumberJson.attach(await screenshot, 'image/png');
        }
      },
    /**
     *
     * Runs after a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
     * @param {object}                 result           results object containing scenario results
     * @param {boolean}                result.passed    true if scenario has passed
     * @param {string}                 result.error     error stack if scenario failed
     * @param {number}                 result.duration  duration of scenario in milliseconds
     * @param {object}                 context          Cucumber World object
     */
    // afterScenario: function (world, result, context) {
    // },
    /**
     *
     * Runs after a Cucumber Feature.
     * @param {string}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },
    
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {number} result 0 - command success, 1 - command error
     * @param {object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {object} exitCode 0 - success, 1 - fail
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    onComplete: async () => {
        //const reportError = new Error('Could not generate Allure report')
        //const generation = allure(['generate', 'allure-results', '--clean'])
      
        // Generate the report when it all tests are done
        generate({
          // Required
          // This part needs to be the same path where you store the JSON files
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
          customData: {
            title: 'Test Results',
            data: [
            //{ label: 'WebTrends Optimize', value: '<img src="https://c.webtrends-optimize.com/acs/accounts/82cb087b-998c-4b84-adea-c4c6f90d5d6f/manager/logo.jpg" width="500" />' },
            { label: 'Organisation', value: 'Webtrends Optimize' },
            { label: 'Project', value: 'Halford Regression Tests' },
            { label: 'Tester', value: 'Louvina' }, //Change the tester name
            { label: 'Execution Time', value: new Date().toLocaleString() },
            { label: 'Browsers', value: 'Chrome' },
            { label: 'Test Framwork Used', value: 'WebdriverIO, Cucumber' },
            { label: 'Operating System & Architecture', value: 'Windows 11, x64' }
            ]},
        });
        await processHtmlFile('.tmp/report');
      }
    /**
    * Gets executed when a refresh happens.
    * @param {string} oldSessionId session ID of the old session
    * @param {string} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
}

async function processHtmlFile(dirReportPath: string): Promise<void> {

    const dasboardHTML = dirReportPath+"/index.html";
    // Read the HTML file 
    const htmlContentDashboard =await fs.readFile(dasboardHTML, "utf-8");
    const files = await fs.readdir(dirReportPath+"/features");

    // Find the first HTML file (For scenarios report)
    const htmlFile = files.find((file: string) => file.endsWith(".html"));

    // Construct the full file path
    const filePathFeature = path.join(dirReportPath+"/features", htmlFile);

    // Read the HTML file
    const htmlContentFeature = await fs.readFile(filePathFeature, "utf-8");

    // Load the HTML content into jsdom
    const domDashboard = new JSDOM(htmlContentDashboard);
    const documentDashboard = domDashboard.window.document;

    // Load the HTML content into jsdom
    const domFeature = new JSDOM(htmlContentFeature);
    const documentFeature = domFeature.window.document;

    // Select the elements from the dashboard
    const rowElementsDashboard = documentDashboard.querySelectorAll(".row");
    const elementsDashboard = rowElementsDashboard[0].querySelectorAll(".col-lg-4.col-xs-12");
    const sourceElementDashboard = elementsDashboard[2];
    const targetElementDashboard = elementsDashboard[0];


    //For Header
    const containerFluidElementDashboard = documentDashboard.querySelector(".container-fluid");
    //For Footer
    const createdByElementDashboard = documentDashboard.querySelector(".created-by");

    //Add Logo image to header
    if (containerFluidElementDashboard) {
        // Replace the <div class="container-fluid"> section with the <img> section
        const imgElement = documentDashboard.createElement("img");
        imgElement.src = "https://c.webtrends-optimize.com/acs/accounts/82cb087b-998c-4b84-adea-c4c6f90d5d6f/manager/logo.jpg";
        imgElement.width = 200;
        containerFluidElementDashboard.appendChild(imgElement); 
        //containerFluidElementDashboard.replaceWith(imgElement);
        // Write the updated HTML back to the file
        console.log("Section replaced successfully.");
    } else {
        console.error('<div class="container-fluid"> section not found.');
    }

    // Move the Custom tags section to Left side
    if (sourceElementDashboard && targetElementDashboard && rowElementsDashboard[0]) {
        // Move the source element above the target element
        rowElementsDashboard[0].insertBefore(sourceElementDashboard, targetElementDashboard);
        //console.log(rowElements[0]);
        console.log("Section moved successfully.");
    } else {
        console.error("Source or target element not found.");
    }

    const footerCopyRightDiv = `<div Style="text-align:center;padding:10px;font-size:14px;">
    <p>Webtrends Optimize</p>
    </p>2025 Copyright Accelarate Group Ltd t/a Webtrends Otimize </p>
    </p>All right reserved.Lwarence House, 45 High Street, Egham, TW20 9DP </p>
    </div>`;

    // Update footer section with copyright notes
      if (createdByElementDashboard) {
        // Replace the createdByElementDashboard section with the footerCopyRightDiv
        const footerDiv = documentDashboard.createElement("div");
        footerDiv.innerHTML = footerCopyRightDiv;
    
        createdByElementDashboard.replaceWith(footerDiv);
        console.log("Footer section replaced successfully.");
    } else {
        console.error('<div class="created-by"> section not found.');
    }
    // Write the updated HTML back to the file
    await fs.writeFile(dasboardHTML, domDashboard.serialize(), "utf-8");

    //*********Modifying the scenario html contents***********//

    //Exract the chart function from the dashboard HTML
    const scriptTags = documentDashboard.querySelectorAll("script");
    let chartFunction = "";
    scriptTags.forEach((script) => {
      if (script.textContent?.includes('new Chart(document.getElementById("feature-chart")')) {
        const match = script.textContent.match(/new Chart\(document\.getElementById\("feature-chart"\),[\s\S]*?\}\);/);
               if (match) {
              chartFunction = match[0];
            }
        }
    });

    // Append the additional script to the chartFunction
    const additionalScript = `
    var featureOptions = {
        legend: false,
        responsive: false
    };
    var getColor = function(selector, defaultColor) {
        if (document.querySelector(selector)) {
            return getComputedStyle(document.querySelector(selector)).color;
        }
        return defaultColor;
    };`;

  chartFunction = `${additionalScript}\n\n${chartFunction}`;

    if (!chartFunction) {
        console.error("Chart function not found in the source file.");
        return;
    }
    
    //console.log("Chart function extracted successfully."+chartFunction);

    //Select the elements from the feature file                                                                                                   
    const rowElementsFeature = documentFeature.querySelectorAll(".row");
    const elementsFeature = rowElementsFeature[0];
    const containerFluidElementFeature = documentFeature.querySelector(".container-fluid");
    elementsFeature.replaceWith(rowElementsDashboard[0]);
    const scriptTagsFeatures = documentFeature.querySelectorAll("script");
    const createdByElementFeature = documentFeature.querySelector(".created-by");

    // Append the chart function for Featureschart in scenarios html page
            scriptTagsFeatures.forEach((script) => {
              if (script.textContent?.includes("$(document).ready(function ()")) {
                  // Append the chart function under the first $(document).ready(function ()
                  script.textContent = script.textContent.replace(
                      "$(document).ready(function () {",
                      `$(document).ready(function () {\n\n${chartFunction}\n`
                  );
              }
          });

    // Copy the Dasboard contents to scenarios HTML
    if (containerFluidElementFeature) {
      // Replace the <div class="container-fluid"> section with the <img> section
      const imgElement = documentFeature.createElement("img");
      imgElement.src = "https://c.webtrends-optimize.com/acs/accounts/82cb087b-998c-4b84-adea-c4c6f90d5d6f/manager/logo.jpg";
      imgElement.width = 200;
      containerFluidElementFeature.appendChild(imgElement);
      //containerFluidElementFeature.replaceWith(imgElement2);
      // Write the updated HTML back to the file
      console.log("Section replaced successfully.");
  } else {
      console.error('<div class="container-fluid"> section not found.');
  }
  
  // Update copyrights to the footer section
    if (createdByElementFeature) {
      // Replace the createdByElementDashboard section with the footerCopyRightDiv
      const footerDiv = documentFeature.createElement("div");
      footerDiv.innerHTML = footerCopyRightDiv;

      createdByElementFeature.replaceWith(footerDiv);
      console.log("Footer section replaced successfully.");
  } else {
      console.error('<div class="created-by"> section not found.');
  }

    await fs.writeFile(filePathFeature, domFeature.serialize(), "utf-8");
}