document.addEventListener("DOMContentLoaded", function () {
    const examples = {
        audio: [
            { title: 'Chill Beats', link: 'test/audio/chill_beats.mp3', iconClass: 'audio-icon' },
            { title: 'Daily News Podcast', link: 'test/audio/daily_news.mp3', iconClass: 'audio-icon' },
            { title: 'Audiobook: The Great Gatsby', link: 'test/audio/great_gatsby.mp3', iconClass: 'audio-icon' }
        ],
        video: [
            { title: 'The Shawshank Redemption', link: 'test/video/shawshank.mp4', iconClass: 'video-icon' },
            { title: 'Game of Thrones', link: 'test/video/game_of_thrones.mp4', iconClass: 'video-icon' },
            { title: 'Funny Cat Compilation', link: 'test/video/funny_cats.mp4', iconClass: 'video-icon' }
        ],
        documents: [
            { title: 'Annual Report 2022', link: 'test/documents/annual_report.pdf', iconClass: 'document-icon' },
            { title: 'Resume Template', link: 'test/documents/resume_template.docx', iconClass: 'document-icon' },
            { title: 'Project Budget Spreadsheet', link: 'test/documents/project_budget.xlsx', iconClass: 'document-icon' }
        ],
        photos: [
            { title: 'Sunset Photography', link: 'test/photos/sunset.jpg', iconClass: 'photo-icon' },
            { title: 'Travel Instagram Shots', link: 'test/photos/travel_instagram.jpg', iconClass: 'photo-icon' },
            { title: 'Graphic Design Portfolio', link: 'test/photos/portfolio.pdf', iconClass: 'photo-icon' }
        ],
        ebooks: [
            { title: 'The Alchemist', link: 'test/ebooks/alchemist.epub', iconClass: 'ebook-icon' },
            { title: '1984 by George Orwell', link: 'test/ebooks/1984.epub', iconClass: 'ebook-icon' },
            { title: 'The Lean Startup', link: 'test/ebooks/lean_startup.pdf', iconClass: 'ebook-icon' }
        ],
        archives: [
            { title: 'Backup Files 2023.zip', link: 'test/archives/backup_2023.zip', iconClass: 'archive-icon' },
            { title: 'Project Resources.rar', link: 'test/archives/project_resources.rar', iconClass: 'archive-icon' },
            { title: 'Images Collection.7z', link: 'test/archives/images_collection.7z', iconClass: 'archive-icon' }
        ],
    };

    const categories = document.querySelectorAll('.categories-filter li');

    categories.forEach(category => {
        const categoryText = category.querySelector('p').textContent.toLowerCase();
        const exampleList = category.querySelector('.category-suggestions ul');
        const noFileText = category.querySelector('.no-file');

        let key;
        if (categoryText.includes('audio')) key = 'audio';
        else if (categoryText.includes('video')) key = 'video';
        else if (categoryText.includes('document')) key = 'documents';
        else if (categoryText.includes('photo')) key = 'photos';
        else if (categoryText.includes('e-book')) key = 'ebooks';
        else if (categoryText.includes('archive')) key = 'archives';

        if (key) {
            examples[key].forEach(example => {
                const li = document.createElement('li');

                // Create icon span
                const iconSpan = document.createElement('span');
                iconSpan.className = example.iconClass;

                // Create title link
                const titleLink = document.createElement('a');
                titleLink.href = example.link;
                titleLink.textContent = example.title;
                titleLink.target = '_blank'; // Open link in new tab

                // Append icon and title link to list item
                li.appendChild(iconSpan);
                li.appendChild(titleLink);
                exampleList.appendChild(li);
            });

            // Simulating file availability check
            if (Math.random() < 0.5) { // 50% chance of file being available
                noFileText.style.display = 'none'; // Hide 'File not available'
            } else {
                noFileText.style.display = 'block'; // Show 'File not available'
            }
        }
    });
});
