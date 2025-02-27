document.addEventListener("DOMContentLoaded", () => {
    let activeContainer = null;
    let activeTween = null;
    let selectedGenre = localStorage.getItem("gen") || ""; // Get stored genre

    function normalizeGenre(genre) {
        const trimmedGenre = genre.trim().toLowerCase();
        console.log(`Original: ${genre}, Normalized: ${trimmedGenre}`); // Debugging
        if (trimmedGenre === "sci-fi" || trimmedGenre === "scifi") {
            return "science fiction";
        }
        return trimmedGenre;
    }

    function fetchBooks(genre) {
        const bookContainer = document.getElementById("book-container");
        bookContainer.innerHTML = "";

        fetch("obj.json")
            .then(response => response.json())
            .then(data => {
                let books = (genre.trim().toLowerCase() === "all") ? data.books : data.books.filter(book => normalizeGenre(book.genre) === normalizeGenre(genre));
                books.forEach((book, index) => {
                    const bookCard = document.createElement("div");
                    bookCard.className = "bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg opacity-0 h-full";

                    bookCard.innerHTML = `
                        <img src="${book.image}" alt="${book.book_name}" class="h-48 w-auto rounded-md object-cover">
                        <h2 class="text-lg font-bold mt-3 text-center min-h-[3rem] flex items-center justify-center">${book.book_name}</h2>
                        <p class="text-sm text-gray-600">${book.author_name}</p>
                        <p class="text-gray-700 text-sm mt-2 text-center min-h-[4rem]">${book.description.substring(0, 60)}...</p>
                        <div class="flex-grow"></div>
                        <p class="text-blue-500 font-semibold mt-2 min-h-[2rem] flex items-center">Rs ${book.price}</p>
                        <button onclick="addToCart(${JSON.stringify(book).replace(/"/g, "&quot;")})" 
                            class="mt-3 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 w-full">
                            Add to Shelf
                        </button>
                    `;
                    bookContainer.appendChild(bookCard);

                    gsap.fromTo(bookCard, 
                        { opacity: 0, y: 50, scale: 0.9 }, 
                        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: index * 0.15 }
                    );
                });

                if (books.length === 0) {
                    bookContainer.innerHTML = `<p class="text-gray-600">No books found in this genre.</p>`;
                }
            })
            .catch(error => {
                console.error("Error loading books:", error);
                bookContainer.innerHTML = `<p class="text-red-500">Failed to load books. Please try again later.</p>`;
            });
    }

    document.querySelectorAll(".container").forEach((container) => {
        const word = container.querySelector(".word");
        const genre = word.textContent.trim();
        const normalizedGenre = normalizeGenre(genre);
        const bgColor = container.getAttribute("data-bgcolor"); // Get the background color from the data attribute

        const clone = word.cloneNode(true);
        clone.classList.add("clone");
        container.appendChild(clone);
        gsap.set(clone, { yPercent: 100 });

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        container.appendChild(overlay);

        // Preselect stored genre on page reload
        if (selectedGenre === genre) {
            activeContainer = container;
            document.getElementById("header-text").textContent = genre.trim().toUpperCase();
            gsap.set(overlay, { opacity: 1, top: 0 }); // Set overlay to visible position
            document.querySelector(".flex-1").style.backgroundColor = bgColor; // Set background color
            overlay.style.backgroundColor = bgColor; // Set overlay color
            word.classList.add("selected"); // Add selected class to word
            clone.classList.add("selected"); // Add selected class to clone
        }

        container.addEventListener("click", () => {
            if (selectedGenre === genre) {
                gsap.to(overlay, { opacity: 0, top: "-100%", duration: 0.3 });
                return; // Do nothing if the same genre is clicked again
            }

            selectedGenre = genre;
            localStorage.setItem("gen", genre);
            document.getElementById("header-text").textContent = genre.trim().toUpperCase();

            // Animate the header text
            const headerText = document.getElementById("header-text");
            const splitText = new SplitType(headerText, { types: 'chars' }); // Split the text into characters

            gsap.from(splitText.chars, {
                yPercent:130,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out",
                onComplete: () => {
                    splitText.revert(); // Revert the split after animation
                }
            });

            if (activeContainer && activeContainer !== container) {
                if (activeTween) activeTween.kill();
                gsap.to(activeContainer.querySelector(".overlay"), { opacity: 0, top: "-100%", duration: 0.3 });
                activeContainer.querySelector(".word").classList.remove("selected"); // Remove selected class from previous word
                activeContainer.querySelector(".clone").classList.remove("selected"); // Remove selected class from previous clone
            }

            activeContainer = container;
            gsap.to(overlay, { opacity: 1, top: 0, duration: 0.5 }); // Animate overlay down from the top

            // Animate the background color of .flex-1 and overlay
            gsap.to(document.querySelector(".flex-1"), {
                backgroundColor: bgColor,
                duration: 0.5, // Smooth transition over 0.5 seconds
                ease: "power2.out",
            });

            gsap.to(overlay, {
                backgroundColor: bgColor,
                duration: 0.5, // Smooth transition over 0.5 seconds
                ease: "power2.out",
            });

            // Add selected class to the current word and clone
            word.classList.add("selected");
            clone.classList.add("selected");

            // Reset the position of the word and clone before starting the animation
            gsap.set([word, clone], { yPercent: 0 });

            activeTween = gsap.to([word, clone], {
                yPercent: -100,
                duration: 1.2,
                repeat: 0,
                delay: 0.4,
                ease: "power4.inOut",
                yoyo: true,
            });

            fetchBooks(normalizedGenre);
        });
    });

    if (selectedGenre) {
        fetchBooks(selectedGenre);
    }
});