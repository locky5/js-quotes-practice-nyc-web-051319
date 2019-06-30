// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener("DOMContentLoaded", function() {
  function fetchQuotes() {
    const quote = fetch('http://localhost:3000/quotes')
      .then(res => res.json())
      .then(json => {
        for (const quote of json) {

          //CREATE LIST ITEM
          const quoteCard = document.createElement('li')
          quoteCard.className = 'quote-card'

          //CREATE BLOCK FOR QUOTE AND APPEND
          const blockQuote = document.createElement('blockquote')
          blockQuote.className = 'blockquote'
          quoteCard.appendChild(blockQuote)

          //CREATE QUOTE'S QUOTE
          const quoteValue = document.createElement('p')
          quoteValue.innerText = quote.quote
          blockQuote.appendChild(quoteValue)

          //CREATE QUOTE'S AUTHOR
          const quoteAuthor = document.createElement('footer')
          quoteAuthor.className = 'blockquote-footer'
          quoteAuthor.innerText = quote.author
          blockQuote.appendChild(quoteAuthor)

          //CREATE BREAK
          const quoteBreak = document.createElement('br')
          blockQuote.appendChild(quoteBreak)

          //CREATE LIKES FOR QUOTE
          const quoteLikes = document.createElement('button')
          quoteLikes.className = 'btn-success'
          quoteLikes.innerText = 'Likes: '
          const numberOfLikes = document.createElement('span')
          numberOfLikes.innerText = '0'
          quoteLikes.addEventListener('click',
          function(e){
            let integerOfLikes = parseInt(numberOfLikes.innerText)
            integerOfLikes += 1
            numberOfLikes.innerText = integerOfLikes
          })
          quoteLikes.appendChild(numberOfLikes)
          blockQuote.appendChild(quoteLikes)

          //CREATE DESTROY FOR QUOTE
          const destroyQuote = document.createElement('button')
          destroyQuote.className = 'btn-danger'
          destroyQuote.innerText = 'Delete'
          destroyQuote.addEventListener('click',
          function(e){
            function deleteData() {
              fetch("http://localhost:3000/quotes" + '/' + `${quote.id}`, {
                method: 'delete'
              })
              .then(response => response.json());
              }
            deleteData()
            quoteList.removeChild(quoteCard)
          })
          blockQuote.appendChild(destroyQuote)

          //GET QUOTE LIST AND APPEND ALL QUOTES TO IT
          const quoteList = document.querySelector('#quote-list')
          quoteList.appendChild(quoteCard)
        }
      })
  }
  fetchQuotes()

  //ADD A QUOTE FROM FORM
  function addQuote() {
    const quoteForm = document.querySelector('#new-quote-form')
    quoteForm.addEventListener('submit',
      function(e){
        const formData = {
          "quote": document.getElementById('new-quote').value,
          "author": document.getElementById('author').value
        }

        const configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(formData)
        }

        fetch("http://localhost:3000/quotes", configObj)
          .then(res => res.json())
          .then(function(object) {
            console.log(object)
          })
      })
  }
  addQuote()
})
