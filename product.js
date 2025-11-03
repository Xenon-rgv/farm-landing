
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownContent = document.getElementById("dropdownContent");
const dropdownIcon = document.getElementById("dropdownIcon");

dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    
    if (dropdownContent.classList.contains('max-h-0')) {
        dropdownContent.classList.remove('max-h-0');
        dropdownContent.classList.add('max-h-96');
        dropdownIcon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    } else {
        dropdownContent.classList.add('max-h-0');
        dropdownContent.classList.remove('max-h-96');
        dropdownIcon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    }
});

document.addEventListener("click", function (event) {
    const isClickInside =
        dropdownBtn.contains(event.target) ||
        dropdownContent.contains(event.target);

    if (!isClickInside && !dropdownContent.classList.contains('max-h-0')) {
        dropdownContent.classList.add('max-h-0');
        dropdownContent.classList.remove('max-h-96');
        dropdownIcon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    }
});

        function setupQuantityControls() {
            const productCards = document.querySelectorAll('#productGrid > div');

            productCards.forEach(card => {
                const buttons = card.querySelectorAll('.border.border-gray-300.rounded-md button');
                const quantitySpan = card.querySelector('.min-w-\\[3rem\\]');

                if (buttons.length >= 2 && quantitySpan) {
                    const minusBtn = buttons[0];
                    const plusBtn = buttons[1];

                    const newMinusBtn = minusBtn.cloneNode(true);
                    const newPlusBtn = plusBtn.cloneNode(true);
                    minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);
                    plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);

                    let quantity = 0;

                    newMinusBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        if (quantity > 0) {
                            quantity--;
                            quantitySpan.textContent = `${quantity} kg`;
                        }
                    });

                    newPlusBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        quantity++;
                        quantitySpan.textContent = `${quantity} kg`;
                    });
                }
            });
        }

        const productsPerPage = {
            mobile: 4,
            desktop: 12
        };

        let currentPage = 1;
        let totalPages = 1;
        let allProducts = [];

        function isMobile() {
            return window.innerWidth < 768;
        }

        function getProductsPerPage() {
            return isMobile() ? productsPerPage.mobile : productsPerPage.desktop;
        }

        function initPagination() {
            const productGrid = document.getElementById('productGrid');
            allProducts = Array.from(productGrid.children);

            updatePagination();
            displayProducts();
        }

        function updatePagination() {
            const itemsPerPage = getProductsPerPage();
            totalPages = Math.ceil(allProducts.length / itemsPerPage);

            document.getElementById('currentPage').textContent = currentPage;
            document.getElementById('totalPages').textContent = totalPages;
            document.getElementById('pageButton').textContent = `Page ${currentPage}`;
        }

        function displayProducts() {
            const itemsPerPage = getProductsPerPage();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            allProducts.forEach((product, index) => {
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });

            updateButtonStates();
        }

        function updateButtonStates() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const firstPageBtn = document.getElementById('firstPageBtn');

            if (currentPage === 1) {
                prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
                firstPageBtn.classList.add('opacity-50', 'cursor-not-allowed');
                prevBtn.disabled = true;
                firstPageBtn.disabled = true;
            } else {
                prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                firstPageBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                prevBtn.disabled = false;
                firstPageBtn.disabled = false;
            }

            if (currentPage === totalPages) {
                nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                nextBtn.disabled = true;
            } else {
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                nextBtn.disabled = false;
            }
        }

        function goToPage(page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            updatePagination();
            displayProducts();

            setupQuantityControls();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function nextPage() {
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        }

        function previousPage() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        }

        function firstPage() {
            goToPage(1);
        }

        document.addEventListener('DOMContentLoaded', function () {
            initPagination();
            setupQuantityControls();

            document.getElementById('nextBtn').addEventListener('click', nextPage);
            document.getElementById('prevBtn').addEventListener('click', previousPage);
            document.getElementById('firstPageBtn').addEventListener('click', firstPage);

            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    currentPage = 1;
                    initPagination();
                    setupQuantityControls();
                }, 250);
            });
        });
    
