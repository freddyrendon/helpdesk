
const { chromium } = require("playwright");
const { expect } = require('@playwright/test'); // Import expect from @playwright/test


function generateRandomFirstName() {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Emma', 'Michael', 'Olivia', 'David', 'Sophia'];
    return getRandomElement(firstNames);
}

function generateRandomEmail() {
    const username = generateRandomString(4); // You can adjust the length as needed
    const domain = 'aa.io'; // Use your desired domain
    return `${username}@${domain}`;
}

function generateRandomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }
    return result;
}

function generateRandomPassword(length) {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_-+=';

    // Ensure at least one character from each category
    const randomLowercase = getRandomChar(lowercaseLetters);
    const randomUppercase = getRandomChar(uppercaseLetters);
    const randomDigit = getRandomChar(digits);
    const randomSpecial = getRandomChar(specialCharacters);

    // Combine the characters randomly
    const combinedCharset = lowercaseLetters + uppercaseLetters + digits + specialCharacters;
    let password = randomLowercase + randomUppercase + randomDigit + randomSpecial;

    // Add remaining characters randomly
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * combinedCharset.length);
        password += combinedCharset.charAt(randomIndex);
    }

    // Shuffle the characters to ensure randomness
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

function getRandomChar(charset) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset.charAt(randomIndex);
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}



// Retry operation function with more descriptive error messages
async function retryOperation(operation, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await operation();
      break; // Success, exit the loop
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxAttempts) {
        throw new Error(`Operation failed after ${maxAttempts} attempts: ${error.message}`);
      }
      // Wait before retrying
      await page.waitForTimeout(1000);
    }
  }
}

async function initializePage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}

async function SigningupAndPostingUser() {
   // launch browser
  console.log('Initializing page...');
  const { browser, context, page } = await initializePage();
  console.log('Page initialized.');


  // go to HelpDesk
  console.log('HelpDesk...');
  await retryOperation(async () => {
    await page.goto("http://localhost:3006");
  });
  console.log('Navigation to HelpDesk successful.');

  
  
  const signupLink = await page.locator("a[href='/signup']")
  await signupLink.click()


  const randomPassword = generateRandomPassword(12);
  const randomEmail = generateRandomEmail();
  const randomFirstName = generateRandomFirstName();
  
  const signupButton = await page.locator("button[type='submit']")

  const name = await page.locator('input[type="text"]')
  const email = await page.locator("input[type='email']")
  const password = await page.locator("input[type='password']")
  await name.fill("")
  await signupButton.click()
  
  
  await expect(page.locator(".text-danger")).toContainText("Name cannot be blank");
  
  await name.fill(randomFirstName)
  await expect(name).toHaveAttribute('type', 'text');
  await signupButton.click()

  await email.fill("")
  await expect(page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(2) > ul:nth-child(3) > li:nth-child(1)")).toContainText("Email cannot be blank");
  await expect(email).toHaveAttribute('type', 'email');
  await signupButton.click()

  await email.fill(randomEmail)
  
  await signupButton.click()
  
  await password.fill("")  
  await expect(page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(3) > ul:nth-child(3) > li:nth-child(1)")).toContainText("Password cannot be blank");
  await expect(password).toHaveAttribute('type', 'password');
  await signupButton.click()

  await password.fill(randomPassword)


  
  const dropDown = await page.locator(".form-select")
  await dropDown.selectOption({ label: 'User' });


  
  await signupButton.click()

  await page.waitForNavigation('.btn.btn-primary.mt-3')

  const createticket = await page.locator('.btn.btn-primary.mt-3')
  await createticket.click()

  const description = await page.locator("#description")
  await description.fill('This is a test')

  await signupButton.click()

  await page.waitForNavigation('.btn.btn-primary.mt-3')





  


  const screenshotName = 'UserCreateTicketScreenshot.png';
  await page.screenshot({ path: screenshotName });

  // Close the browser
  console.log('Closing browser.');
  await browser.close();


}

async function SigningupAndDeletingAdmin() {
   // launch browser
  console.log('Initializing page...');
  const { browser, context, page } = await initializePage();
  console.log('Page initialized.');


  // go to HelpDesk
  console.log('HelpDesk...');
  await retryOperation(async () => {
    await page.goto("http://localhost:3006");
  });
  console.log('Navigation to HelpDesk successful.');

  
  
  const signupLink = await page.locator("a[href='/signup']")
  await signupLink.click()


  const randomPassword = generateRandomPassword(12);
  const randomEmail = generateRandomEmail();
  const randomFirstName = generateRandomFirstName();
  
  const signupButton = await page.locator("button[type='submit']")

  const name = await page.locator('input[type="text"]')
  const email = await page.locator("input[type='email']")
  const password = await page.locator("input[type='password']")

  await name.fill(randomFirstName)

  await email.fill(randomEmail)

  await password.fill(randomPassword)

  
  const dropDown = await page.locator(".form-select")
  await dropDown.selectOption({ label: 'Admin' });

  
  await signupButton.click()

  await page.waitForNavigation('.btn.btn-primary.mt-3')

  const createButton = await page.locator(".btn.btn-primary.mt-3")

  const edButton = await page.locator('.my-card-body > div > button:nth-child(2)').first()

  await edButton.click()

    // Wait for the select element to appear
  await page.waitForSelector('#status');

  // Select the "Resolved" option
  await page.selectOption('#status', { label: 'Resolved' });


  
  await signupButton.click()
  
  await page.screenshot({ path: 'AdminEditTicket.png' });

  await createButton.click()

  const delButton = await page.locator(".my-card-body > div > button").first()
  await delButton.click()


  await page.screenshot({ path: 'AdminDeleteTicket.png' });

  // await page.pause()
  // Close the browser
  console.log('Closing browser.');
  await browser.close();


}



(async () => {
  // sequen
  await SigningupAndPostingUser();
  await SigningupAndDeletingAdmin();
  
})();