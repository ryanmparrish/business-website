/* eslint-disable no-underscore-dangle */
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* globals webVitals digitalData, _satellite */
import {
  loadScript, sampleRUM, getHelixEnv,
  getMetadata,
} from './scripts.js';

const { target, reportSuites } = getHelixEnv();
window.marketingtech = window.marketingtech || {};
window.marketingtech.adobe = {
  target,
  audienceManager: true,
  launch: {
    property: 'global',
    environment: 'production',
  },
  analytics: {
    additionalAccounts: reportSuites,
  },
};

window.targetGlobalSettings = window.targetGlobalSettings || {};
window.targetGlobalSettings.bodyHidingEnabled = false;

/**
 * sets digital data
 */

function setDigitalData() {
  const category = getMetadata('category');
  const tags = getMetadata('article:tag');
  const industry = getMetadata('industry');
  const journeyStage = getMetadata('journey-stage');
  const author = getMetadata('author');
  const business = getMetadata('business');
  const publicationDate = getMetadata('publication-date');

  const meta = {
    category,
    tags,
    industry,
    journeyStage,
    author,
    business,
    publicationDate,
  };

  console.log(meta);

  const lang = 'en-US';

  digitalData._set('page.pageInfo.language', lang);
  digitalData._set('page.pageInfo.siteSection', 'business.adobe.com');
}

/**
 * tracks the initial page load
 */
function trackPageLoad() {
  if (!digitalData || !_satellite) {
    return;
  }

  // pageload for initial pageload (For regular tracking of pageload hits)
  _satellite.track('pageload', {
    digitalData: digitalData._snapshot(),
  });
}

window.targetGlobalSettings = {
  bodyHidingEnabled: false,
};

const launchScriptEl = loadScript('https://www.adobe.com/marketingtech/main.min.js', () => {
  setDigitalData();
  trackPageLoad();
});
launchScriptEl.setAttribute('data-seed-adobelaunch', 'true');

/* Core Web Vitals RUM collection */

sampleRUM('cwv');

function storeCWV(measurement) {
  const rum = { cwv: { } };
  rum.cwv[measurement.name] = measurement.value;
  sampleRUM('cwv', rum);
}

function updateExternalLinks() {
  document.querySelectorAll('main a').forEach((a) => {
    const { origin } = new URL(a);
    if (origin && origin !== window.location.origin) {
      a.setAttribute('rel', 'noopener');
      a.setAttribute('target', '_blank');
    }
  });
}

if (window.hlx.rum.isSelected) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/web-vitals';
  script.onload = () => {
    // When loading `web-vitals` using a classic script, all the public
    // methods can be found on the `webVitals` global namespace.
    webVitals.getCLS(storeCWV);
    webVitals.getFID(storeCWV);
    webVitals.getLCP(storeCWV);
  };
  document.head.appendChild(script);
}

if (document.querySelector('.article-header') && !document.querySelector('[data-origin]')) {
  loadScript('../../blocks/interlinks/interlinks.js', null, 'module');
}

updateExternalLinks();
