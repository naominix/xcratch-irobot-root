import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import https from 'https';
import crossFetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '..');

const fetchTimeout = 30000; // [ms]

// Read preload rules
const rulesPath = path.join(__dirname, 'preload-rules.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

// Create safe filename from URL
const getUrlAsPath = url => encodeURIComponent(url)
    .replace(/\./g, '%2E')
    .replace(/\//g, '%2F')
    .replace(/:/g, '%3A');

// Check if content is a valid Xcratch extension (entry or blockClass)
const isValidExtensionContent = content => {
    try {
        // Check if content is empty
        if (!content.trim()) return false;
        // Check for 'entry' or 'blockClass'
        return content.includes('entry') || content.includes('blockClass');
    } catch (error) {
        console.error('Error validating extension content:', error);
        return false;
    }
};

// Fetch with timeout
const fetchWithTimeout = async (url, timeout = fetchTimeout) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // For development HTTPS servers, disable certificate verification
    const agent = url.startsWith('https://') ?
        new https.Agent({rejectUnauthorized: false}) :
        null;
    
    try {
        const response = await crossFetch(url, {
            signal: controller.signal,
            agent: agent
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

const preloadDir = path.join(basePath, 'preload');
const staticExtensionDir = path.join(basePath, 'static', 'preloaded-extensions');
const staticVendorDir = path.join(basePath, 'static', 'vendor');

/**
 * Download extension to local
 * @param {string} url URL to download
 * @returns {string} public path for the downloaded file
 */
const downloadExtension = async url => {
    console.info(`Downloading extension: ${url}`);
    const extResponse = await fetchWithTimeout(url);
    const content = await extResponse.text();
    // Validate content
    if (!isValidExtensionContent(content)) {
        throw new Error('Invalid extension content');
    }
    
    fs.mkdirSync(staticExtensionDir, {recursive: true});
    const fileName = `${getUrlAsPath(url)}.mjs`;
    const extPath = path.join(staticExtensionDir, fileName);
    fs.writeFileSync(extPath, content);
    return `./static/preloaded-extensions/${fileName}`;
    
};

const downloadVendor = async vendor => {
    console.info(`Downloading vendor: ${vendor.url}`);
    const response = await fetchWithTimeout(vendor.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.text();
    if (!content.trim()) throw new Error('Empty vendor content');
    fs.mkdirSync(staticVendorDir, {recursive: true});
    fs.writeFileSync(path.join(staticVendorDir, vendor.fileName), content);
};

// Preload extensions
const preload = async () => {
    fs.mkdirSync(preloadDir, {recursive: true});
    fs.mkdirSync(staticExtensionDir, {recursive: true});
    fs.mkdirSync(staticVendorDir, {recursive: true});
    const downloadedExtensions = []; // Track downloaded extensions
    try {
        // Download the approved extension
        for (const url of rules.approved) {
            try {
                const extPath = await downloadExtension(url);
                downloadedExtensions.push({url: url, path: extPath});
            } catch (error) {
                console.warn(`Failed to process approved extension ${url}:`, error.message);
                continue; // Skip to next approved extension
            }
        }
        for (const vendor of rules.vendors || []) {
            await downloadVendor(vendor);
        }
        console.info('Preload complete');
    } finally {
        // Keep the legacy preload manifest empty. These modules are served as
        // local static assets and imported only after the user selects them.
        // Importing integrated extension bundles at editor startup can load a
        // second React runtime and break the GUI before the library opens.
        fs.writeFileSync(
            path.join(preloadDir, 'preload.json'),
            JSON.stringify([], null, 2)
        );
        fs.writeFileSync(
            path.join(staticExtensionDir, 'manifest.json'),
            JSON.stringify(downloadedExtensions, null, 2)
        );
    }
};

// Run preload
preload().then(
    () => process.exit(0),
    error => {
        console.error(error);
        process.exit(1);
    }
);
