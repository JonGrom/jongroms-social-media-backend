//Render License Badge
function renderLicenseBadge(license) {
  const licenseBadge = `https://img.shields.io/badge/${license}-blue`
  return licenseBadge
}

//Render License Link
function renderLicenseLink(license) {
  const lowerCaseLicense = license.toLowerCase()
  const licenseLink = `https://choosealicense.com/licenses/${lowerCaseLicense}/`
  return licenseLink
}

//Render License section text
function renderLicenseSection(license) {
  const licenseLink = renderLicenseLink(license)
  const licenseSection = `## License
  
  Licensed under the [${license}](${licenseLink}) license.`
  return licenseSection
}

//Build string in markdown format using user inputs
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license)
  const licenseSection = renderLicenseSection(data.license)
  return `# ${data.title}
  ![${data.license}](${licenseBadge})

  ## Description

  ${data.description}

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Testing](#testing)
  - [License](#license)
  - [Questions](#questions)

  ## Installation

  ${data.installation}

  ## Usage

  ${data.usage}

  ## Contribution

  ${data.contribution}

  ## Testing

  ${data.test}

  ${licenseSection}

  ## Questions

  For answers to any questions, please contact me via email ${data.email} or check out my [Github](${data.github}).



`;
}

module.exports = generateMarkdown;
