const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let allQuotes = [];

// Show the Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide the Loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Combine Local Quotes and API Quotes into One Array
function addLocalQuotes(apiQuotes) {
    allQuotes = [ ...apiQuotes, ...localQuotes]
}

// Show New Quote
function newQuote() {

    loading();

    // Pick a random quote from allQuotes array.
    const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    
    // Check if Author field is blank/unknown.
    if (!quote.author) {
        authorText.textContent = 'Unknown';    
    } else {
        authorText.textContent = quote.author;
    }

    // Check the quote length to determine styling.
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    } 
    
    // Set Quote. Hide Loader.
    quoteText.textContent = quote.text;
    complete();

}

// Get Quotes from API
async function getQuotes() {

    loading();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        const apiQuotes = await response.json(); //global variable

        addLocalQuotes(apiQuotes);
        
        newQuote();
    
    } catch (error) {
        console.log(error);
    }
}

// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();
