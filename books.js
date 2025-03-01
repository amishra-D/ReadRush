document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("bookModal");
    const modalContent = modal.querySelector(".bg-white");
    const closeModal = document.getElementById("closeModal");
    const bookImage = document.getElementById("modalBookImage");
    const bookTitle = document.getElementById("modalBookTitle");
    const bookAuthor = document.getElementById("modalBookAuthor");
    const bookDescription = document.getElementById("modalBookDescription");

    let bookData = [];
    fetch("obj.json")
        .then(response => response.json())
        .then(data => {
            bookData = data.books;
        })
        .catch(error => console.error("Error fetching books:", error));


    document.querySelectorAll(".card, .card1, .card2, .card3").forEach(card => {
        card.addEventListener("click", function () {
            const bookTitleText = card.querySelector(".title").innerText;
            const bookDetails = bookData.find(book => book.book_name === bookTitleText);

            if (bookDetails) {
                bookImage.src = bookDetails.image;
                bookTitle.innerText = bookDetails.book_name;
                bookAuthor.innerText = "By " + bookDetails.author_name;
                bookDescription.innerText = bookDetails.description;
            } else {
                bookDescription.innerText = "Description not available.";
            }

            modal.classList.remove("hidden");

            gsap.fromTo(
                modal,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.fromTo(
                            modalContent,
                            { scale: 0.8, opacity: 0 },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.5,
                                ease: 'elastic.out(1, 0.75)',
                                onComplete: () => {
                                    gsap.from([bookTitle, bookAuthor, bookDescription], {
                                        y: 40,
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: 'power2.out',
                                        stagger: 0.2,
                                    });
                                }
                            }
                        );
                    },
                }
            );
        });
    });

    closeModal.addEventListener("click", function () {
        gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.out',
                    onComplete: () => {
                        modal.classList.add("hidden");
                    },
                });
            },
        });
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            gsap.to(modalContent, {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(modal, {
                        opacity: 0,
                        duration: 0.2,
                        ease: 'power2.out',
                        onComplete: () => {
                            modal.classList.add("hidden");
                        },
                    });
                },
            });
        }
    });

});