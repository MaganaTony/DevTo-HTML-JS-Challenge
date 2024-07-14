const databaseURL = "https://js-7259a-default-rtdb.firebaseio.com/cards.json";

    // Función para crear tarjetas
    function createCard(title, hashtag, comments) {

      const card = document.createElement('div');
      card.className = 'card';


      const cardTitle = document.createElement('h2');
      cardTitle.textContent = title;
      card.appendChild(cardTitle);


      const cardHashtag = document.createElement('p');
      cardHashtag.textContent = hashtag;
      card.appendChild(cardHashtag);


      const commentsSection = document.createElement('div');
      commentsSection.className = 'comments-section';

      comments.forEach(comment => {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        commentsSection.appendChild(commentElement);
      });

      card.appendChild(commentsSection);


      document.getElementById('container-hashtag-1').appendChild(card);
    }

    function fetchAndCreateCards() {
      fetch(databaseURL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const cardData = data[key];
                createCard(cardData.title, cardData.hashtag, cardData.comments);
              }
            }
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    fetchAndCreateCards();