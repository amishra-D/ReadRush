document.addEventListener("DOMContentLoaded", () => {
    let activeContainer = null;
    let activeTween = null;
    let selectedGenre = localStorage.getItem("gen") || "";
    let allBooks = [];
    function normalizeGenre(genre) {
        const trimmedGenre = genre.trim().toLowerCase();
        if (trimmedGenre === "sci-fi" || trimmedGenre === "scifi") {
            return "science fiction";
        }
        return trimmedGenre;
    }

    function fetchBooks(genre) {
        fetch("obj.json")
            .then((response) => response.json())
            .then((data) => {
                allBooks = data.books;
                filterBooks(genre);
            })
            .catch((error) => {
                console.error("Error loading books:", error);
                document.getElementById("book-container").innerHTML = `<p class="text-red-500">Failed to load books. Please try again later.</p>`;
            });
    }
    function filterBooks(genre) {
        const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
        const priceFilter = document.getElementById("price-filter").value;
        const bookContainer = document.getElementById("book-container");
        bookContainer.innerHTML = "";

        let filteredBooks = allBooks.filter((book) => {
            const matchesGenre = genre.trim().toLowerCase() === "all" || normalizeGenre(book.genre) === normalizeGenre(genre);
            const matchesSearch = book.book_name.toLowerCase().includes(searchQuery) || book.author_name.toLowerCase().includes(searchQuery);
            const matchesPrice = priceFilter === "all" ||
                (priceFilter === "<500" && book.price < 500) ||
                (priceFilter === "500-1000" && book.price >= 500 && book.price <= 1000) ||
                (priceFilter === ">1000" && book.price > 1000);
            return matchesGenre && matchesSearch && matchesPrice;
        });

        if (filteredBooks.length === 0) {
            bookContainer.innerHTML = `<p class="text-gray-600">No books found.</p>`;
            return;
        }

        filteredBooks.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.className = "bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg opacity-0 h-full";

            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.book_name}" class="md:h-48 h-28 w-auto rounded-md object-cover">
                <h2 class="text-lg font-bold mt-3 text-center min-h-[3rem] flex items-center justify-center">${book.book_name}</h2>
                <p class="text-xs md:text-sm text-gray-600">${book.author_name}</p>
                <p class="text-gray-700 text-xs md:text-sm mt-2 text-center min-h-[4rem]">${book.description.substring(0, 60)}...</p>
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
    }
    document.querySelector(".he img").addEventListener("click",()=>{
        document.getElementById("search-input").focus();

})
    document.getElementById("search-input").addEventListener("input", () => {
        filterBooks(selectedGenre);
    });

    document.getElementById("price-filter").addEventListener("change", () => {
        filterBooks(selectedGenre);
    });

    document.querySelectorAll(".container").forEach((container) => {
        const word = container.querySelector(".word");
        const genre = word.textContent.trim();
        const normalizedGenre = normalizeGenre(genre);
        const bgColor = container.getAttribute("data-bgcolor");

        const clone = word.cloneNode(true);
        clone.classList.add("clone");
        container.appendChild(clone);
        gsap.set(clone, { yPercent: 100 });

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        container.appendChild(overlay);

        if (selectedGenre === genre) {
            activeContainer = container;
            document.getElementById("header-text").textContent = genre.trim().toUpperCase();
            gsap.set(overlay, { opacity: 1, top: 0 });
            document.querySelector(".flex-1").style.backgroundColor = bgColor;
            overlay.style.backgroundColor = bgColor;
            word.classList.add("selected");
            clone.classList.add("selected");
        }

        container.addEventListener("click", () => {
            if (selectedGenre === genre) return;

            selectedGenre = genre;
            localStorage.setItem("gen", genre);
            document.getElementById("header-text").textContent = genre.trim().toUpperCase();

            const headerText = document.getElementById("header-text");
            const splitText = new SplitType(headerText, { types: 'chars' });

            gsap.from(splitText.chars, {
                yPercent: 130,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out",
                onComplete: () => {
                    splitText.revert();
                }
            });

            if (activeContainer && activeContainer !== container) {
                if (activeTween) activeTween.kill();
                gsap.to(activeContainer.querySelector(".overlay"), { opacity: 0, top: "-100%", duration: 0.3 });
                activeContainer.querySelector(".word").classList.remove("selected");
                activeContainer.querySelector(".clone").classList.remove("selected");
            }

            activeContainer = container;
            gsap.to(overlay, { opacity: 1, top: 0, duration: 0.5 });

            gsap.to(document.querySelector(".flex-1"), {
                backgroundColor: bgColor,
                duration: 0.5,
                ease: "power2.out",
            });

            gsap.to(overlay, {
                backgroundColor: bgColor,
                duration: 0.5,
                ease: "power2.out",
            });

            word.classList.add("selected");
            clone.classList.add("selected");

            gsap.set([word, clone], { yPercent: 0 });

            activeTween = gsap.to([word, clone], {
                yPercent: -100,
                duration: 1.2,
                repeat: 0,
                delay: 0.4,
                ease: "power4.inOut",
                yoyo: true,
            });

            filterBooks(normalizedGenre);
        });
    });

    if (selectedGenre) {
        fetchBooks(selectedGenre);
    }
});