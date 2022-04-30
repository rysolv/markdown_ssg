exports.generateHTML = function generateHTML(imageProcessed) {
    const fallbackImg = `<img id="authorImage" src="./assets/tyler.JPG" alt="Author" style="height: 8rem;width: 8rem;border-radius: 50%;">`;

    const authorImage = imageProcessed ?
        `<picture>
            <source srcset="./assets/tyler.webp" type="image/webp">
            ${fallbackImg}
        </picture>`
    :   fallbackImg;

    return `
        <section id="author" style="display: flex; margin-top: 10rem">
            ${authorImage}
            <div id="authorContent" style="margin: 0;padding-left: 3rem; align-self:center">
                <h2 id="name" style="margin: 0;font-size: large;font-weight: 500;">Tyler Maran</h2>
                <p id="about" style="margin: .5rem 0;">Engineer. Co-Founded <a href="https://rysolv.com" target=_blank>Rysolv</a>. I <a
                        href="https://twitter.com/TylerMaran" target=_blank>tweet</a>
                    sometimes.</p>
            </div>
        </section>
    `;
}
